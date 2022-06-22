---
title: 给 LSI 9266-8i 刷 IT Mode
tags:
  - 折腾
  - HBA
  - Server
categories:
  - 技术
layout: post
date: 2022-06-22
---

## 前提的前提

这个故事的经历以失败暂告一段落，但是着里面的过程我觉得还是值得记录一下。估计以后也用得上 --- ZFS还是一定要IT Mode，没办法。如果你想尝试一下的话不妨接着往下看，我稍微把工具都整理了一下


## 事故前提

18年的时候有我和另外一个朋友合组了一台HP 380P G8，这是一台相当老的服务器。21年左右的时候尝试升级了一下，结果后续内存和硬盘各种爆炸，所以想着晚些时候直接换个新的上去好了。结果新的服务器到了以后，文件系统我们换成了ZFS，不再是和以前一样的硬件RAID。ZFS需要直通模式，他既是文件系统，本身也包含了卷管理的功能。大部分RAID卡虽然提供了类似的模式，比如说给你每个盘开RAID 0，或者是提供了一个HBA Mode，但这些模式通常都是由软件模拟的，除了性能可能存在问题，有些甚至无法读取`smartctl`。所以一般来说会找那种可以刷成直通模式，让卡本身不做任何处理的固件。但是……

这次我给搞忘了！反应过来的时候旧机器都已经寄到家门口了……新机器内置的RAID卡`P440ar`虽然是有HBA模式，看着性能也没啥问题，但是这机器发出去就很难再调整硬件配置，为了保险起见，还是单独弄一张带`IT Mode`固件的卡好了。

## 理论可行

翻箱倒柜找到了一张旧机器里面的`9266-8i`，搜索了一下，似乎并没有特别多的资料。但是似乎有人留下了一篇`cross-flashing`的经历：

> https://mywiredhouse.net/blog/flashing-lsi-2208-firmware-use-hba/

大概意思就是Supermicro主板内置刚好也有一块LSI的RAID卡，控制器是`SMB2208`。这个版本刚好是没有`IT Mode`的。但是`SMB2308`有。然而，2208和2308虽然型号不一样，背后的架构其实是差不多的，甚至芯片都是用的一样的……那么，有没有可能可以直接想办法把2308给的固件刷到2208里面呢？

答案是可以，作者发现这是真的能用。那么采用2208控制器卡有很多变种，比如我手里这块`9266-8i`其实也是同样的芯片组:

> 参考 https://docs.broadcom.com/doc/12353227

所以如果这个用2208的卡可以，那么其他用同样的控制器的卡，理论上有概率也是可以的。

所以我们开始试试看把！

## 准备环境

