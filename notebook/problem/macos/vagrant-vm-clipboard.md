# MacOS 中的 Vagrant 内虚拟机复制内容到本地 clipboard 上

## 安装 X11

MacOS 系统需要安装 [XQuartz][1]

## 设置 Vagrantfile

```vagrantfile
Vagrant.configure(2) do |config|
  ...
  config.ssh.forward_agent = true
  config.ssh.forward_x11 = true
end
```

## 安装 xauth

Ubuntu/Debian/Linux Mint，Kali 等 Linux 系统，执行以下命令：`sudo apt-get install xauth`

CentOS 7 以下，Fedora 21 以下，执行命令：`yum install xorg-x11-xauth`

## 完成

基本上，执行上述的安装后就能够实现启动 虚拟机 内要求界面存在的应用，如：xclock 等，但有时候使用 xsel、xclip 等可能会发现不起效果，可以先启动一个会弹出界面的应用，emacs、xclock 等，让 X11 跟 虚拟机正确通信，关掉界面后 xsel 等工具就可以正常使用了。

[1]:  https://support.apple.com/zh-cn/HT201341