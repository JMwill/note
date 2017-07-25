# 爬虫问题记录

## Scrapy

同时开始进行爬虫的爬取, 除了使用官方推荐的做法外, 可以使用GUN工具:

```shell
sudo apt-get install parallel

# 安装完成后运行scrapy
scrapy list | parallel --line-buffer scrapy crawl

# 限制只执行两个scrapy任务
scrapy list | parallel --jobs 200% --line-buffer scrapy crawl
```

## Squid

squid在安装后需要进行相应的配置, 一般配置文件存在于`/etc/squid3/squid.conf`中

打开文件后对需要的部分进行相应的改动:

```shell
#############################################################################
# squid权限控制 acl和http_access
#############################################################################
acl manager proto cache_object
acl localhost src 127.0.0.1/32 ::1
acl to_localhost dst 127.0.0.0/8 0.0.0.0/32 ::1

# 局域网内的IP，看情况是否考虑需要
acl localnet src 10.0.0.0/8         # 一般大型企业或者学校使用，或者虚拟机中的网络
acl localnet src 172.16.0.0/12      # 一般很少用
acl localnet src 192.168.0.0/16     # 一般家用路由器或者虚拟机中的网络
acl localnet src fc00::/7           # IPv6
acl localnet src fe80::/10          # IPv6

# 定义ssl端口、一些安全端口和http访问的connect方法
acl SSL_ports port 443
acl Safe_ports port 80      # http
acl Safe_ports port 21      # ftp
acl Safe_ports port 443     # https
acl Safe_ports port 70      # gopher
acl Safe_ports port 210     # wais
acl Safe_ports port 1025-65535  # unregistered ports
acl Safe_ports port 280     # http-mgmt
acl Safe_ports port 488     # gss-http
acl Safe_ports port 591     # filemaker
acl Safe_ports port 777     # multiling http
acl CONNECT method CONNECT


# 推荐最小访问权限配置

# 允许本机管理缓存，其他的拒绝
http_access allow manager localhost
http_access deny manager

# 拒绝非安全端口
http_access deny !Safe_ports

# 拒绝connect到非ssl 443端口（上面定义了）
http_access deny CONNECT !SSL_ports

# 强烈建议去除注释。防止通过代理来访问本代理服务器上的web程序
# 以免认为是localhost用户访问web服务。
#http_access deny to_localhost

# 下面插入你自己的规则
#---------

# 允许localhost和局域网内用户的请求，根据需要调整
http_access allow localnet
http_access allow localhost

# 最后，拒绝其他的对代理的访问
http_access deny all

#############################################################################
##   Squid的基本配置
#############################################################################
# 默认监听3128端口
http_port 3128

# 设置对外显示的主机名
visible_hostname proxy.daoiqi.com


#############################################################################
###    squid缓存配置
#############################################################################
# 建议最少使用下面一行
hierarchy_stoplist cgi-bin ?

# 去除注释并调整下面这行语句来增加一个磁盘缓存目录
#cache_dir ufs /var/spool/squid 100 16 256

# 将核心输出保存在第一个缓存目录
coredump_dir /var/spool/squid

# 添加自己的刷新缓存的正则
refresh_pattern ^ftp:       1440    20% 10080
refresh_pattern ^gopher:    1440    0%  1440
refresh_pattern -i (/cgi-bin/|\?) 0 0%  0
refresh_pattern .       0   20% 4320
```

别人使用的一份修改过的配置文件

```shell
#############################################################################
# squid权限控制 acl和http_access
#############################################################################
acl manager proto cache_object
acl localhost src 127.0.0.1/32 ::1
acl to_localhost dst 127.0.0.0/8 0.0.0.0/32 ::1

# 声明我的IP，来自我的IP，可以请求squid。注意一定要有掩码
acl myip src 121.14.10.9/32

# 局域网内的IP，看情况是否考虑需要
acl localnet src 10.0.0.0/8         # 一般大型企业或者学校使用，或者虚拟机中的网络
acl localnet src 172.16.0.0/12      # 一般很少用
acl localnet src 192.168.0.0/16     # 一般家用路由器或者虚拟机中的网络
acl localnet src fc00::/7           # IPv6
acl localnet src fe80::/10          # IPv6

# 定义ssl端口、一些安全端口和http访问的connect方法
acl SSL_ports port 443
acl Safe_ports port 80      # http
acl Safe_ports port 21      # ftp
acl Safe_ports port 443     # https
acl Safe_ports port 70      # gopher
acl Safe_ports port 210     # wais
acl Safe_ports port 1025-65535  # unregistered ports
acl Safe_ports port 280     # http-mgmt
acl Safe_ports port 488     # gss-http
acl Safe_ports port 591     # filemaker
acl Safe_ports port 777     # multiling http
acl CONNECT method CONNECT


# 推荐最小访问权限配置

# 允许本机管理缓存，其他的拒绝
http_access allow manager localhost
http_access deny manager

# 拒绝非安全端口
http_access deny !Safe_ports

# 拒绝connect到非ssl 443端口（上面定义了）
http_access deny CONNECT !SSL_ports

# 强烈建议去除注释。防止通过代理来访问本代理服务器上的web程序
# 以免认为是localhost用户访问web服务。
#http_access deny to_localhost

# 下面插入你自己的规则
#---------
# 允许我的IP访问squid
http_access allow myip


# 允许localhost和局域网内用户的请求，根据需要调整
http_access allow localnet
http_access allow localhost

# 最后，拒绝其他的对代理的访问
http_access deny all

#############################################################################
##   Squid的基本配置
#############################################################################
# 默认监听3128端口
http_port 3128

# 设置对外显示的主机名
visible_hostname proxy.daoiqi.com

# 对于本地配置hosts的网站，没有此配置，squid无法访问本地的hosts。
# 但是官网文档默认值就是/etc/hosts，我要显示声明才有效。
hosts_file /etc/hosts

#############################################################################
###    squid缓存配置
#############################################################################
# 建议最少使用下面一行
hierarchy_stoplist cgi-bin ?

# 去除注释并调整下面这行语句来增加一个磁盘缓存目录
#cache_dir ufs /var/spool/squid 100 16 256

# 将核心输出保存在第一个缓存目录
coredump_dir /var/spool/squid

# 添加自己的刷新缓存的正则
refresh_pattern ^ftp:       1440    20% 10080
refresh_pattern ^gopher:    1440    0%  1440
refresh_pattern -i (/cgi-bin/|\?) 0 0%  0
refresh_pattern .       0   20% 4320
```

其中默认的log路径为: `/var/log/squid/`
