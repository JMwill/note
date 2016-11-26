# 原型与面向对象

使用一个对象的实例作为另一个对象的原型可以创建一条原型链。`SubClass.prototype = new SuperClass();`

## 模拟原生功能

```javascript
function MyArray() {}
MyArray.prototype.length = 0;

(function() {
  var methods = ['push', 'pop', 'slice'];
  for (var i = 0; i < methods.length; i++)(function(name) {
    MyArray.prototype[name] = function() {
      return Array.prototype[name].apply(this, arguments);
    };
  })(methods[i]);
})();

var mine = new MyArray();
mine.push(1,2,3,4,5);
console.log(mine.length); // 5
console.log(mine instanceof Array); // false
```

## 模拟类实现

```javascript
(function() {
    var initializing = false,
        superPattern = 
            /xyz/.test(function() { xyz; }) ? /\b_super\b/ : /.*/;
    Object.subClass = function(properties) {
        var _super = this.prototype;

        initializing = true;
        var proto = new this();
        initializing = false;

        for (var name in properties) {
            proto[name] = typeof properties[name] == 'function' &&
                          typeof _super[name] == 'function' &&
                          superPattern.test(properties[name]) ?
                (function(name, fn) {
                    return function() {
                        var tmp = this._super;
                        this._super = _super[name];

                        var ret = fn.apply(this, arguments);
                        this._super = tmp;

                        return ret;
                    };
                })(name, properties[name])
                : properties[name];
        }
        function Class() {
            // All construction is actually done in the init method
            if (!initializing && this.init) {
                this.init.apply(this, arguments);
            }
        }

        Class.prototype = proto;
        Class.constructor = Class;
        Class.subClass = arguments.callee;

        return Class;
    };
})();
```