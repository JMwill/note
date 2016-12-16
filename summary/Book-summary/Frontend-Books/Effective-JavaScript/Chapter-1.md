# 第一章

## 小心隐式的强制转换

强制转换中需要注意的是: 运算符运算时, 如果运算的是一个**对象**, 会调用对象的valueOf方法, 而加法运算符在具有的valueOf与toString的情况下会优先选择valueOf方法, 然后才是toString方法. 因此对于对象, 尽量避免使用valueOf方法, 除非对象的确是一个数字的抽象, 同时, 在实现了valueOf方法返回数字后, 还应该实现toString方法返回数字的字符串形式

例子:

```javascript
var obj = {
  toString: function() {
    return "[object MyObject]";
  },
  valueOf: function() {
    return 17;
  }
};

'hello ' + obj // hello 17
```

## 原始类型优于封装类型

封装类型是创造的是一个真正的对象, 因此无法对封装对象进行一般的相等性比较:

```javascript
var s1 = new String("hello");
var s2 = new String('hello');

typeof s1 // object
s1 === s2 // false
s1 == s2 // false
```

因此尽量不要使用封装对象, 封装对象的存在是为原始对象提供使用方法, 以及属性. 但是由于JavaScript内部有另外的隐式强制转换(会隐式地创建封装对象), 因此在对原始值设置属性以及方法时会静默失败, 有可能会导致一些难以发现的错误.

## 避免对混合类型使用 == 运算符

```javascript
"1.0e0" == {valueOf: function() {return true;}}; // 结果是true

// 因为在比较之前两者都被隐式转换成数字, 因此相当于 1 == true, 布尔值也是数字, 结果就为true了.
```

**对于属于同一个类型的参数, == 和 === 运算符的行为没有区别, 但是最好都使用 === 运算符, 表明操作中没有设计任何转换**, 在 == 运算中, 原始类型与Date对象运算时, 优先尝试toString方法, 然后才是valueOf方法. 而原始类型与其他非Date对象尝试方式则是反过来的.

## 分号插入的局限

规则:

1. 分号仅在 } 标记之前, 一个或多个换行之后和程序输入的结尾被插入, 也就是只能在一行, 一个代码块和一段程序结束的地方省略分号. 如: `function area(r) { r = +r; return Math.PI * r * r }`中, `+r`后的分号不能省略
2. 分号仅在随后的输入标记不能被解析时插入. 如: `a = b 换行 (f())`会被解析为`a = b(f())`, 而`a = b 换行 f()`则会被解析为`a = b; f();`因为`a = b f()`是错误的. 因此需要留心五个会带来问题的字符`(, [, +, -, /`
3. 在连接脚本的时候, 在脚本之间显式地插入分号.
4. 在return, throw, break, continue, ++, --的参数之前不能换行
5. 分号不能作为for循环的头部或空语句的分隔符而被推导出

## 将字符串视为16位的代码单元序列

JavaScript字符串由16位的代码单元组成, 而不是由Unicode代码点组成. 因此字符串属性如: length, chatAt 和 charCodeAt等基于代码单元层级的方法与属性无法正确反映Unicode字符, 正则表达式也与之类似.