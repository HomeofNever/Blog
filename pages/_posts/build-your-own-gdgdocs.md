---
title: GDGDOCS 项目自建
tags: 
    - 折腾
categories:
    - 技术
layout: post
date: 2018-07-26 11:59:00
---

今天做了一份调查问卷，要把结果分享给别人，于是就关联到一个Spreadsheet，结果[GDGDOCS](https://github.com/GDGNanyang/gdgdocs/blob/master/src/centos.sh)不再支持form以外的反代了。那……就自己做一个咯

成品在[这里](https://gdocs.never.pet)

其实吧，事情还是有点复杂的

## 一键包？
其实本身他们是有一个一键包的，但是呢……
http://gdgny.qiniudn.com/project/gdgdocs/gdgdocs.tar.gz

这玩意太臃肿了，不符合最近我的Dockerize想法，而且用到了一个已经不在维护状态的Modules。

所以的话，重新整理了一下文档然后做了一下
用到的Module都是默认包含在Nginx标准打包范围内的

```
# 注意，这里提供的 dn-ggpt.qbox.me 等，是七牛为公益开发者社区的提供的赞助，请商业公司自行搭建，谢谢。
# 请自行替换掉所有的 gdocs.never.pet
server
     {
          listen       80;
          server_name gdocs.never.pet;
          # conf ssl if you need
          # SSL 配置请参见 gdgny.org/project/gdgdocs
          location / {
            proxy_set_header Accept-Encoding '';
            subs_filter_types text/css text/js;
            proxy_pass https://docs.google.com/;
            subs_filter docs.google.com  gdocs.never.pet
            subs_filter lh1.googleusercontent.com dn-ggpt.qbox.me;
            subs_filter lh2.googleusercontent.com dn-ggpt.qbox.me;
            subs_filter lh3.googleusercontent.com dn-ggpt.qbox.me;
            subs_filter lh4.googleusercontent.com dn-ggpt.qbox.me;
            subs_filter lh5.googleusercontent.com dn-ggpt.qbox.me;
            subs_filter lh6.googleusercontent.com dn-ggpt.qbox.me;
            subs_filter lh7.googleusercontent.com dn-ggpt.qbox.me;
            subs_filter lh8.googleusercontent.com dn-ggpt.qbox.me;
            subs_filter lh9.googleusercontent.com dn-ggpt.qbox.me;
            subs_filter lh10.googleusercontent.com dn-ggpt.qbox.me;
            subs_filter ssl.gstatic.com dn-gstatic.qbox.me;
            subs_filter www.gstatic.com dn-gstatic.qbox.me;
            proxy_redirect          off;
            proxy_set_header        X-Real-IP       $remote_addr;
            proxy_set_header        X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header        Cookie "";
            proxy_hide_header       Set-Cookie;
            # more_clear_headers      "P3P";
            proxy_hide_header Location;
          }
          location /r/ {
                proxy_pass         https://goo.gl/;
                proxy_set_header   Host goo.gl;
                proxy_set_header   X-Real-IP  $remote_addr;
                proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
           }
          location ^~ /qr/ {
                proxy_pass         https://chart.apis.google.com/chart?cht=qr&chs=500x500&chld=H|0&chl=http%3A//gdocs.never.pet/r/;
                proxy_set_header   Host chart.apis.google.com;
                proxy_set_header   X-Real-IP  $remote_addr;
                proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
           }
     }
eof
```

我是直接用80，因为Rancher自己有一个SSL Terminal，所以统一管理比较方便

~~如果你也要的话我也做了一个Docker~~其实没有所以就先这样

