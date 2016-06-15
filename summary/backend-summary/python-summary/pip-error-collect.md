# 在linux系统上进行开发时，会遇到很多的安装问题，在这里进行一些常见问题的收集

## Centos上安装

1. pip安装pylibmc出现的` command 'gcc' failed with exit status 1`问题，这个问题的成因有可能是因为没有正确安装libmemcached-devel这一模块，因此需要对特定的系统进行memecached模块的安装，最近在centos上花费的模块安装时间比较多，因此提供一段安装脚本。

```
#!/bin/bash

# How to install memcached on CentOS 6.5

# Install dependencies
yum install cyrus-sasl-devel zlib-devel gcc-c++

# Get the latest libmemcached
wget https://launchpad.net/libmemcached/1.0/1.0.16/+download/libmemcached-1.0.16.tar.gz
tar -xvf libmemcached-1.0.16.tar.gz
cd libmemcached-1.0.16

# Compile and install liblmemcached with sasl disabled
# ./configure --disable-memcached-sasl

# don't use --disable-memcached-sasl
./configure --enable-sasl
sudo make && sudo make install

yum install libmemcached-devel
```

进行上述的安装之后，一般就能够进行pylibmc的安装，如果在进行configure的时候使用了disable-memcached-sasl的参数的话，会导致pylibmc使用时出现sasl缺失的错误。

## Ubuntu上安装

安装的步骤：首先安装一些python开发环境需要的依赖`sudo apt-get install -y libmemcached-dev zlib1g-dev libssl-dev python-dev python-pip build-essential libevent-dev libjpeg-dev libxml2-dev libxslt1-dev`，然后再进行pylibmc的安装`sudo pip install pylibmc`