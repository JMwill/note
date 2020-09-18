# 第三部分

## 存储媒介

相关命令：

- `mount` 挂载一个文件系统
- `umount` 卸载一个文件系统
- `fsck` 检查和修复一个文件系统
- `fdisk` 分区表控制器
- `mkfs` 创建文件系统
- `fdformat` 格式化一张软盘
- `dd` 以数据块的形式直接写入到设备
- `genisoimage` 创建一个 ISO 9660 的映像文件
- `md5sum` 计算 MD5 校验码

### mount

不带参数的 mount 命令会打印出已经挂载的设备的路径与名称

在使用 `umount` 命令之后可以通过 `mount` 再次把设备挂上：`mount -t iso9660 /dev/device/path mount/folder`

挂载点：`mount/folder` 其实就是一个文件夹，设备可以挂载在任何一个文件夹上，但是如果挂载的文件夹内含有文件，那么在挂载设备期间，原有的内容将不能访问到，因为被设备占用了

`-t` 后面指定文件系统类型

### fdisk

一般而言如果想要与类磁盘设备交互可以先将设备卸载，然后调用 `fdisk` 程序：`fdisk /dev/device/path` 后面按照提示与手册可以编辑、删除和创建分区

`mkfs` 则是可以用来创建一个新的文件系统，用 `-t` 来指定文件系统类型：`mkfs -t ext3 /dev/device/path`

### dd

`dd` 命令可以直接将数据移入移出设备，`dd if=input_file of=output_file` 假设要复制挂载设备的全部内容一般形式可以为：`dd if=/dev/sdb of=~/filename.img` ****小心对待 if 与 of 两者，使用错误的话会将设备的内容抹除****

### genisoimage

`genisoimage -o output-file-name.iso -R -J ~/target/folder`，`-R` 以及 `-J` 的效果都是允许长文件名，`-R` 还有是允许使用 POSIX 风格的文件权限

生成出来的文件可以当作一个设备来通过 `mount` 命令挂载 `mount -t iso9660 -o loop output-file-name.iso /mount/folder`，这样挂载点 `/mount/folder` 就挂载了映像文件

### md5sum

对于生成出来的文件可以通过 `md4sum` 程序生成文件的 checksum 值，用于在分发文件时给使用者校验文件完整性。或者可以用于检查下载的文件的完整性

## 网络系统

相关命令：

- `ping` 发送 ICMP ECHO_REQUEST 数据包到网络主机
- `traceroute` 输出网络主机的路由数据包
- `netstat` 输出网络连接、路由表、接口统计数据、伪装连接和多路广播成员
- `wget` 非交互式网络下载器
- `ssh` OpenSSH SSH 客户端（远程登录程序）

`ping`、`traceroute` 、`netstat` 三者是用于查看检查、观测网络状态的工具

## 查找文件

相关命令：

- `locate` 通过名字查找文件
- `find` 在一个目录层次结构中搜索文件

经常与文件搜索命令一起使用的命令，用于处理搜索到的文件列表：

- `xargs` 从标准输入生成和执行命令行

协助探索的命令：

- `touch` 更改文件时间
- `stat` 显示文件或文件系统状态

`locate bin/zip` 会搜索任何包含字符串 “bin/zip”的路径名

### find

通过 `find` 命令可以搜索到符合特定条件的文件：`find ~ -type f | wc -l` 搜索 `~` 目录下的普通类型的文件

type 的类型有：

- `b` 块特殊设备文件
- `c` 字符特殊设备文件
- `d` 文件夹
- `f` 普通文件
- `l` 符号链接

还可以通过增加 `name` 以及 `size` 选项对文件进行过滤，size 选项的 `+` 代表文件需要大于等于后接的大小量词，如果是 `-` 的话则是小于等于，不带符号则是精确匹配大小。其中大小单位有：

- `b` 默认单位，512 字节块
- `c` 字节
- `w` 两个字节的字
- `k` 千字节（1024 个字节单位）
- `M` 兆字节（1024k 个字节单位）
- `G` 千兆字节（1024M 个字节单位）

还有很多的匹配条件可以通过查看手册获得

同时还可以对测试条件进行组合：`find ~ \( -type f -not -perm 0600 \) or \( -type d -not -perm 0700 \)`，查找权限不是 0700 的文件夹或者权限不是 0600 的文件，通过使用条件进行组合进行更复杂的查找，条件有：

- `-and/-a` 与操作符，测试条件没有使用操作符时默认用的就是与操作符
- `-or/-o` 或操作符
- `-not/!` 非操作符
- `()` 组操作符，一般使用时会转义

find 命令中包含有一些预定义操作：

- `-delete` 删除当前匹配的文件
- `-ls` 执行等同于 `ls -dils` 命令并输出到标准输出
- `-print` 默认操作
- `-quit` 找到一个匹配的就退出

