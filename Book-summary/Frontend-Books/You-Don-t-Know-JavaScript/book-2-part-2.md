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