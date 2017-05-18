# 第二部分

## Promise

### Promise信任问题

#### 回调未调用

这种情况可以通过使用Promise的竞价条件来解决:

```javascript
function timeoutPromise(delay) {
    return new Promise(function (resolve, reject) {
        setTimeout(function() {
            reject('Timeout!');
        }, delay);
    });
}

function foo(delay) {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            resolve('Complete!');
        }, delay);
    });
}

// 通过竞价条件可以解决回调未调用的问题
// 这里可以保证foo有一个输出信号
Promise.race([
    foo(500),
    timeoutPromise(300)
])
.then(function(m) {
    console.log('Receive message: ' + m);
}, function(m) {
    console.log('Receive error: ' + m);
});
```

#### 吞掉错误异常

```javascript
var p = new Promise(function(resolve, reject) {
    resolve(42);
});

p.then(function fulfilled(msg) {
    foo.bar(); // foo未定义, 报错
    console.log(msg);
}, function rejected(err) {
    // 错误处理, 但是永远不会进入到这里
});
```

上面的问题只要明确地记住因为Promise一旦被决议就无法改变其状态, 因此在p被决议为42的时候, 其实它的then就默认执行fulfilled, 但是由于在fulfilled上错出了. 这个错误会流入到下一个then, 或者后续的catch中.

#### 可信任的Promise

由于Promise对象具有then方法, 但是如果某些thenable对象无意中闯入我们的代码内, 那么这个then方法就是不可信的. 而对于这个问题Promise提供了一个`resolve`方法, 这个方法对于传入的值进行分析, 如果是Promise对象则直接返回, 如果是非Promise的thenable值, 则会展开对象直到提取出一个具体的值.

```javascript
foo(42) // 假设foo返回的至少是一个thenable的值
.then(function(v) {
    console.log(v);
});

Promise.resolve(foo(42))
.then(function(v) {
    console.log(v);
})
```