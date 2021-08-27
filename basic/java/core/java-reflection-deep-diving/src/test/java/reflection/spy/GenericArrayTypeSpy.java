package reflection.spy;

import org.junit.jupiter.api.Test;

import java.lang.reflect.Field;
import java.lang.reflect.GenericArrayType;
import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

public class GenericArrayTypeSpy {
    class A<T> {}
    class B {
        public A[] array;
        public A<String>[] genericArray;
        public A<String>[][] generic2dArray;
        public List<A<String>>[][] genericGeneric2dArray;
    }

//    public A[] array;
    @Test
    void testArrayType() throws Exception {
        Field arrayField = B.class.getDeclaredField("array");
        Type type = arrayField.getGenericType();
        assertTrue(type instanceof Class);
        assertSame(A.class, ((Class)type).getComponentType());
    }

    //    public A<String>[] genericArray;
    @Test
    void testGenericArrayType() throws Exception {
        Field genericArrayField = B.class.getDeclaredField("genericArray");
        Type type = genericArrayField.getGenericType();
        assertTrue(type instanceof GenericArrayType);
        GenericArrayType genericArrayType = (GenericArrayType)type;
        verifyGenericArrayType(genericArrayType);
    }

    //    public A<String>[][] generic2dArray;
    @Test
    void testGeneric2dArrayType() throws Exception {
        Field generic2dArrayField = B.class.getDeclaredField("generic2dArray");
        Type type = generic2dArrayField.getGenericType();
        assertTrue(type instanceof GenericArrayType);
        GenericArrayType generic2dArrayType = (GenericArrayType)type;
        Type componentType = generic2dArrayType.getGenericComponentType();
        assertTrue(componentType instanceof GenericArrayType);
        GenericArrayType genericArrayType = (GenericArrayType)componentType;
        verifyGenericArrayType(genericArrayType);
    }

    //    public List<A<String>>[][] genericGeneric2dArray;
    @Test
    void testGenericGeneric2dArrayType() throws Exception {
        Field genericGeneric2dArrayField = B.class.getDeclaredField("genericGeneric2dArray");
        Type type = genericGeneric2dArrayField.getGenericType();
        assertTrue(type instanceof GenericArrayType);
        GenericArrayType genericGeneric2dArrayType = (GenericArrayType)type;
        Type componentType = genericGeneric2dArrayType.getGenericComponentType();
        assertTrue(componentType instanceof GenericArrayType);
        GenericArrayType genericArrayType = (GenericArrayType)componentType;
        verifyGenericGenericArrayType(genericArrayType);
    }

    private void verifyGenericGenericArrayType(GenericArrayType genericArrayType) {
        Type componentType = genericArrayType.getGenericComponentType();
        assertTrue(componentType instanceof ParameterizedType);
        Type aClassStrClass = ((ParameterizedType)componentType).getActualTypeArguments()[0];
        assertTrue(aClassStrClass instanceof ParameterizedType);
        Type listClass = ((ParameterizedType)componentType).getRawType();
        assertEquals(List.class.getName(), listClass.getTypeName());

        Type strClass = ((ParameterizedType)aClassStrClass).getActualTypeArguments()[0];
        assertSame(String.class, strClass);
        Type aClass = ((ParameterizedType)aClassStrClass).getRawType();
        assertEquals(A.class.getName(), aClass.getTypeName());
    }

    private void verifyGenericArrayType(GenericArrayType genericArrayType) {
        Type componentType = genericArrayType.getGenericComponentType();
        assertTrue(componentType instanceof ParameterizedType);
        Type strClass = ((ParameterizedType)componentType).getActualTypeArguments()[0];
        assertSame(String.class, strClass);
        Type aClass = ((ParameterizedType)componentType).getRawType();
        assertEquals(A.class.getName(), aClass.getTypeName());
    }
}
