# TCP Connection 
## Overview
### Open Session (3-way handshakes)
1. Client --> SYN --> Server
2. Client <-- SYN/ACK <-- Server
3. Client --> ACK --> Server
### Data Transmission
- Http or FTP to bi-directionally transfer data
### Close Session (4-way termination)
1. Client <-- FIN/ACK <-- Server
2. Client --> ACK --> Server
3. Client --> FIN/ACK --> Server
4. Client <-- ACK <-- Server

## Detail example focus on SEQ and ACK
### Why 3-way for handshaking, but 4-way for termination?
It will be nice if SYN (client -> server), ACK (client <- server), SYN (client <- server), ACK (client -> server) 
for handshaking, or FIN (client <- server), ACK (client -> server), FIN (client -> server), ACK (client <- server) 
for termination. In that case open and close session are symmetric matched step-wise. 

The reason for this is that network will try as fast as possible, for handshkaing, it combines ACK and SYN together to 
save one trip. But at closing phase, it cannot combine ACK and FIN (step 2 and 3) together because Client may not finish
processing all received network packets yet. That is why it sends ACK right away, it may send FIN a while later after 
all received packets are processed. For establishing connection, there are no received packets which might pends for 
process since it is brand-new.

### TCP Sequence number and ack relationship
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

