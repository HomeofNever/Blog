---
title: Tengine+VeryNginx初探
tags: 
    - 折腾
categories:
    - 坑
date: 2018-01-31 20:21:00
---


因为Apache更新完以后prefork mode和h2不能共存

[https://t.me/ButNothingHappened/2176](https://t.me/ButNothingHappened/2176)

> [https://http2.pro/doc/Apache](https://http2.pro/doc/Apache)
> 
>  第一，apache2 2.4.26之前的版本http2都有漏洞
> 
>  第二，更新后的http2不支持prefork模式

所以决定还是套一层CDN，但是太穷，直接用魔方云做一个好了

在LWL的小窝里面问到Tengine，然后折腾了一下午，总算是有个初步进展。记录一下????

1.  题外话

    *   魔方云的模版有点问题，建议先调整一下locale
    *   `dpkg-reconfigure locales`

2.  准备工作

*   Check out repo: [https://github.com/alibaba/tengine](https://github.com/alibaba/tengine)
*   apt install build-essential 
*   apt-get install libssl1.0-dev * Source: [https://github.com/kgretzky/evilginx/issues/2](https://github.com/kgretzky/evilginx/issues/2)*
*   apt-get install libpcre3 libpcre3-dev zlib1g-dev libgeoip-dev libgd-dev

### useradd:

<div id="crayon-59dc146c45914498522214-1" class="crayon-line"><span class="crayon-e">groupadd </span><span class="crayon-v">www</span><span class="crayon-o">-</span><span class="crayon-e">data</span></div>
<div id="crayon-59dc146c45914498522214-2" class="crayon-line crayon-striped-line"><span class="crayon-v">useradd</span> <span class="crayon-o">-</span><span class="crayon-v">s</span> <span class="crayon-o">/</span><span class="crayon-v">sbin</span><span class="crayon-o">/</span><span class="crayon-v">nologin</span> <span class="crayon-o">-</span><span class="crayon-i">g</span> <span class="crayon-v">www</span><span class="crayon-o">-</span><span class="crayon-e">data </span><span class="crayon-v">www</span><span class="crayon-o">-</span><span class="crayon-v">data</span></div>

**提示：所有组建提示lib没装的时候记得装dev的包**

**murmurhash 组件错误**：加上 **--with-cc-opt="-Wno-error"** 

Source:[https://www.linuxquestions.org/questions/slackware-arm-108/gcc-7-x-compile-issue-with-nginx-4175608107/](https://www.linuxquestions.org/questions/slackware-arm-108/gcc-7-x-compile-issue-with-nginx-4175608107/)

**ngx_http 问题：怎么装apt都不对，就直接上包了**

2. 下载 ngx_devel_kit（NDK）模块 ：[https://github.com/simpl/ngx_devel_kit/tags](https://github.com/simpl/ngx_devel_kit/tags)，不需要安装

<code class="hljs avrasm has-numbering"><span class="pln">cd </span><span class="pun">/</span><span class="pln">usr</span><span class="pun">/</span><span class="kwd">local</span><span class="pun">/</span><span class="pln">src
    wget https</span><span class="pun">:</span><span class="com">//github</span><span class="hljs-preprocessor"><span class="com">.com</span></span><span class="com">/simpl/ngx_devel_kit/archive/v0</span><span class="hljs-number"><span class="com">.3</span></span><span class="hljs-number"><span class="com">.0</span></span><span class="hljs-preprocessor"><span class="com">.tar</span></span><span class="hljs-preprocessor"><span class="com">.gz</span></span><span class="pln">
    tar </span><span class="pun">-</span><span class="pln">xzvf v0</span><span class="hljs-number"><span class="pun">.3</span></span><span class="hljs-number"><span class="lit">.0</span></span><span class="hljs-preprocessor"><span class="pun">.</span><span class="pln">tar</span></span><span class="hljs-preprocessor"><span class="pun">.</span><span class="pln">gz</span></span></code>

3. 下载最新的 lua-nginx-module 模块 ：[https://github.com/openresty/lua-nginx-module/tags](https://github.com/openresty/lua-nginx-module/tags)，不需要安装

<code class="hljs avrasm has-numbering"><span class="pln">cd </span><span class="pun">/</span><span class="pln">usr</span><span class="pun">/</span><span class="kwd">local</span><span class="pun">/</span><span class="pln">src
    wget https</span><span class="pun">:</span><span class="com">//github</span><span class="hljs-preprocessor"><span class="com">.com</span></span><span class="com">/openresty/lua-nginx-module/archive/v0</span><span class="hljs-number"><span class="com">.10</span></span><span class="hljs-number"><span class="com">.10</span></span><span class="hljs-preprocessor"><span class="com">.tar</span></span><span class="hljs-preprocessor"><span class="com">.gz</span></span><span class="pln">
    tar </span><span class="pun">-</span><span class="pln">xzvf v0</span><span class="hljs-number"><span class="pun">.</span><span class="lit">10</span></span><span class="hljs-number"><span class="lit">.10</span></span><span class="hljs-preprocessor"><span class="pun">.</span><span class="pln">tar</span></span><span class="hljs-preprocessor"><span class="pun">.</span><span class="pln">gz
       #balancer 需要10.11，需要的话从git直接clone
       # https://github.com/alexazhou/VeryNginx/issues/108
       # https://github.com/openresty/lua-resty-core/
    </span></span></code>

**LuaJit:**

<code class="hljs avrasm has-numbering"><span class="pln">cd </span><span class="pun">/</span><span class="pln">usr</span><span class="pun">/</span><span class="kwd">local</span><span class="pun">/</span><span class="pln">src
    wget http://luajit.org/download/LuaJIT-2.1.0-beta3.tar.gz</span><span class="pln">
    tar </span><span class="pun">-</span><span class="pln">xzvf LuaJIT-2.1.0-beta3.tar.gz
    cd LuaJIT-2.1.0-beta3
    make && make install
    ln -sf luajit-2.1.0-beta3 /usr/local/bin/luajit
    </span></code>

**Summary：**
```
./configure --user=www-data --group=www-data --with-http_v2_module \
     --with-http_realip_module \
     --with-http_addition_module \
     --with-http_image_filter_module \
     --with-http_geoip_module \
     --with-http_sub_module \
     --with-http_dav_module \
     --with-http_flv_module \
     --with-http_slice_module \
     --with-http_mp4_module \
     --with-http_gunzip_module \
     --with-http_gzip_static_module \
     --with-http_auth_request_module \
     --with-http_concat_module \
     --with-http_random_index_module \
     --with-http_secure_link_module \
     --with-http_degradation_module \
     --with-http_sysguard_module \
     --with-file-aio \
     --with-ipv6 \
     --with-force-exit \
     --with-mail \
     --with-mail_ssl_module \
     --with-backtrace_module \
     --with-http_stub_status_module \
     --with-luajit-lib=/usr/local/lib \
     --with-luajit-inc=/usr/local/include/luajit-2.1/ \
     --with-cc-opt="-Wno-error" \
     --add-module=/usr/local/src/lua-nginx-module \
     --add-module=/usr/local/src/ngx_devel_kit-0.3.0
```
## 4. 下载VeryNginx

他的 install.py 里面写的很清楚了 创建文件夹，复制到opt，然后复制nginx配置，done

如果遇到 balance 的问题在上面解决了，要手动复制一下lib，有问题看附上的 issue 链接，有问题就跑 error.log 看看

附上我自己的配置文件

nginx.conf

user www-data;
    worker_processes auto;

    #error_log logs/error.log;
    #error_log logs/error.log notice;
    #error_log logs/error.log info;

    #pid logs/nginx.pid;

    events {
     worker_connections 1024;
    }

    include /opt/verynginx/verynginx/nginx_conf/in_external.conf;

    http {
     include mime.types;
     default_type application/octet-stream;

     log_format main '$remote_addr - $remote_user [$time_local] "$request" '
     '$status $body_bytes_sent "$http_referer" '
     '"$http_user_agent" "$http_x_forwarded_for"';

     access_log logs/access.log main;
     sendfile on;
     #tcp_nopush on;

     #keepalive_timeout 0;
     keepalive_timeout 65;
     client_body_buffer_size 128k;

     gzip on;

     #this line shoud be include in every http block
     include /opt/verynginx/verynginx/nginx_conf/in_http_block.conf;

     server {
     listen 80;
     listen [::]:80;
     #this line shoud be include in every server block
     include /opt/verynginx/verynginx/nginx_conf/in_server_block.conf;

     # server_name example.com www.example.com; 
     return 301 https://$host$request_uri;

     }

     server {
     listen 443 ssl http2;
     listen [::]:443 ssl http2;
     ssl on;
     ssl_certificate cert/fullchain.crt;
     ssl_certificate_key cert/key.key;
     ssl_session_timeout 5m;
     ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;
     ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
     ssl_prefer_server_ciphers on;
    # 后来按照 https://mozilla.github.io/server-side-tls/ssl-config-generator/ 改了
    # 推荐上面这个地址的配置
     add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
     include /opt/verynginx/verynginx/nginx_conf/in_server_block.conf;
     location = / {
     root html;
     index index.html index.htm;
     }
     }
    }

