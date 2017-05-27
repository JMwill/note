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

## 生成器

### 输入和输出

#### 迭代消息传递

使用生成器可以在步骤间进行消息传递:

```javascript
function *foo(x) {
    var y = x * (yield);
    return y;
}

var it = foo(6);

// 启动foo...
it.next();

var res = it.next(7);
res.value; // 42
```

需要记住的是, 第一个next都是用于启动迭代器运行, 直到遇到第一个`yield`, 而第二个next则是完成被暂停的`yield`表达式的结果.

生成标准的迭代器接口需要返回具有done的Boolean属性以及返回值value的对象, 如果需要迭代器能够用在`for...of`循环中则要用到ES6的`Symbol.iterator`属性, 例子:

```javascript
var something = (function() {
    var nextVal;
    return {
        // for...of循环需要用到
        [Symbol.iterator]: function() { return this; }

        // 标准迭代器接口方法
        next: function() {
            if (nextVal === undefined) {
                nextVal = 1;
            } else {
                nextVal = (3 * nextVal) + 6;
            }
            return { done: false, value: nextVal };
        }
    }
})
```

#### 停止生成器

`for...of`循环具有一个隐藏的特性: "异常结束". 通常由break, return或者未捕获异常引起, 这种情况会向生成器的迭代器发起一个信号使其终止. 因此可以通过监听异常在生成器中定义某些处理:

```javascript
function *something() {
    try {
        var nextVal;
        while (true) {
            if (nextVal === undefined) {
                nextVal = 1;
            } else {
                nextVal = (3 * nextVal) + 6;
            }
            yield nextVal;
        }
    }
    finally {
        // do something
        console.log('Clean up!');
    }
}

var it = something();
for (var v of it) {
    console.log(v);

    if (v > 500) {
        console.log(
            // 通过外部调用生成器生成的迭代器的return方法手工终止迭代器实例
            it.return('Hello World').value
        );

        // 无需break就可以退出
    }
}
```

#### 生成器中的Promise并发

生成器中的`yield`只是一个暂停点, 因此, 对于需要并发运行的程序, 暂停点可以放在请求发出之后:

```javascript
// 性能不佳的做法
function *foo() {
    var r1 = yield request('url1');
    var r2 = yield request('url2');

    var r3 = yield request(
        'url3' + r1 + r2
    );
    console.log(r3);
}

// 好的做法
function *foo() {
    var p1 = request('url1');
    var p2 = request('url2');

    var r1 = yield p1;
    var r2 = yield p2;

    var r3 = yield request(
        'url3' + r1 + r2;
    );
    console.log(r3);
}

// 这种模式相当于:
function *foo() {
    var results = yield Promise.all([
        request('url1'),
        request('url2')
    ]);
    var [r1, r2] = results;
    var r3 = yield request(
        'url3' + r1 + r2;
    );
    console.log(r3);
}
```

### 生成器委托

JavaScript中, 在一个生成器里面调用另一个生成器可以使用一下的语法:

```javascript
function *foo() {
    console.log('*foo starting');
    yield 3;
    yield 4;
    console.log('*foo finished');
}

function *bar() {
    yield 1;
    yield 2;
    yield *foo();
    yield 5;
}

var it = bar();

it.next().value; // 1
it.next().value; // 2
it.next().value; // *foo starting
                 // 3
it.next().value; // 4
it.next().value; // *foo finished
                 // 5
```
