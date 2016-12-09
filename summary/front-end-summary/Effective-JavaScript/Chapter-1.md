# 第一章

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