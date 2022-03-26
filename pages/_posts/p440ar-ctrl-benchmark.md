---
title: P440ar Array Controller 直通评测
tags: 
    - HP
    - HBA
    - RAID
    - ZFS
categories:
    - 搞机
layout: post
date: 2022-03-26
---

最近到了一批`HPE DL560 G9`的机器，默认带的是[P440ar](https://support.hpe.com/hpesc/public/docDisplay?docId=emr_na-c04496202)的卡。但是目前我们都是用的ZFS，所以一般来说我们都会把卡刷成`IT Mode`直通给系统。  

戴尔的卡已经有[很成熟的教程](https://fohdeesha.com/docs/index.html)了，但是HP似乎都没有，目前可以选择的方案看了一圈只有

- HBA Mode，他们的卡自带了这个模式
- RAID 0 for each physical drive，我没想到的是他们界面直接就有这个选项，看来很多这样的需求

但是继续找了一下并没有看到有关于更多ZFS的评测，所以这里就记录一下目前收集到的信息

## 规格

### 硬盘

硬盘是`2.5 inch Seagate 1TB 7200 RPM`，具体信息：

```
Status: OK
Serial Number: 9XG6E9NN
Model: ST910006CLAR1000
Media Type: HDD
Capacity: 1000 GB
Firmware Version: AS0D
Encryption Status	Not Encrypted
```

### 控制器

控制器读缓存开启，写缓存关闭

## 测试

### 脚本

使用的是[fio](https://github.com/axboe/fio)，配合脚本  

<iframe class="gist-iframe" src="https://gist.github.com/sennajox/3667757.pibb"></iframe>

### RAID 0 结果

<a :href="raid0">fio-raid0.tar.gz</a>

### HBA 结果

<a :href="hba">fio-hba.tar.gz</a>

## 结论

目前测试出来单盘的情况下，HBA和Raid0的结果在512K的读写下很相近，但是HBA模式表现似乎要更好一点。

所有结果都打包在上面，有需要的可以自行下载研究。如果有更多测试/模式想要测试，可以在评论区留言

<script>
export default {
    data () {
        return {
            raid0: require("../_assets/file/p440ar-ctrl-benchmark/fio-raid0.tar.gz"),
            hba: require("../_assets/file/p440ar-ctrl-benchmark/fio-hba.tar.gz"),
        }
    },
}
</script>

<style scoped>
.gist-iframe {
    width: 100%;
    min-height: 300px;
    margin: 10px 0 10px 0;
    border: transparent;
}
</style>