echo ""
echo "======== Step 1. Registering Spring Boot Batch Applications ============"
echo ""

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

echo ""
echo "======== Step 2. Define DataFlow Tasks ============"
echo ""

curl 'http://127.0.0.1:8080/tasks/definitions' -i -X POST \
    -d 'name=task-inbound&definition=app-tcc-lock%20%26%26%20app-requisition%20%26%26%20app-candidate%20%26%26%20app-worker%20%26%26%20app-worker-cancel%20%26%26%20app-candidate-cancel%20%26%26%20app-requisition-close%20%26%26%20app-requisition-cancel%20%26%26%20app-tcc-unlock&description=Handle%20Inbound%20Events'
    
curl 'http://127.0.0.1:8080/tasks/definitions' -i -X POST \
    -d 'name=task-outbound&definition=app-tcc-lock%20%26%26%20app-outbound%20%26%26%20app-tcc-unlock&description=Handle%20Outbound%20Events'
    
# on demand task to reset lock in-case something is wrong on inbound-tcc
curl 'http://127.0.0.1:8080/tasks/definitions' -i -X POST \
    -d 'name=reset-tcc-inbound-event&definition=app-tcc-reset&description=Reset%20inbound%20TCC%20lock'

curl 'http://127.0.0.1:8080/tasks/definitions' -i -X POST \
    -d 'name=reset-tcc-outbound-event&definition=app-tcc-reset&description=Reset%20outbound%20TCC%20lock'

echo ""
echo "======== Step 3. Schedule DataFlow Tasks ============"
echo ""

# run every 6 hours at 01:00, 07:00, 13:00, 19:00
curl 'http://127.0.0.1:8080/tasks/schedules' -i -X POST \
    -d 'scheduleName=schedule-inbound&taskDefinitionName=task-inbound&properties=scheduler.cron.expression%3D0+1%2F6+*+*+*&properties=app.task-inbound.app-tcc-lock.tcc.task.name%3Dinbound-event&properties=app.task-inbound.app-tcc-unlock.tcc.task.name%3Dinbound-event'

# run every hour at 38 minutes
curl 'http://127.0.0.1:8080/tasks/schedules' -i -X POST \
    -d 'scheduleName=schedule-outbound&taskDefinitionName=task-outbound&properties=scheduler.cron.expression%3D38+*+*+*+*&properties=app.task-outbound.app-tcc-lock.tcc.task.name%3Doutbound-event&properties=app.task-outbound.app-tcc-unlock.tcc.task.name%3Doutbound-event'

