# Chrome的开发者工具学习与记录

打开开发者工具的快捷方式是`Ctrl+Shift+I`(Windows)或者`Cmd+Opt+I`(Mac). 更多的快捷键在[这里][1], 在打开控制台后可以使用`Ctrl+Shift+p`的形式调用出命令面板来执行各种命令.

## Dom面板

通过`Ctrl+Shift+c`可以启动Devtools的Dom面板, 在里面, 选定某个元素后按`F2`可以直接对元素进行编辑, `Ctrl-Enter`会保存修改, `ESC`退出编辑模式则不会保存修改.

通过在元素上右键点击`Scroll Into View`可以直接滚动到相应元素, 无需自己查找位置. Dom元素本身还可以在子树更改, 属性更改, 节点移除的情况下设置断点来查看问题.

## 控制台面板

通过`Ctrl+Shift+j`可以打开控制台面板, 或者在其他面板状态下通过`ESC`可以调出控制台面板, 控制台面板中的消息输出对于多条邻近的同类型消息会进行折叠. 可以在"通用设置"里面设置"Show timestamps(展示时间戳)"来避免折叠.

快捷键`Ctrl+L`能够清除控制台输出记录, 或者使用全局函数`clear()`或`console.clear()`也能清楚记录,

对于需要进行日志记录组的输出, 可以使用`console.group`或者`console.groupCollapsed`来进行日志分组输出, 但这个功能在现代浏览器上支持, Node等暂不支持:

```javascript
console.group('自定义分组标题, 可留空'); // 需要折叠的分组消息可以使用groupCollapsed代替
console.log('输出信息1`);
console.log('输出信息2`);
console.log('输出信息3`);
console.groupEnd();
```

`console`中可以使用简单的格式说明符, 其中较为特殊的是`%O`: 将值格式化为可拓展的JavaScript对象, 通过它能够将DOM元素按照对象的形式打印出来. 而不是打印出DOM元素的HTML结构. 而`%c`: 将CSS样式规则应用到第二个参数指定的输出字符串, 可以对控制台输出的信息进行美化.

### 记录时间

使用`console.time('label')`以及`console.timeEnd('label')`来记录某个区间段的用时, 同时, 这个用时可以在`Timeline`面板上看到, 以黄色区间段进行标记, 名称就是填写的`label`. 而`console.timeStamp('label')`方法则是在某个`Timeline`记录正在进行的时候发挥作用, 以一个短黄色竖线标记记录点.

### 统计输出记录次数

通过`console.count('label')`, 使用后可以统计相同的`label`的输出次数. 方便查看记录的输出情况.

### 错误跟踪

每个错误对象都包含有`stack`变量用于存放错误的堆栈信息. console中的`trace()`方法可以打印当前的JavaScript调用堆栈. 用于排查调用过程中出现的问题. 使用`assert()`断言方法, 则可以对代码进行简单的测试, `window.onerror`方法被处罚时, 一般会获取三个参数, 分别是错误消息, 引发错误消息的文件地址, 错误触发所处文件的行号.

### 选择元素

控制台可以直接打印出元素, 但是当有时候需要选择某个不知道具体位置的元素时, 可以使用控制台内建的函数`inspect('dom node')`这样子就会直接到达元素面板, 同时选中对应元素. 控制台面板还提供了一些选择元素的快捷方法: `$()`: 选择单个匹配元素, `$$()`选择全部匹配的元素, `$x()`选择一个匹配对应XPath的元素, 同时, 控制台还提供了`$1~4`个变量来缓存最近使用过的5个变量.

### 监控事件

在控制台面板中使用`monitorEvents('DOM Node', ['event name', ] | 'event name')`则可以监听页面上的元素某种类型的事件的触发. 不传递事件名则监听所有的事件. 解除监听使用`unmonitorEvents('DOM Node')`, 还可以通过`getEventListeners('DOM Node')`方法获取DOM元素被绑定的事件.

### Command Line API参考

- `$_`符号在控制台面板中可以返回最近执行的表达式的值
- `copy(Object)`可以将指定对象的字符串表示形式复制到剪切板上
- `debug(function)`指定函数执行时进入调试状态, 使用`undebug(function)`来取消.
- 快速获取对象的键与值, 可以直接使用`keys()`以及`values()`方法. 这两个方法作用与ES6对象上提供的一样, 但是只能在控制台上才能直接使用
- `monitor(function)`用于监听函数的调用, 使用`unmonitor`来取消调用
- `profile([name])`与`profileEnd([name])`组合使用能够得到一个JavaScript CPU分析会话, 用于分析程序性能.
- `table()`与`console.table()`方法相同, 都能够将对象按照表格形式打印出来.

[1]:        https://developers.google.com/web/tools/chrome-devtools/inspect-styles/shortcuts
