---
title: 做一个 Docker Registry
tags: 
    - 折腾
    - Docker
categories:
    - 坑
date: 2018-07-26 23:59:00
---

反正最后还是被说服自己做全套 CI/CD+Docker Registry ，那就做完呗。

参考：https://docs.docker.com/registry/deploying/

Registry 其实还是蛮简单的。按照 local 的教程然后前面放上自己 LB 出口就好了。

鉴权部分就让Registry来做好了

```
docker run -d --restart=always --name registry -v /data/registry/data:/var/lib/registry -v /data/registry/auth:/auth -e "REGISTRY_AUTH=htpasswd" -e "REGISTRY_AUTH_HTPASSWD_REALM=Registry Realm" -e REGISTRY_AUTH_HTPASSWD_PATH=/auth/htpasswd -p 5000:5000 registry:2
```

注意一下，`REGISTRY_AUTH`必须放在变量第一位。否则会有些奇怪的问题（见Github Issue）

然后就是创建一个用户，这里坑死我了……

还好这个人救了我的一天：https://forums.docker.com/t/docker-registry-with-htpasswd-not-working/10785/4

` htpasswd -B [FILE] [USER]`

必须用`bcrypt`生成密码，之前看文档一直没有注意到这个`arg`然后生成出来以后死活不对，气死我了……


