# Chrome的开发者工具学习与记录

打开开发者工具的快捷方式是`Ctrl+Shift+I`(Windows)或者`Cmd+Opt+I`(Mac). 更多的快捷键在[这里][1]

## Dom面板

通过`Ctrl+Shift+c`可以启动Devtools的Dom面板, 在里面, 选定某个元素后按`F2`可以直接对元素进行编辑, `Ctrl-Enter`会保存修改, `ESC`退出编辑模式则不会保存修改.

通过在元素上右键点击`Scroll Into View`可以直接滚动到相应元素, 无需自己查找位置. Dom元素本身还可以在子树更改, 属性更改, 节点移除的情况下设置断点来查看问题.

## 控制台面板

通过`Ctrl+Shift+j`可以打开控制台面板, 或者在其他面板状态下通过`ESC`可以调出控制台面板, 控制台面板中的消息输出对于多条邻近的同类型消息会进行折叠. 可以在"通用设置"里面设置"Show timestamps(展示时间戳)"来避免折叠.

快捷键`Ctrl+L`能够清除控制台输出记录, 或者使用全局函数`clear()`或`console.clear()`也能清楚记录

[1]:        https://developers.google.com/web/tools/chrome-devtools/inspect-styles/shortcuts
