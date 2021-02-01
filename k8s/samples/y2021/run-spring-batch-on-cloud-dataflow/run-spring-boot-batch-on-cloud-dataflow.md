# Creating a Cluster

```shell
minikube start --cpus=4 --memory=8192

# if already created and want to start over
# minikube stop
# minikube delete
```

# Install Spring Cloud Data Flow in Helm

```shell
# add helm repository
helm repo add bitnami https://charts.bitnami.com/bitnami

# install dataflow server
helm install my-release bitnami/spring-cloud-dataflow
# default helm chart uses RabbitMQ and MariaDB 
# to customize, check https://github.com/bitnami/charts/tree/master/bitnami/spring-cloud-dataflow
# after customization, dataflow server and skipper server may need to be re-built with required libraries

# to uninstall after done
# helm uninstall my-release
```

# Launch Dashboard

```shell
export SERVICE_PORT=$(kubectl get --namespace default -o jsonpath="{.spec.ports[0].port}" services my-release-spring-cloud-dataflow-server)
kubectl port-forward --namespace default svc/my-release-spring-cloud-dataflow-server ${SERVICE_PORT}:${SERVICE_PORT} & 
echo "http://127.0.0.1:${SERVICE_PORT}/dashboard"
```

Note: port-forward must keep running, that is why it must be run at the background

type the echo text into chrome browser

# Deploy Your App Database DDL and RefData

Since the above step uses *bitnami/mariadb* which deploys `my-release-mariadb` at 3306 of its container, a port-forward is needed for external client to access, such as MySQL Workbench, Liquibase deployment, etc.

1. Expose internal database to external access

```shell
# launch k9s
k9s

# select my-release-mariadb-0 then <shift-f> to forward to host-ip and a port, such as: 192.168.2.12:3307
```

![Port Fowarding MariaDB](./images/spring-cloud-dataflow-mariadb-port-forward.png)

2. Deploy your own application DDL

```shell
# mvn liquibase:update
# gradle update

# Or directly liquibase update
liquibase --defaultsFile=liquibase-on-spring-cloud-dataflow-mariadb.properties update
```

# Deploy Your Spring Batch App by Using Data Flow

1. Build docker image under minikube's docker-daemon

```shell
# point shell to minikube's docker-daemon
eval $(minikube docker-env)

# verify there are no springcloudtask/${your-app-names} images 
# docker images | grep springcloudtask

# build docker image using jib maven/gradle plugin
./mvnw clean package jib:dockerBuild
# --- or no unit tests
./mvnw clean package jib:dockerBuild -DskipTests

# verify there are springcloudtask/${your-app-names} images 
# docker images | grep springcloudtask

```

2. Registering under Kubernetes using docker: protocol

```shell
# deploy the above springcloudtask/{apps} via spring cloud dataflow dashboard http://.../dashboard
applications -> Add application(s) -> Register one or more apps 
-> Type: task
-> Uri:  docker:<docker-image-path>/<imageName>:<version>
```

3. Have a plan to unify all #2 deployed application names and next section to-be-created task names, e.g.
   - Application name will start with batch-... 
   - Task name will start with task-...
   
   **NOTE:** Name must be as short as possible since it is part of pod container name later on which must be less than 63 characters in total

![Deployed Applications List](./images/after-spring-batch-apps-deployed.png)

# Create Tasks 

1. Create tasks by weaving deployed spring-batch applications together

```shell
Tasks/Jobs -> Tasks -> Create Task
drag drop all required spring-batch applications as task-steps
```

e.g.

![Create task-inbound-events](./images/creating-task-inbound-events.png)

naming it as "task-inbound-events"

![create task-outbound-events](./images/creating-task-outbound-events.png)

naming it as "task-outbound-events"

2. Schedule all tasks based on cron syntax for each tasks

Go to Tasks / Jobs -> Tasks list page

- click '...' Icon at left side of "task-inbound-events", then select Schedule action to schedule to run every 6 hours

![schdule task-inbound-events every 6 hours](./images/schedule-inbound-events-run-every-6-hours-from-1am.png)

- click '...' Icon at right side of "task-outbound-events", then select Schedule action to schedule to run every 1 hours

![run outbound event every 1 hour from 00:08](./images/schedule-outbound-events-run-every-hour-from-0008.png)



# Scripts to register applications with app- prefix

[register shell](./curl-register-apps-then-create-tasks-finally-schedule.sh)

