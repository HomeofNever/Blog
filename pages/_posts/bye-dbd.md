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

黎明杀机百科当时的主要来源是台湾, 确实有一批人当时很在意百科的发展  
只可惜当时我还是高中生, 确实没有那么多精力和时间打理  
资料当时都是从 gamepedia 上面英文版要到授权的  

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