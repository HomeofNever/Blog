# Load Image on Synology and change boot cfg

```
sudo -i
mkdir -p /tmp/boot
```

```
cd /dev
mount -t vfat synoboot1 /tmp/boot/ # if synoboot is broken, it typically mapped to sr1
cd /tmp/boot/
# Your changes
```

```
reboot
```


## Emby


```
#!/bin/sh
cd /var/packages/EmbyServer/target/mono/bin
curl https://raw.githubusercontent.com/s1oz/embyonekey/master/mb3admin.com.cert.pem >> /etc/ssl/certs/ca-certificates.crt
./cert-sync /etc/ssl/certs/ca-certificates.crt
cd /usr/local/etc/nginx/conf.d/*-*-*-*
wget https://raw.githubusercontent.com/s1oz/embyonekey/master/user.conf
nginx -s reload
```

remember to reload Emby store