# 第三章

使用bind方法提取具有确定接受者的方法:

```javascript
this.x = 9;
var module = {
    x: 81,
    getX: function() { return this.x; }
};

module.getX(); // 会返回81

var retrieveX = module.getX;
retrieveX(); // this被绑定到全局, 因此返回的是9

var boundGetX = retrieveX.bind(module);
boundGetX(); // 通过bind绑定方法调用时的this对象, 因此返回81


// bind方法相当于
function myBind(binder, fn) {
    return function() {
        return fn.apply(binder, arguments);
    }
}

var boundGetX = myBind(module, retrieveX);
boundGetX();
```

实现偏函数

```javascript
function simpleURL(protocol, domain, path) {
    return protocol + '://' + domain + '/' + path;
}

httpUrl = simpleURL.bind(null, 'http');
googleUrl = simpleURL.bind(null, 'https', 'www.google.com');

console.log(httpUrl('www.google.com', 'hello')); // "http://www.google.com/hello"
console.log(googleUrl('hello')); // "https://www.google.com/hello"
```