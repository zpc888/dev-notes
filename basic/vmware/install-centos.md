# Installation of CentOS
- choose custom installation 
- choose right timezone via date-time
- with minimum installation
- select development tools, debug tools, security tools and administration tools
- disable kdump
- with NAT network interface
- enable ens33 network interface (manual ip addr)
- post-install: after minimum installation of OS, lots of Utilities are missing.

```
yum update && yum makecache
yum install -y vim tree lrzsz wget curl
```
- disable firewalls
    - centos 6 uses iptable
    - centos 7 use firewalld
```
systemctl stop firewalld
systemctl disable firewalld
systemctl status firewalld
```
- disable selinux (security policy)
```
sestatus
vi /etc/selinux/config
# change: SELINUX=enforcing to SELINUX=disabled
reboot
```

# Make auto start service
```
cd /usr/lib/systemd/system
vi myapp01.service
systemctl daemon-reload
systemctl start myapp01.service
systemctl status myapp01
systemctl enable myapp01

```

# Make a dhcp template VM 
- configure dhcp
```shell
hostnamectl set-hostname node1
cd /etc/sysconfig/network-scripts
vim ifcfg-ens33
# delete: UUID line
# check:  BOOTPROTO="dhcp"
systemctl restart network
```
- save and shutdown to take a snapshot
- use link clone instead of full clone
- saving or restoring snapshot should happen on VM shutdown mode

# Make a static-ip template VM
- cat /etc/sysconfig/network-scripts/ifcfg-ens33 
```
TYPE="Ethernet"
PROXY_METHOD="none"
BROWSER_ONLY="no"
BOOTPROTO="static"
DEFROUTE="yes"
IPV4_FAILURE_FATAL="no"
IPV6INIT="yes"
IPV6_AUTOCONF="yes"
IPV6_DEFROUTE="yes"
IPV6_FAILURE_FATAL="no"
IPV6_ADDR_GEN_MODE="stable-privacy"
NAME="ens33"
DEVICE="ens33"
ONBOOT="yes"
GATEWAY=10.0.0.2
IPADDR=10.0.0.132
NETMASK=255.255.255.0
DNS1=10.0.0.2
DNS2=1.2.4.8
```