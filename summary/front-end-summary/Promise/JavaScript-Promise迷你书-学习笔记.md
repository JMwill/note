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

- 不要对异步回调函数进行同步调用
- 如果对异步函数进行同步调用处理顺序可能会与预期不符, 带来意料之外的结果.

### 每次调用实例方法都会返回一个新创建的promise对象

Promise对象一般是使用链式调用的方法, 否则就是对同一个Promise实例值进行多次处理, 如:

```javascript
var aPromise = new Promise(function(resolve) {
  resolve(100);
});
aPromise.then(function(value) {
  return value * 2;
});
aPromise.then(function(value) {
  return value * 2;
});
aPromise.then(function(value) {
  console.log('1: ' + value); // 100
});


// vs

var bPromise = new Promise(function(resolve) {
  resolve(100);
});
bPromise.then(function(value) {
  return value * 2;
}).then(function(value) {
  return value * 2;
}).then(function(value) {
  console.log('2: ' + value); // 400
});
```

要维持链式调用, 需要谨记返回方法调用后的新Promise对象:

```javascript
function anAsyncCall() {
    var promise = Promise.resolve();

    return promise.then(function() {
        return newVal;
    });
    // 如果是返回promise的话, 就得不到经过then方法处理后的结果
    // return promise, 这样做达不到想要的效果
}

```

### Promise.all

接受一个Promise对象组成的数组, 当所有Promise对象都变成resolve或者reject时, 调用then方法.

### Promise.race

接受一个Promise对象组成的数组, 只要有一个promise对象进入FulFilled或者Rejected状态的话, 就继续进行后面的处理.

### 不能进行错误处理的onRejected

对于在then内定义的onRejected方法不能处理当前then内出现的错误, 其实只需要记住每个错误都需要在下一个then或者catch内才能进行处理就好, 即:

```javascript
function throwError(value) {
    throw new Error(value);
}

function mainOne(onRejected) {
    return Promise.resolve(42).then(throwError, onRejected); // 无法捕捉当前then的错误
}

function mainTwo(onRejected) {
    return Promise.resolve(42).then(throwError).catch(onRejected); // 可以对错误进行捕捉
}

mainOne(function() {
    console.log('main one');
});

mainTwo(function() {
    console.log('main two');
});
```
