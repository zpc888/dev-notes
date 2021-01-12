curl 'http://127.0.0.1:8080/tasks/schedules/schedule-inbound' -i -X DELETE
curl 'http://127.0.0.1:8080/tasks/schedules/schedule-outbound' -i -X DELETE

curl 'http://127.0.0.1:8080/tasks/definitions/task-inbound?cleanup=true' -i -X DELETE
curl 'http://127.0.0.1:8080/tasks/definitions/task-outbound?cleanup=true' -i -X DELETE

curl 'http://127.0.0.1:8080/apps/task/app-requisition/0.0.1-SNAPSHOT' -i -X DELETE
curl 'http://127.0.0.1:8080/apps/task/app-candidate/0.0.1-SNAPSHOT' -i -X DELETE
curl 'http://127.0.0.1:8080/apps/task/app-worker/0.0.1-SNAPSHOT' -i -X DELETE
curl 'http://127.0.0.1:8080/apps/task/app-worker-cancel/0.0.1-SNAPSHOT' -i -X DELETE
curl 'http://127.0.0.1:8080/apps/task/app-candidate-cancel/0.0.1-SNAPSHOT' -i -X DELETE
curl 'http://127.0.0.1:8080/apps/task/app-requisition-cancel/0.0.1-SNAPSHOT' -i -X DELETE
curl 'http://127.0.0.1:8080/apps/task/app-outbound/0.0.1-SNAPSHOT' -i -X DELETE

