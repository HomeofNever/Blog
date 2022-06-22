(window.webpackJsonp=window.webpackJsonp||[]).push([[36],{187:function(e,t,l){"use strict";l.r(t);var a=l(0),s=function(e){var t,l,a,s,n,o,r,i,g,u,p,c,d,x,v,m,y,w,b,h,k,A,D,f,T,H,P,C,S,N,I,L,M,F,R,B,E,G,W,O,j,z,V,_,U,q,K,$,Z,Y,X,J,Q,ee,te,le=(t=void 0,l="post",a="markdown",s="事故前提",n="剧情前提",o="正文",r="技术",i="总结",g="效果",u="拆",p="折腾",c="测速",d="开箱",v="index",m={},y="前提的前提",w="理论可行",b="准备环境",h="先看看设备在不在",k="备份一下原本的固件",A="列出设备",D="刷写固件",f="其他选项",T="写回SASa",H="恢复固件",P="最后的最后",C="其他相关资料",S="用到的资源下载链接",N={},I={},L="CMIC",M="更新固件",F="错误提示",R={},B="twitter",E="telegram",G="sync",W="since_id",O={},j="writeup",z="邮箱被人爆破了",V={},_={},U="为什么是webhook传出而不是传入",q="这个脚本做了什么事情",K={},$={},Z="2020-05-21",Y={},X="迁移一个目前已经有的项目",J={},Q="2020-05-18",ee={},te="如果你在访问并非本文章的链接时跳转到这个页面",(x={}).type="page",x.internal=t,x.contentType=a,x.slug=v,x.content=t,x.createdAt=new Date(1655891844544),x.updatedAt=new Date(1655891844544),x.layout=v,x.injectAllPosts=!0,x.markdownHeadings=[],x.permalink="/",x.assets={},x.attributes=x,x.posts=[m,N,I,R,O,V,_,K,$,Y,J,ee],x.pagination={hasPrev:!0,hasNext:!1,total:3,current:1,prevLink:"/page/2",nextLink:t},m.type=l,m.internal=t,m.contentType=a,m.slug="lsi-9266-8i-to-it-mode",m.content=t,m.createdAt=new Date(1655856e6),m.updatedAt=new Date(1655891844544),m.title="给 LSI 9266-8i 刷 IT Mode",m.tags=[p,"HBA","Server"],m.categories=[r],m.layout=l,m.date="2022-06-22",m.markdownHeadings=[{text:y,slug:y,level:2},{text:s,slug:s,level:2},{text:w,slug:w,level:2},{text:b,slug:b,level:2},{text:"FreeDOS指令快速入门",slug:"freedos指令快速入门",level:3},{text:"dos/16M error: [40] not enough available extended memory (XMIN)",slug:"dos16m-error-40-not-enough-available-extended-memory-xmin",level:3},{text:"第一步，清Flash",slug:"第一步，清flash",level:2},{text:h,slug:h,level:3},{text:k,slug:k,level:3},{text:"刷Flash",slug:"刷flash",level:3},{text:"Cross Flashing",slug:"cross-flashing",level:2},{text:A,slug:A,level:3},{text:D,slug:D,level:3},{text:f,slug:f,level:4},{text:T,slug:"写回sasa",level:3},{text:"后续",slug:"后续",level:2},{text:H,slug:H,level:2},{text:T,slug:"写回sasa-2",level:3},{text:P,slug:P,level:2},{text:"所有用到的固件/工具文件",slug:"所有用到的固件工具文件",level:3},{text:C,slug:C,level:3},{text:S,slug:S,level:3}],m.excerpt="<p>这个故事的经历以失败暂告一段落，但是着里面的过程我觉得还是值得记录一下。估计以后也用得上 --- ZFS还是一定要IT Mode，没办法。如果你想尝试一下的话不妨接着往下看，我稍微把工具都整理了一下</p>\n",m.permalink="/2022/06/22/lsi-9266-8i-to-it-mode",m.assets={},m.attributes=m,N.type=l,N.internal=t,N.contentType=a,N.slug="p440ar-ctrl-benchmark",N.content=t,N.createdAt=new Date(16482528e5),N.updatedAt=new Date(1655891844544),N.title="P440ar Array Controller 直通评测",N.tags=["HP","HBA","RAID","ZFS"],N.categories=["搞机"],N.layout=l,N.date="2022-03-26",N.markdownHeadings=[{text:"规格",slug:"规格",level:2},{text:"硬盘",slug:"硬盘",level:3},{text:"控制器",slug:"控制器",level:3},{text:"测试",slug:"测试",level:2},{text:"脚本",slug:"脚本",level:3},{text:"RAID 0 结果",slug:"raid-0-结果",level:3},{text:"HBA 结果",slug:"hba-结果",level:3},{text:"结论",slug:"结论",level:2}],N.excerpt='<p>最近到了一批<code v-pre="">HPE DL560 G9</code>的机器，默认带的是<a href="https://support.hpe.com/hpesc/public/docDisplay?docId=emr_na-c04496202">P440ar</a>的卡。但是目前我们都是用的ZFS，所以一般来说我们都会把卡刷成<code v-pre="">IT Mode</code>直通给系统。</p>\n',N.permalink="/2022/03/26/p440ar-ctrl-benchmark",N.assets={},N.attributes=N,I.type=l,I.internal=t,I.contentType=a,I.slug="cisco-ucs-experience",I.content=t,I.createdAt=new Date(16468704e5),I.updatedAt=new Date(1655891844540),I.title="老IPMI折腾记",I.tags=[L,"Flash","KVM","Cisco"],I.categories=["搞机"],I.layout=l,I.date="2022-03-10",I.markdownHeadings=[{text:L,slug:"cmic",level:2},{text:"KVM",slug:"kvm",level:3},{text:"CMIC KVM",slug:"cmic-kvm",level:4},{text:"SuperMicro KVM",slug:"supermicro-kvm",level:4},{text:M,slug:M,level:2},{text:F,slug:F,level:3},{text:"Decryption failed",slug:"decryption-failed",level:3},{text:"Extraction Failed",slug:"extraction-failed",level:3},{text:"更新CMIC",slug:"更新cmic",level:3}],I.excerpt="<p>最近入手了一个很老的Cisco UCS C240 M3S机器，遇到了不少麻烦，记录的同时吐槽一下</p>\n",I.permalink="/2022/03/10/cisco-ucs-experience",I.assets={},I.attributes=I,R.type=l,R.internal=t,R.contentType=a,R.slug="tweet-to-telegram",R.content=t,R.createdAt=new Date(1610064e6),R.updatedAt=new Date(1655891844544),R.title="用 Github Action 拯救 Twitter 与 Telegram 的转发",R.tags=["github action",B,E,G],R.categories=[r],R.layout=l,R.date="2021-01-08",R.description="自动获取点赞推文图片/视频, 转发到Telegram频道, 咳咳",R.markdownHeadings=[{text:n,slug:n,level:2},{text:"IFTTT的困境",slug:"ifttt的困境",level:3},{text:o,slug:o,level:2},{text:"申请API",slug:"申请api",level:3},{text:"创建APP",slug:"创建app",level:3},{text:"Github Action",slug:"github-action",level:3},{text:W,slug:W,level:4},{text:"后言",slug:"后言",level:2}],R.excerpt='<p>如果你想直接看成品: <a href="https://github.com/NeverBehave/Tweet2Telegram">https://github.com/NeverBehave/Tweet2Telegram</a></p>\n',R.permalink="/2021/01/08/tweet-to-telegram",R.assets={},R.attributes=R,O.type=l,O.internal=t,O.contentType=a,O.slug="2020-summary",O.content=t,O.createdAt=new Date(16097256e5),O.updatedAt=new Date(1655891844540),O.title="The end of 2020 年终总结",O.tags=[i,"年终"],O.categories=[j],O.layout=l,O.description="「さようなら」",O.date="2021-01-04 10:00:00",O.markdownHeadings=[{text:n,slug:n,level:2},{text:o,slug:o,level:2},{text:"1月",slug:"1月",level:3},{text:"毛装做出来了",slug:"毛装做出来了",level:4},{text:"3月",slug:"3月",level:3},{text:"Research",slug:"research",level:4},{text:"实习",slug:"实习",level:4},{text:"搬家",slug:"搬家",level:4},{text:"5-8月",slug:"5-8月",level:3},{text:"杂项",slug:"杂项",level:4},{text:"转向了 FastMail",slug:"转向了-fastmail",level:4},{text:"移除了 Chrome",slug:"移除了-chrome",level:4},{text:z,slug:z,level:4},{text:"CNBlackListR 关闭",slug:"cnblacklistr-关闭",level:4},{text:"8月过后...",slug:"8月过后---",level:3},{text:"入了 3D 打印的坑",slug:"入了-3d-打印的坑",level:4},{text:"希捷的盘挂了",slug:"希捷的盘挂了",level:4},{text:"给家里和同学家都换上了UBNT的AP",slug:"给家里和同学家都换上了ubnt的ap",level:4},{text:"拿到了ASN!",slug:"拿到了asn",level:4},{text:"从 Ansible 换到了 NixOS",slug:"从-ansible-换到了-nixos",level:4},{text:"买了新车",slug:"买了新车",level:4},{text:i,slug:i,level:2}],O.excerpt="<p>^背景音乐</p>\n",O.permalink="/2021/01/04/2020-summary",O.assets={},O.attributes=O,V.type=l,V.internal=t,V.contentType=a,V.slug="2020-red-pack-writeup",V.content=t,V.createdAt=new Date(1609502401e3),V.updatedAt=new Date(1655891844540),V.title="年度总结红包WriteUp -- Berd.moe",V.tags=["ctf","年终","红包"],V.categories=[j],V.layout=l,V.description="新年快乐! 红包给你!",V.date="2021-01-01 20:00:01",V.markdownHeadings=[{text:n,slug:n,level:2},{text:"流程",slug:"流程",level:2},{text:"Problem 0",slug:"problem-0",level:3},{text:"Problem 1",slug:"problem-1",level:3},{text:"Problem 2",slug:"problem-2",level:3},{text:"Problem 3",slug:"problem-3",level:3},{text:"Problem 4",slug:"problem-4",level:3},{text:"小结",slug:"小结",level:2}],V.excerpt='<p>在Leonn的博客频道看到这个, <a href="https://blog.berd.moe/archives/2020-review/">https://blog.berd.moe/archives/2020-review/</a></p>\n',V.permalink="/2021/01/01/2020-red-pack-writeup",V.assets={},V.attributes=V,_.type=l,_.internal=t,_.contentType=a,_.slug="customize-telegram-twitter-ifttt-connection",_.content=t,_.createdAt=new Date(15903648e5),_.updatedAt=new Date(1655891844540),_.title="用 webhook 拯救 ifttt 上 Twitter 与 Telegram 的同步",_.tags=["ifttt",B,E,G],_.categories=[r],_.layout=l,_.date="2020-05-25",_.markdownHeadings=[{text:s,slug:s,level:2},{text:"为什么是 Twitter",slug:"为什么是-twitter",level:3},{text:"目前的痛点 (ifttt)",slug:"目前的痛点-ifttt",level:3},{text:o,slug:o,level:2},{text:"Q&A",slug:"qampa",level:3},{text:U,slug:U,level:4},{text:"为什么不用推特的API",slug:"为什么不用推特的api",level:4},{text:"准备工作",slug:"准备工作",level:3},{text:"Runkit Script",slug:"runkit-script",level:3},{text:q,slug:q,level:4},{text:"ifttt 设置",slug:"ifttt-设置",level:3},{text:"为什么不分享你做的 applet",slug:"为什么不分享你做的-applet",level:4},{text:"怎么调试",slug:"怎么调试",level:4},{text:g,slug:g,level:2}],_.excerpt="<p>这大概是我最近最后一篇更新了, 马上要上班了, Orz</p>\n",_.permalink="/2020/05/25/customize-telegram-twitter-ifttt-connection",_.assets={},_.attributes=_,K.type=l,K.internal=t,K.contentType=a,K.slug="bye-dbd",K.content=t,K.createdAt=new Date(1590192e6),K.updatedAt=new Date(1655891844540),K.title="Bye, deadbydaylight.wiki",K.tags=["百科"],K.categories=["记录"],K.layout=l,K.date="2020-05-23",K.markdownHeadings=[],K.excerpt="<p>在清理Google Analysis的时候, 发现了这个帐号的记录</p>\n",K.permalink="/2020/05/23/bye-dbd",K.assets={},K.attributes=K,$.type=l,$.internal=t,$.contentType=a,$.slug="keep-your-google-voice-with-sao",$.content=t,$.createdAt=new Date(15900192e5),$.updatedAt=new Date(1655891844544),$.title="Google Voice 自动应答和保号",$.tags=[p,"Tasker","Google Voice","Sao"],$.categories=[r],$.layout=l,$.date=Z,$.markdownHeadings=[{text:s,slug:s,level:2},{text:"动手时间",slug:"动手时间",level:2},{text:"Auto Notification",slug:"auto-notification",level:3},{text:g,slug:g,level:2},{text:"已知问题",slug:"已知问题",level:3}],$.excerpt='<p>偶然打开某个骚群, 发现有人抱怨自己的 <code v-pre="">Google Voice</code> 被回收了, 并讨论如何保号</p>\n',$.permalink="/2020/05/21/keep-your-google-voice-with-sao",$.assets={},$.attributes=$,Y.type=l,Y.internal=t,Y.contentType=a,Y.slug="switch-from-lambda-to-fission",Y.content=t,Y.createdAt=new Date(15900192e5),Y.updatedAt=new Date(1655891844544),Y.title="从AWS lambda迁移到Fission",Y.tags=[p,"node","lambda","fission","k8s"],Y.categories=[r],Y.layout=l,Y.date=Z,Y.markdownHeadings=[{text:s,slug:s,level:2},{text:"题外: 为什么不用 Netlify/Vercel",slug:"题外-为什么不用-netlifyvercel",level:3},{text:"About Fission",slug:"about-fission",level:2},{text:"安装",slug:"安装",level:3},{text:"Ingress 设置",slug:"ingress-设置",level:4},{text:"本地 CLI",slug:"本地-cli",level:4},{text:X,slug:X,level:3},{text:"入口",slug:"入口",level:4},{text:"坑",slug:"坑",level:4}],Y.excerpt='<p>我开始用<code v-pre="">aws lambda</code>的时间大约是它还只有<code v-pre="">node v8</code>运行时的时候, 主要其免费的额度确实相当的诱人, 加上学生赠与的免费<code v-pre="">credit</code>, 香的一批</p>\n',Y.permalink="/2020/05/21/switch-from-lambda-to-fission",Y.assets={},Y.attributes=Y,J.type=l,J.internal=t,J.contentType=a,J.slug="my-lovely-hard-drives",J.content=t,J.createdAt=new Date(158976e7),J.updatedAt=new Date(16073856e5),J.title="发车啦! 硬盘便宜买",J.tags=["群晖","迁移","西数","希捷"],J.categories=["数码"],J.layout=l,J.date=Q,J.updated="2020-12-08",J.description="Seagate Expansion, WD mybook, Elements, 12tb, 10tb, 8tb, 我都买了一遍",J.markdownHeadings=[{text:"更新",slug:"更新",level:2},{text:"背景介绍",slug:"背景介绍",level:2},{text:"题外: 为什么不上亚马逊海外购的车",slug:"题外-为什么不上亚马逊海外购的车",level:3},{text:"现状",slug:"现状",level:2},{text:"第一波",slug:"第一波",level:3},{text:"开箱照片",slug:"开箱照片",level:4},{text:"对比图",slug:"对比图",level:4},{text:"差异",slug:"差异",level:5},{text:c,slug:c,level:4},{text:u,slug:u,level:4},{text:"使用总结",slug:"使用总结",level:4},{text:"第二波",slug:"第二波",level:3},{text:d,slug:d,level:4},{text:u,slug:"拆-2",level:4},{text:"第三波",slug:"第三波",level:3},{text:d,slug:"开箱-2",level:4},{text:u,slug:"拆-3",level:4},{text:c,slug:"测速-2",level:3},{text:i,slug:i,level:2},{text:"多出来的盘?",slug:"多出来的盘",level:3},{text:"拆卸难度",slug:"拆卸难度",level:3},{text:"板子兼容性",slug:"板子兼容性",level:3}],J.excerpt="<p>希捷的盘挂了(坏道), 这才不到一年... 最坑的地方莫过于拆盘不保, 然后盒子里面的硬盘一查直接是过期的</p>\n",J.permalink="/2020/05/18/my-lovely-hard-drives",J.assets={},J.attributes=J,ee.type=l,ee.internal=t,ee.contentType=a,ee.slug="moving-my-blog-2",ee.content=t,ee.createdAt=new Date(15896736e5),ee.updatedAt=new Date(158976e7),ee.title="还是再迁移了博客",ee.tags=["博客","迁移"],ee.categories=["事项"],ee.layout=l,ee.date="2020-05-17",ee.updated=Q,ee.markdownHeadings=[{text:te,slug:te,level:2},{text:"为什么我又迁移了?",slug:"为什么我又迁移了",level:2}],ee.excerpt="<p>过了这么久, 还是迁移了博客...</p>\n",ee.permalink="/2020/05/17/moving-my-blog-2",ee.assets={},ee.attributes=ee,x),ae=e.options.beforeCreate||[];e.options.beforeCreate=[function(){this.$page=le}].concat(ae);["layout","transition"].forEach((function(t){var l=e.options.PageComponent;l&&(e.options[t]=l[t]),void 0===e.options[t]&&(e.options[t]=le[t])})),le.slug&&(e.options.name="page-wrapper-"+le.slug.replace(/[^0-9a-z\-]/gi,"-"))},n=Object(a.a)({},(function(){var e=this.$createElement;return(this._self._c||e)("layout-manager")}),[],!1,null,null,null);"function"==typeof s&&s(n);t.default=n.exports},188:function(e,t,l){"use strict";l.r(t);var a=l(0),s=function(e){var t,l,a,s,n,o,r,i,g,u,p,c,d,x,v,m,y,w,b,h,k,A,D,f,T,H,P,C,S,N,I,L,M,F,R,B,E,G,W,O,j,z=(t=void 0,l="post",a="markdown",s="剧情前提",n="技术",o="折腾",r="更新",i="小插曲",u="index",p={},c="zerotier",d="初步想法",x={},v="字符：我不是那么好惹的",m="怎么定义独立的字符？",y="并不是所有的字符都可以加空格",w={},b="这是什么",h="为什么要互联？",k="说了这么多，和这破东西有什么关系？",A="如何申请",D={},f="是什么？",T="收费，模式",H={},P={},C="这就没了？",S={},N={},I="动手时间",L="探索与发现",M="爬虫到底吃什么",F={},R="初探谷歌云打印",B={},E={},G={},W="安装并启动ss-redir",O="配置iptables实现流量的转发",j="配置实现流量的选择性代理",(g={}).type="page",g.internal=t,g.contentType=a,g.slug=u,g.content=t,g.createdAt=new Date(1655891844544),g.updatedAt=new Date(1655891844544),g.layout=u,g.injectAllPosts=!0,g.markdownHeadings=[],g.permalink="/page/2",g.assets={},g.attributes=g,g.posts=[p,x,w,D,H,P,S,N,F,B,E,G],g.pagination={hasPrev:!0,hasNext:!0,total:3,current:2,prevLink:"/page/3",nextLink:"/"},p.type=l,p.internal=t,p.contentType=a,p.slug="nano-pi-neo2-first-experience",p.content=t,p.createdAt=new Date(155927412e4),p.updatedAt=new Date(1655891844544),p.title="Nano Pi NEO2 体验小记",p.tags=["项目","nanopi","arm",o,"监控",c],p.categories=[n],p.layout=l,p.date="2019-05-31 11:42:00",p.markdownHeadings=[{text:r,slug:r,level:2},{text:s,slug:s,level:2},{text:d,slug:d,level:2},{text:"选型",slug:"选型",level:3},{text:"价格",slug:"价格",level:4},{text:i,slug:i,level:5},{text:"跑！",slug:"跑！",level:2},{text:"下包",slug:"下包",level:3},{text:"烧卡",slug:"烧卡",level:3},{text:"开机",slug:"开机",level:3},{text:"装 Zerotier",slug:"装-zerotier",level:4},{text:"后记",slug:"后记",level:2},{text:"Zerotier",slug:c,level:3},{text:"SS",slug:"ss",level:3},{text:"Torch",slug:"torch",level:3},{text:"其他",slug:"其他",level:3},{text:"neo black 2",slug:"neo-black-2",level:3}],p.excerpt="<p>H5似乎已经停止生产了, Nano PI Neo2 也似乎没有了</p>\n",p.permalink="/2019/05/31/nano-pi-neo2-first-experience",p.assets={},p.attributes=p,x.type=l,x.internal=t,x.contentType=a,x.slug="space-and-s-p-a-c-e",x.content=t,x.createdAt=new Date(155366688e4),x.updatedAt=new Date(1655891844544),x.title="空格与 空 格",x.tags=[o,"node","unicode","string"],x.categories=[n],x.layout=l,x.date="2019-03-27 14:08:00",x.markdownHeadings=[{text:s,slug:s,level:2},{text:v,slug:v,level:2},{text:m,slug:m,level:3},{text:"解决方案：String Iterator",slug:"解决方案：string-iterator",level:3},{text:"延伸",slug:"延伸",level:3},{text:y,slug:y,level:4}],x.excerpt='<p>相关项目：<a href="https://github.com/abusetelegram/kongebot">kongebot</a>\n机器人 <a href="https://t.me/kongebot">@kongebot</a></p>\n',x.permalink="/2019/03/27/space-and-s-p-a-c-e",x.assets={},x.attributes=x,w.type=l,w.internal=t,w.contentType=a,w.slug="ripe-probe-hosting",w.content=t,w.createdAt=new Date(155365842e4),w.updatedAt=new Date(1655891844544),w.title="RIPE Probe Hosting",w.tags=["玩具"],w.categories=["数码"],w.layout=l,w.date="2019-03-27 11:47:00",w.markdownHeadings=[{text:b,slug:b,level:2},{text:h,slug:h,level:3},{text:k,slug:k,level:3},{text:A,slug:A,level:2},{text:"你的ASN",slug:"你的asn",level:3},{text:"Probe vs Anchor",slug:"probe-vs-anchor",level:4},{text:"等等，我所在的ASN有设备了，有什么办法保证我可以通过申请吗？",slug:"等等，我所在的asn有设备了，有什么办法保证我可以通过申请吗？",level:3}],w.excerpt="<p>先上图（低清警告）</p>\n",w.permalink="/2019/03/27/ripe-probe-hosting",w.assets={},w.attributes=w,D.type=l,D.internal=t,D.contentType=a,D.slug="my-thought-about-cloud-game-before",D.content=t,D.createdAt=new Date(155305332e4),D.updatedAt=new Date(1655891844544),D.title="云游戏：生不逢时",D.tags=["游戏"],D.categories=["随笔"],D.layout=l,D.date="2019-03-20 11:42:00",D.markdownHeadings=[{text:s,slug:s,level:2},{text:f,slug:f,level:2},{text:T,slug:T,level:2},{text:"结语",slug:"结语",level:2}],D.excerpt="<p>谨此文怀念我接触的第一个国内在线串流游戏平台：云游戏</p>\n",D.permalink="/2019/03/20/my-thought-about-cloud-game-before",D.assets={},D.attributes=D,H.type=l,H.internal=t,H.contentType=a,H.slug="telegram-web-hosting",H.content=t,H.createdAt=new Date(15519822e5),H.updatedAt=new Date(1655891844544),H.title="Telegram Web 搭建",H.tags=[o],H.categories=[n],H.layout=l,H.date="2019-03-08 02:10:00",H.markdownHeadings=[{text:s,slug:s,level:1},{text:"Howto",slug:"howto",level:1},{text:"API",slug:"api",level:2},{text:"语言",slug:"语言",level:2},{text:"CI",slug:"ci",level:2}],H.excerpt='<p><a href="https://telegram.org">Telegram</a> 是个好东西，他有个<a href="https://web.telegram.org">Web客户端</a>，也是个好东西</p>\n',H.permalink="/2019/03/08/telegram-web-hosting",H.assets={},H.attributes=H,P.type=l,P.internal=t,P.contentType=a,P.slug="tasker-messenger",P.content=t,P.createdAt=new Date(154960008e4),P.updatedAt=new Date(1655891844544),P.title="华为短信机.jpg",P.tags=[o],P.categories=[n],P.layout=l,P.date="2019-2-08 12:28:00",P.markdownHeadings=[{text:s,slug:s,level:2},{text:"1st",slug:"1st",level:2},{text:"解锁",slug:"解锁",level:3},{text:"刷！",slug:"刷！",level:4},{text:"2nd",slug:"2nd",level:2},{text:i,slug:i,level:3},{text:C,slug:C,level:2}],P.excerpt="<p>到国外以后，国内带来的两张手机卡突然有一张没地方放了。刚好老母过来的时候让她赶紧把手里的华为P9给换了水果，顺便还注册了美区ID。既然有台这个机器……这就折腾一下吧</p>\n",P.permalink="/2019/02/08/tasker-messenger",P.assets={},P.attributes=P,S.type=l,S.internal=t,S.contentType=a,S.slug="2018-2019",S.content=t,S.createdAt=new Date(154624962e4),S.updatedAt=new Date(1655891844540),S.title="一张图总结2018",S.tags=["总结"],S.categories=["随笔"],S.layout=l,S.date="2018-12-31 17:47:00",S.markdownHeadings=[],S.excerpt="<p>时区： UTC-4</p>\n",S.permalink="/2018/12/31/2018-2019",S.assets={},S.attributes=S,N.type=l,N.internal=t,N.contentType=a,N.slug="how-to-feed-a-robot",N.content=t,N.createdAt=new Date(154484964e4),N.updatedAt=new Date(1655891844540),N.title="如何科学的给机器人投食",N.tags=[o,"爬虫"],N.categories=[n],N.layout=l,N.date="2018-12-15 12:54:00",N.markdownHeadings=[{text:I,slug:I,level:2},{text:"Q&A",slug:"qampa",level:3},{text:L,slug:L,level:2},{text:M,slug:M,level:3},{text:"小发现",slug:"小发现",level:3},{text:"结论",slug:"结论",level:2}],N.excerpt='<p>机器人在这里特指爬虫，本文特指一些通过扫默认目录尝试窥探 <code v-pre="">phpmyadmin</code> 一类管理面板的玩意</p>\n',N.permalink="/2018/12/15/how-to-feed-a-robot",N.assets={},N.attributes=N,F.type=l,F.internal=t,F.contentType=a,F.slug="add-google-cloud-printer-on-respi",F.content=t,F.createdAt=new Date(15431514e5),F.updatedAt=new Date(15778368e5),F.title="在树莓派上添加谷歌云打印",F.tags=[o],F.categories=[n],F.layout=l,F.date="2018-11-25 21:10:00",F.updated="2020-01-01",F.markdownHeadings=[{text:r,slug:r,level:2},{text:s,slug:s,level:2},{text:R,slug:R,level:2},{text:"安装",slug:"安装",level:3},{text:"HP 驱动",slug:"hp-驱动",level:4},{text:"CUPS 提示",slug:"cups-提示",level:5},{text:"配置",slug:"配置",level:4},{text:"效果",slug:"效果",level:2}],F.excerpt="<p>谷歌在 2020 年 1月 1日 彻底关闭了这个服务</p>\n",F.permalink="/2018/11/25/add-google-cloud-printer-on-respi",F.assets={},F.attributes=F,B.type=l,B.internal=t,B.contentType=a,B.slug="moving-my-blog-1",B.content=t,B.createdAt=new Date(15392497e5),B.updatedAt=new Date(1655891844544),B.title="再一次迁移博客",B.tags=["博客","迁移"],B.categories=["事项"],B.layout=l,B.date="2018-10-11 17:21:40",B.markdownHeadings=[],B.excerpt='<p>在考量了<code v-pre="">typecho</code>，用<code v-pre="">github issue</code>等一类博客的利弊只有，我换掉了博客目前用[Mweb]的博客并做了重定向</p>\n',B.permalink="/2018/10/11/moving-my-blog-1",B.assets={},B.attributes=B,E.type=l,E.internal=t,E.contentType=a,E.slug="use-telegram-for-image-cdn",E.content=t,E.createdAt=new Date(153664368e4),E.updatedAt=new Date(1655891844544),E.title="Telegram 图床（视频）计划",E.tags=["Telegram","图床"],E.categories=[n],E.layout=l,E.date="2018-09-11 13:28:00",E.markdownHeadings=[],E.excerpt="<p><strong>那破链接会变，输了</strong></p>\n",E.permalink="/2018/09/11/use-telegram-for-image-cdn",E.assets={},E.attributes=E,G.type=l,G.internal=t,G.contentType=a,G.slug="build-a-rediretcor-with-ss-redir",G.content=t,G.createdAt=new Date(15365997e5),G.updatedAt=new Date(1655891844540),G.title="利用ss-redir做国内中转节点",G.tags=["Shadowsocks","中转","教程"],G.categories=[n],G.layout=l,G.date="2018-09-11 01:15:00",G.markdownHeadings=[{text:"基本原理",slug:"基本原理",level:1},{text:"实现方法",slug:"实现方法",level:1},{text:W,slug:W,level:2},{text:O,slug:O,level:2},{text:j,slug:j,level:2},{text:"清理 iptables",slug:"清理-iptables",level:2}],G.excerpt="<p><strong>大部分搬运内容，实测可用</strong></p>\n",G.permalink="/2018/09/11/build-a-rediretcor-with-ss-redir",G.assets={},G.attributes=G,g),V=e.options.beforeCreate||[];e.options.beforeCreate=[function(){this.$page=z}].concat(V);["layout","transition"].forEach((function(t){var l=e.options.PageComponent;l&&(e.options[t]=l[t]),void 0===e.options[t]&&(e.options[t]=z[t])})),z.slug&&(e.options.name="page-wrapper-"+z.slug.replace(/[^0-9a-z\-]/gi,"-"))},n=Object(a.a)({},(function(){var e=this.$createElement;return(this._self._c||e)("layout-manager")}),[],!1,null,null,null);"function"==typeof s&&s(n);t.default=n.exports},189:function(e,t,l){"use strict";l.r(t);var a=l(0),s=function(e){var t,l,a,s,n,o,r,i,g,u,p,c,d,x,v,m,y,w,b,h,k,A,D,f,T,H=(t=void 0,l="post",a="markdown",s="技术",n="折腾",r="index",i={},g="配置文件例子",u="还有些什么没做呢",p={},c="一键包？",d={},x={},v={},m="暴露端口",y={},w="我是怎么样的人呢？",b="为了什么呢？",h="无知和迷茫，前进的动力和坚强的后盾",k="或者说，我们都在逃避现实？",A={},D="主意来了",f="小小的研究",T="然后就没有了？",(o={}).type="page",o.internal=t,o.contentType=a,o.slug=r,o.content=t,o.createdAt=new Date(1655891844544),o.updatedAt=new Date(1655891844544),o.layout=r,o.injectAllPosts=!0,o.markdownHeadings=[],o.permalink="/page/3",o.assets={},o.attributes=o,o.posts=[i,p,d,x,v,y,A],o.pagination={hasPrev:!1,hasNext:!0,total:3,current:3,prevLink:"/page/4",nextLink:"/page/2"},i.type=l,i.internal=t,i.contentType=a,i.slug="rancher-v1.6-loadbalancer",i.content=t,i.createdAt=new Date(153264768e4),i.updatedAt=new Date(1655891844544),i.title="Rancher v1.6 负载均衡折腾小记",i.tags=[n,"Elastic Search","Kibana","Rancher","Docker","负载均衡"],i.categories=[s],i.layout=l,i.date="2018-07-27 07:28:00",i.markdownHeadings=[{text:"前言",slug:"前言",level:2},{text:"Rancher 的均衡负载",slug:"rancher-的均衡负载",level:2},{text:"Haproxy",slug:"haproxy",level:2},{text:"Redis",slug:"redis",level:3},{text:"Syslog",slug:"syslog",level:3},{text:"Rancher DNS",slug:"rancher-dns",level:4},{text:g,slug:g,level:3},{text:"关于Capture",slug:"关于capture",level:4},{text:"ELK",slug:"elk",level:2},{text:"Logstash",slug:"logstash",level:2},{text:u,slug:u,level:2},{text:"关于 H2",slug:"关于-h2",level:2},{text:"然而",slug:"然而",level:3},{text:"关于 Rancher-lb",slug:"关于-rancher-lb",level:2}],i.excerpt="<p><strong>包含了两个内容，一个是加日志，另外一个是H2</strong></p>\n",i.permalink="/2018/07/27/rancher-v1.6-loadbalancer",i.assets={},i.attributes=i,p.type=l,p.internal=t,p.contentType=a,p.slug="build-your-own-gdgdocs",p.content=t,p.createdAt=new Date(153257754e4),p.updatedAt=new Date(1655891844540),p.title="GDGDOCS 项目自建",p.tags=[n],p.categories=[s],p.layout=l,p.date="2018-07-26 11:59:00",p.markdownHeadings=[{text:c,slug:c,level:2}],p.excerpt='<p>今天做了一份调查问卷，要把结果分享给别人，于是就关联到一个Spreadsheet，结果<a href="https://github.com/GDGNanyang/gdgdocs/blob/master/src/centos.sh">GDGDOCS</a>不再支持form以外的反代了。那……就自己做一个咯</p>\n',p.permalink="/2018/07/26/build-your-own-gdgdocs",p.assets={},p.attributes=p,d.type=l,d.internal=t,d.contentType=a,d.slug="proxmox-rpcbind-ddos",d.content=t,d.createdAt=new Date(152946702e4),d.updatedAt=new Date(1655891844544),d.title="Proxmox rpcbind 的小问题",d.tags=[n],d.categories=[s],d.layout=l,d.date="2018-06-20 11:57:00",d.markdownHeadings=[],d.excerpt="<p>最近收到一封Abuse说机器有被利用DDOS的问题，原文部分内容是这样的：</p>\n",d.permalink="/2018/06/20/proxmox-rpcbind-ddos",d.assets={},d.attributes=d,x.type=l,x.internal=t,x.contentType=a,x.slug="about-CNBlackListR-project",x.content=t,x.createdAt=new Date(152927868e4),x.updatedAt=new Date(1655891844540),x.title="关于 CNBlackListR 项目的交接",x.tags=["Spam","Telegram","总结"],x.categories=["随笔"],x.layout=l,x.date="2018-06-18 07:38:00",x.markdownHeadings=[{text:"简述",slug:"简述",level:2},{text:"具体",slug:"具体",level:2}],x.excerpt="<p>因为打算逐渐远离一段时间的中文圈，目前就是在清理中文圈的羁绊。毕竟我也耗不起这时间，在各种猜忌周旋的同时处理那些头疼的垃圾死🐎Spammer。高中生也没有生产力，希望能够理解。</p>\n",x.permalink="/2018/06/18/about-CNBlackListR-project",x.assets={},x.attributes=x,v.type=l,v.internal=t,v.contentType=a,v.slug="proxmox-nat",v.content=t,v.createdAt=new Date(152902914e4),v.updatedAt=new Date(1655891844544),v.title="Proxmox 开 NAT 小鸡",v.tags=[n],v.categories=[s],v.layout=l,v.date="2018-06-15 10:19:00",v.markdownHeadings=[{text:m,slug:m,level:2}],v.excerpt='<p>参考：<a href="https://cyberpersons.com/2016/07/27/setup-nat-proxmox/">https://cyberpersons.com/2016/07/27/setup-nat-proxmox/</a></p>\n',v.permalink="/2018/06/15/proxmox-nat",v.assets={},v.attributes=v,y.type=l,y.internal=t,y.contentType=a,y.slug="my-really-silly-article",y.content=t,y.createdAt=new Date(152686848e4),y.updatedAt=new Date(1655891844544),y.title="学生事故 | 学会无知，保持迷茫",y.tags=["学校","总结"],y.categories=["随笔"],y.layout=l,y.date="2018-05-21 10:08:00",y.markdownHeadings=[{text:w,slug:w,level:3},{text:b,slug:b,level:3},{text:h,slug:h,level:3},{text:k,slug:k,level:3},{text:"尾声",slug:"尾声",level:3}],y.excerpt='<p>作者按：这个版本相比与公众号发布的版本有所不同。\n<a href="https://mp.weixin.qq.com/s/gWLiH1XvWYHYBFwWHmis0A">https://mp.weixin.qq.com/s/gWLiH1XvWYHYBFwWHmis0A</a></p>\n',y.permalink="/2018/05/21/my-really-silly-article",y.assets={},y.attributes=y,A.type=l,A.internal=t,A.contentType=a,A.slug="cups-ngrok-and-a-little-machine",A.content=t,A.createdAt=new Date(151739952e4),A.updatedAt=new Date(1655891844540),A.title="折腾了一下CUPS，ngrok，还有一台买了很久的占美小主机",A.tags=["CUPS","Ngrok","学校"],A.categories=[s],A.layout=l,A.date="2018-01-31 19:52:00",A.markdownHeadings=[{text:"概述",slug:"概述",level:3},{text:D,slug:D,level:3},{text:f,slug:f,level:3},{text:T,slug:T,level:3},{text:"关于Ngrok",slug:"关于ngrok",level:3}],A.excerpt="<p>又到了折腾的时间，这一次是因为学校打印公用电脑总是各种问题。然后又一次论文打印晚了被老师一波late记过来，忍无可忍。</p>\n",A.permalink="/2018/01/31/cups-ngrok-and-a-little-machine",A.assets={},A.attributes=A,o),P=e.options.beforeCreate||[];e.options.beforeCreate=[function(){this.$page=H}].concat(P);["layout","transition"].forEach((function(t){var l=e.options.PageComponent;l&&(e.options[t]=l[t]),void 0===e.options[t]&&(e.options[t]=H[t])})),H.slug&&(e.options.name="page-wrapper-"+H.slug.replace(/[^0-9a-z\-]/gi,"-"))},n=Object(a.a)({},(function(){var e=this.$createElement;return(this._self._c||e)("layout-manager")}),[],!1,null,null,null);"function"==typeof s&&s(n);t.default=n.exports}}]);