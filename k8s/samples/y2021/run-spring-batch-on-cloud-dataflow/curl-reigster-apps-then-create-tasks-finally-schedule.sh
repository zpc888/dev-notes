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

curl 'http://127.0.0.1:8080/apps/task/app-requisition-cancel/0.0.1-SNAPSHOT' -i -X POST \
    -d 'uri=docker%3Aspringcloudtask%2Frequisition-close-event-detector%3A0.0.1-SNAPSHOT'

curl 'http://127.0.0.1:8080/apps/task/app-outbound/0.0.1-SNAPSHOT' -i -X POST \
    -d 'uri=docker%3Aspringcloudtask%2Fevent-transmitter%3A0.0.1-SNAPSHOT'

echo ""
echo "======== Step 2. Define DataFlow Tasks ============"
echo ""

curl 'http://127.0.0.1:8080/tasks/definitions' -i -X POST \
    -d 'name=task-inbound&definition=app-requisition%20%26%26%20app-candidate%20%26%26%20app-worker%20%26%26%20app-worker-cancel%20%26%26%20app-candidate-cancel%20%26%26%20app-requisition-cancel&description=Handle%20Inbound%20Events'
    
curl 'http://127.0.0.1:8080/tasks/definitions' -i -X POST \
    -d 'name=task-outbound&definition=app-outbound&description=Handle%20Outbound%20Events'

echo ""
echo "======== Step 3. Schedule DataFlow Tasks ============"
echo ""

# run every 6 hours at 01:00, 07:00, 13:00, 19:00
curl 'http://127.0.0.1:8080/tasks/schedules' -i -X POST \
    -d 'scheduleName=schedule-inbound&taskDefinitionName=task-inbound&properties=scheduler.cron.expression%3D0+1%2F6+*+*+*&arguments=--arg1%3Dxyz'

# run every hour at 38 minutes
curl 'http://127.0.0.1:8080/tasks/schedules' -i -X POST \
    -d 'scheduleName=schedule-outbound&taskDefinitionName=task-outbound&properties=scheduler.cron.expression%3D38+*+*+*+*&arguments=--arg1%3Dxyz'

