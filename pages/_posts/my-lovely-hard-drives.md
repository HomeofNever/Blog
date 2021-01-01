---
title: 发车啦! 硬盘便宜买
tags:
  - 群晖
  - 迁移
  - 西数
  - 希捷
categories:
  - 数码
layout: post
date: 2020-05-18
updated: 2020-12-08
description: Seagate Expansion, WD mybook, Elements, 12tb, 10tb, 8tb, 我都买了一遍
---

## 更新

希捷的盘挂了(坏道), 这才不到一年... 最坑的地方莫过于拆盘不保, 然后盒子里面的硬盘一查直接是过期的

在一般的客户查询只是提示没有数据, 实际上后台里面写着这个盘直接就是过保, 客服要我提供购买时间收据

连带着这次顺便把NAS的数据搞丢了一部分, Raid5 阵列没坏但是文件系统损坏... 好吧, 这次我直接SHR+Btrfs了

总是, 海门真的再见了:)

## 背景介绍

在大约两年前暑假回国上夏校的时候, 有个矿难带来了一个很火的系列----蜗牛星际

当时的我刚好在北京也淘了一个, 顺便从 [@indexyz](https://blog.indexyz.me/) 淘来了一套硬盘 (3+3 seagate), 还有杂七杂八一堆总计花了我 1k rmb 左右买下, 又花了 100rmb 运回广州打包带走的玩意

这个东西后来被我刷上了黑群晖上了 RAID1 做备份服务器和文件分享服务器, 具体关于这个东西的后续(咕了)

再然后, 我趁着 Dell 打折的时候, 300 刀左右入了一台`T40`. 具体这个东西的后续(咕了). 因为这东西标配的是一块`1tb`的西数蓝盘, 除此之外还有额外的两个硬盘位, 星际蜗牛四盘+T40 三盘一共七块盘

### 题外: 为什么不上亚马逊海外购的车

当时还有一个事情就是亚麻当时 bug 价的硬盘, 80 刀 10tb, 确实让人心动.

但是当时我实在第一是准备出发, 没有空等待这个到货时间不确定的东西, 第二就是买这么多坐飞机不方便, 所以只能再看机会了

## 现状

### 第一波

一开始是从`newegg`起步的两块盘

![10tb 174USD, 8tb 145USD](../_assets/media/my-lovely-hard-drives/newegg_1.png)

<Tweet id="1254180643682095105" />

虽然很多人说希捷的盘不是很好, 到时候反正也要组个 raid, 我自己之前的希捷盘也用了 8000 个小时, 感觉问题不大

列一下型号:

- Seagate Expansion
  - 172.79/10T => 17.28/T
  - BarraCuda Pro
  - ST10000DM0004
  - PN: 1ZC101-301
  - FW: DN01
- Western Digital MyBook
  - 145.79/8T => 18.22/T
  - WD80EZAZ
  - R/N: US7SAL080

#### 开箱照片

![WD 8tb](../_assets/media/my-lovely-hard-drives/mybook_8tb_openbox.jpg)

#### 对比图

![](../_assets/media/my-lovely-hard-drives/compare_1.jpg)
![](../_assets/media/my-lovely-hard-drives/compare_2.jpg)

##### 差异

两家都给了数据线和电源线, 但是希捷的还给了很多适配头, 用于不同国家的标准, 这个不错(虽然我都是要拆硬盘的了)

![](../_assets/media/my-lovely-hard-drives/compare_3.jpg)

#### 测速

希捷的盘不掉速, WD 会有波动
虽然说 https://post.smzdm.com/p/aoo6m4l6/ 这篇评测说不是 SMR, 但是掉速这个很奇怪

<Tweet id="1254287135106117632" :options="{conversation: 'none'}"/>
<Tweet id="1254699445100384256" :options="{conversation: 'none'}" />

测速原图, USB:

- <a v-bind:href="mybook_8tb_hdtune">Mybook 8T HDtune</a>
- <a v-bind:href="expansion_10tb_hdtune">Expansion 10T HDtune</a>
- <a v-bind:href="mybook_8tb_crystal">Mybook 8T Crystal</a>
- <a v-bind:href="expansion_10tb_crystal">Expansion 10T Crystal</a>

#### 拆

不得不说, 希捷这个是真的难拆. 西数的只要卡一下卡口就可以无伤开盘, 但是希捷这个基本上肯定是要断扣子的

但是盘的话, 希捷的还是料足的

如果是具体怎么拆, 我是看这这些视频的:

- 西数: https://youtu.be/K5X7uXSx-no
- 希捷: https://youtu.be/1RQv9raiPQg

![](../_assets/media/my-lovely-hard-drives/wd_crackbox_1.jpg)
![](../_assets/media/my-lovely-hard-drives/expansion_crackbox_1.jpg)
![](../_assets/media/my-lovely-hard-drives/expansion_crackbox_2.jpg)

#### 使用总结

- 希捷的发热很大

一开始我把它放到了`T40`做 PT, 这个温度确实有点高

- 西数的声音确实不小

我的蜗牛是放在房间里面的, 平时不读取还好, 但是刚好最近是 SMART 检查, 那声音真的是一言难尽

- 西数白盘放在主机里面确实可能用不了

这个和主板有关, 至少我的`T40`是不行的

操作可以看看这个视频: https://youtu.be/9W3-uOl4ruc

用透明胶粘第三针, 注意不要挡住其他的即可

---

### 第二波

提前说一下, 这一波亏了, 买的是 10tb 的 WD easystore

我平时购买会在什么值得买看看历史报价, 预期心理价位目前是:

- 140 刀 8t 税后
- 170 刀 10t 税后
- 200 刀 12t 税后

**这一次在 BestBuy 最骚的就是, 179 刀卖了以后, 过两天 169 刀开卖** (详见第三波)

![](../_assets/media/my-lovely-hard-drives/easystore_10tb_bestbuy.png)

加上税以后一口老血喷出来......
不说了, 先列一下型号:

- WD Easystore
  - 194.79/10T => 19.48/T
  - WD100EMAZ
  - US8SAL100

这一次我没测速, 失误, 直接插进蜗牛和希捷的组了`RAID1`

#### 开箱

<Tweet id="1258465154670436353" :options="{conversation: 'none'}" />
![](../_assets/media/my-lovely-hard-drives/easystore_10tb_openbox.jpg)

#### 拆

还是一样的好拆

![](../_assets/media/my-lovely-hard-drives/easystore_10tb_crackbox.jpg)
![](../_assets/media/my-lovely-hard-drives/easystore_10tb_crackbox_1.jpg)

---

### 第三波

还在路上, 托人从免税州带过来的, 先晒一下订单:

![](../_assets/media/my-lovely-hard-drives/newegg_2.png)
![](../_assets/media/my-lovely-hard-drives/easystore_10tb_bestbuy_1.png)

列一下数据, 介于部分型号已经被开过了, 我这里主要放一下 Elements 的开箱好了

- WD Easystore
  - 169.99/10T => 17.00/T
  - WD100EMAZ
  - US7SAL100
- WD Element
  - 199.27/12T => 16.61/T
  - WD120EMFZ
  - US7SAP140
- WD Mybook
  - 178.98/10T => 17.90/T
  - WD100EZAZ
  - US7SAL100

![全家福](../_assets/media/my-lovely-hard-drives/third.jpg)

#### 开箱

![](../_assets/media/my-lovely-hard-drives/elements_open_box.jpg)

Elements 的结构和 Easystore 很像, 但是感觉就是有点不成熟

![](../_assets/media/my-lovely-hard-drives/elements_front.jpg)

前面这里和 easystore 一样有个小灯

![](../_assets/media/my-lovely-hard-drives/elements_back.jpg)

背后这里有个电源键, 感觉用处不大 (长按关闭, 但是如果是在系统内弹出设备后还是需要重新插拔 usb)

https://post.smzdm.com/p/adwr0pqk/

#### 拆

![](../_assets/media/my-lovely-hard-drives/elements_drive_1.jpg)

这个结构和 easystore 有点不一样, 他的四个脚是用特殊设计的胶垫做的, 吃硬盘边角形状

![](../_assets/media/my-lovely-hard-drives/elements_drive_2.jpg)

### 测速

顺便补一下测速, USB

- <a v-bind:href="easystore_10tb_hdtune">Easystore 10T HDtune</a>
- <a v-bind:href="elements_12tb_hdtune">Elements 12T HDtune </a>
- <a v-bind:href="easystore_10tb_crystal">Easystore 10T Crystal</a>
- <a v-bind:href="elements_12tb_crystal">Elements 12T Crystal</a>

## 总结

总储存: 60 T 总花费: 1061.61 USD

算上杂七杂八的信用卡返现和返利网站返现, 算整体百分之五

实际花费: 1008.53 USD

平均 16.81 USD/T

### 多出来的盘?

希捷的盒子基本上是废了, 虽然说做工最好, 丢了之前从垃圾堆里捡到的, 160G, 跑了 3w8 小时还没啥问题的西数企业盘进去

其他西数盒子就把之前的希捷的 1tb, 3tb 盘丢进去了

~~感觉这辈子都不差盘用了~~

### 拆卸难度

拆: Expansion >>> MyBook > Elements ~= Easystore  
装: Elements >> Mybook ~= Easystore > Expansion

Expansion 是真的很难拆, 而 Elements 特制的胶垫导致装回去的时候确实有点不知所措, 也导致我换下来的硬盘很难放进去

### 板子兼容性

目前只有 Mybook 的板子装入其他硬盘后不能读盘  
Easystore 和 Elements 似乎都没有这个问题, 直接放进去就可以正常使用

<script>
import { Tweet } from 'vue-tweet-embed'

export default {
    components: {
        Tweet
    }, 
    computed: {
      mybook_8tb_hdtune() {
        return this.getImage(require('../_assets/media/my-lovely-hard-drives/mybook_8tb_hdtune.jpg'))
      },
      mybook_8tb_crystal() {
        return this.getImage(require('../_assets/media/my-lovely-hard-drives/mybook_8tb_crystal.jpg'))
      },
      expansion_10tb_hdtune() {
        return this.getImage(require('../_assets/media/my-lovely-hard-drives/expansion_10tb_hdtune.jpg'))
      },
      expansion_10tb_crystal() {
         return this.getImage(require('../_assets/media/my-lovely-hard-drives/expansion_10tb_crystal.jpg'))
      },
      easystore_10tb_hdtune() {
         return this.getImage(require('../_assets/media/my-lovely-hard-drives/easystore_10tb_hdtune.jpg'))
      },
      easystore_10tb_crystal() {
         return this.getImage(require('../_assets/media/my-lovely-hard-drives/easystore_10tb_crystal.jpg'))
      },
      elements_12tb_hdtune() {
          return this.getImage(require('../_assets/media/my-lovely-hard-drives/elements_12tb_hdtune.jpg'))
      },
      elements_12tb_crystal() {
          return this.getImage(require('../_assets/media/my-lovely-hard-drives/elements_12tb_crystal.jpg'))
      },
    }, 
    methods: {
      getImage(img) {
        return img.images[0].path
      }
    }
}
</script>
