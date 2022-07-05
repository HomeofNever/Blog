---
title: Headless Mac Mini 折腾记
tags: 
    - macos
    - mac mini
    - vnc
    - headless
categories:
    - 技术
layout: post
date: 2022-07-04
description: Nix天生和JS一棒子包管理八字不合，在经过一系列斗争之后，我屈服了。搞个macos好了，毕竟现在大家适配不都是mac，实在是不想和工具打架了。 
---

## 事故前提

Nix天生和JS一棒子包管理八字不合，在经过一系列斗争之后，我屈服了。搞个macos好了，毕竟现在大家适配不都是mac，实在是不想和工具打架了。  

看了一眼，M2 Macbook马上就要出了，Air改了设计，我最喜欢的锥形设计没了，而且只有两个同侧的type c？还1100刀8GB？再见再见。那就看看M1 Macbook吧，这不是马上要发布新款了，估计要降价把，899刀，8G，怎么想要个16G这么难，而且还是感觉有点贵。反正都是用，看看有没有人出二手吧。

看了一圈便宜了差不多100左右把，感觉还是一般般，主要是自己刚买了个笔记本，前前后后也花了1500，为啥我还要买个笔记本？出门带着也很重，那不如考虑一下mac mini好了，直接从笔记本远程上去。8G要649，不错，看一眼16G，哇塞要加200，隔着抢钱呢！不就是逼人买底配呗，那既然都是底配了，直接看二手，花的越少越好。500块钱，不错，还不用给税。那就这样愉快的定啦！

## 尝试动手

收到机器，配置好，看了一眼状态，启动88次，SSD写入300G读取500G，状态很好！主要是现在Mac SSD都是銲死的了，SSD没了机器也废了……  

首先进去先到`设置->共享`打开`屏幕共享(vnc)`和`远程登录(ssh)`。ssh我强烈建议开启，后续会提到为什么……

### Resolution 分辨率

由于默认没有显示器的情况下，链接VNC将会默认创建一个`1920x1080`的`Unknown Display`。这个东西的分辨率是无法调整，但是如果显示器的情况下VNC将会直接挂载现有的。我推荐这个时候可以用[BetterDisplay](https://github.com/waydabber/BetterDisplay)来创建一个合适分辨率的`Dummy`，挂载上去，然后再链接。

注意记得开启`low resolution`否则苹果的retina设定，大小还是会不匹配。每次更改分辨率以后，这个软件会默认把这个勾去掉，所以记得重新打回去

如果需要重新启动VNC Server：

> http://bytesandbolts.com/remotely-restart-mac-os-x-in-built-vnc-server/

```bash
sudo /System/Library/CoreServices/RemoteManagement/ARDAgent.app/Contents/Resources/kickstart -restart -agent
```

### ScreenSaver 屏幕保护

这个是真的头大，屏幕保护默认是**不能从VNC解除的**。我尝试了很多组合键，最后还是ssh进去杀掉有用：

```bash
killall ScreenSaverEngine
```

然而就算你在设置里面把屏幕保护和节能一系列选项全关上，这个玩意还是会随机在你用的时候启动 --- 这其实是有个设置选项被从UI隐藏了，好家伙啊好家伙：

> https://www.reddit.com/r/macmini/comments/posw4u/m1_mac_mini_screen_saver_still_randomly_invokes/

```bash
sudo defaults write /Library/Preferences/com.apple.screensaver loginWindowIdleTime 0
```

### 重启

这是另外一波头疼的问题，如果你开启了`filevault`，那么重启以后必须要用键盘解开硬盘才能启动VNC这些服务。所以……这怎么搞啊艹，那就关了咯。

如果真的开了但是又要重启的话：

> https://apple.stackexchange.com/questions/225818/how-to-perform-filevault-authenticated-restart-when-updating-osx-from-appstore

```
sudo fdesetup authrestart
```