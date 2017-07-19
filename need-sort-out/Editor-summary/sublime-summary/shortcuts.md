# Sublime Text 3快捷键

```
编辑
Ctrl + Enter            在当前行下面新增一行然后跳至该行。
Ctrl + Shift + Enter    在当前行上面增加一行并跳至该行。
Ctrl + ←/→            进行逐词移动。
Ctrl + Shift + ←/→    进行逐词选择。
Ctrl + ↑/↓              移动当前显示区域。
Ctrl + Shift + ↑/↓      移动当前行。

选词
Ctrl + D            选择该词出现的下一个位置。
Ctrl + K            进行选词跳过。
Ctrl + U            进行选词回退
Ctrl + Shift + L    可以将当前选中区域打散，进行多重编辑。
Ctrl + J            可以把当前选中区域合并为一行。

查找替换
Shift + ←/→或Ctrl + D    选中关键字
F3                          跳到其下一个出现位置
Shift + F3                  跳到其上一个出现位置
Alt + F3                    选中其出现的所有位置

Ctrl-F后
Alt + Enter                 选中其出现的所有位置
Alt + C                     切换大小写敏感模式，
Alt + W                     切换整字匹配模式

Ctrl + H                    进行标准替换，输入替换内容后。
Ctrl + Shift + H            Ctrl + H之后，替换当前关键字。
Ctrl + Alt + Enter          Ctrl + H之后，替换所有匹配关键字。
Ctrl + Shift + F            开启多文件搜索&替换

跳转
Ctrl + P                    列出当前打开的文件/当前文件夹的文件，输入文件名Enter跳转至该文件。
Ctrl + R                    列出当前文件中的符号（例如类名和函数名，但无法深入到变量名），输入符号名称Enter即可以跳转到该处。此外，还可以使用F12快速跳转到当前光标所在符号的定义处，对于Markdown，Ctrl + R会列出其大纲
Ctrl + G然后输入行号以跳转到指定行

Ctrl + P匹配到文件后，我们可以进行后续输入以跳转到更精确的位置：
    @ 符号跳转：输入@symbol跳转到symbol符号所在的位置
    # 关键字跳转：输入#keyword跳转到keyword所在的位置
    : 行号跳转：输入:12跳转到文件的第12行。

文件夹
Ctrl + K, Ctrl + B          显示，隐藏侧栏，

窗口&标签
Ctrl + Shift + N            创建一个新窗口
Ctrl + W                    关闭该窗口
Alt + Shift + 1             一屏显示
Alt + Shift + 2             进行左右分屏
Alt + Shift + 8             进行上下分屏
Alt + Shift + 5             进行上下左右分屏
Ctrl + 1                    分屏之后，使用Ctrl + 数字键跳转到指定屏
Ctrl + Shift + 数字键       将当前屏移动到指定屏
F11                         切换普通全屏
Shift + F11                 切换无干扰全屏

格式化
Ctrl + [                    向左缩进
Ctrl + ]                    向右缩进

括号
Ctrl + M                    快速的在起始括号和结尾括号间切换
Ctrl + Shift + M            快速选择括号间的内容
Ctrl + Shift + J            缩进型语言（例如Python）则可以使用。
```

```
通用（General）

↑↓←→：上下左右移动光标，注意不是不是KJHL！
Alt：调出菜单
Ctrl + Shift + P：调出命令板（Command Palette）
Ctrl + `：调出控制台
编辑（Editing）

Ctrl + Enter：在当前行下面新增一行然后跳至该行
Ctrl + Shift + Enter：在当前行上面增加一行并跳至该行
Ctrl + ←/→：进行逐词移动
Ctrl + Shift + ←/→进行逐词选择
Ctrl + ↑/↓移动当前显示区域
Ctrl + Shift + ↑/↓移动当前行
选择（Selecting）

Ctrl + D：选择当前光标所在的词并高亮该词所有出现的位置，再次Ctrl + D选择该词出现的下一个位置，在多重选词的过程中，使用Ctrl + K进行跳过，使用Ctrl + U进行回退，使用Esc退出多重编辑
Ctrl + Shift + L：将当前选中区域打散
Ctrl + J：把当前选中区域合并为一行
Ctrl + M：在起始括号和结尾括号间切换
Ctrl + Shift + M：快速选择括号间的内容
Ctrl + Shift + J：快速选择同缩进的内容
Ctrl + Shift + Space：快速选择当前作用域（Scope）的内容
查找&替换（Finding&Replacing）

F3：跳至当前关键字下一个位置

Shift + F3：跳到当前关键字上一个位置

Alt + F3：选中当前关键字出现的所有位置

Ctrl + F/H：进行标准查找/替换，之后：

Alt + C：切换大小写敏感（Case-sensitive）模式

Alt + W：切换整字匹配（Whole matching）模式

Alt + R：切换正则匹配（Regex matching）模式

Ctrl + Shift + H：替换当前关键字

Ctrl + Alt + Enter：替换所有关键字匹配
Ctrl + Shift + F：多文件搜索&替换

跳转（Jumping）

Ctrl + P：跳转到指定文件，输入文件名后可以：

@ 符号跳转：输入@symbol跳转到symbol符号所在的位置

# 关键字跳转：输入#keyword跳转到keyword所在的位置

: 行号跳转：输入:12跳转到文件的第12行。

Ctrl + R：跳转到指定符号

Ctrl + G：跳转到指定行号

窗口（Window）

Ctrl + Shift + N：创建一个新窗口
Ctrl + N：在当前窗口创建一个新标签
Ctrl + W：关闭当前标签，当窗口内没有标签时会关闭该窗口
Ctrl + Shift + T：恢复刚刚关闭的标签
屏幕（Screen）

F11：切换普通全屏
Shift + F11：切换无干扰全屏
Alt + Shift + 2：进行左右分屏
Alt + Shift + 8：进行上下分屏
Alt + Shift + 5：进行上下左右分屏
分屏之后，使用Ctrl + 数字键跳转到指定屏，使用Ctrl + Shift + 数字键将当前屏移动到指定屏
```