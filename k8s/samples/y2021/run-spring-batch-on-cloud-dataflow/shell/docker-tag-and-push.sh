#!/usr/bin/env bash

APP_VERSION=0.0.1-SNAPSHOT
REGISTER_HOST=springdataflow.azurecr.io

function docker_tag() {
	docker tag springcloudtask/tcc-reset-lock:$APP_VERSION $REGISTER_HOST/springcloudtask/tcc-reset-lock:$APP_VERSION
	docker tag springcloudtask/tcc-release-lock:$APP_VERSION $REGISTER_HOST/springcloudtask/tcc-release-lock:$APP_VERSION
	docker tag springcloudtask/tcc-obtain-lock:$APP_VERSION $REGISTER_HOST/springcloudtask/tcc-obtain-lock:$APP_VERSION
	docker tag springcloudtask/event-transmitter:$APP_VERSION $REGISTER_HOST/springcloudtask/event-transmitter:$APP_VERSION
	docker tag springcloudtask/worker-close-event-detector:$APP_VERSION $REGISTER_HOST/springcloudtask/worker-close-event-detector:$APP_VERSION
	docker tag springcloudtask/worker-event-detector:$APP_VERSION $REGISTER_HOST/springcloudtask/worker-event-detector:$APP_VERSION
	docker tag springcloudtask/candidate-close-event-detector:$APP_VERSION $REGISTER_HOST/springcloudtask/candidate-close-event-detector:$APP_VERSION
	docker tag springcloudtask/candidate-event-detector:$APP_VERSION $REGISTER_HOST/springcloudtask/candidate-event-detector:$APP_VERSION
	docker tag springcloudtask/requisition-cancel-event-detector:$APP_VERSION $REGISTER_HOST/springcloudtask/requisition-cancel-event-detector:$APP_VERSION
	docker tag springcloudtask/requisition-close-event-detector:$APP_VERSION $REGISTER_HOST/springcloudtask/requisition-close-event-detector:$APP_VERSION
	docker tag springcloudtask/requisition-event-detector:$APP_VERSION $REGISTER_HOST/springcloudtask/requisition-event-detector:$APP_VERSION
}

function docker_push() {
	docker push $REGISTER_HOST/springcloudtask/tcc-reset-lock:$APP_VERSION
	docker push $REGISTER_HOST/springcloudtask/tcc-release-lock:$APP_VERSION
	docker push $REGISTER_HOST/springcloudtask/tcc-obtain-lock:$APP_VERSION
	docker push $REGISTER_HOST/springcloudtask/event-transmitter:$APP_VERSION
	docker push $REGISTER_HOST/springcloudtask/worker-close-event-detector:$APP_VERSION
	docker push $REGISTER_HOST/springcloudtask/worker-event-detector:$APP_VERSION
	docker push $REGISTER_HOST/springcloudtask/candidate-close-event-detector:$APP_VERSION
	docker push $REGISTER_HOST/springcloudtask/candidate-event-detector:$APP_VERSION
	docker push $REGISTER_HOST/springcloudtask/requisition-cancel-event-detector:$APP_VERSION
	docker push $REGISTER_HOST/springcloudtask/requisition-close-event-detector:$APP_VERSION
	docker push $REGISTER_HOST/springcloudtask/requisition-event-detector:$APP_VERSION
}

if [ $# -eq 1 ]; then
    if [[ "$1" == "tag" ]]; then
		docker_tag
	elif [[ "$1" == "push" ]]; then
		docker_push
	elif [[ "$1" == "all" ]]; then
		docker_tag
		docker_push
	else
		echo "Usage: `basename $0` tag | push | all"
	fi
else
    echo "Usage: `basename $0` tag | push | all"
fi
