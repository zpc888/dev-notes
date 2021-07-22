# Master Slave Configure
- configure master /etc/my.cnf
`````````````properties
server-id=1
log-bin=mysql-bin
binlog-ignore-db=mysql   # ignore to replication
binlog-ignore-db=information-schema   
binlog-do-db=accounting   # explicitly choose accounting db to replicate
binlog_format=statement   # so that insert into tbl values (... @@hostname) replicating to slave to get slave host name
```
- configure slave /etc/my.cnf

```properties
server-id=2
relay-log=mysql-relay
```

- grant permission from master

```mysql
# if having << ERROR 1819 (HY000): Your password does not satisfy the current policy requirements >>, 
# lower the password restriction by running the below 2 SQL statements
set global validate_password_policy=0;
set global validate_password_length=1;

grant replication slave on *.* to 'root'@'%' identified by 'T0p$ecret';
flush privilidges;

show master status;

# In case any issue, try to restart
stop master;
reset master;
```
- configure on slave

```mysql
change master to MASTER_HOST='10.0.0.101', MASTER_USER='root', MASTER_PASSWORD='T0p$ecret', MASTER_LOG_FILE='mysql-bin.000001', MASTER_LOG_POS=437
# master log file and pos matches the value from [show master status] on master
start slave;
show slave status;

# In case any issue, try to restart
stop slave;
reset slave;
```

