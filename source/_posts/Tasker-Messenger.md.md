---
title: 华为短信机.jpg
tags: 
    - 折腾
categories:
    - 坑
date: 2019-2-08 12:28:00
---

> Related: https://github.com/NeverBehave/Tasker-Messenger

## 剧情前提

到国外以后，国内带来的两张手机卡突然有一张没地方放了。刚好老母过来的时候让她赶紧把手里的华为P9给换了水果，顺便还注册了美区ID。既然有台这个机器……这就折腾一下吧

## 1st

首先想到的注意是做闹钟（然而华为EMUI这个*！@#¥一定要用他的语音助手，谷歌的在黑屏以后无法唤醒，还不能解锁屏幕……于是后面用了Google mini，Spotify的羊毛），顺便可以做成一个监控，然后其实才是短信。但是无论怎么样，要找个地方可以架起来放着：

https://www.amazon.com/gp/product/B06Y12XQ1X/

很好，顺便买了一个带USB口的插板，电源准备就绪

### 解锁

首先，这台机器（`EVA-TL00`）是移动机，我联通的卡进去直接GG。然而我发现实际上他是连得上TMO的3G网（联通卡），看来就是硬编码了一下系统（实际上也是）

这个机器在老母用的时候就一直没有升级，拿过来以后本来打算解锁BL，结果刚好过了#¥%…的时间。然后还手贱升级了，含泪找了老半天的包降级回去，拿到了ROOT，照着[吾爱破解的教程](https://www.52pojie.cn/thread-816065-1-1.html)，结果已经失效了，拿到了是

>UUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUDDDDDDDDDDDDDDDD  
WVDEVID

也就是已经加密后的应该，（我…#¥）

然后直接找淘宝，他们用`USB Redirector`这种东西直接远程到手机（我本来还为此准备了虚拟机，不喜欢别人直接远程），结果……我在国外网太慢，第一家直接给我退款了（😊）

第二家弄了一会弄好了，但是第一家走之前留下了一些没有删掉的文件，其中一个是一个很罕见的驱动：

按照这个名字找到一堆“这类商家“分享的网盘链接：





<!--stackedit_data:
eyJoaXN0b3J5IjpbMTAyODM0ODA5OV19
-->