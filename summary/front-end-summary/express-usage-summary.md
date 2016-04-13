# express使用总结

## 文件夹结构

```
.
├── app.js
├── bin
│   └── www
├── package.json
├── public
│   ├── images
│   ├── javascripts
│   └── stylesheets
│       └── style.css
├── routes
│   ├── index.js
│   └── users.js
└── views
    ├── error.jade
    ├── index.jade
    └── layout.jade
```

正常开发在routes文件中进行站点路由配置以及访问响应，一般小型站点的开发可以按照`express init`后的文件夹结构安排。目前个人的配置认为较好的文件夹结构是：

```
.
├── app.js                  启动程序入口
├── bin                     启动目录
│   └── www                 启动文件
├── lib                     类库
│   ├── commons             公共类库
│   └── Model               实例化对象
├── log                     日志文件夹
├── mode_modules            第三方模块
├── package.json
├── public                  静态文件
│   ├── images              图片
│   ├── javascripts         前端js脚本
│   │   ├── commons         公共类库
│   │   └── lib             第三方开源样式
│   ├── stylesheets         前端样式
│   │   ├── commons         公共样式
│   │   ├── lib             第三方开源样式
│   │   └── style.css       自定义的样式等
│   └── third-part          其他第三方文件
├── routes                  路由模块
│   ├── commons             公共路由模块
│   ├── index.js            路由总模块
│   └── pages               与views内业务模板文件夹命名一致
└── views                   模板文件夹
    ├── commons             公共模板
    ├── error.jade          错误模板
    ├── index.jade          首页模板
    └── pages               按业务区分模板             

```

## 使用

安装了`express-generator`后，进行文件夹初始化后，只用debug模式启动程序`DEBUG=[appName]:* npm start`, window下`set DEBUG=[appName]:* & npm start`。

express程序中，最重要的部分就是中间件的编写，中间件有几种类型之分，其中，express对路由中间件进行了区别对待。通过额外编写路由模块有利于组织程序。

个人推荐使用单一位置指定路径：

```
var express = require('express');
var router = express.Router();

router
    .route('/path/you/like)
    .get(function () {
        ...
    })
    .post(function () {
        ...
    });
```

router的http方法都可以传入几个处理函数，或者一个函数数组。但是每个方法的第三个参数为执行下一个函数的回调，一定要执行如：

```
var express = require('express');
var router = express.Router();

router
    .route('/path/you/like)
    .get(function (req, res, next) {
        ...
        next()
    }, function (req, res) {
        ...
    })
    .post(function () {
        ...
    });

或者
    function fun1(req, res, next) {
        ...
        next();
    }
    
    function fun2(req, res, next) {
        ...
        next();
    }
    
    function fun3(req, res, next) {
        ...
        next();
    }
    
    function fun4(req, res) {
        ...
    }

router
    .route('/path/you/like)
    .get([fun1, fun2, fun3, fun4])
    .post(function () {
        ...
    });
```

需要记住的是next内传入除了`‘route'`字符串以外的真值都会当做错误来处理，会触发错误回调。如果传入的是`‘route'`则跳过之后的处理函数，执行下一个路由方法。

router也可以像express对象一样使用use方法进行中间件或者资源的引入等

```
router.use(express.static(__dirname + '/public'));
```