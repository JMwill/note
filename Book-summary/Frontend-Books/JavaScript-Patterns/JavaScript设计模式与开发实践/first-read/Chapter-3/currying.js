// 柯里化
var currying = function (fn) {
    var args = [];
    return function curryFn() {
        if (arguments.length === 0) {
            return fn.apply(this, args);
        } else {
            args.push.apply(args, arguments);
            return curryFn;
        }
    }
};

// test
var cost = (function () {
    var money = 0;
    return function () {
        for (var i = 0, l = arguments.length; i < l; i++) {
            money += arguments[i];
        }
        return money;
    }
}());

var cost = currying(cost);
cost(100);
cost(100);
cost(100);
cost(100);
console.log(cost());


// 反柯里化
Function.prototype.uncurrying = function () {
    var self = this;
    return function () {
        var obj = Array.prototype.shift.call(arguments);
        return self.apply(obj, arguments);
    };
};

var push = Array.prototype.push.uncurrying();

(function () {
    push(arguments, 4);
    console.log(arguments)
}(1, 2, 3));
