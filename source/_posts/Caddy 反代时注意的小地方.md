---
title: Caddy 反代时注意的小地方
tags: 
    - 折腾
categories:
    - 随笔
date: 2018-07-26 12:58:00
---

发现Rancher经过Caddy代理后，每次获取的都是CF的IP。那么就要来点处理啦。

Caddy有个PlaceHolder，这个是用法在[这里](https://caddyserver.com/docs/placeholders)。

例子

```
proxy / http://localhost:60001 {
  header_upstream Host {host}
  header_upstream X-Real-IP {>CF-Connecting-IP}
  header_upstream X-Forwarded-For {>X-Forwarded-For}
  header_upstream X-Forwarded-Proto {>X-Forwarded-Proto}
  header_upstream Connection {>Connection}

  insecure_skip_verify
  websocket
}
```

然后顺便遇到一个 Commandline 每次都会短时间被关闭，看了官方手册说是有一个`proxy-read-timeout`。

嗯……这里的话 Caddy 手册下面的`websocket preset`应该是干这个用的。就是`Connection` 那个头。

所以先试试看效果咯。


