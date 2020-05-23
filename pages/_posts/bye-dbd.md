---
title: Bye, deadbydaylight.wiki
tags: 
    - 百科
categories:
    - 记录
layout: post
date: 2020-05-23
---

在清理Google Analysis的时候, 发现了这个帐号的记录

<object :data="dbd_pdf" type="application/pdf" width="100%" height="700px">
    <embed :src="dbd_pdf">
        <p>您的浏览器暂时不支持直接浏览pdf, 请 <a :href="dbd_pdf">下载</a>.</p>
    </embed>
</object>

这个是当时`deadbydaylight.wiki`黎明杀机百科的分析数据, 高峰的时候日PV有几万的样子, 同时在线访客`>1k`, 主要来源是台湾, 确实有一批人当时很在意百科的发展  

这个算是我第一次大规模的做百科, 一开始在 <https://translate.wiki> 做过一小段时间

高中的时候不算是爱学习的, 因为学习好的人太多了emmm. 然后突然黎明杀机这个游戏火了起来, 玩法也很新奇: 不公平1v4这个模式也有很多主播在进行

我当时只有一台`macbook air 2015`也硬是打了几十个小时

在后来, 偶然和"中国区代表"一起, 还有`Kazama Sion`一起做起了百科, 经历了这个游戏在国内被封杀的阶段, 也见证了网易的"第五人格"的事故

只可惜当时我还是高中生, 确实没有那么多精力和时间打理, 也没有那么多规划

资料当时都是从 gamepedia 上面英文版要到授权的, 也很感谢当时所有参与过这个百科的志愿者

到现在这件事情也算告一段落了, 可能会继续梳理一下思绪补充一些内容

有兴趣的可以去这里看看: https://deadbydaylight-zh.gamepedia.com/

---

目前也有活跃的维护者了, https://deadbydaylight-zh.gamepedia.com/UserProfile:LeCgHn_Jason

总之, 祝好

<script>
export default {
    computed: {
        dbd_pdf() {
            return require('../_assets/file/bye-dbd/DBD_Overview_20170516-20200522.pdf')
        }
    }
}
</script>