配置2208首先要使用DOS环境把卡清空，才可以再刷入2308固件。所以[FreeDOS](https://www.freedos.org/download/)走起。

如果你有多个U盘的话，可以选择直接下载LITEUSB的镜像写入。这里的问题是因为你还需要把各种工具和固件放进去 --- 虽然你U盘可以很大，但是镜像的文件系统本身为了压缩大小，是限定了分区大小的。也就是如果你没有第二个U盘，你可能还得想想办法扩容分区。我实在是懒得折腾了，Archlinux有个提前分了2G大小压缩后的镜像，但是写入是结结实实要2G。FreeDOS提供的FullUSB镜像在本次过程中分区大小是足够的。

主要要准备的东西有：

1. 9207_8i_Package_P20_IR_IT_FW_BIOS_for_MSDOS_Windows.zip  (has the 9207-8.bin firmware and mptsas2.rom bios in it)
2. lsi2208fixer.zip (has `megarec`, `megacli`, `sas2flash`, and this has the 2208 recovery firmware)
3. sas2008.zip  (提取 `sbrempty.bin` file in it)
4. Installer_P20_for_UEFI.zip (this has the version of sas2flash.efi in it for UEFI shell)

注意的点：

1. 在我测试的过程中，P14和P20的刷写软件都认为9266是兼容的固件。如果你的卡刷不了，可能你要准备P14的固件。我都放在了文章最后的链接里面
2. lsi2208fixer那个镜像里面包含了所有的工具，但是问题就是分区太小了一点。我选择直接复制里面的文件到FullUSB镜像

镜像直接dd即可：

```bash
sudo dd if=FD13FULL.img of=/dev/sda bs=1M
```

开个文件夹，正常挂载文件系统即可，不需要额外参数。文件我是开了个文件夹直接放在根目录。

### FreeDOS指令快速入门

```bash
dir
cd
mkdir
type # Same as cat
more 
# > < 这些管道符都是可以正常使用的
# 调用程序直接输入名字即可
# 可以用tab补全
# 有些时候程序名字太长会被缩写，要留意下输出
```

### dos/16M error: [40] not enough available extended memory (XMIN)

这个问题在我的机器上遇到了，找了一圈看到了这个：

> https://forums.unraid.net/topic/12114-lsi-controller-fw-updates-irit-modes/page/63/
> Pulling a stick did nothing, that still left me with 4GB in the PC. I couldn't get around this no matter what I tried. I ultimately had to replaced DOS4GW.EXE with [DOS/32A a more recent DOS Extender](http://dos32a.narechk.net/index_en.html) which didn't have a problem with what I guess is TOO MUCH ram. I just dumped everything from the extract binw directory into the root of my USB drive and renamed DOS32A.EXE to DOS4GW.EXE and the DOS parts worked. 

拔内存我留4G也没有用，和这个人症状一样。之前在服务器256G都能跑起来，让我很困惑（我换PC的原因是因为服务器重启很慢而且很吵）。但是他里面说道这个Extender确实解决了问题：先[下载这个extender](https://dos32a.narechk.net/content/download.html)，然后把里面文件解包全部放到和工具一个目录下，再把`DOS32A.EXE`改名成`DOS4GW.EXE`，问题解决。字符串搜索了一下，`megarec`里面确实提到了这个EXE，有点意思。

## 第一步，清Flash

### 先看看设备在不在

```bash
megarec -adplist
```

### 备份一下原本的固件

备份结果会在当前目录产生

```bash
megarec -readsbr 0 smc2208.sbr
megarec -readspd 0 smc2208.spd
megacli -adpallinfo -a0 > allinfo.txt
```

`allinfo.txt`包含了SAS Address，记得存留

### 刷Flash

```bash
megarec -writesbr 0 sbrempty.bin
megarec -cleanflash 0
```

如果没有报错，重启后进入下一步

## Cross Flashing

在这里我遇到了个奇怪的问题，之前我是用服务器直接刷的，DOS里面`SAS2Flash`是可以看得到卡，但是换到PC就找不到了，所以我用了`sas2flash.efi`

如果你遇到类似的问题，需要进入`EFI Shell`来处理这个问题，目前的主板一般都会内置一个Shell，所以不需要额外下载EFI执行文件。下面是一些常用的指令：

```bash
map # 查看所有的映射
# efi需要FAT
fs0: # 切换到对应的文件系统
# 直接看fs开头的找你的U盘
cd
# 程序执行直接文件名即可
```

### 列出设备

```bash
sas2flash -list
```

### 刷写固件

```bash
sas2flash -o -f 9207-8.bin -b mptsas2.rom
```

如果你不需要选项，可以忽略`-b`的rom部分，这样开机就不会进bios，速度快一点。

#### 其他选项

`sas2flash`其实有很多清理模式：

```bash
sas2flsh -o -e 6
```

会清理rom和固件，但是会保留基本信息，例如SASa。`7`就是清除所有信息

### 写回SASa

```bash
sas2flash -o -sasadd 50030480195exxxx
```

## 后续

刷完以后，卡上的蜂鸣器就开始疯狂叫，吵的不行。我不得已先贴了个胶带上去降低音量。原文中评论有人说道一样的卡型号也遇到了类似的问题，虽然卡可以用但是警报是关不掉的。所以他最后选择直接把哪个蜂鸣器取下来。

我这里一开始刷完也是可以正常启动的，如果刷了rom甚至是可以看到卡型号和控制器型号正常显示了。但是一旦真正接入了硬盘以后，rom就会在开机的时候卡住。整机报`PCI Bus Error`。不刷rom可以正常进系统，但是会提示`mptsas error`。反正横竖认不出来。在当时赶时间，所以直接下单了一块刷好的`HP H220`先装上发了，但是卡在这个地方丝毫没有头绪。看来这还真的是YMMW？

那先试试看能不能恢复固件把，事实证明确实是可以恢复回去的。

## 恢复固件

```bash
megarec -cleanflash 0
(reboot)
megarec -writesbr 0 smc2208.sbr # 之前备份的
megarec -m0flash 0 2208_16.rom  # 在恢复工具里面有 (this is the rom from the LSI recovery ROM thread linked above)
```

### 写回SASa

```bash
megaoem -AdpSetSASA 50030480195exxxx -a0
```

## 最后的最后

大家记得一定手里要有多几块U盘，来回刷系统测试真的是搞心态。还有就是少碰HBA：）真的兔子洞

### 所有用到的固件/工具文件

https://github.com/HomeofNever/Blog/tree/master/pages/_assets/file/lsi-9266-8i-to-it-mode

### 其他相关资料

> https://forums.serverbuilds.net/t/flashing-sas2208-to-it-mode-when-sas2flsh-does-not-detect-it/2357

### 用到的资源下载链接

> https://forums.laptopvideo2go.com/topic/29059-sas2008-lsi92409211-firmware-files/