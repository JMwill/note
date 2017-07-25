# 第一章

## 典型的JavaScript应用程序剖析

大多数程序都有相似的关注点, 包括: 基础设施托管, 资源管理, 演示, UI行为.

其中, 基础设施包括:

- 数据存储
- 私人专网 (VPN) 或者防火墙 (保护数据, 避免未授权访问)
- 黑盒 JSON RESTful Web 服务层
- 各种第三方 APIs
- 应用服务器/内容管理系统来路由请求以及分发页面到客户端
- 静态内容分发网络 (CDN) 用于缓存文件 (如图片, JavaScript, CSS, 以及客户端模板)
- 客户端 (浏览器)

基础设施协同工作的图片:

![Infrastructure][1]

### RESTful JSON Web 服务

具象状态传输 (Representational State Transfer/REST), 是一个客户端-服务器通讯架构, 分离了数据资源与用户界面之间的关注点, 服务器无需实现用户界面, 客户端可以使用任何想要的方式来实现界面. RESTful架构只是用于维护客户端与服务器端的应用状态.

执行 CRUD 操作与之对应的 RESTful 请求为:

- 在资源集中创建新条目: HTTP POST
- 取回资源表示: HTTP GET
- 更新 (替换) 资源: HTTP PUT
- 删除资源: HTTP DELETE

[1]: http://orm-chimera-prod.s3.amazonaws.com/1234000000262/images/pjap_0101.png
