# Promise学习笔记

## Chapter.1

### Promise workflow

```javascript
function asyncFunction() {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            resolve('Async Hello world!');
        }, 16);
    });
}

asyncFunction().then(function(value) {
    console.log(value);
}).catch(function(error) {
    console.log(error);
});

// 或者下面的代码也可以
// then(onFulfilled, onRejected)
asyncFunction().then(function(value) {
    console.log(value);
}, function(error) {
    console.log(error);
});
```

### 创建promise对象

创建promise对象的流程如下:

1. `new promise(fn)`返回一个promise对象
2. `fn`用于指定异步等处理
    - 处理结果正常的话, 调用resolve(处理结果)
    - 处理结果错误的话, 调用reject(Error对象)

### 创建XHR的promise对象

xhr-promise.js
```javascript
function getURL(URL) {
    return new Promise(function(resolve, reject) {
        var req = new XMLHttpRequest();
        req.open('GET', URL, true);
        req.onload = function() {
            if (req.status === 200) {
                resolve(req.responseText);
            } else {
                reject(new Error(req.statusText));
            }
        };
        req.onerror = function() {
            reject(new Error(req.statusText));
        }
        req.send();
    });
}

// 运行示例
var URL = 'http://httpbin.org/get';
getURL(URL).then(function onFulfilled(value) {
    console.log(value);
}).catch(function onRejected(error) {
    console.log(error);
});
```

## Chapter.2 实战Promise

### new Promise的快捷方式

通过静态方法`Promise.resolve(value)`可以快速实现`new Promise()`方法

```javascript
Promise.resolve(42); // 相当于下面的代码

new Promise(function(resolve) {
    resolve(42);
});
```

因此可以直接这样使用：

```javascript
Promise.resolve(42).then(function(val) {
    console.log(val);
});
```

还有另外一个快捷方式：

```javascript
Promise.reject(error); // 相当于下面的代码

new Promise(function(resolve, reject) {
    reject(new Error('有问题'));
});
```

也可以这样使用：

```javascript
Promise.reject(new Error('BOOM!')).catch(function(error) {
    console.log(error);
});
```

### Promise是否只能进行异步操作

