# 记录遇到的一些有用的 Bash 工具的用法

## grep

使用`grep`可以查找文件中需要的内容, 而当不仅仅需要某个内容, 同时还需要对应内容上下的一些部分的时候, 可以这样使用:

```bash
$ grep -C 10 "hello" file1 file2 # 查找到对应行后, 上下各额外保留10行
$ grep -B 3 -A 4 "hello" file1 file2 # 查找到对应行后, 上面保留3行, 下面保留4行
```

`grep`中, 如果需要使用正则表达式, 由于默认支持的是基本正则, 对于一些像`\d`等的匹配模式无法使用, 可以通过添加`-P`参数来使用 Perl 模式的正则表达式

## ssh

要保持连接不断开，可以在客户端的 `/etc/ssh/sshd_config` 里面设置：`ServerAliveInterval: 100` 保持连接 100
秒，或者在服务器端的 `/etc/ssh/sshd_config` 设置:

```
TcpKeepAlive yes
ClientAliveInterval: 100
ClientAliveCountMax: 60
```

以上设置保持连接 100 \* 60 秒，也就是 100 分钟。
