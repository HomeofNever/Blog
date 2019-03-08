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

## 地址

Telegram的登陆设计很奇怪（狗屎）：他有5个数据中心，分别对应的Web接口是：

- venus
- flora
- 

`https://' + subdomain + '.web.telegram.org/`
<!--stackedit_data:
eyJoaXN0b3J5IjpbMjEyOTE5MzgwMl19
-->