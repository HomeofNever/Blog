---
title: Rancher 迁移
tags: 
    - 折腾
categories:
    - 坑
date: 2018-06-15 10:39:00
---

发现Proxmox和Rancher似乎有点奇怪的冲突，所以重装了一下，顺便记录一下问题。

## Docker无法启动

- 参考：https://www.solaris-cookbook.eu/virtualisation/proxmox/proxmox-lxc-running-docker-inside-container/

### 加上一个选项

> A default LXC does not allow docker to run inside. In order to do so, once the container has been created (for example CT100) I had to:

`cd /etc/pve/lxc`

> where I see my lxc container configurations. Stop the container in question, and vi the config file

`vi 100.conf`

> it will look a bit like this where all I did was to add the part after “#insert docker part below”


```
# insert docker part below
lxc.apparmor.profile: unconfined
lxc.cgroup.devices.allow: a
lxc.cap.drop:
```


## 回迁注意事项

- 参考：https://rancher.com/docs/rancher/v1.6/zh/upgrading/#single-container-bind-mount

### 改权限

之前就是这一步忘记了搞得怎么都不对

`sudo chown -R 102:105 <path on host>`

### 记得在挂载路径最后加上`/`

`docker run -d -v /opt/rancher/:/var/lib/mysql --name rancher-server --restart=unless-stopped -p 127.0.0.1:60001:8080 rancher/server `

