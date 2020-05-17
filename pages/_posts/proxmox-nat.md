---
title: Proxmox 开 NAT 小鸡
tags: 
    - 折腾
categories:
    - 技术
layout: post
date: 2018-06-15 10:19:00
---

> 参考：https://cyberpersons.com/2016/07/27/setup-nat-proxmox/


简而言之就是：

- 开一个新的bridge（网页上开或者`nano /etc/network/interfaces`，但是这种方式似乎proxmox不能绑定`Bridge`）
- 然后iptables转发该网段
- 还要记得开一下`net.ipv4.ip_forward = 1`

**/etc/network/interfaces**
**记得改`-o`后的`Bridge`名字

```
auto vmbr2
#private sub network
iface vmbr2 inet static
        address  192.168.1.1
        netmask  255.255.255.0
        bridge_ports none
        bridge_stp off
        bridge_fd 0

        post-up echo 1 &gt; /proc/sys/net/ipv4/ip_forward
        post-up   iptables -t nat -A POSTROUTING -s '192.168.1.0/24' -o vmbr1 -j MASQUERADE
        post-down iptables -t nat -D POSTROUTING -s '192.168.1.0/24' -o vmbr1 -j MASQUERADE
```



但是不建议按照上述内容中第一行`post-up`
步骤如下：

- `nano /etc/sysctl.conf`
-  改 `net.ipv4.ip_forward = 1`
-  `sudo sysctl -p`

效果是一样的，但是会持久化并方便查阅

> 参考：https://askubuntu.com/questions/783017/bash-proc-sys-net-ipv4-ip-forward-permission-denied



## 暴露端口

例子：

`iptables -t nat -A PREROUTING -i vmbr1 -p tcp --dport 3033 -j DNAT --to 192.168.1.2:22
`

