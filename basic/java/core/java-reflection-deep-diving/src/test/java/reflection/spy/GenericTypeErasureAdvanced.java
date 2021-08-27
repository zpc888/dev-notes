package reflection.spy;

import org.junit.jupiter.api.Test;

import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

public class GenericTypeErasureAdvanced {
    @Test
    void testTypeErasure() {
        List<String> textList = new ArrayList<>();
        List<Long>   longList = new ArrayList<>();
        assertSame(textList.getClass(), longList.getClass());
    }

    @Test
    void testNoGenericSuperclass() {
        class A {}
        Type objType = A.class.getGenericSuperclass();
        assertTrue(objType instanceof Class);
        assertEquals(Object.class, objType);
        Type grandpa = ((Class)objType).getGenericSuperclass();
        assertNull( grandpa );
    }

    @Test
    void testGenericSuperclass() {
        class A<X, Y> {}
        class B extends A<String, List<Long>> {}
        Type aType = B.class.getGenericSuperclass();
        assertTrue(aType instanceof ParameterizedType);
        assertEquals(A.class, ((ParameterizedType) aType).getRawType());
        Type[] parentGenericTypes = ((ParameterizedType) aType).getActualTypeArguments();
        assertTrue(parentGenericTypes[0] instanceof Class);
        assertEquals(String.class, parentGenericTypes[0]);
        verifyListLong(parentGenericTypes[1]);
    }

    private void verifyListLong(Type parentGenericType) {
        assertTrue(parentGenericType instanceof ParameterizedType);
        ParameterizedType secondArg = (ParameterizedType) parentGenericType;
        assertEquals(List.class, secondArg.getRawType());
        Type[] secondArgGenericTypes = secondArg.getActualTypeArguments();
        assertEquals(1, secondArgGenericTypes.length);
        assertEquals(Long.class, secondArgGenericTypes[0]);
    }

    @Test
    void testGenericSuper2class() {
        class A<X, Y> {}
        class B<K, V> extends A<K, V> {}
        class C extends B<String, List<Long>> {}
        Type aType = C.class.getGenericSuperclass();
        assertTrue(aType instanceof ParameterizedType);
        assertEquals(B.class, ((ParameterizedType) aType).getRawType());
        Type[] parentGenericTypes = ((ParameterizedType) aType).getActualTypeArguments();
        assertTrue(parentGenericTypes[0] instanceof Class);
        assertEquals(String.class, parentGenericTypes[0]);
        verifyListLong(parentGenericTypes[1]);
    }
}