```shell
curl 'http://127.0.0.1:8080/apps/task/app-requisition/0.0.1-SNAPSHOT' -i -X POST \
    -d 'uri=docker%3Aspringcloudtask%2Frequisition-event-detector%3A0.0.1-SNAPSHOT'

curl 'http://127.0.0.1:8080/apps/task/app-candidate/0.0.1-SNAPSHOT' -i -X POST \
    -d 'uri=docker%3Aspringcloudtask%2Fcandidate-event-detector%3A0.0.1-SNAPSHOT'

curl 'http://127.0.0.1:8080/apps/task/app-worker/0.0.1-SNAPSHOT' -i -X POST \
    -d 'uri=docker%3Aspringcloudtask%2Fworker-event-detector%3A0.0.1-SNAPSHOT'

curl 'http://127.0.0.1:8080/apps/task/app-worker-cancel/0.0.1-SNAPSHOT' -i -X POST \
    -d 'uri=docker%3Aspringcloudtask%2Fworker-close-event-detector%3A0.0.1-SNAPSHOT'

curl 'http://127.0.0.1:8080/apps/task/app-candidate-cancel/0.0.1-SNAPSHOT' -i -X POST \
    -d 'uri=docker%3Aspringcloudtask%2Fcandidate-close-event-detector%3A0.0.1-SNAPSHOT'

curl 'http://127.0.0.1:8080/apps/task/app-requisition-close/0.0.1-SNAPSHOT' -i -X POST \
    -d 'uri=docker%3Aspringcloudtask%2Frequisition-close-event-detector%3A0.0.1-SNAPSHOT'

curl 'http://127.0.0.1:8080/apps/task/app-requisition-cancel/0.0.1-SNAPSHOT' -i -X POST \
    -d 'uri=docker%3Aspringcloudtask%2Frequisition-cancel-event-detector%3A0.0.1-SNAPSHOT'

curl 'http://127.0.0.1:8080/apps/task/app-outbound/0.0.1-SNAPSHOT' -i -X POST \
    -d 'uri=docker%3Aspringcloudtask%2Fevent-transmitter%3A0.0.1-SNAPSHOT'

curl 'http://127.0.0.1:8080/apps/task/app-tcc-lock/0.0.1-SNAPSHOT' -i -X POST \
    -d 'uri=docker%3Aspringcloudtask%2Ftcc-obtain-lock%3A0.0.1-SNAPSHOT'

curl 'http://127.0.0.1:8080/apps/task/app-tcc-unlock/0.0.1-SNAPSHOT' -i -X POST \
    -d 'uri=docker%3Aspringcloudtask%2Ftcc-release-lock%3A0.0.1-SNAPSHOT'

curl 'http://127.0.0.1:8080/apps/task/app-tcc-reset/0.0.1-SNAPSHOT' -i -X POST \
    -d 'uri=docker%3Aspringcloudtask%2Ftcc-reset-lock%3A0.0.1-SNAPSHOT'
```

# Scripts to unregister the above applications

[de-register shell](./curl-delete-schedules-tasks-and-apps.sh)

```shell
# un-register all apps
# curl 'http://127.0.0.1:8080/apps' -i -X DELETE

curl 'http://127.0.0.1:8080/apps/task/app-requisition/0.0.1-SNAPSHOT' -i -X DELETE
curl 'http://127.0.0.1:8080/apps/task/app-candidate/0.0.1-SNAPSHOT' -i -X DELETE
curl 'http://127.0.0.1:8080/apps/task/app-worker/0.0.1-SNAPSHOT' -i -X DELETE
curl 'http://127.0.0.1:8080/apps/task/app-worker-cancel/0.0.1-SNAPSHOT' -i -X DELETE
curl 'http://127.0.0.1:8080/apps/task/app-candidate-cancel/0.0.1-SNAPSHOT' -i -X DELETE
curl 'http://127.0.0.1:8080/apps/task/app-requisition-cancel/0.0.1-SNAPSHOT' -i -X DELETE
curl 'http://127.0.0.1:8080/apps/task/app-requisition-close/0.0.1-SNAPSHOT' -i -X DELETE
curl 'http://127.0.0.1:8080/apps/task/app-outbound/0.0.1-SNAPSHOT' -i -X DELETE
curl 'http://127.0.0.1:8080/apps/task/app-tcc-lock/0.0.1-SNAPSHOT' -i -X DELETE
curl 'http://127.0.0.1:8080/apps/task/app-tcc-unlock/0.0.1-SNAPSHOT' -i -X DELETE
curl 'http://127.0.0.1:8080/apps/task/app-tcc-reset/0.0.1-SNAPSHOT' -i -X DELETE
```

