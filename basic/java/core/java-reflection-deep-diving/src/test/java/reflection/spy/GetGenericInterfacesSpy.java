package reflection.spy;

import org.junit.jupiter.api.Test;

import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

public class GetGenericInterfacesSpy {
    private interface I1 {}
    private interface I2<X, Y> {}

    @Test
    void verifyNoInterfaceAtAll() {
        class A {}
        Type[] empty = A.class.getGenericInterfaces();
        assertTrue(empty.length == 0);
    }

    @Test
    void verifyNotGenericInterface() {
        class B implements I1 {}
        Type[] itfc = B.class.getGenericInterfaces();
        assertEquals(1, itfc.length);
        assertTrue( itfc[0] instanceof Class);
        assertEquals(I1.class.getName(), itfc[0].getTypeName());
        assertEquals(I1.class, itfc[0]);
    }

    private static class C implements I2<Integer, List<String>> {}

    @Test
    void verifyGetGenericInterface() {
        Type[] itfc = C.class.getGenericInterfaces();
        verifyClassC_getGeenricInterfaces(itfc);

        Class<? super C> superclass = C.class.getSuperclass();
        assertEquals(java.lang.Object.class, superclass);

        Class<? super C> superclass1 = superclass.getSuperclass();
        assertNull(superclass1);

    }

    private static class D extends C {}

    @Test
    void verifyGetGenericInterfaceWithInheritence() {
        Type[] itfc = D.class.getGenericInterfaces();
        assertEquals(0, itfc.length);

        Type[] superItfcs = D.class.getSuperclass().getGenericInterfaces();
        verifyClassC_getGeenricInterfaces(superItfcs);
    }

    void verifyClassC_getGeenricInterfaces(Type[] itfc) {
        assertEquals(1, itfc.length);
        assertTrue( itfc[0] instanceof ParameterizedType);
        ParameterizedType paramType = (ParameterizedType) itfc[0];
        // ...$I2 != ...$I2<java.lang.Integer, java.util.List<java.lang.String>>
//        assertNotEquals(I2.class.getName(), paramType.getRawType().getTypeName());
        assertEquals(I2.class, paramType.getRawType());
        Type[] typeArgs = paramType.getActualTypeArguments();
        assertEquals(2, typeArgs.length);
        assertTrue(typeArgs[0] instanceof Class);
        assertEquals(Integer.class, typeArgs[0]);
        assertTrue(typeArgs[1] instanceof ParameterizedType);
        ParameterizedType paramTypeArg = (ParameterizedType) typeArgs[1];
//        assertNotEquals(List.class, paramTypeArg.getRawType().getTypeName());
        assertEquals(List.class, paramTypeArg.getRawType());
        Type[] paramTypeArgArgs = paramTypeArg.getActualTypeArguments();
        assertTrue(paramTypeArgArgs[0] instanceof Class);
        assertEquals(String.class, paramTypeArgArgs[0]);
    }
}
