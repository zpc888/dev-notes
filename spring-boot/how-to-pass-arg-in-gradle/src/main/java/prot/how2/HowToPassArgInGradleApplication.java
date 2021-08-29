package prot.how2;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

@SpringBootApplication
public class HowToPassArgInGradleApplication {

    public static void main(String[] args) {
        showAppSystemProperties();
        showAppCmdLineArguments(args);
        SpringApplication.run(HowToPassArgInGradleApplication.class, args);
    }

    private static void showAppSystemProperties() {
        System.out.println();
        final Map<String, String> appSystemProperties = new HashMap<>();
        final Properties systemProps = System.getProperties();
        for (Object k : systemProps.keySet()) {
            String propName = (String)k;
            if (propName.startsWith("app-")) {
                String propVal = systemProps.getProperty(propName);
                appSystemProperties.put(propName, propVal);
            }
        }
        if (appSystemProperties.isEmpty()) {
            System.out.println("!!! No application system properties !!!");
        } else {
            System.out.println("Application system properties:");
            appSystemProperties.entrySet().stream().forEach(e -> {
                System.out.printf("\t%s=%s%n", e.getKey(), e.getValue());
            });
        }
    }

    private static void showAppCmdLineArguments(String[] args) {
        System.out.println();
        if (args == null || args.length == 0) {
            System.out.println("!!! No application arguments !!!");
        } else {
            System.out.println("Application Arguments:");
            for (int i = 0; i < args.length; i++) {
                System.out.printf("\t%d:\t%s%n", i+1, args[i]);
            }
        }
    }

}
