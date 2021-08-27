package reflection.spy;

import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;

import java.lang.reflect.*;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertSame;

/**
 * see article at
 * https://mydailyjava.blogspot.com/2013/06/advanced-java-generics-retreiving.html
 */
public class GenericTypeRetriever {

    abstract class MyGenericClass<T> {}
    class MyStringSubClass extends MyGenericClass<String> {}
    @Test
    void testDirectExtendedClass() {
        Class<?> genericType = findSubClassParameterType(new MyStringSubClass(), MyGenericClass.class, 0);
        assertSame(String.class, genericType);
    }

    abstract class MyGenericSubClass<U> extends MyGenericClass<U> {}
    class MyStringSubSubClass extends MyGenericSubClass<String> {}
    @Test
    void testIndirectExtendedClass() {
        Class<?> genericType = findSubClassParameterType(new MyStringSubSubClass(), MyGenericClass.class, 0);
        assertSame(String.class, genericType);
    }

    class MyGenericOuterClass<U> {
        public class MyGenericInnerClass<U> {}
    }
    class MyStringOuterSubClass extends MyGenericOuterClass<String> {}
    @Test
    @Disabled("not working now")
    void testInnerClass() {
        MyGenericOuterClass.MyGenericInnerClass inner = new MyStringOuterSubClass().new MyGenericInnerClass();
        Class<?> actual = findSubClassParameterType(inner, MyGenericOuterClass.MyGenericInnerClass.class, 0);
        assertEquals(String.class, actual);
    }

    Class<?> findSubClassParameterType(Object instance, Class<?> targetClass, int paramIndex) {
        Map<Type, Type> typeMap = new HashMap<Type, Type>();
        Class<?> instanceClass = instance.getClass();
        while (targetClass != instanceClass.getSuperclass()) {
            extractTypeArguments(typeMap, instanceClass);
            instanceClass = instanceClass.getSuperclass();
            if (instanceClass == null) {
                throw new IllegalArgumentException();
            }
        }

        ParameterizedType parameterizedType = (ParameterizedType) instanceClass.getGenericSuperclass();
        Type actualType = parameterizedType.getActualTypeArguments()[paramIndex];
        if (typeMap.containsKey(actualType)) {
            actualType = typeMap.get(actualType);
        }
        if (actualType instanceof Class) {
            return (Class<?>) actualType;
        } else if (actualType instanceof TypeVariable) {
            return browseNestedTypes(instance, (TypeVariable<?>)actualType);
        } else {
            throw new IllegalArgumentException();
        }
    }

    private Class<?> browseNestedTypes(Object instance, TypeVariable<?> actualType) {
        Class<?> instanceClass = instance.getClass();
        List<Class<?>> nestedOuterTypes = new LinkedList<Class<?>>();
        for (Class<?> enclosingClass = instanceClass.getEnclosingClass();
             enclosingClass != null;
             enclosingClass = enclosingClass.getEnclosingClass()) {
            try {
                Field this$0 = instanceClass.getDeclaredField("this$0");
                Object outerInstance = this$0.get(instance);
                Class<?> outerClass = outerInstance.getClass();
                nestedOuterTypes.add(outerClass);
                Map<Type, Type> outerTypeMap = new HashMap<>();
                extractTypeArguments(outerTypeMap, outerClass);
                for (Map.Entry<Type, Type> entry: outerTypeMap.entrySet()) {
                    if (!(entry.getKey() instanceof TypeVariable)) {
                        continue;
                    }
                    TypeVariable<?> foundType = (TypeVariable<?>) entry.getKey();
                    if (foundType.getName().equals(actualType.getName()) &&
                        isInnerClass(foundType.getGenericDeclaration(), actualType.getGenericDeclaration())) {
                       if (entry.getValue() instanceof Class) {
                           return (Class<?>) entry.getValue();
                       }
                       actualType = (TypeVariable<?>) entry.getValue();
                    }
                }
            } catch (NoSuchFieldException nsfe) {
                throw new IllegalStateException("Impossible");
            } catch (IllegalAccessException iae) {
                throw new RuntimeException("illegal access", iae);
            }
        }
        throw new IllegalArgumentException("fail to find");
    }

    private void extractTypeArguments(Map<Type, Type> typeMap, Class<?> clazz) {
        Type genericSuperclass = clazz.getGenericSuperclass();
        if (!(genericSuperclass instanceof ParameterizedType)) {
            return;
        }
        ParameterizedType parameterizedType = (ParameterizedType) genericSuperclass;
        Type[] typeParameter = ((Class<?>)(parameterizedType.getRawType())).getTypeParameters();
        Type[] actualTypeArgument = parameterizedType.getActualTypeArguments();
        for (int i = 0; i < typeParameter.length; i++) {
            if (typeMap.containsKey(actualTypeArgument[i])) {
                actualTypeArgument[i] = typeMap.get(actualTypeArgument[i]);
            }
            typeMap.put(typeParameter[i], actualTypeArgument[i]);
        }
    }

    //
    // GenericDeclaration <| ---+--- Class
    //                          |                      +------ Constructor
    //                          |                      |
    //                          +--- Executable <|-----+
    //                                                 |
    //                                                 +------ Method
    //
    private boolean isInnerClass(GenericDeclaration outerDeclaration, GenericDeclaration innerDeclaration) {
        if (!(outerDeclaration instanceof Class) || !(innerDeclaration instanceof Class)) {
            throw new IllegalArgumentException();
        }
        Class<?> outerClass = (Class<?>) outerDeclaration;
        Class<?> innerClass = (Class<?>) innerDeclaration;
        while ((innerClass = innerClass.getEnclosingClass()) != null) {
            if (innerClass == outerClass) {
                return true;
            }
        }
        return false;
    }
}
