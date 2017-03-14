// 不够透明的单例模式一
var Singleton = function (name) {
    this.name = name;
    this.instance = null;
};

Singleton.prototype.getName = function () {
    return this.name;
};

Singleton.getInstance = function (name) {
    if (!this.instance) {
        this.instance = new Singleton(name);
    }
    return this.instance;
}

console.log('=================> 不够透明的单例模式一的结果：');
var a = Singleton.getInstance('test1');
var b = Singleton.getInstance('test2');
console.log('a === b: ' + (a === b));

// 不够透明的单例模式二
var Singleton = function (name) {
    this.name = name;
};

Singleton.prototype.getName = function () {
    return this.name;
};

Singleton.getInstance = (function (name) {
    var instance = null;
    return function (name) {
        if (!instance) {
            instance = new Singleton(name);
        }
        return instance;
    };
}());

console.log('=================> 不够透明的单例模式二的结果：');
var a = Singleton.getInstance('test1');
var b = Singleton.getInstance('test2');
console.log('a === b: ' + (a === b));

// 透明的单例模式示例一
var CreateSingle = (function () {
    var instance = null;
    var CreateSingle = function (prop) {
        if (instance) {
            return instance;
        }
        this.prop = prop;
        this.init();

        return instance = this;
    };

    CreateSingle.prototype.init = function () {
        console.log('create succeed');
    };

    return CreateSingle;
}());

console.log('=================> 透明但是难以修改且违背单一职责原则的单例模式的结果：');
var a = new CreateSingle('Aha');
var b = new CreateSingle('Bhb');
console.log('a === b: ' + (a === b));

// 使用代理实现单例模式
var CreateSome = function (prop) {
    this.prop = prop;
    this.init();
};

CreateSome.prototype.init = function () {
    console.log('create some succeed');
};

var ProxySingletonCreateSome = (function () {
    var instance;
    return function (prop) {
        if (!instance) {
            instance = new CreateSome(prop);
        }

        return instance;
    };
}());

console.log('=================> 使用代理模式的单例模式实现结果:');
a = ProxySingletonCreateSome('prop1');
b = ProxySingletonCreateSome('prop2');
console.log('a === b: ' + (a === b));

// 通用的JavaScript单例模式
var getSingleton = function (fn) {
    var result;
    return function () {
        if (!result) {
            console.log('save Singleton result')
            result = fn.apply(this, arguments);
        }
        return result;
    };
};

console.log('=================> 通用的JavaScript单例模式');
var mySingleton = getSingleton(function () { return {name: 'haha'}; });
var fn1 = mySingleton();
var fn2 = mySingleton();
console.log(fn1 === fn2);
