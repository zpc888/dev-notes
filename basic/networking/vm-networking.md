# VM networking
## 3 main network connection modes
- bridged Connection
- NAT
- host-only

VM can communicate with each others on the host as well as other physical machines on the physical network. To do so, it needs 2 things:
- Virtual Switch or bridge

A virtual switch is a logically defined layer-2 device that passes frames between nodes. 
Virtual NICs of VMs are connected to the virtual ports on the virtual switch, which is then connected through the host physical NIC to the physical network.
Virtual Switches are just like physical switches. Each virtual switch creates a separate broadcast domain. To connect 2 broadcast domains, we need a layer-3 router.

- Virtual NIC

## Bridge connection
In this mode, a VM connects to the physical network directly through the host physical NIC, and the hots's NIC is a bridge to all these VMs. 
Just like their host and other physcial computers, VMs obtain IP addressing information from a DHCP server on the physical network, a VM appears to other nodes as just another computer on the network. It is a normal use case when VM acts as a mail server, a file server, or a web server, etc. 

## NAT = Network Address Translation
Virtual NICs + Virtual Switch + Virtual DHCP Server

In this mode, VMs rely on the host to act as a NAT device. A virtual DHCP server is responsible for assigning IP address information to these VMs, and they form a private network. Other physical machines are getting their ip from physical DHCP server and they form an "external network".

The host is sitting between these two networks, and translates the IP address from VM to the IP address of the host. It also listens for returning traffic so that it can deliver it to the VM. The external networks see the traffic from VMs as if it comes from the host itself.

The NAT mode is used when VMs are used for client workstation to check emails or surf the Internet.

## Host-only mode
In this mode, VMs on the host can talk with each other and with their host, but they cannot communicate with any other computers beyond.

This connection mode is useful when set up an isolated private virtual network where we can have cyber attack experiments.

