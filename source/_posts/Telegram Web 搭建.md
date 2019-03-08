---
title: Telegram Web 搭建
tags: 
    - 折腾
categories:
    - 项目
date: 2019-03-08 02:10:00
---

# 剧情前提
[Telegram](https://telegram.org) 是个好东西，他有个[Web客户端](https://web.telegram.org)，也是个好东西

> 源代码：https://github.com/zhukov/webogram

然而，想要做这个东西的镜像，却没有那么简单

# Howto

首先，我要说一句：你的APPID和Hash已经是不可避免的暴露了。毕竟是要在客户端里面给到的

比如说，[官方的ID](view-source:https://web.telegram.org/js/app.js)
```
id:2496
hash:8da85b0d5bfe62527e5b244c209159c3
```

本文用到的仓库地址：https://gitlab.com/DogeTeam/webogram-new
你可以通过查阅日志了解每一步的更改

## API

Telegram的登陆设计很奇怪（狗屎）：他有5个数据中心，分别对应的Web接口是：

- pluto
- venus
- vesta
- aurora
- flora

格式：
`https://' + subdomain + '.web.telegram.org/`

在你填写手机号以后，应用需要**一个一个请求这五个中心**才能知道哪个中心是你的账号所在的位置。

所以，也就是说，你需要10个子域名（每个名字还有一个`subdomain-1`的（备用？）域名

我比较懒，懒得搞wildcard（因为用来做代理的机器是临时小鸡，不想放DNS Key上去），就直接用了Caddy 

还有一点就是最近官方似乎反代理，所以`Host`头在转发的时候记得给官方的

> [Caddyfile](https://gitlab.com/DogeTeam/webogram-new/snippets/1833207) 例子

## 语言

目前客户端还没有合并中文进去，这有点不能忍啊……

由于客户端是用Angular2开发的，语言文件需要在几个地方注册。仓库给的是已经默认设置为中文的客户端。当然还是会检测浏览器的语言切换到其他的去

具体步骤可以看[这里](https://github.com/zhukov/webogram/tree/master/app/js/locales)

文章开头提供的仓库内置了中文汉化并设置为了默认

**注意**：你最后还需要更改`package.json`让你的语言生效，这一步似乎没有在官方的说明里出现

（当时我调了老半天就是没有用，全局搜索语言`en-us`偶然发现`package.json`里面还要设置emmmm）




<!--stackedit_data:
eyJoaXN0b3J5IjpbLTE3MDQyMzU5MDZdfQ==
-->