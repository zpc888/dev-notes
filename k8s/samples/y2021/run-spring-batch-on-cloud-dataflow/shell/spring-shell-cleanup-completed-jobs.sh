echo "step.1: list all execution tasks"
# java -jar spring-cloud-dataflow-shell-2.7.1.jar --spring.shell.commandFile=list-task-cmd.txt > t1.log

echo "step.2: parse pod ids"
OB_TASKS=`grep "outbound" t1.log | sed 's/[^0-9a-zA-Z-]/ /g' | awk '$7 != "" {print $2}'` 
IB_TASKS=`grep "inbound"  t1.log | sed 's/[^0-9a-zA-Z-]/ /g' | awk '$7 != "" {print $2}'` 

export CLEAN_TASK_CMD_FILE=clean-task-cmd.txt
echo "step.3: build clean task command file"
echo "dataflow config server http://localhost:8080" > $CLEAN_TASK_CMD_FILE
if [ "$OB_TASKS" != "" ]; then 
	for i in `echo $OB_TASKS`; do 
		echo "task execution cleanup --id $i" >> $CLEAN_TASK_CMD_FILE
	done
fi
if [ "$IB_TASKS" != "" ]; then 
	for i in `echo $IB_TASKS`; do 
		echo "task execution cleanup --id $i" >> $CLEAN_TASK_CMD_FILE
	done
fi
echo "exit" >> $CLEAN_TASK_CMD_FILE

echo "step.4: run clean up"
# java -jar spring-cloud-dataflow-shell-2.7.1.jar --spring.shell.commandFile=$CLEAN_TASK_CMD_FILE


