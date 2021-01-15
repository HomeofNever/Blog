## Route

客户端访问 1.2.3.4

如果 route 是 1.2.3.0/24 dev eth0
系统会在 eth0 上发 who-has 1.2.3.4

如果 route 是 1.2.3.0/24 via 10.0.0.1 dev eth0
系统会在 eth0 上发 who-has 10.0.0.1

然后系统会把这个包扔给得到的那个 mac