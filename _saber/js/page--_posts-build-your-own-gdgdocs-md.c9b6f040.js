(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{165:function(e,o,t){"use strict";t.r(o);var n=t(0),r=function(e){var o,t,n,r,s=(n=void 0,r="一键包？",(o={}).type=t="post",o.internal=n,o.contentType="markdown",o.slug="build-your-own-gdgdocs",o.content=n,o.createdAt=new Date(153257754e4),o.updatedAt=new Date(1648315377748),o.title="GDGDOCS 项目自建",o.tags=["折腾"],o.categories=["技术"],o.layout=t,o.date="2018-07-26 11:59:00",o.markdownHeadings=[{text:r,slug:r,level:2}],o.excerpt='<p>今天做了一份调查问卷，要把结果分享给别人，于是就关联到一个Spreadsheet，结果<a href="https://github.com/GDGNanyang/gdgdocs/blob/master/src/centos.sh">GDGDOCS</a>不再支持form以外的反代了。那……就自己做一个咯</p>\n',o.permalink="/2018/07/26/build-your-own-gdgdocs",o.assets={},o.attributes=o,o.tagsInfo=[{name:"折腾",permalink:"/blog/tag/折腾"}],o.categoriesInfo=[{name:"技术",permalink:"/blog/category/technology"}],o),a=e.options.beforeCreate||[];e.options.beforeCreate=[function(){this.$page=s}].concat(a);["layout","transition"].forEach((function(o){var t=e.options.PageComponent;t&&(e.options[o]=t[o]),void 0===e.options[o]&&(e.options[o]=s[o])})),s.slug&&(e.options.name="page-wrapper-"+s.slug.replace(/[^0-9a-z\-]/gi,"-"))},s=Object(n.a)({},(function(){var e=this,o=e.$createElement,t=e._self._c||o;return t("layout-manager",[t("p",[e._v("今天做了一份调查问卷，要把结果分享给别人，于是就关联到一个Spreadsheet，结果"),t("saber-link",{attrs:{to:"https://github.com/GDGNanyang/gdgdocs/blob/master/src/centos.sh"}},[e._v("GDGDOCS")]),e._v("不再支持form以外的反代了。那……就自己做一个咯")],1),e._v(" "),t("p",[e._v("成品在"),t("saber-link",{attrs:{to:"https://gdocs.never.pet"}},[e._v("这里")])],1),e._v(" "),t("p",[e._v("其实吧，事情还是有点复杂的")]),e._v(" "),t("h2",{attrs:{id:"一键包？"}},[e._v("一键包？")]),e._v(" "),t("p",[e._v("其实本身他们是有一个一键包的，但是呢……\n"),t("saber-link",{attrs:{to:"http://gdgny.qiniudn.com/project/gdgdocs/gdgdocs.tar.gz"}},[e._v("http://gdgny.qiniudn.com/project/gdgdocs/gdgdocs.tar.gz")])],1),e._v(" "),t("p",[e._v("这玩意太臃肿了，不符合最近我的Dockerize想法，而且用到了一个已经不在维护状态的Modules。")]),e._v(" "),t("p",[e._v("所以的话，重新整理了一下文档然后做了一下用到的Module都是默认包含在Nginx标准打包范围内的")]),e._v(" "),t("div",{pre:!0,attrs:{class:"saber-highlight","data-lang":""}},[t("pre",{pre:!0,attrs:{class:"saber-highlight-code language-text"}},[t("code",{pre:!0,attrs:{class:"language-text"}},[e._v('# 注意，这里提供的 dn-ggpt.qbox.me 等，是七牛为公益开发者社区的提供的赞助，请商业公司自行搭建，谢谢。\n# 请自行替换掉所有的 gdocs.never.pet\nserver\n     {\n          listen       80;\n          server_name gdocs.never.pet;\n          # conf ssl if you need\n          # SSL 配置请参见 gdgny.org/project/gdgdocs\n          location / {\n            proxy_set_header Accept-Encoding \'\';\n            subs_filter_types text/css text/js;\n            proxy_pass https://docs.google.com/;\n            subs_filter docs.google.com  gdocs.never.pet\n            subs_filter lh1.googleusercontent.com dn-ggpt.qbox.me;\n            subs_filter lh2.googleusercontent.com dn-ggpt.qbox.me;\n            subs_filter lh3.googleusercontent.com dn-ggpt.qbox.me;\n            subs_filter lh4.googleusercontent.com dn-ggpt.qbox.me;\n            subs_filter lh5.googleusercontent.com dn-ggpt.qbox.me;\n            subs_filter lh6.googleusercontent.com dn-ggpt.qbox.me;\n            subs_filter lh7.googleusercontent.com dn-ggpt.qbox.me;\n            subs_filter lh8.googleusercontent.com dn-ggpt.qbox.me;\n            subs_filter lh9.googleusercontent.com dn-ggpt.qbox.me;\n            subs_filter lh10.googleusercontent.com dn-ggpt.qbox.me;\n            subs_filter ssl.gstatic.com dn-gstatic.qbox.me;\n            subs_filter www.gstatic.com dn-gstatic.qbox.me;\n            proxy_redirect          off;\n            proxy_set_header        X-Real-IP       $remote_addr;\n            proxy_set_header        X-Forwarded-For $proxy_add_x_forwarded_for;\n            proxy_set_header        Cookie "";\n            proxy_hide_header       Set-Cookie;\n            # more_clear_headers      "P3P";\n            proxy_hide_header Location;\n          }\n          location /r/ {\n                proxy_pass         https://goo.gl/;\n                proxy_set_header   Host goo.gl;\n                proxy_set_header   X-Real-IP  $remote_addr;\n                proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;\n           }\n          location ^~ /qr/ {\n                proxy_pass         https://chart.apis.google.com/chart?cht=qr&chs=500x500&chld=H|0&chl=http%3A//gdocs.never.pet/r/;\n                proxy_set_header   Host chart.apis.google.com;\n                proxy_set_header   X-Real-IP  $remote_addr;\n                proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;\n           }\n     }\neof')])])]),t("p",[e._v("我是直接用80，因为Rancher自己有一个SSL Terminal，所以统一管理比较方便")]),e._v(" "),t("p",[t("s",[e._v("如果你也要的话我也做了一个Docker")]),e._v("其实没有所以就先这样")])])}),[],!1,null,null,null);"function"==typeof r&&r(s);o.default=s.exports}}]);