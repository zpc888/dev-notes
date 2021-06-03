# Basic

## OSI Model

From bottom to top, it can be abbreviated as: **P**lease **D**o **N**ot **T**hrow **S**ausage **P**izza **A**way

- A = Application Layer
- P = Presentation Layer
- S = Session Layer  **Above can be grouped as application, depending on protocol**
- T = Transportation Layer
- N = Network Layer
- D = Data link Layer
- P = Physical Layer

![basic](./images/network-basic.png)

* Hub and switch are used for LAN computers, their differences are:
  * When hub sends packets, every other computers on the same hub will receive physically (not UDP protocol)
  * On the other hand, switch will send packet peer to peer even on the same switch
* When crossing different LANs, it needs router / gateway

## IPv4

![IPv4 classes](./images/network-ipv4-5-classes.png)

![IPv4 subnetting](./images/network-ipv4-subnetting.png)

# Common Protocol

## ICMP

### Ping Utils

![ping](./images/ping-icmp.png)



### Traceroute or tracrt utils

![trace route](./images/ping-tracert.png)

## DNS

### DNS Query

![DNS query](./images/dns-query.png)

## DHCP

![dhcp](./images/dhcp.png)

## HTTP/HTTPS

### TCP connection 3 hand-shaking and 4 hand waving (Up to Layer 4 for establishing connection)

![tcp connection](./images/tcp-connection-3-handshakes-and-4-waves.png)

### TCP Header 

![tcp header](./images/tcp-header.png)

### HTTP CORS

![cors pre-flight](./images/CORS-pre-flight.png)

### HTTPs connection

![https connection](./images/https-connection.png)

### HTTPs certificate chain

![HTTPs certificate](./images/https-certificate.png)

# Java Networking

## Java Block IO

![java block id](./images/java-block-io.png)

## Java New IO

![new IO](./images/java-new-io.png)

# Docker Networking

![docker networking](./images/docker-networking.png)



# Kubernetes Networking

## how a pod get IP address

![get ip address](./images/how-k8s-pod-gets-ip-address.png)

