# console.log使用笔记

```
0、console.clear     清空控制台信息

1、console.log       用于输出普通信息

2、console.info      用于输出提示性信息

3、console.error     用于输出错误信息

4、console.warn      用于输出警示信息

5、console.group     输出一组信息的开头，与6配合一起用

6、console.groupEnd  结束一组输出信息

7、console.assert    对输入的表达式进行断言，只有表达式为false时，才输出相应的信息到控制台

8、console.count     （这个方法非常实用哦）当你想统计代码被执行的次数

9、console.dir       详细查看对象

10、console.time     计时开始

11、console.timeEnd  计时结束

12、console.profile 和 console.profileEnd 配合一起使用来查看CPU使用相关信息

13、console.timeLine 和 console.timeLineEnd 配合一起记录一段时间轴

14、console.trace 堆栈跟踪相关的调试

15、console.table 


控制台自带:
1、Chrome 控制台中原生支持类jQuery的选择器

2、copy 命令可以将在控制台获取到的内容复制到剪贴板

3、keys和values 前者返回传入对象所有属性名组成的数据，后者返回所有属性值组成的数组

4、monitor & unmonitor， monitor(function)，它接收一个函数名作为参数，比如 function a ,每次 a 被执行了，都会在控制台输出一条信息，里面包含了函数的名称 a 及执行时所传入的参数。


快捷方式：
$ // 简单理解就是 document.querySelector 而已。
$$ // 简单理解就是 document.querySelectorAll 而已。
$_ // 是上一个表达式的值，console对象#3.命令行API 里有说明。
$0-$4 // 是最近5个Elements面板选中的DOM元素，待会会讲。
dir // 其实就是 console.dir
keys // 取对象的键名, 返回键名组成的数组
values // 去对象的值, 返回值组成的数组
```