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
description: Seagate Expansion, WD mybook, Elements, 12tb, 10tb, 8tb, 我都买了一遍
--- 

## 背景介绍

在大约两年前暑假回国上夏校的时候, 有个矿难带来了一个很火的系列----蜗牛星际

当时的我刚好在北京也淘了一个, 顺便从 [@indexyz](https://blog.indexyz.me/) 淘来了一套硬盘 (3+3 seagate), 还有杂七杂八一堆总计花了我 1k rmb左右买下, 又花了100rmb运回广州打包带走的玩意

这个东西后来被我刷上了黑群晖上了RAID1做备份服务器和文件分享服务器, 具体关于这个东西的后续可以参见[另外一篇文章](./my-hack-synology-summary.md)

再然后, 我趁着Dell打折的时候, 300刀左右入了一台`T40`. 具体这个东西的后续可以[参见这一篇](./my-t40-car-crash.md). 因为这东西标配的是一块`1tb`的西数蓝盘, 除此之外还有额外的两个硬盘位, 星际蜗牛四盘+T40三盘一共七块盘

### 题外: 为什么不上亚马逊海外购的车

当时还有一个事情就是亚麻当时bug价的硬盘, 80刀10tb, 确实让人心动. 

但是当时我实在第一是准备出发, 没有空等待这个到货时间不确定的东西, 第二就是买这么多坐飞机不方便, 所以只能再看机会了

## 现状

### 第一波

一开始是从`newegg`起步的两块盘

![10tb 174USD, 8tb 145USD](../_assets/media/my-lovely-hard-drives/newegg_1.png)

<Tweet id="1254180643682095105" />

虽然很多人说希捷的盘不是很好, 到时候反正也要组个raid, 我自己之前的希捷盘也用了8000个小时, 感觉问题不大

列一下型号: 
- Seagate Expansion 
  -  172.79/10T => 17.28/T
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

希捷的盘不掉速, WD会有波动
虽然说 https://post.smzdm.com/p/aoo6m4l6/ 这篇评测说不是SMR, 但是掉速这个很奇怪

<Tweet id="1254287135106117632" :options="{conversation: 'none'}"/>
<Tweet id="1254699445100384256" :options="{conversation: 'none'}" />

测速原图, USB: 

- <a :href="require('../_assets/media/my-lovely-hard-drives/mybook_8tb_hdtune.jpg')">Mybook 8T HDtune</a>
- <a :href="require('../_assets/media/my-lovely-hard-drives/expansion_10tb_hdtune.jpg')">Expansion 10T HDtune</a>
- <a :href="require('../_assets/media/my-lovely-hard-drives/mybook_8tb_crystal.jpg')">Mybook 8T Cyrstal</a>
- <a :href="require('../_assets/media/my-lovely-hard-drives/expansion_10tb_crystal.jpg')">Expansion 10T Crystal</a>


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

一开始我把它放到了`T40`做PT, 这个温度确实有点高

- 西数的声音确实不小

我的蜗牛是放在房间里面的, 平时不读取还好, 但是刚好最近是SMART检查, 那声音真的是一言难尽

- 西数白盘放在主机里面确实可能用不了

这个和主板有关, 至少我的`T40`是不行的

操作可以看看这个视频: https://youtu.be/9W3-uOl4ruc

用透明胶粘第三针, 注意不要挡住其他的即可

---

### 第二波

提前说一下, 这一波亏了, 买的是 10tb 的WD elements

我平时购买会在什么值得买看看历史报价, 预期心理价位目前是:

- 140刀 8t 税后
- 170刀 10t 税后
- 200刀 12t 税后

**这一次在BestBuy最骚的就是, 179刀卖了以后, 过两天169刀开卖** (详见第三波)

![](../_assets/media/my-lovely-hard-drives/element_10tb_bestbuy.png)

加上税以后一口老血喷出来......
不说了, 先列一下型号:

- WD Element
  - 194.79/10T => 19.48/T
  - WD100EMAZ
  - US8SAL100

这一次我没测速, 失误, 直接插进蜗牛和希捷的组了`RAID1`

#### 开箱

<Tweet id="1258465154670436353" :options="{conversation: 'none'}" />
![](../_assets/media/my-lovely-hard-drives/element_10tb_openbox.jpg)

#### 拆

还是一样的好拆

![](../_assets/media/my-lovely-hard-drives/element_10tb_crackbox.jpg)
![](../_assets/media/my-lovely-hard-drives/element_10tb_crackbox_1.jpg)

---

### 第三波

还在路上, 托人从免税州带过来的, 先晒一下订单:

![](../_assets/media/my-lovely-hard-drives/newegg_2.png)
![](../_assets/media/my-lovely-hard-drives/element_10tb_bestbuy_1.png)

列一下数据, 后续补充
- WD Element
  - 169.99/10T => 17.00/T
- WD Element
  - 199.27/12T => 16.61/T
- WD Mybook
  - 178.98/10T => 17.90/T


## 总结

总储存: 60 T 总花费: 1061.61 USD

算上杂七杂八的信用卡返现和返利网站返现, 算整体百分之五

实际花费: 1008.53 USD

平均 16.81 USD/T


### 多出来的盘?

希捷的盒子基本上是废了, 虽然说做工最好, 丢了之前从垃圾堆里捡到的, 160G, 跑了3w8小时还没啥问题的西数企业盘进去

其他西数盒子就把之前的希捷的1tb, 3tb盘丢进去了

~~感觉这辈子都不差盘用了~~

--- 

未完待续

<script>
import { Tweet } from 'vue-tweet-embed'

export default {
    components: {
        Tweet
    }, 
    data() {
      return {
        price: [],
        volume: []
      }
    },
    computed: {
      price_sum() {
        return this.price.reduce((a, b) => a + b, 0)
      },
      volume_sum() {
        return this.volume.reduce((a, b) => a + b, 0)
      },
      real_price_sum() {
        return (this.price_sum * 0.95).toFixed(2)
      }
    },
    methods: {
      addDisk(number, v) {
        this.price.push(number)
        this.volume.push(v)
        return `${number}/${v}T => ${this.divide(number, v)}/T`
      },
      divide(a, b) {
        return (a/b).toFixed(2)
      }
    }
}
</script>