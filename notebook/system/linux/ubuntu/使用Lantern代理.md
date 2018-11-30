# 使用Lantern进行代理

使用Lantern的时候, 可以直接设置为代理全部流量, 这个时候流量就全部经由蓝灯转发, 直接就可以访问墙外的东西. 但是这样子会造成访问无需翻墙的资源变得更慢, 同时, 也造成不多的免费额度的浪费, 因此可以通过结合[SwitchyOmega][1], 或者在Github上下载最新[安装包][2]. 并结合[教程]设置好SwitchyOmega.

设置完后, 需要自行新建一个情景模式: pac情景模式, 命名随意. 创建完成后, 在pac网址处写入Lantern的pac文件地址, 在Ubuntu中可以通过: 系统设置 -> 网络 -> 网络代理 -> 配置URL. 找到Lantern的pac文件地址. 复制后写入刚创建的情景模式的PAC网址中. 点击更新情景模式.

在更新成功后, 将之前得到的默认SwitchyOmega的"自动切换"模式中的: 规则列表规则选为刚创建的模式, 就能够实现根据被墙网址自动切换代理.

[1]: https://chrome.google.com/webstore/detail/proxy-switchyomega/padekgcemlokbadohgkifijomclgjgif?hl=zh-CN
[2]: https://github.com/FelisCatus/SwitchyOmega/releases
[3]: https://github.com/FelisCatus/SwitchyOmega/wiki/GFWList
