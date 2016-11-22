# Karma

## 初始配置

### 生成配置文件

通过`karma init filename.conf.js`回答问题来生成测试配置文件

### 运行Karma

`karma start filename.conf.js`或者`node node_modules/karma/bin/karma start filename.conf.js`来运行karma

### 命令行参数

一些配置项已经在配置文件中存在，但是可以通过命令行调用重写参数来进行修改。

`karma start filename.conf.js --log-level debug --single-run`

通过`karma start --help`可以查看所有可用的选项



## 工作原理

karma实际上是一个工具，用于运行生成一个服务器来向每一个链接的浏览器运行测试代码。每一个浏览器对应的测试代码都会通过命令行被检查以及展示。

也能通过浏览器捕获错误

- 手动地通过查看karma服务器监听着的URL[http://localhost:9876/][http://localhost:9876]来查看
- 或者自动地让karma知道运行时使用哪个浏览器

karma通常会监听配置文件里制定的所有的文件，任何时候当文件有更改，karma都会通知所有的连接了的浏览器重新运行测试。每个浏览器都在iFrame里加载源代码文件，运行测试并报告结果给karma服务器。

服务器收集所有捕获的浏览器的测试结果并反馈给开发者

## 配置文件

### 总览

karma的配置文件用于对一般的karma设置进行配置，其余的如适配器、报告器、预处理器以及启动器都需要作为插件来加载，配置文件生成`karma init`

除非是作为参数提供，否则运行karma时karma会自动查看配置文件的路径为：

```shell
./karma.conf.js
./karma.conf.coffee
./.config/karma.conf.js
./.config/karma.conf.coffee
```

karma的配置文件就是用module.exports来导出一个接受配置对象的函数

```javascript
// karma.conf.js
module.exports = function(config) {
  config.set({
    basePath: '../..',
    frameworks: ['jasmine'],
    //...
  });
};
```

### 文件模式

指定文件路径用的模式是[minimatch][https://github.com/isaacs/minimatch]库提供的特性。

接下来的选项用到了minimatch表达式

- exclude
- files
- preprocessors

例子：

- `**/*.js`：在所有子目录中以js作为拓展名的文件
- `**/!(jquery).js`像上面一样，但是jquery.js除外
- `**/(foo|bar).js`在所有的子目录中，所有的“foo.js”或者“bar.js”文件

### [配置选项][1]

所有的可用配置选项如下：

#### autoWatch

**描述**：是否监听文件改变

#### autoWatchBatchDelay

**描述**：在某一改变之后延迟运行的时间值，用于避免过于频繁地运行测试，等待改变停止后一段时间一并运行测试。

#### basePath

**描述**：用于对所有的相对路径进行根路径的设置，如果这个项设置为相对路径，会自动跟配置文件的`__dirname`进行合并。

#### browserDisconnectTimeout

**描述**：在运行测试期间如果浏览器断开链接，在测试时以及完成后到设置的浏览器链接超时的这段时间内重连karma都不会报错。

#### browserConsoleLogOptions

**描述**： 配置浏览器控制台记录输出消息的格式设置。

#### browserDisconnectTolerance

**描述**：浏览器允许断开的最大次数

#### browserNoActivityTimeout

**描述**：测试开始后karma等待浏览器发送消息的时间。如果在等待超时后仍未收到浏览器的消息，将会自动断开浏览器

#### browsers

**描述**：需要运行并捕获信息的浏览器列表。

#### captureTimeout

**描述**： 捕获浏览器的超时时间，如果在额定时间内没有捕获到任何浏览器karma会杀掉进程并重试三次，还是失败的话，karma会放弃

#### client.args

**描述**：用在适配器插件上经由`karma run`传入。

#### client.useIframe

**描述**：是否使用Iframe运行测试

#### client.captureConsole

**描述**：时候捕获所有的控制台信息并输出到终端

#### client.clearContext

**描述**：清空窗口上下文

#### colors

**描述**：输出是否带有颜色

#### concurrency

**描述**：允许的并行运行的浏览器数量

#### customContextFile

**描述**：如果值是：null，会使用karma自己的debug.html文件

#### customHeaders

**描述**：自定义HTTP头文件

#### detached

**描述**：如果设置了，karma服务器将会另起进程来运行，可以通过`karma stop`命令来关闭

#### exclude

**描述**：需要排除在外的载入文件的文件名或者模式

#### failOnEmptyTestSuite

**描述**：是否允许运行空测试套件

#### files

**描述**：输入到浏览器的文件的文件名/模式

#### forceJSONP

**描述**：迫使socket.io使用JSONP轮询而不是XHR轮询

#### frameworks

**描述**：一系列你希望用到的测试框架，所有的测试框架都需要下载响应的插件。

#### hostname

**描述**：捕获浏览器时使用的主机名

#### httpsServerOptions

**描述**：Node的https模块用到的设置对象

#### logLevel

**描述**：记录的等级设置

#### loggers

**描述**：日志追加器列表，类型可以通过查看[log4js][2]来获知

#### middleware

**描述**：一系列karma服务器中用到的中间件。需要自行安装

#### mime

**描述**：重新定义文件拓展名到MIME类型的映射

#### beforeMiddleware

**描述**：跟middleware一样，只不过这些中间件会运行在karma自己的中间件之前

#### plugins

**描述**：安装并使用的karma插件列表

#### port

**描述**：服务器运行端口号

#### preprocessors

**描述**：预处理器映射表如： `{'**/*.coffee': 'coffee'}`

#### protocol

**描述**：协议类型

#### proxies

**描述**：路径代理映射表

#### proxyValidateSSL

**描述**：遇到无效的SSL证书是否报错

#### reportSlowerThan

**描述**：Karma会慢于设置的时间才报错

#### reporters

**描述**：使用的报告器列表

#### restartOnFileChange

**描述**：当karma监听文件改变时，新运行的测试会等待旧运行的测试完成，如果设置了这个项，当前测试在新测试来临时会被终止运行，并立马开始运行新测试。

#### retryLimit

**描述**：当浏览器崩溃，Karma会尝试重新运行，这里用于设置尝试的次数。

#### singleRun

**描述**：如果设置为true，karma会开始并捕获所有配置的浏览器运行测试然后退出，退出码为0或者1取决于测试通过与否。

#### transports

**描述**：测试服务器与浏览器间允许的传输方法列表

#### urlRoot

**描述**：当karma运行时的根url

#### jsVersion

**描述**：在火狐浏览器中使用的JavaScript版本

[1]: https://karma-runner.github.io/1.0/config/configuration-file.html
[2]: https://github.com/nomiddlename/log4js-node