用户定义行为：通过使用 `-exec command {} ;` 实现，因为 `{}` 以及 `;` 在 shell 中有特殊含义，所以需要转义或者单引号包括起来：`find ~ -type f -name 'foo*' -exec ls -l '{}' ';'` 这里的 ls 每次有一个输出就会调用一次 ls 命令，使用 `find ~ -type f -name 'foo*' -exec ls -l '{}' +` 则是只会调用一次，将所有结果输入到 ls 命令中去。

find 命令还有一些选项：

- `-depth` 用于指示 find 程序先处理目录中的文件，在应用 `-delete` 行为时是默认启用的
- `-mount` 指示 find 不要搜索挂载到其他文件系统上的目录
- `-maxdepth levels` 应用测试条件和行为的时候，设置 find 程序深入目录树的最大级别数
- `-mindepth levels` 应用测试条件和行为之前，设置 find 程序深入目录数的最小级别数
- `-noleaf` 搜索 DOS/Windows 文件系统和 CD/ROMS 的时候，需要这个选项

### xargs

`xargs` 命令可以为后续命令构建参数列表：`find ~ -type f -name 'foo*' | xargs ls -l`。但是由于有些文件名称包含空格，这会导致后续命令将其作为两个输入，因此在使用 xargs 时，可以通过使用选项：`--null/-0` 来接受 null 字符来作为参数分隔符来避免：`find ~ -iname '*.jpg' -print0 | xargs --null ls -l`

### touch

`touch` 命令用于设置或更新文件的访问、更改和修改时间，而如果文件不存在则会新建一个文件

`stat` 命令则是可以展示系统对某个文件及其属性等全部信息

## 归档和备份

相关命令：

压缩程序

- `gzip` 压缩或展开文件
- `bzip2` 块排序文件压缩器

归档程序

- `tar` 磁带打包工具
- `zip` 打包和压缩文件

文件同步

- `rsync` 同步远端文件和目录

### gzip

`gzip` 命令用于压缩文件，如果需要压缩目录内文件则需要添加 `-r` 选项，之后文件夹内的文件会被逐个压缩

压缩后的文件在需要解压时可以使用 `gzip -d filename.txt.gz` 相当于 `gunzip` 命令的效果

需要浏览压缩文本文件的内容可以使用 `gunzip -c filename.txt.gz | less` 相当于 `zcat filename.txt.gz | less` 也可以是 `zless filename.txt.gz`

- `-l` 会列出每个压缩文件的压缩数据
- `-t` 测试压缩文件的完整性，结合 `-v` 使用可以看到测试结果
- `-number` 则是用于指定压缩等级（1 ～ 9 之间），默认为 6

bzip2 的使用与 gzip 基本一样，只是压缩级别的选项含义不太一样。同时具有 `bunzip2` 等工具

### tar

`tar` 命令用于将一大堆文件/文件夹捆绑成一个大文件。使用方式为：`tar mode[options] pathname`

其中常用的 mode 有：c、x、A、t，c：创建捆绑，x：松绑，A：追加档案，t：列出内容

一般创建归档文件：`tar cfv name.tar target/folder`

列出详细内容：`tar tfv name.tar`

tar 创建出来的归档文件内的文件在创建时如果使用的是相对路径，那么在解压时，得到的文件夹内的文件路径是压缩时展开的文件路径。比如压缩时：`tar cf name.tar ~/target/folder`，解压时解压在文件夹：myfolder 内，那么得到的是：`myfolder/home/username/target/folder/...` 这种结果

只恢复某个文件时必须要输入精确的路径名称：`tar xf ../name.tar --wildcards 'home/username/target/folder/filename'` 其中使用 `--wildcards` 选项允许支持通配符，但是不是所有版本的 tar 都支持

find 命令和 tar 命令常常组合使用：`find /folder -name 'filename' | tar cf - --file-from=- | gzip > folder.tgz`，`-` 用来表示标准输入/输出，其实 tar 可以直接支持压缩，使用 `tar czf filename.tgz` 就可以，`czf` 是用 gzip 压缩，`cjf` 使用 bzip2 压缩。压缩后的文件的文件名通常命名为：`.tgz` 或者 `.tar.gz`

结合使用 tar 以及 ssh 还可以从远端传输目录到本地：`ssh remote-sys 'tar cf - foldername' | tar xf -`

### rsync

`rsync` 命令用于同步文件与目录：`rsync options source destination`

source 以及 destination 需要是一下之一，其中之一必须要是本地。：

- 本地文件或目录
- 远端文件或目录，以 `[user@]host:path` 的形式存在
- 远端 rsync 服务器，由 `rsync://[user@]host[:port]/path` 指定

一般用法：`rsync -av /source/folder /destination/folder`，`-a` 表示递归并保护文件属性，`-v` 表示冗余输出

如果命令带有 `--delete` 选项则会在将 destination 中存在而 source 中不存在的文件删除

加上 `--rsh=ssh` 则表明使用 ssh 程序作为远程 shell 进行加密传输，但是需要远端安装 ssh。

rsync 像 cp 命令一样，可以同时将多个源同步到一个目标中去

## 正则表达式
