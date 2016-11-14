# 分布式事件（发布/订阅模式)

实现自己的PubSub：

```
PubSub = {handlers: {}};

PubSub.on = function(eventType, handler) {
    if (!(eventType in this.handlers)) {
        this.handlers[eventType] = [];
    }

    this.handlers[eventType].push(handler);
    return this;
}

PubSub.emit = function(eventType) {
    var handlerArgs = Array.prototype.slice.call(arguments, 1);
    for (var i = 0; i < this.handlers[eventType].length; i++) {
        this.handlers[eventType][i].apply(this, handlerArgs);
    }
    return this;
}
```