# 运行时代码求值

求值方式:

- eval进行求值: eval()创建的函数会像在特定作用域内创建函数一样继承该作用域的闭包
- 函数构造器进行求值: 使用函数构造器new Function()创建的函数不会创建闭包.
- 定时器进行求值:
- 全局作用域内进行求值操作, 如代码清单一

```javascript
// 代码清单一
// 如下代码能够在局部作用域内对全局作用域进行操作而不会夹带局部作用域的闭包.
function globalEval(data) {
    data = data.replace(/^\s*|\s*$/g, '');
    if (data) {
        var head = document.getElementsByTagName('head')[0] ||
                   document.documentElement,
            script = document.createElement('script');
        script.type = 'text/javascript';
        script.text = data;
        head.appendChild(script);
        head.removeChild(script);
    }
}
window.onload = function() {
    (function() {
        globalEval("var test = 5;");
    })();
    console.assert(test === 5, "The code was evaluated globally");
}
``` 

对于eval来说, 任何不是简单变量, 原始值, 赋值语句的内容都需要在外面包装一个括号, 否则无法返回预期的结果.  

运行时代码求值, 可以结合函数的toString方式实现**动态重写代码**, 将toString后的代码进行加工后再操作. 也可以实现运行时代码注入从而实现面向切面编程. 