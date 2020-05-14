---
title: 终端 Clear Screen
tags: 
    - 学校
categories:
    - 未完成
date: 2018-07-26 23:57:00
---

> 来源：https://blog.indexyz.me/archives/python-clean-screen.html

之前上APCS的时候都是终端输出，有的时候需要清除一下屏幕，但是呢，总是不行（上述ANSI Escspe）

直到今天：

> […] most terminal emulators interpret at least some of the ANSI escape sequences in output text. One notable exception was the Win32 console of Microsoft Windows before Windows 10 update TH2.

> via Wikipedia (https://en.wikipedia.org/wiki/ANSI_escape_code)


：）记得判断一下OS版本（老师的电脑是Windows，反正后面我直接100个newline了）

