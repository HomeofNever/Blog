---
title: RIPE Probe Hosting
tags: 
    - 玩具
categories:
    - 折腾
date: 2019-03-27 11:47:00
---

先上图（低清警告）

![](/images/media/ripe_probe.jpg)

## 这是什么

> [官方项目介绍](https://atlas.ripe.net)

简单提及一些概念（为了方便理解就稍微白话一点）：

首先，我们目前使用的互联网可以理解为是由几十个超大的“局域网”组成的：就和家庭路由器一样，只不过人多了点

各地区运营商（ISP）不一样，设备均由不同公司管理，就像是圈地一样，网络变得很碎片化，而且并不是那么“互联”。为了让大家能够不那么分散，[BGP](https://zh.wikipedia.org/wiki/%E8%BE%B9%E7%95%8C%E7%BD%91%E5%85%B3%E5%8D%8F%E8%AE%AE) 便用来关联各个大型的局域网，变成更大一点的网络。每个网络为了标识同时还使用 [ASN](https://zh.wikipedia.org/wiki/%E8%87%AA%E6%B2%BB%E7%B3%BB%E7%BB%9F) 来标识

> 你可以通过访问[这个网站](https://ipip.net)查看自己目前网络所属的ASN和对应的组织

### 为什么要互联？

，ISP 做的是事情就像是把一个小村庄互相通了路，但是村庄之间的路打通起来就要靠ISP之间的协商，而且
<!--stackedit_data:
eyJoaXN0b3J5IjpbMTM4MjUzODk0Nl19
-->