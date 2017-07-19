# Webpack再学习

## 概念理解

Webpack的构建需要有**依赖关系图表**, 而其生成则需要Webpack配置文件中的**入口(entry)**来提供信息.

### 入口(Entry)

- when: Webpack开始打包时需要使用
- why: 让Webpack能够顺着入口找到各个依赖模块, 来构建**依赖关系图表**
- how: 在`webpack.config.js`文件中的`entry`字段处添加设置. [具体记录](#入口起点(Entry-Points))

### 出口(Output)

- when: Webpack打包完成时需要使用
- why: 让Webpack能够正确定位需要输出打包后的文件的位置. 以及为输出的文件进行命名, 添加hash值等一系列额外的操作
- how: 在`webpack.config.js`文件中的`output`字段处添加设置, [具体记录](#输出(Output))

### Loader

- when: Webpack打包过程中, 将资源转换成模块时使用, 转换后的文件会添加到依赖图表中
- why: Webpack本身并不处理如何转换资源, 而是为资源分配官, 将遇到的资源的地点分配给具备各种处理功能的Loader来进行转换然后添加到bundle中. 并根据Loader返回的依赖信息来打包整个程序
- how: 在`webpack.config.js`文件中的`module.rules`中增加Loader以及文件匹配规则, [具体记录](#Loader)

### 插件(Plugins)

- when: Webpack打包过程中, 多用于编译或分块期间执行额外操作和自定义功能
- why: Wepback负责打包, Loader负责转换资源, 而Plugins则用来解决Loader无法实现的其他事
- how: 在`webpack.config.js`文件中的`plugins`中增加plugin处理实例, [具体记录](#插件(Plugins))