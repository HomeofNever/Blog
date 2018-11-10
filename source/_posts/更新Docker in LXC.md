---
title: 更新 Docker in LXC
tags: 
    - 折腾
categories:
    - 随笔
date: 2018-11-09 19:00:00
---

由于业务迁移，刚刚重新开了一台小鸡给同学用，发现 Docker 在 LXC 里面怎么都起不来。

```
ERROR: ../libkmod/libkmod.c:586 kmod_search_moddep() could not open moddep file '/lib/modules/4.15.18-8-pve/modules.dep.bin'
FATAL: Module overlay not found in directory /lib/modules/4.15.18-8-pve
```

尝试了 `modprobe overlay `
检查了容器参数也没有什么头绪，重启也没有解决问题。直到想了一下会不会是模版的问题，检查了一下`containerd`的配置：

```
[Unit]
Description=containerd container runtime
Documentation=https://containerd.io
After=network.target

[Service]
ExecStartPre=/sbin/modprobe overlay  <- **这是干啥的**
ExecStart=/usr/bin/containerd
KillMode=process
Delegate=yes
LimitNOFILE=1048576
# Having non-zero Limit*s causes performance problems due to accounting overhead
# in the kernel. We recommend using cgroups to do container-local accounting.
LimitNPROC=infinity
LimitCORE=infinity
TasksMax=infinity

[Install]
WantedBy=multi-user.target
```

容器里面做这个肯定失败啊，删掉以后果然好了。
XD
