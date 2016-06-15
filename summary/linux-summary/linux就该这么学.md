## 第一章

### KVM使用

在linux上安装系统，可以使用KVM技术，判断是否可用`grep vmx /proc/cpuinfo`查看是否有输出vmx或svm值，前者代表Inter处理器的虚拟技术，后者AMD处理器。

如果支持需要安装相关依赖软件包：
```
yum -y groupinstall "Virtualization Host"

安装完成后

yum -y install virt-{install,viewer,manager}
```

为了让KVM中虚拟机相互共享数据，需要配置真实机的网络

```
让系统支持ipv4转发功能
echo "net.ipv4.ip_forward=1" > /etc/sysctl.d/99-ipforward.conf

让转发功能立即生效
sysctl -p /etc/sysctl.d/99-ipforward.conf
net.ipv4.ip_forward=1
```

将网卡配置文件中的IP地址、子网掩码等信息注释后追加参数`BRIDGE=virbr0`（设置网卡为桥接模式）：

```
vim /etc/sysconfig/network-scripts/ifcfg-eno16777736
DEVICE="eno16777736"
ONBOOT=yes
# IPADDR="192.168.10.10"
# GATEWAY="192.168.10.1"
HWADDR="网卡的MAC地址"
# DNS1="192.168.10.1"
BRIDGE=virbr0
```

创建用于桥接网卡的配置文件（类似于上面的文件）：

```
vim /etc/sysconfig/network-scripts/ifcfg-virbr0

DEVICE="virbr0"
TYPE=BRIDGE
ONBOOT=yes
BOOTPROTO=static
IPADDR="192.168.10.10"
NETMASK="255.255.255.0"
GATEWAY="192.168.10.1"
DNS1="192.168.10.1"
```

上面的工作做完并重启后进行下面的检查工作：

```
检查kvm是否加载以及正常使用cpu虚拟化功能：
lsmod | grep kvm
> kvm_intel 138567 0
> kvm441119 1 kvm_intel

检查桥接的网卡配置是否启动成功；
ip show virbr0
> 3: virbr0:<BROADCAST,MI...

获取虚拟机列表（默认为空是正常的）
virsh -c qemu:///system list
> Id Name State
```

然后使用`virt-manager`来配置虚拟机参数，至此在linux上安装其他系统就完成了

### 配置VNC服务程序

VNC虚拟网络计算机在Red Hat 7上需要安装服务软件包：`tigervnc-server`，`yum install tigervnc-server`

详细内容在28页

### 重置root用户密码

登陆系统后，判断是否是RHEL7：`cat /etc/redhat`

以下操作对RHEL7适用：开机后在内核上敲击“e”。然后在linux16后面输入“rd.break”并敲击“ctrl-x”。进入到系统的求援模式。依次输入下列命令：

```
mount -o remount.rw /sysroot
chroot /sysroot
echo "linuxprobe" | passwd --stdin root
touch /.autorelabel
exit
reboot
```

### 安装VMwareTools

在虚拟软件上选择安装VMwareTools后，按照下列步骤执行：

```
mkdir -p /media/cdrom

mount /dev/cdrom /media/cdrom

cd /media/cdrom

cp VMwareTools-...tar.gz /home

cd /home

tar xzvf VMwareTools-...tar.gz

cd vmware-tools-distrib/

./vmware-install.pl -d

reboot
```

### 软件包管理器rpm

- 安装软件：rpm -ivh filename.rpm
- 升级软件：rpm -Uvh filename.rpm
- 卸载软件：rpm -e filename.rpm
- 查询软件的描述信息：rpm -qpi filename.rpm
- 列出软件的文件信息：rpm -qpl filename.rpm
- 查询文件属于哪个RPM：rpm -qf filename

### yum软件仓库

所有yum仓库的配置文件都需要以`.repo`结尾并存放在`/etc/yum.repos.d/`目录中，配置方法如下：

```
[rhel-media]:yum 源名称，可以自定义
baseurl=file:///media/cdrom:提供方式包括FTP(ftp://..)、HTTP(http://..)、本地(file://..)
enabled=1:设置这个源是否可用，1为可用，0为禁用
gpgcheck=1:设置这个源是否校验文件，1为校验，0为不校验
gpgkey=file:///media/cdrom/RPM-GPG-KEY-redhat-release:若为校验需要指定公钥文件地址
```

yum命令

```
yum repolist all        列出所有仓库
yum list all            列出仓库中所有软件包
yum info 软件包名称     查看软件包信息
yum install 包名        安装软件包
yum reinstall 包名      重新安装
yum update 包名         升级包
yum remove 包名         移除包
yum clean all           清除所有仓库缓存
yum check-update        检查可更新的软件包
yum grouplist           查看系统中已经安装的软件包组
yum groupinstall 软件包组       安装指定的软件包组
yum groupremove 软件包组        删除指定软件包组
yum groupinfo 软件包组          查询指定软件包组信息
```



