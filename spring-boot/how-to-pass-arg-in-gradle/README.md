# How to pass system properties and arguments via command line
## Build an executable spring boot jar
* run the below command
```shell
./gradlew clean build
```
## Run via executable jar file
* no system properties nor arguments
```shell
java -jar build/libs/how-to-pass-arg-in-gradle-0.0.1-SNAPSHOT.jar

# output 
##############################
# !!! No application system properties !!!
#
# !!! No application arguments !!!
##############################
```
* passing both system properties and arguments
```shell
java -Dapp-x=one -Dapp-y -jar build/libs/how-to-pass-arg-in-gradle-0.0.1-SNAPSHOT.jar a=1 bcde 98987

# output 
##############################
# Application system properties:
#         app-y=
#         app-x=one
# 
# Application Arguments:
#         1:      a=1
#         2:      bcde
#         3:      98987
##############################
```

## Run via gradle bootRun
* no system properties nor arguments
```shell
./gradlew bootRun

# output 
##############################
# !!! No application system properties !!!
#
# !!! No application arguments !!!
##############################
```
* passing arguments only
```shell
./gradlew bootRun --args='a=1 bcde 98987'
# or
./gradlew bootRun --args 'a=1 bcde 98987'

# output 
##############################
# !!! No application system properties !!!
# 
# Application Arguments:
#         1:      a=1
#         2:      bcde
#         3:      98987
##############################
```
* passing system properties by hard-coded in custom bootRun task in build.gradle
```shell
bootRun {
    jvmArgs = ['-Dapp-x=one', '-Dapp-y']
}

./gradlew -b build-hardcode-system-properties.gradle bootRun --args='a=1 bcde 98987' 
# or
./gradlew -b=build-hardcode-system-properties.gradle bootRun --args 'a=1 bcde 98987' 
 
# output 
##############################
# Application system properties:
#         app-y=
#         app-x=one
# 
# Application Arguments:
#         1:      a=1
#         2:      bcde
#         3:      98987
##############################
```

* passing system properties via -P options
```shell
bootRun {
    if ( project.hasProperty('jvmArgs') ) {
        jvmArgs = (project.jvmArgs.split("\\s+") as List)
    }
}

./gradlew -b build-dash-p-jvm-args.gradle bootRun -PjvmArgs="-Dapp-x=one -Dapp-y" --args='a=1 bcde 98987' 
# or 
./gradlew -b build-dash-p-jvm-args.gradle bootRun --args='a=1 bcde 98987' -PjvmArgs="-Dapp-x=one -Dapp-y"

# output 
##############################
# Application system properties:
#         app-y=
#         app-x=one
# 
# Application Arguments:
#         1:      a=1
#         2:      bcde
#         3:      98987
##############################
```

* passing system properties via transmission of gradle system properties to bootRun task
```shell
bootRun {
    systemProperties = System.properties
}

./gradlew -b build-transmit-system-properties.gradle -Dapp-x=one -Dapp-y bootRun --args='a=1 bcde 98987' 
# or 
./gradlew -Dapp-x=one -Dapp-y -b build-transmit-system-properties.gradle bootRun --args='a=1 bcde 98987'
# or 
./gradlew -Dapp-x=one -Dapp-y -b=build-transmit-system-properties.gradle bootRun --args='a=1 bcde 98987'
# or 
./gradlew -b=build-transmit-system-properties.gradle -Dapp-x=one bootRun --args='a=1 bcde 98987' -Dapp-y 

# output 
##############################
# Application system properties:
#         app-y=
#         app-x=one
# 
# Application Arguments:
#         1:      a=1
#         2:      bcde
#         3:      98987
##############################
```

## debug spring boot 
* run via spring boot gradle plugin 
```shell
./gradlew bootRun --debug-jvm
./gradlew -b build-dash-p-jvm-args.gradle bootRun -PjvmArgs="-Xdebug -Xrunjdwp:transport=dt_socket,server=y,suspend=y,address=5005" 
# suspend=n,address=5005

# not work for next line, for system properties, they must start with -D, don't know how to pass -X
# ./gradlew -b=build-transmit-system-properties.gradle bootRun -Xdebug -Xrunjdwp:transport=dt_socket,server=y,suspend=y,address=5005
```

* run via java -jar
```shell
java -Xdebug -Xrunjdwp:transport=dt_socket,server=y,suspend=n,address=5005 -jar build/libs/how-to-pass-arg-in-gradle-0.0.1-SNAPSHOT.jar
```