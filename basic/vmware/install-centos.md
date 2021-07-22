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
- copy client key
```
ssh-copy-id -i ~/.ssh/id_rsa.pub <username>@<host>
```
Assuming host machine already created id_rsa key

# Make auto start service
```
cd /usr/lib/systemd/system
vi myapp01.service
systemctl daemon-reload
systemctl start myapp01.service
systemctl status myapp01
systemctl enable myapp01

```
# change hostname 
```
hostnamectl set-hostname node1
```
## This doc use pattern for hostname **{purpose}{host-ip}**
e.g. In MyCat-lab, there are 2 MyCat VMs, the one **mycat101** means this is a my-cat host with 10.0.0.101. Or **template100** means this is a template VM whose ip is 10.0.0.100.

# Make a dhcp template VM 
- configure dhcp
```shell
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
# Setup Ansible on host, not VMs
```
# ubuntu
sudo apt-add-repository ppa:ansible/ansible
sudo apt-get update
sudo apt-get install ansible
copy -R /etc/ansible ~/works/$path_to_specific_platform/.
cd ~/works/$path_to/ansible
vi ansible.cfg
# change inventory to current hosts, i.e. relative path
# inventory = hosts
vi hosts
# define all VMs touched by this project
# no group host on the top

ansible -m ping all
ansible -m shell -a 'hostname' all
ansible -m shell -a 'df -h' all
ansible -m shell -a 'whoami' all
# BECOME root, i.e. sudo execute
ansible -b -K -m shell -a 'whoami' all
ansible -b -K -m user -a 'name=user1' all   # add user1 to all VMs defined in hosts-file
ansible -m shell -a 'getent passwd | grep user1' all      # chk if user1 is created or not
ansible -b -K -m user -a 'name=user1 state=absent' all   # remove user1 from all VMs 
```
