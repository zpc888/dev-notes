# Hub vs Switch vs Router
## Hub
To connect all devices together via hub ports, it is not intelligent, when a data packet arrives at a port, it will copies to all othe ports.

It creates security issues and unnecessoary traffic.

So hub table will have 2 columns only: 
|----|----------------|
|PORT| Device         |
|----|----------------|
| 1  | Detected       |
| 2  | Detected       |
| 3  | Detected       |
| 4  |        |

## Switch
Switch is similar to hub to provide ethernet ports to let device to connect via ports. But it is intelligent, no broadcast any received/sent data. So its table must have MAC address to uniquely identify where packet is started and to. 

So switch table will have 3 columns:
|----|----------------|----------------------|
|PORT| Device         | Mac Address | 
|----|----------------|----------------------|
| 1  | Detected       | 00-04-...  |
| 2  | Detected       | 09-c0-...  |
| 3  | Detected       | 12-A2-.... |
| 4  |        | |

__Hubs__ and __Switches__ are used to exchange data within a local area network. Not used to exchange data outside their own network.

To exchange data outside their own network, a device needs to be able to read I.P. address, that is where the router comes in.

## Router
Routes data from one network to another based on their __IP address__. Like a gateway.

In a nutshell, Hubs & Switches are used to create networks. Routers are used to connect networks.

# Modem vs Router
## Modem 
A modem is what brings the internet into your home or business because internet signal (ISP provider: analog singal can be transferred over cable or fiber) is different from your network signal (digital). 

2 different types: Cable Modem or DSCL Modem.

Modem modulates outgoing digital signals into an analog signal. And from incoming signals, it demodulates analog into digital signals.

## Router
A router sits behind modem, it is used to have built in switch ports for connecting multiple computers. If you just have a device, you can directly connect to modem without router.

It is also possible to have a modem / router device, i.e. a model with a built-in wilreless router, in one device.

