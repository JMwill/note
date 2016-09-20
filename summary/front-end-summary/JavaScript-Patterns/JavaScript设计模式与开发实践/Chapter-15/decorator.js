// 模拟传统的面向对象的装饰者模式实现
// 例子：一个飞机类，可以升级，分三级来升
// 一级普通子弹，二级导弹，三级原子弹
var Plane = function() {};
Plane.prototype.fire = function() {
    console.log('发射子弹');
};

var MissileDecorator = function(plane) {
    this.plane = plane;
};
MissileDecorator.prototype.fire = function() {
    this.plane.fire();
    console.log('发射导弹');
};

var AtomDecorator = function(plane) {
    this.plane = plane;
};
AtomDecorator.prototype.fire = function() {
    this.plane.fire();
    console.log('发射原子弹');
};

var plane = new Plane();
plane = new MissileDecorator(plane);
plane = new AtomDecorator(plane);
plane.fire();

// JavaScript风格的装饰者模式
// 由于JavaScript语言可以动态地改变对象，因此并不需要类来实现装饰者模式
var plane = {
    fire: function() {
        console.log('发射子弹');
    }
};

var missileDecorator = function() {
    console.log('发射导弹');
};

var atomDecorator = function() {
    console.log('发射原子弹');
};

var fire1 = plane.fire;
plane.fire = function() {
    fire1();
    missileDecorator();
}

var fire2 = plane.fire;
plane.fire = function() {
    fire2();
    atomDecorator();
}
plane.fire();

// 用AOP装饰函数
// 在不改变源代码的前提下给函数增加功能，遵守开放-封闭原则
Function.prototype.before = function(beforefn) {
    var __self = this;
    return function() {
        beforefn.apply(this, arguments); // 保证this不被劫持
        return __self.apply(this, arguments); // 保证this不被劫持
    };
};

Function.prototype.after = function(afterfn) {
    var __self = this;
    return function() {
        var ret = __self.apply(this, arguments);
        afterfn.apply(this, arguments);
        return ret;
    };
};

document.getElementById = document.getElementById.before(function() {
    alert(1);
});
var button = document.getElementById('button');
console.log(button);

// 不污染原型的实现
var before = function(fn, beforefn) {
    return function decorator() {
        // decorator._fn = fn; // 确保原函数引用
        beforefn.apply(this, arguments);
        return fn.apply(this, arguments);
    }
};
var after = function(fn, afterfn) {
    return function decorator() {
        // decorator._fn = fn; // 确保原函数引用
        var ret = fn.apply(this, arguments);
        afterfn.apply(this, arguments);
        return ret;
    }
};

document.getElementById = before(
    document.getElementById,
    function() {alert('test');}
);
