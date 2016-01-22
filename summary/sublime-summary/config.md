# Sublime Text 3配置记录

sublime在windows的环境下添加到path下能够使用命令行来进行启动，命令如下：

```
subl file       打开文件
subl folder     打开文件夹
subl            打开程序
```

配置属性：
```
"font_size": 14,
"highlight_line": true,

//区域查找，选中文本的状态下范围内搜索就会自动开启
"auto_find_in_selection": true,
// 设置Sans-serif（无衬线）等宽字体，以便阅读 
"font_face": "YaHei Consolas Hybrid",
// 使光标闪动更加柔和
"caret_style": "phase",
// 高亮有修改的标签
"highlight_modified_tabs": true,
// Nexus主题
"theme": "Nexus.sublime-theme",
// Flatland Dark配色
"color_scheme": "Packages/Theme - Flatland/Flatland Dark.tmTheme",



// 编码

// 设置tab的大小为4，宽度2太窄了
"tab_size": 4, 
// 使用空格代替tab 
"translate_tabs_to_spaces": true, 
// 添加行宽标尺 
"rulers": [80, 100], 
// 显示空白字符 
"draw_white_space": "all", 
// 保存时自动去除行末空白 
"trim_trailing_white_space_on_save": true, 
// 保存时自动增加文件末尾换行 
"ensure_newline_at_eof_on_save": true,
```