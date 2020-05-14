---
title: 利用ss-redir做国内中转节点
tags: 
    - Shadowsocks
    - 中转
    - 教程
categories:
    - 折腾
date: 2018-09-11 01:15:00
---

**大部分搬运内容，实测可用**

# [](#基本原理 "基本原理")基本原理

首先ss-redir会在本地创建一个TCP透明代理，因此我们只需要将我们需要代理的流量重定向到 ss-redir的监听端口上即可。 对于流量的重定向，我们可以使用iptables中nat表的REDIRECT来实现。 而对于流量的筛选，我们同样可以利用iptables根据一个国内IP地址表来筛选出不需要代理的IP。

# [](#实现方法 "实现方法")实现方法

## [](#安装并启动ss-redir "安装并启动ss-redir")安装并启动ss-redir

安装和启动的方法本文不再介绍。 此处需要注意ss-redir本地监听端口需要跟后面iptables中配置的重定向端口对应， 本文假设ss-redir监听端口为`1081`。

## [](#配置iptables实现流量的转发 "配置iptables实现流量的转发")配置iptables实现流量的转发

首先需要在iptables的nat表中创建一个专门用于处理代理的chain：

```bash
$ iptables -t nat -N SHADOWSOCKS
```

在刚刚创建的chain中，首先需要增加一条规则来跳过对SS服务器流量的处理：

```bash
$ iptables -t nat -A SHADOWSOCKS -d YOUR_SS_IP -m comment --comment "Bypass SS server traffic"-j RETURN

```
接下来利用ipset工具创建一个局域网子网列表，并添加一条规则用来跳过局域网流量：

```bash
$ ipset create sslans hash:net

$ ipset add sslans 0.0.0.0/8

$ ipset add sslans 10.0.0.0/8

$ ipset add sslans 127.0.0.0/8

$ ipset add sslans 172.16.0.0/12

$ ipset add sslans 192.168.0.0/16

$ iptables -t nat -A SHADOWSOCKS -m set --match-set sslans dst -m comment --comment "Bypass LANs" -j RETURN

```

最后添加一条规则将还未匹配到的流量转发至ss-redir的端口上， 同时在OUTPUT chain中增加SHADOWSOCKS chain的规则：

```bash
$ iptables -t nat -A SHADOWSOCKS -p tcp -j REDIRECT --to-ports 1081

$ iptables -t nat -A OUTPUT -o eth0 -p tcp -j SHADOWSOCKS

```

此时本机所有的流量都应该会被代理进行转发，可以使用以下命令来测试出口IP：

```bash
$ curl -s "http://www.ip168.com/json.do?view=myipaddress" | grep -Po "([0-9]{1,3}\.?){4}"
```

## 配置实现流量的选择性代理

首先需要拿到所有的国内IP地址，这里使用一个`bestroutetb`工具实现， 可以使用`npm install -g bestroutetb`安装该工具。 该工具会从apnic下载IP数据并生成一个路由表，我们将其中的国内IP部分提取出来并添加到ipset中。

```bash
$ bestroutetb -p custom --rule-format=$'%prefix/%length\n' \

         --group-header=---%name-start\n' --group-footer=---%name-end\n' \

         --group-gateway -f -o /tmp/chnroutes.txt | sed -e '/---vpn-start/,/---vpn-end/d' -e '/^---/d' /tmp/chnroutes.txt > /tmp/tb.txt
         
$ ipset create chnroute hash:net

$ while read rule; do (ipset add chnroute $rule);done < /tmp/tb.txt
```

最后在SHADOWSOCKS chain的REDIRECT规则之前插入一条针对国内IP的跳过规则：

```

$ iptables -t nat -I SHADOWSOCKS 3 -m set --match-set chnroute dst -m comment --comment "Bypass China IPs" -j RETURN

```

可以用国内和国外两个不同的站点来验证选择性代理是否正确：

```bash
$ curl -s "https://api.ipify.org?format=json" | grep -Po "([0-9]{1,3}\.?){4}"

$ curl -s "http://www.ip168.com/json.do?view=myipaddress" | grep -Po "([0-9]{1,3}\.?){4}"
```

## 清理 iptables

```bash
iptables -F
iptables -X
iptables -t nat -F
iptables -t nat -X
iptables -t mangle -F
iptables -t mangle -X
iptables -P INPUT ACCEPT
iptables -P FORWARD ACCEPT
iptables -P OUTPUT ACCEPT
```


