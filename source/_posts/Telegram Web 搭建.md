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

## 仓库检查

首先，我要说一句：你的APPID和Hash已经是不可避免的暴露了。毕竟是要在客户端里面给到的

比如说，官方的ID：(https://web.telegram.org/js/app.js)
```
id:2496
hash:8da85b0d5bfe62527e5b244c209159c3
```

### 更改地址
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTQxMDA2NjczMl19
-->