---
title: 在树莓派上添加谷歌云打印
tags: 
    - 折腾
categories:
    - 技术
layout: post
date: 2018-11-25 21:10:00
updated: 2020-01-01
---

## 更新

谷歌在 2020 年 1月 1日 彻底关闭了这个服务

## 剧情前提


最近由于电脑突然坏了，退回去修了以后学校租了一台新的机器给到我。然而，我的配置全没了……emmmmm，然而这台电脑到时候又要还回去，而且平时也有同学回来找我借打印机，打算找个办法弄个方便点的共享

打印机型号是：`HP Deskjet 3054 All-in-One Printer - J610a`

## 初探谷歌云打印

刚好到学校的时候，有一个学长送了我一个树莓派。我平时给别人打印是让别人连接上我树莓派的热点，然而这样并不是很安全就是了。那，就在上面配置一下CUPS？

因为之前烧录系统的时候被人推荐了`Arch`；谷歌的话，也有无GUI的[CUPS Connector](https://support.google.com/a/answer/2906017?hl=en)。那么……试试看吧

### 安装

[Github](https://github.com/google/cloud-print-connector) 

[AUR REPO](https://aur.archlinux.org/packages/cloud-print-connector-git/)

顺便借着这个机会尝试了一下`yay`：
> yay 就是一个 pacman + makepkg 的 wrapper，可以让你直接安装 aur 包

```bash
git clone https://aur.archlinux.org/yay
cd yay
makepkg -si
```

> 注意，`makepkg`不能运行在`root`环境

然后：

```bash
yay -S cloud-print-connector-git
```

> 可以顺便添加了`gcp-cups-connector-systemd`，直接用`systemctl`管理

#### HP 驱动

然而，驱动并不是很顺利。找了一圈并没有找到，但是HP有一个官方的提供给`linux`打印支持的软件`HPLIP`。[网站](https://developers.hp.com/hp-linux-imaging-and-printing)

这个安装也有点难受，不过，aur也有这个的build（突然感受到一阵舒适）：[AUR REPO](https://www.archlinux.org/packages/extra/x86_64/hplip/)

装完以后CUPS就有对应的PPD了XD，正常添加即可

测试model选择`HP Deskjet 3050 j610 Series, hpcups 3.18.6 (color)`可以正常使用

##### CUPS 提示

- 默认是监听`localhost`，而且还有验证限制。所以……web端管理不如直接装一个nginx反代`localhost:631`
- 如果你的用户没有权限添加打印机（`forbidden`），把用户加进`sys` 即可：
  ```bash
  sudo usermod -a -G sys YourUser
  ```
  > 来自 https://unix.stackexchange.com/questions/235477/cups-add-printer-page-returns-forbidden-on-web-interface

#### 配置

[官方wiki](https://github.com/google/cloud-print-connector/wiki/Install)

默认connector的`systemd`设置启动文件是在`/etc/gcp-cups-connector/gcp-cups-connector.config.json`，文件夹似乎默认没有创建，所以自己创建，并且给好读写权限。

然后执行：
```bash
gcp-connector-util init
```

按照指引即可，中间会让你选择分享，可以先留空后面再在网页上添加电子邮箱分享；然后会在当前目录生成好配置。不要忘记复制过去，然后启动即可。

```bash
systemctl start gcp-cups-connector
```

## 效果

现在只要谷歌账号登录进浏览器，在打印的时候就可以看到目标打印机了，完美！

而且和本地打印速度基本没差异，还可以在[web端](https://www.google.com/cloudprint/#printers)上传文件打印，很舒服
