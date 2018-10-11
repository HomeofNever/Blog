---
title: 为 UptimeRobot 自定义页面
tags: 
    - 存档
    - 自定义
categories:
    - 项目
date: 2018-06-18 17:21:00
---

项目地址：[custom-uptimebot](https://github.com/HFIProgramming/custom-uptimebot)

**本指南已经过时，仅用于存档**

本项目灵感和大部分代码改编自[lwl的自由天空 - 建立自己的服务状态页](https://blog.lwl12.com/read/create-own-services-status-page.html)一文。 但是部分虚拟空间不支持使用反代**（纠正：现在说可以自动签发let's encrypt，那就是可以增加自己的样式咯233）**，所以产生了直接使用php获取页面的想法。

所以后面就自己写了一下api，然后调试了一下：本项目已经在hostker上通过测试，[NoticeBoard - demo](https://status.hfi.me/)

关于样式部分调试请准守lwl的博客，但是api部分说明在这里：

1.  API部分需要指定一个放置缓存的目录，在```$home```参数，请填写一个php可以读取的目录
2.  PageID也在里面($pageId)，调整后前端js不放置PageID
3.  其他的更改请随意，但是注意调整了api的话要顺便把```mointor/index.php```也改了，这里到时候应该做个统一的处理……
后面还有什么要注意的我会继续补充，如果有什么问题可以在Github上提起issue

