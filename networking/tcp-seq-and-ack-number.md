# TCP Connection 
## Open Session (3-way handshakes)
## Data Transmission
## Close Session (4-way termination)

## TCP Sequence number and ack 
When sending out ack message, its `ack number` = `incoming sequence number` + `number of data bytes`
Basically this number tells the receiver to send from this position for next conversation. 

Via this mechanism, TCP can self-throttle number of data bytes to send, i.e. window size via negotiation. 
For example, client first sends (seq=0 data=1000), if server sends ack message with ack number = 0+1000,
it means all data (1000 bytes) are received, so client can start to send 1001 (or 1000 zero-based). 
if server sends ack number is 0+300, it means client window size is too big initially, server only 
receives 1/3 of data, client will try to send seq=300 data=300, i.e. client resends from 301 (or 300 zero-based)
and adjusts its window size to 300. 

There may be other cases for window size adjustment, such as never receiving ACK message, etc.

![TCP Seq and Ack Relationship](http://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/zpc888/dev-notes/master/networking/plantuml/tcp-seq-ack.puml)

