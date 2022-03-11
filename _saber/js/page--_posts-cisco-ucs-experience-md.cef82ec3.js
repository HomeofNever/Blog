(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{163:function(e,t,a){"use strict";a.r(t);var s=a(0),n=function(e){var t,a,s,n,o,c,r,i,p,l=(t="CMIC",a="KVM",o=void 0,c="Flash",r="Cisco",i="更新固件",p="错误提示",(s={}).type=n="post",s.internal=o,s.contentType="markdown",s.slug="cisco-ucs-experience",s.content=o,s.createdAt=new Date(16468704e5),s.updatedAt=new Date(1646976331792),s.title="老IPMI折腾记",s.tags=[t,c,a,r],s.categories=["搞机"],s.layout=n,s.date="2022-03-10",s.markdownHeadings=[{text:t,slug:"cmic",level:2},{text:a,slug:"kvm",level:3},{text:"CMIC KVM",slug:"cmic-kvm",level:4},{text:"SuperMicro KVM",slug:"supermicro-kvm",level:4},{text:i,slug:i,level:2},{text:p,slug:p,level:3},{text:"Decryption failed",slug:"decryption-failed",level:3},{text:"Extraction Failed",slug:"extraction-failed",level:3},{text:"更新CMIC",slug:"更新cmic",level:3}],s.excerpt="<p>最近入手了一个很老的Cisco UCS C240 M3S机器，遇到了不少麻烦，记录的同时吐槽一下</p>\n",s.permalink="/2022/03/10/cisco-ucs-experience",s.assets={},s.attributes=s,s.tagsInfo=[{name:t,permalink:"/blog/tag/cmic"},{name:c,permalink:"/blog/tag/flash"},{name:a,permalink:"/blog/tag/kvm"},{name:r,permalink:"/blog/tag/cisco"}],s.categoriesInfo=[{name:"搞机",permalink:"/blog/category/搞机"}],s),v=e.options.beforeCreate||[];e.options.beforeCreate=[function(){this.$page=l}].concat(v);["layout","transition"].forEach((function(t){var a=e.options.PageComponent;a&&(e.options[t]=a[t]),void 0===e.options[t]&&(e.options[t]=l[t])})),l.slug&&(e.options.name="page-wrapper-"+l.slug.replace(/[^0-9a-z\-]/gi,"-"))},o=Object(s.a)({},(function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("layout-manager",[s("p",[e._v("最近入手了一个很老的Cisco UCS C240 M3S机器，遇到了不少麻烦，记录的同时吐槽一下")]),e._v(" "),s("figure",[s("saber-image",{attrs:{src:a(72),alt:"","data-lazy":"{}"}})],1),e._v(" "),s("h2",{attrs:{id:"cmic"}},[e._v("CMIC")]),e._v(" "),s("p",[e._v("3.0这个版本的CMIC还是在用Flash！但是还好因为Flash游戏的流行，有开源项目专门做浏览器帮助用户使用Flash。亲测 "),s("saber-link",{attrs:{to:"https://github.com/radubirsan/FlashBrowser"}},[e._v("https://github.com/radubirsan/FlashBrowser")]),e._v(" 可用")],1),e._v(" "),s("h3",{attrs:{id:"kvm"}},[e._v("KVM")]),e._v(" "),s("p",[e._v("KVM的话，一般是Java，这个可以尝试用 "),s("saber-link",{attrs:{to:"https://github.com/AdoptOpenJDK/IcedTea-Web"}},[e._v("IcedTea-Web")]),e._v(" 解决。")],1),e._v(" "),s("h4",{attrs:{id:"cmic-kvm"}},[e._v("CMIC KVM")]),e._v(" "),s("blockquote",[s("p",[s("saber-link",{attrs:{to:"https://community.cisco.com/t5/cisco-bug-discussions/cscvs11682-c220-c240-m3-server-need-html5-support-for-cimc-webui/td-p/4144939"}},[e._v("https://community.cisco.com/t5/cisco-bug-discussions/cscvs11682-c220-c240-m3-server-need-html5-support-for-cimc-webui/td-p/4144939")])],1)]),e._v(" "),s("blockquote",[s("p",[e._v("There is a workaround I was made aware of recently which uses the API on the UCS server to make a call directly to obtain the Java KVM console. I have tested this and although you don't get the GUI, you get the full console functionality (turn on/off, mount virtual images to upgrade, etc):\n"),s("code",{pre:!0},[e._v("https://<CIMC_IP>/kvm.jnlp?cimcAddr=<CIMC_IP>&tkn1=<CIMC_username>&tkn2=<CIMC_Password>")])])]),e._v(" "),s("p",[e._v("可以通过直接访问API拿到JNLP，拿到以后信息不变可以反复使用，也可以直接编辑这个文件，里面的内容也挺直接的。里面是包含了账号密码的，要小心保管")]),e._v(" "),s("h4",{attrs:{id:"supermicro-kvm"}},[e._v("SuperMicro KVM")]),e._v(" "),s("p",[e._v("SuperMicro的机器似乎会每次动态生成JNLP的验证，但是还好他们的网页不需要Flash。")]),e._v(" "),s("h2",{attrs:{id:"更新固件"}},[e._v("更新固件")]),e._v(" "),s("p",[e._v("这个简直就是头大的不行。他们的firmware似乎是只提供HUU(Cisco UCS Host Upgrade Utility)，然后这个镜像如果直接做成U盘，每次都会卡死在906复制文件错误。试过了Rufus和DD直接写都不行，但是用"),s("code",{pre:!0},[e._v("virtual media")]),e._v("挂载是可以的！太糙了，这是什么神奇操作……")]),e._v(" "),s("p",[e._v("HUU不方便那就提取出来走Webui试试看好了，但是！他们的HUU提取是要用专门的程序"),s("code",{pre:!0},[e._v("getfw")]),e._v("。他们的固件默认是加密打包好了的所以直接拆还挺麻烦的，但是这个程序真的emmm要求特别多：首先要"),s("code",{pre:!0},[e._v("squashfs")]),e._v("，然后"),s("code",{pre:!0},[e._v("openssl")]),e._v("版本要"),s("code",{pre:!0},[e._v("1.0.1")]),e._v("e，然后还是直接从"),s("code",{pre:!0},[e._v("PATH")]),e._v("读取的。要不是"),s("saber-link",{attrs:{to:"https://blog.jamiescott.me/extract-cisco-ucs-firmware-from/"}},[e._v("这篇博客")]),e._v("我真的要放弃了")],1),e._v(" "),s("h3",{attrs:{id:"错误提示"}},[e._v("错误提示")]),e._v(" "),s("h3",{attrs:{id:"decryption-failed"}},[e._v("Decryption failed")]),e._v(" "),s("p",[e._v("openssl版本不对")]),e._v(" "),s("div",{pre:!0,attrs:{class:"saber-highlight","data-lang":"bash"}},[s("pre",{pre:!0,attrs:{class:"saber-highlight-code language-bash"}},[s("code",{pre:!0,attrs:{class:"language-bash"}},[s("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# Set up openssl")]),e._v("\n"),s("span",{pre:!0,attrs:{class:"token function"}},[e._v("wget")]),e._v(" https://ftp.openssl.org/source/old/1.0.1/openssl-1.0.1e.tar.gz\n"),s("span",{pre:!0,attrs:{class:"token function"}},[e._v("tar")]),e._v(" -zxvf openssl-1.0.1e.tar.gz\n"),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[e._v("cd")]),e._v(" openssl-1.0.1e\n./config\n"),s("span",{pre:!0,attrs:{class:"token function"}},[e._v("make")]),e._v("\n\n"),s("span",{pre:!0,attrs:{class:"token function"}},[e._v("sudo")]),e._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[e._v("su")]),e._v("\n"),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[e._v("export")]),e._v(" "),s("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s("span",{pre:!0,attrs:{class:"token environment constant"}},[e._v("PATH")])]),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),s("span",{pre:!0,attrs:{class:"token string"}},[e._v('"/path/to/openssl-1.0.1e/apps:'),s("span",{pre:!0,attrs:{class:"token environment constant"}},[e._v("$PATH")]),e._v('"')])])])]),s("h3",{attrs:{id:"extraction-failed"}},[e._v("Extraction Failed")]),e._v(" "),s("p",[e._v("如果你直接用本地正在mount的iso，拷贝单独的一份出来")]),e._v(" "),s("h3",{attrs:{id:"更新cmic"}},[e._v("更新CMIC")]),e._v(" "),s("p",[e._v("然后就是HUU更新有的时候还是不行，CMIC我当时直接更新还是失败")]),e._v(" "),s("blockquote",[s("p",[e._v("网页提示 "),s("code",{pre:!0},[e._v("Error while updating: invalid file name CIMC")]),e._v("\n然后remote http download百分之5直接reset\nHUU 提示自己内存不够是否确认重启CMIC")])]),e._v(" "),s("p",[e._v("然后我发现HUU没有成功重启CMIC！我自己重启了一遍就好了，真的佛了")]),e._v(" "),s("p",[s("strong",[e._v("多试试重启！！！")])])])}),[],!1,null,null,null);"function"==typeof n&&n(o);t.default=o.exports},72:function(e,t,a){e.exports={srcSet:a.p+"07dd1ac95af4b123fbdca1ee9d62df34-1200.jpg 1200w,"+a.p+"fcae6716749b1dbccd19939955eb69e1-720.jpg 720w,"+a.p+"89977447d7da39d2f27e60ca161b5f06-480.jpg 480w",images:[{path:a.p+"07dd1ac95af4b123fbdca1ee9d62df34-1200.jpg",width:1200,height:900},{path:a.p+"fcae6716749b1dbccd19939955eb69e1-720.jpg",width:720,height:540},{path:a.p+"89977447d7da39d2f27e60ca161b5f06-480.jpg",width:480,height:360}],src:a.p+"07dd1ac95af4b123fbdca1ee9d62df34-1200.jpg",toString:function(){return a.p+"07dd1ac95af4b123fbdca1ee9d62df34-1200.jpg"},placeholder:"data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAUDBAQEAwUEBAQFBQUGBwwIBwcHBw8LCwkMEQ8SEhEPERETFhwXExQaFRERGCEYGh0dHx8fExciJCIeJBweHx4BBQUFBwYHDggIDh4UERQeHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHv/AABEIAB4AKAMBEQACEQEDEQH/xAGiAAABBQEBAQEBAQAAAAAAAAAAAQIDBAUGBwgJCgsQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+gEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoLEQACAQIEBAMEBwUEBAABAncAAQIDEQQFITEGEkFRB2FxEyIygQgUQpGhscEJIzNS8BVictEKFiQ04SXxFxgZGiYnKCkqNTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqCg4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2dri4+Tl5ufo6ery8/T19vf4+fr/2gAMAwEAAhEDEQA/AOn8Z/E+fRNKuZbW3tmu4490YlDFCfcAg9PevKhT5nY9Cc7I4v4UftAeIvE/xH03w1q+n6Jb2V20qyTQJIrptidhyzkdVA6dM1tUw0YxbRjCs5Ssy1+0H4qtLCLw5qMEUN/DBeifBcGKZMZxkZ4yhHSlhI2ldjxLukct+z9rNjP4mcRRokrWexn6fekTI/T9K6qi0OeMktT6Y8I3BbVr4OhEcV5EikjhgIomJHqNxP5Gsi9z5R+M2ox2+mCaR2UTLsHHXIxWdFXZrV2PNPA8gtPEOlaraX0Mt4peQRhjGsWNwId2GMkc8ZGCOc8V0VE5RcTKl7slJnoXi3S/Fuv+FdMtbjRhbW2n+YEkhUCNkZ1VB97PAPJI7k88mleCk5R6/gS1NpRl0/E2NGaTQ9H07QtRs7RQuM3SKMvyf9nLDJ9D09q5ZVajqXT0CUUtJK6NnxN431q2+06dBfJZWXmKkNxIB5ZXGf4VKscA5xxkjpXRStOz6lfDCy0R5zqk954/077JpGhXE8VsgeSW5fYA/UhVXluvr/MCiEHCXvOxpKSmvdVyjd6H4V8M2M+m6jqCXGqXSAw/Zck2jDqHJGCCCCcDquM96iFStOaaS5f62HKNKMWnudz8KDHpPhy+u4tTaVp+fsz5kQIgI3tgg/xEnGccelZYnEuHwxuyqOG9ort2O78J6tKL8pJJ4fOmq8e83NnNyoBJKlyBjuQAf8fNjmsFNRqRtfrdfLRa/gdby6XK3F3t6/8ADHEftEWuiLcm50q4tgoufPWaLlWzubylwcdSOe3FexR0kzhqr3UeVW/iC+s9JYadcXFqySHGJcgRtxszgHrzn3rrlGL6HOpS2uUtNjl1DUFC7Vd1C7nYngjkdOnX8+9YylyouMeZnsHg7RdP03R4LZoRLKExJPjDOc8n+n0rgqScpXO2muVWO38M6PpqP9oNnG7IMAtlsfTNZRpRWqRq5t7s4L4x+H9R8SeK9P0+0nt4Igqogd2A3MeuAD6fp+XdTqRpU3J9DjrRcpJI/wD/2Q==",width:1200,height:900}}}]);