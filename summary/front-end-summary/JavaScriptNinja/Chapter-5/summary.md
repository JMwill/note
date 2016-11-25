# 闭包

## 函数柯里化

普通的函数柯里化：

```javascript
Function.prototype.curry = function() {
    // 这里的this是我们调用curry函数的函数对象
    var fn = this;
    var args = Array.prototype.slice.call(arguments);
    return function() {
        return fn.apply(this, args.concat(
            Array.prototype.slice.call(arguments)
        ));
    };
};
```

更加精细化的函数柯里化：

```javascript
Function.prototype.partial = function() {
    // 这里的this是我们调用partial函数的函数对象
    var fn = this, args = Array.prototype.slice.call(arguments);
    return function() {
        var arg = 0;
        for (var i = 0; i < args.length && arg < arguments.length; i++) {
            if (args[i] === undefined) {
                args[i] = arguments[arg++];
            }
        }
        return fn.apply(this, args);
    }
}
```

## 函数重载

普通的记忆函数

```javascript
Function.prototype.memoized = function(key) {
    // 这里的this是我们调用memoized函数的函数对象
    this._values = this._values || {};
    return this._values[key] !== undefined ?
        this._values[key] :
        this._values[key] = this.apply(this, arguments);
};
```