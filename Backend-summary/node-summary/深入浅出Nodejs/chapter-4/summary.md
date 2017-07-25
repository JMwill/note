## 第四章：异步编程解决方案

### 事件发布/订阅模式

通过事件发布/订阅模式进行组件封装，将不变的部分封装在组件内部，将容易变化，需要自定义的部分通过事件暴露给外部处理，使得逻辑得以分离

```
var EventEmitter = require('events').EventEmitter;
var emitter = new EventEmitter();

emitter.on('test', function (msg) {
    console.log(msg ? msg : 'Default test event message');
});

emitter.emit('test');
```

事件发布/订阅模式，可以使用一些库来简化开发时多余的代码量。

### Promise/Deferred模式

简单Promise实现

```
var EventEmitter = require("events").EventEmitter;
var util = require('util');

function Promise() {
    EventEmitter.call(this);
}

util.inherits(Promise, EventEmitter);

Promise.prototype.then = 
function (
    fulfilledHandler,
    errorHandler,
    progressHandler
) {
    if (typeof fulfilledHandler === 'function') {
        this.once('success', fulfilledHandler);
    }

    if (typeof errorHandler === 'function') {
        this.once('error', errorHandler);
    }

    if (typeof progressHandler === 'function') {
        this.on('progress', progressHandler);
    }

    return this;
};

var Deffered = function () {
    this.stat = 'unfulfilled';
    this.promise = new Promise();
};

Deffered.prototype.resolve = function (obj) {
    this.stat = 'fulfilled';
    this.promise.emit('success', obj);
}

Deffered.prototype.reject = function (err) {
    this.stat = 'error';
    this.promise.emit('error', err);
}

Deffered.prototype.progress = function (data) {
    this.promise.emit('progress', data);
}

var promisify = function (obj) {
    var deffered = new Deffered();
    var result = '';
    obj.on('event1', function (msg) {
        result += msg;
        deffered.progress(msg);
    });

    obj.on('event2', function () {
        deffered.resolve(result);
    });

    obj.on('error', function (err) {
        deffered.reject(err);
    });

    return deffered.promise;
};
```

这种实现的promise需要对每一个想要应用的对象进行封装和改造Deferred部分。Promise是高级接口，事件是低级接口。低级接口可以构成更多更复杂的场景，高级接口一旦定义，不具有低级接口的灵活性，但可有效解决典型问题。

### 流程控制库

async库是经典的异步流程控制模块，几种典型的用法有：

1. 异步的串行执行
2. 异步的并行执行
3. 异步调用的依赖处理
4. 自动依赖处理
