# 代码重构

## 提炼函数

将一段可以独立出来的代码放到一个独立的函数中，有以下几点好处：
- 避免出现超大的函数
- 独立出来的函数有助于代码复用
- 独立出来的函数更容易被复写
- 独立出来的拥有良好命名的函数，本身就起到注释的作用

## 合并重复的条件片段

一个函数体内有一些条件分支语句，而这些条件分支语句内部散布了一些重复代码那么就有必要进行合并去重工作

## 把条件分支语句提炼成函数

将判断条件重 `a <= num && b >= num1` 改成 isSomeCondition

## 合理使用循环

通过使用循环将一些重复性的操作交由循环来实现

```
var createXHR = function() {
    var xhr;
    try {
        xhr = new ActiveXObject('MSXML2.XMLHttp.6.0');
    } catch() {
        try {
            xhr = new ActiveXObject('MSXML2.XMLHttp.3.0');
        } catch() {
            xhr = new ActiveXObject('MSXML2.XMLHttp');
        }
    }
    return xhr;
}
var xhr = createXHR();
```
修改后：
```
var createXHR = function() {
    var versions = ['MSXML2.XMLHttp.6.0', 'MSXML2.XMLHttp.3.0', 'MSXML2.XMLHttp'];
    for (var i = 0, version; version = versions[i++];) {
        try {
            return new ActiveXObject(version);
        } catch(e) {}
    }
}
var xhr = createXHR();
```

还有一些规则：
- 提前让函数退出条件分支
- 传递对象参数代替过长的参数列表
- 尽量减少参数数量
- 复杂的条件语句少用三目运算符
- 合理使用链式调用
- 分解大型类
- 用return退出多重循环

