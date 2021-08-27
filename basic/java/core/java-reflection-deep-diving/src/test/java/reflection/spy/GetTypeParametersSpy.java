package reflection.spy;

import org.junit.jupiter.api.Test;

import java.lang.reflect.Type;
import java.lang.reflect.TypeVariable;
import static org.junit.jupiter.api.Assertions.*;

public class GetTypeParametersSpy {
    private static class A<X> {}
    private static class B<K, V> {}
    private static class C<X extends A> {}
    private static class D<X extends A, Y extends B> {}

    @Test
    public void testTypeParameters() {
        verify(A.class.getTypeParameters(), new String[]{"X", "java.lang.Object"});
        verify(B.class.getTypeParameters(), new String[]{"K", "java.lang.Object"}, new String[]{"V", "java.lang.Object"});
        verify(C.class.getTypeParameters(), new String[]{"X", A.class.getName()});
        verify(D.class.getTypeParameters(), new String[]{"X", A.class.getName()}, new String[]{"Y", B.class.getName()});

        System.out.println("done");
    }

    private void verify(TypeVariable[] typeVars, String[]... nameAndBoundNames) {
        if (typeVars == null || typeVars.length == 0) {
            assertTrue(nameAndBoundNames == null || nameAndBoundNames.length == 0);
        }
        assertEquals(typeVars.length, nameAndBoundNames.length);
        for (int i = 0; i < typeVars.length; i++) {
            TypeVariable typeVar = typeVars[i];
            String[] expectNameAndBoundNames = nameAndBoundNames[i];
            assertEquals(expectNameAndBoundNames[0], typeVar.getName());
            Type[] bounds = typeVar.getBounds();
            if (bounds == null || bounds.length == 0) {
                assertEquals(expectNameAndBoundNames.length, 1);
            } else {
                for (int b = 0; b < bounds.length; b++) {
                    assertEquals(expectNameAndBoundNames[b+1], bounds[b].getTypeName());
                }
            }
        }
    }
}
