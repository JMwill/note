# webpack使用总结

## 入门

### 安装webpack

```
npm install webpack webpack-dev-server -g
```

### 简单使用

创建一个入口文件用于给webpack进行资源整合，如：entry.js，创建后在文件内写入一下内容

```
document.write("It works.");
```

假定需要的生成文件为bundle.js在index.html文件中引用它

```
<html>
    <head>
        <meta charset="utf-8">
    </head>
    <body>
        <script type="text/javascript" src="bundle.js" charset="utf-8"></script>
    </body>
</html>
```

使用`webpack ./entry.js bundle.js`，webpack通过入口文件生成出一个你指定的集成文件bundle.js，之前定义的操作以及实现就能够通过一个文件进行写入。

### 增加文件

新建一个content.js文件，内容为：

    module.exports="It works from content.js"

通过在入口文件中引入添加一句

    document.write(require('./content.js'));

就能够在入口文件entry.js中通过require进行content.js的引入。再次执行webpack ./entry.js bundle.js程序依旧能够正常运行

### 加载css资源

想要加载css资源需要安装额外的模块。

    npm install css-loader style-loader

模块安装完后，新增一个style.css文件

    body {
        background: yellow;
    }

在entry.js中新增

    require("!style!css!./style.css");

再次生成bundle.js文件可以发现刷新后网页背景为黄色。

### 缩减引入css时的require语句

    webpack ./entry.js bundle.js --module-bind 'css=style!css'

通过上面的命令，可以将entry.js的require语句修改为：`require("./style.css");`


### 配置文件构建

使用配置文件将各种资源路径设置等集中在一起，在当前目录下新建一个文件`webpack.config.js`

    module.exports = {
        entry: "./entry.js",
        output: {
            path: __dirname,
            filename: "bundle.js"
        },
        module: {
            loaders: [
                { test: /\.css$/, loader: "style!css" }
            ]
        }
    }

写好配置文件后只需要直接输入webpack运行即可，webpack会自动找寻当前目录下的配置文件。

### 更好的输出

    webpack --progress --colors

通过上面的语句，能够在程序运行时提供进度信息，以及颜色显示。

    webpack --progress --colors --watch

通过添加watch参数webpack会监听文件的改变并重新编译输出。


### 使用本地开发服务器

上面一开始已经安装过，这里是单独安装的命令。

    npm install webpack-dev-server -g

启动服务

    webpack-dev-server --progress --colors

这会提供一个简易的开发服务器，能够在[http://localhost:8080/webpack-dev-server/bundle](http://localhost:8080/webpack-dev-server/bundle)下看到效果。