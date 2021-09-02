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


`````````````



# What happens if ID reaches the limitation

## Auto Incremental ID

* when an auto increment column reaches its max, next value will be the max  e.g.

```sql
create table t1(id int unsigned auto_increment primary key) auto_increment=4294967295;
insert into t1 values (null); 		-- ok
-- 2^32 - 1（4294967295）
select * from t1;                   -- show 4294967295
insert into t1 values (null);       -- ERROR 1062 (23000): Duplicate entry '4294967295' for key 'PRIMARY'

create table t2(id int unsigned auto_increment primary key);
insert into t1 values (null); 		-- ok
insert into t1 values (null); 		-- ok
insert into t1 values (4294967294); -- ok
select * from t2;
-- +------------+
-- | id         |
-- +------------+
-- |          1 |
-- |          2 |
-- | 4294967294 |
-- +------------+
insert into t1 values (null); 		-- ok
insert into t1 values (null); 		-- ERROR 1062 (23000): Duplicate entry '4294967295' for key 'PRIMARY'
```

## row_id from InnoDB system

* when creating an InnoDB table without primary key, InnoDB will auto create an invisible row_id, which has 6 bytes. InnoDB maintains a global dict_sys -> row_id
* when inserting a row into a table without primary key, it uses the current dict_sys -> row_id, then it increases dict_sys -> row_id + 1
* InnoDB gives row_id 6 bytes although the code uses 8 bytes bigint unsigned type, so :
  * row_id ranges is from 0 to 2^(6*8) - 1
  * when dict_sys.row_id = 2^48 -1, inserting a row without primary key, the next value will be 0
  * when row_id = N, it will write this row into table; if row_id = N exists in table already, it will override the old row

```sql
create table t(a int) engine=innodb;
gdb -p $pidOfMySqld -ex 'p dict_sys.row_id=1' --batch
insert into t values (1);
gdb -p $pidOfMySqld -ex 'p dict_sys.row_id=281474976710656' --batch
insert into t values (2);
insert into t values (3;
select * from t;
-- 
-- 2
-- 3   overrides 1
```



## xid

- redo log and  binlog has the common Xid, which is used for transaction
- MySQL internally maintains a global_query _id
- When execution statements, it will be assigned with query_id, and query_id = query_id + 1;
- If a statement is the first one of an transaction, MySQL will assign `query_id` to its `xid`
- `global_query_id` is a variable only, after restarting, it will start with 0, which means different transactions may have the same `xid`
- but every restart will cause MySQL to have different `binlog` file, so inside a `binlog` file, `xid` is unique always
- although `binlog` won't have 2 same `xid` after restarting MySQL, but when global_query_id reaches the upper limitation, it will continue from 0, so in theory, it is possible to have same `xid` in a `binlog` file
- because `global_query_id` has 8 bytes, its limitation is 2^(8*8) - 1, to have duplication, it needs the below assumptions:
  - Xid is A now when executing a transaction
  - then executes 2^64 query, so `global_query_id` is overflow to A again (which is impossible practically)
  - starting another transaction, its `xid` is A again



## Innodb trx_id

- xid is maintained by server layer

- InnoDB internally use xid, it is for assocaition between InnoDB transaction and server

- InnoDB has its own `trx_id`, its is for 

- ... ... <<don't get it yet>>

  

## thread_id

- system has a global variable `thread_id_counter`

- every time opening a connection, `thread_id_counter` will be assigned to the new created connection thread variable `new_id`

- `thread_id_counter` is 4 bytes, when reaching 2^32 - 1, it will reset to 0, then continue to increase by 1

- but `show processlist` won't see 2 same thread_id, because at assignment phase, it uses a unique array to guarantee the `new_id` is unique, if not, it will ask to increase by 1 again, until it reaches uniqueness

  

