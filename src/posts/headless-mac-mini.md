---
title: Headless Mac Mini 折腾记
tags: 
    - macos
    - mac mini
    - vnc
    - headless
categories:
    - 技术
date: 2022-07-04
updated: 2026-09-22
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

### Caffeine

如果不在意机器一直保持已登录、不会自动锁屏，还有一个更省事的办法：[Caffeine](https://www.caffeine-app.net/en/)。它可以阻止Mac自动休眠、调暗屏幕或者启动屏幕保护程序，也能设置为登录后自动启动并保持激活。这就是我现在采用的方案。

### SSH Key和Secure Enclave

[Secretive](https://github.com/maxgoedjen/secretive)可以把SSH私钥放进Mac的Secure Enclave。这里需要说明一下：Secure Enclave是Apple提供的硬件安全机制，但Secretive本身并不是Apple官方工具。

这个方案在普通桌面Mac上很不错，但我不推荐用在headless Mac上。问题不只是Secretive的后台进程，而是它使用了Apple为Secure Enclave密钥提供的访问控制。Secretive会用`kSecAttrAccessibleWhenUnlockedThisDeviceOnly`保存密钥；按照[Apple的说明](https://developer.apple.com/documentation/security/ksecattraccessiblewhenunlockedthisdeviceonly)，这种密钥只有在设备处于解锁状态时才能访问，并不适合需要在后台持续工作的场景。

在我的headless环境里，屏幕长时间没有活动、机器进入锁定或者相关的受保护状态后，无论从SSH还是本机终端调用密钥都可能看到`errSecInteractionNotAllowed`之类的报错。晃一下鼠标、让机器恢复活动后Secretive才会重新工作，完全违背了headless的初衷。严格来说，Apple公开文档规定的是“设备解锁”状态，并没有说单纯没有鼠标输入就一定会禁用密钥；实际触发时间还会受到屏幕保护和自动锁定设置的影响。

这套方案也不能正常配合`age`使用。Secretive的Secure Enclave私钥按设计无法导出，只能通过SSH agent调用；而[`age`明确不支持SSH agent中的密钥](https://github.com/FiloSottile/age#ssh-keys)，只支持直接读取RSA或者Ed25519 SSH私钥文件。对于这台机器，我最后还是选择了普通的Ed25519 SSH密钥文件：少一点硬件隔离，但SSH、`age`、自动化和远程使用都可靠得多。

### 重启

这是另外一波头疼的问题。以前如果开启了`FileVault`，重启以后必须先用键盘解锁硬盘，VNC这些服务才能启动。所以……这怎么搞啊艹，那就关了咯。

如果真的开了但是又要重启，当时可以使用：

> https://apple.stackexchange.com/questions/225818/how-to-perform-filevault-authenticated-restart-when-updating-osx-from-appstore

```
sudo fdesetup authrestart
```

不过从macOS Tahoe开始，已经可以通过SSH远程解锁FileVault了，因此现在应该不再需要为了无头重启而专门使用上面的命令。话虽如此，我还是推荐准备一个KVM作为备用入口：远程网络或者SSH真出问题的时候，至少还有办法救场。

## 2026 更新

我现在已经换成了一台M4 Mac mini。旧的Mac大概每一两个月就会遇到一次PCIe问题，问题出在板载网卡上。对于一台需要长期远程使用的机器来说，这种偶发故障还是有点烦。

目前这台Mac mini主要用来跑Codex。我会从手机连接，IP出口是机房IP；实际使用下来没有什么问题，机房IP完全不是问题，一切都很正常。毕竟你真的要让AI有用，怎么可能不在远程主机上直接安装使用……