# Scripts to Create Task Definitions

[register shell](./curl-register-apps-then-create-tasks-finally-schedule.sh)

```shell
curl 'http://127.0.0.1:8080/tasks/definitions' -i -X POST \
    -d 'name=task-inbound&definition=app-tcc-lock%20%26%26%20app-requisition%20%26%26%20app-candidate%20%26%26%20app-worker%20%26%26%20app-worker-cancel%20%26%26%20app-candidate-cancel%20%26%26%20app-requisition-close%20%26%26%20app-requi

curl 'http://127.0.0.1:8080/tasks/definitions' -i -X POST \
    -d 'name=task-outbound&definition=app-tcc-lock%20%26%26%20app-outbound%20%26%26%20app-tcc-unlock&description=Handle%20Outbound%20Events'

# on demand task to reset lock in-case something is wrong on inbound-tcc
curl 'http://127.0.0.1:8080/tasks/definitions' -i -X POST \
    -d 'name=reset-tcc-inbound-event&definition=app-tcc-reset&description=Reset%20inbound%20TCC%20lock'

curl 'http://127.0.0.1:8080/tasks/definitions' -i -X POST \
    -d 'name=reset-tcc-outbound-event&definition=app-tcc-reset&description=Reset%20outbound%20TCC%20lock'
```

# Scripts to Delete Task Definitions

[de-register shell](./curl-delete-schedules-tasks-and-apps.sh)

```shell
curl 'http://127.0.0.1:8080/tasks/definitions/task-inbound?cleanup=true' -i -X DELETE
curl 'http://127.0.0.1:8080/tasks/definitions/task-outbound?cleanup=true' -i -X DELETE
curl 'http://127.0.0.1:8080/tasks/definitions/reset-tcc-inbound-event?cleanup=true' -i -X DELETE
curl 'http://127.0.0.1:8080/tasks/definitions/reset-tcc-outbound-event?cleanup=true' -i -X DELETE
```

# Scripts to Create Task Schedules

[register shell](./curl-register-apps-then-create-tasks-finally-schedule.sh)

```shell
# run every 6 hours at 01:00, 07:00, 13:00, 19:00
curl 'http://127.0.0.1:8080/tasks/schedules' -i -X POST \
    -d 'scheduleName=schedule-inbound&taskDefinitionName=task-inbound&properties=scheduler.cron.expression%3D0+1%2F6+*+*+*&properties=app.task-inbound.app-tcc-lock.tcc.task.name%3Dinbound-event&properties=app.task-inbound.app-tcc-unlock.tcc.task.name%3Dinbound-event'

# run every hour at 38 minutes
curl 'http://127.0.0.1:8080/tasks/schedules' -i -X POST \
    -d 'scheduleName=schedule-outbound&taskDefinitionName=task-outbound&properties=scheduler.cron.expression%3D38+*+*+*+*&properties=app.task-outbound.app-tcc-lock.tcc.task.name%3Doutbound-event&properties=app.task-outbound.app-tcc-unlock.tcc.task.name%3Doutbound-event'
```

# Scripts to Delete Task Schedules

[de-register shell](./curl-delete-schedules-tasks-and-apps.sh)

```shell
curl 'http://127.0.0.1:8080/tasks/schedules/schedule-inbound' -i -X DELETE
curl 'http://127.0.0.1:8080/tasks/schedules/schedule-outbound' -i -X DELETE
```

# Runtime Configuration for Composed Tasks

## Configuring the Composed Task Runner

[spring doc](https://docs.spring.io/spring-cloud-dataflow/docs/current/reference/htmlsingle/#spring-cloud-dataflow-composed-tasks)

* app.composed-task-runner.task-single-instance-enabled=true

force one and only one instance can be run at a given time for that composed task, i.e. no parallel, If overlap happens, it will exit right away to say that another instance is running,

```
# same as specified in application.properties
spring.cloud.task.single-instance-enabled=true
```

## Passing Properties to the Child Tasks

`app.<composed task definition name>.<Child task app name>.<property>`

e.g. `app.my-composed-task.mytaskapp.displayMessage=HELLO-WORLD`

`deployer.<composed task definition name>.<Child task app name>.<deployer property>`

e.g. `deployer.my-composed-task.mytaskapp.memory=2048m`

