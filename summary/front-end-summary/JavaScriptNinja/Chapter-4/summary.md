函数具有一个有趣的属性：length，这个属性代表函数声明时需要传入的形参数量，因此通过函数的length与arguments.length组合进行判断可以达到函数重载的目的。

基于传入的参数来进行函数重载的常用方法有三种：
1. 根据传入的参数的类型执行不同的操作，
2. 根据某些特定参数是否存在来进行判断
3. 根据传入参数的个数来进行判断

下面的是一个根据传入参数的个数来进行判断的例子：

```javascript
function reloadMethod(object, name, fn) {
    var old = object[name];
    object[name] = function() {
        if (fn.length === arguments.length) {
            return fn.apply(this, arguments);
        } else if (typeof old === 'function') {
            return old.apply(this, arguments);
        }
    };
}
```