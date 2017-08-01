# 第二部分 this和对象原型

## 关于this

对this指向有两个常见的误解:

1. this指向函数自身, 这个认识是错误的, this并不指向函数自身
2. this指向函数的作用域, 这个认识不完全正确, 在某些情况下成立, 而某些情况下并不成立

**混合使用**this和词法作用域查找是无法实现的.

this在运行时绑定, 跟函数声明的位置没有任何关系, 只取决于函数的调用方式.

## this全面解析

```javascript
function baz() {
    // 当前调用栈: baz
    // 因此调用位置是全局作用域
    console.log('baz');
    bar(); // <-- bar的调用位置
}

function bar() {
    // 当前调用栈: baz -> bar
    // 因此, 当前调用位置在baz中
    console.log('bar');
    foo(); // <-- foo的调用位置
}

function foo() {
    // 当前调用栈: baz -> bar -> foo
    // 因此, 当前调用位置在bar中
    console.log('foo');
}

baz(); // <-- baz的调用位置
```

### this绑定规则

**默认绑定**: 独立函数调用时this默认指向全局对象(严格模式下, this会绑定到undefined), 可以看做无法应用其他规则时的默认规则.

只有在函数运行在非严格模式下时, 默认绑定才绑定到全局对象, 跟调用位置是否严格无关:

```javascript
function foo() {
    console.log(this.a);
}

var a = 2;

(function() {
    'use strict';
    foo();
})();
```

**隐式绑定**: 调用位置是否有上下文对象, 函数的调用如果由一个对象发起, 可认为函数被调用时对象"拥有"或者"包含"它, 则调用位置会使用对象上下文来引用函数.

对象属性引用链中只有最后一层在调用位置中起作用:

```javascript
function foo() {
    console.log(this.a);
}

var obj2 = {
    a: 42,
    foo: foo
};

var obj1 = {
    a: 2,
    obj2: obj2
};

obj1.obj2.foo();
```

被隐式绑定的函数有一个问题是会丢失绑定的对象, 从而启用默认绑定.

```javascript
function foo() {
    console.log(this.a)
}

var obj = {
    a: 2,
    foo: foo
};

var bar = obj.foo;

var a = "oops, global";

bar(); // "oops, global"
```

在这里个人认为可以看做是foo函数的发起对象由obj转变为window, 也就是原来的`obj.foo()`, 因为foo赋值到bar上, 变成了`window.bar()`. 而`foo === bar`, 所以隐式绑定丢失, 启动默认绑定.

这种丢失也会发生在函数作为回调函数传入并调用的情况下. 由于传递参数其实是一种**隐式赋值**跟上面的例子结果一样.

**显式绑定**. 通过使用`apply`以及`call`函数来实现显式绑定. 显式绑定无法解决前面的绑定丢失问题, 但是其变种: **硬绑定**可以实现.

硬绑定就是创建一个包裹函数负责接收参数并返回值:

```javascript
function foo(something) {
    console.log(this.a, something);
    return this.a + something;
}

function bind(fn, obj) {
    return function() {
        return fn.apply(obj, arguments);
    };
}

var obj = { a: 2 };
var bar = bind(foo, obj);
var b = bar(3);
console.log(b);
```

**new绑定**. JavaScript中的new机制跟面向类的语言不一样, 在JavaScript中使用new操作符调用的函数相当于进行"构造调用", 而函数依然是函数, 它并不会属于某个类, 也不会实例化一个类.

函数发生构造调用时会执行下列操作:

1. 创建一个全新的对象
2. 新对象被执行`[[Prototype]]`连接
3. 新对象绑定到函数调用的this (有异议, 应该是函数调用的this绑定为新对象, 否则如果这样使用`new obj.foo()`, 那么函数调用的this不就应该是obj了吗)
4. 如果函数没有返回其他对象, 那么new表达式中的函数调用会自动返回这个新对象

### 优先级

某个调用位置可以应用多条规则时, 需要明确this绑定的优先级. 而默认绑定毫无疑问是最低的.

1. **显式绑定**高于**隐式绑定**
2. **new绑定**高于**隐式绑定**
3. **new绑定**高于**显示绑定**

由于new不能直接和call或者apply共用, 即`new foo.call(obj1)`是不成立的. 但是可以跟硬绑定一起使用, 结果可知this最终绑定为new创建的对象:

```javascript
function foo(something) {
    this.a = something;
}

var obj1 = {};

var bar = foo.bind(obj1);
bar(2);
console.log(obj1.a); // 2

var baz = new bar(3);
console.log(obj1.a); // 2
console.log(baz.a); // 3
```

### 绑定例外

由于某些情况下会把`null`, `undefined`作为this的绑定对象来使用`call`, `apply`以及`bind`, `null`以及`undefined`在调用时会忽略, 实际上会使用默认绑定规则. 最常见的应用场景就是函数柯里化.

这就有可能会导致在不知情的情况下, 函数使用了this, 而又进行了显式绑定, 这个时候就会修改到全局环境. 最好是使用一个空对象作为引用, 这样即使函数内使用了this也不会对全局环境造成影响. 创建空对象使用`Object.create(null)`, 因为这样得到的对象不会有`Object.prototype`, 比`{}`"更空".

**软绑定**. 软绑定相比于硬绑定有: 能够进行this绑定, 同时又不会丢失隐式绑定跟显式绑定的效果:

```javascript
if (!Function.prototype.softBind) {
    Function.prototype.softBind = function(obj) {
        var fn = this;
        var curried = [].slice.call(arguments, 1);
        var bound = function() {
            return fn.apply(
                (!this || this === (window || global)) ?
                    obj : this,
                curried.concat.apply(curried, arguments)
            );
        };
        bound.prototype = Object.create(fn.prototype);
        return bound;
    }
}
```

### this词法

箭头函数并不使用this的四种标准规则, 而是根据外层(函数或者全局)作用域来定义this. 其机制相当于`var self = this`后将self传入函数内使用. 箭头函数的绑定无法被修改. (new也不行)


## 对象

从技术角度来说, 函数永远不会"属于"一个对象, 但是习惯上将对象内部引用的函数称为"方法".

### 内容

**复制对象**. 在新的ES6语法中, 对对象进行浅复制的方法是: `Object.assign`. 这个方法将遍历一个或多个对象的所有可枚举的"自有键", 并将它们复制到目标对象, 并返回.

**属性描述符**. ES5开始, 所有的属性都具有属性描述符. 可以通过`Object.getOwnPropertyDescriptor(obj, key);`来获取描述符状态. 一般情况下创建普通属性时属性描述符会使用默认值, 也可以通过`Object.defineProperty(...)`来添加或者修改一个已有属性, 这个属性需要是**configurable**的, 举例:

```javascript
var obj = {};
Object.defineProperty(obj, "a", {
    value: 2,
    writable: true,
    configurable: true,
    enumerable: true
});
```

其中, **configurable**修改为false是单向操作, 无法撤销, 且无法删除, 即无法使用`delete obj.a`这样的表达式.

enumerable设置对象属性在`for..in`循环等表达式中是否可见.

**不变性**.

1. 结合`writable: false`以及`configurable: false`可以创建一个真正的常量属性(不可修改, 重定义或者删除)
2. 禁止扩展, 通过`Object.preventExtensions(..)`可以禁止一个对象添加新属性并且保留已有属性.
3. 密封. `Object.seal(..)`会创建一个"密封"对象, 方法实际上是调用`Object.preventExtensions`后再将所有的属性标记为`configurable: false`. 因此密封后不能添加新属性, 也不能重新配置或者删除任何现有属性, 但是可以修改属性的值.
4. 冻结. `Object.freeze(..)`会创建一个冻结对象, 相当于在现有对象上调用`Object.seal`后再把所有"数据访问"属性标记为`writable: false`.

**Getter和Setter**. Getter和Setter只能应用在单个属性上, 当一个属性定义了getter, setter或者两者都定义了的时候, 属性会被定义为"访问描述符". 这时候JavaScript会**忽略**属性`value`和`writable`特性, 而是关心`set`, `get`, `configurable`和`enumerable`特性.

```javascript
var myObject = {
    // 定义一个getter
    get a() {
        return 2;
    }
};

Object.defineProperty(
    myObject,
    "b",
    {
        // 给b设置一个getter
        get: function() { return this.a * 2 },
        // 确保b出现在对象属性列表中
        enumerable: true
    }
);

myObject.a // 2
myObject.b // 4

// 由于只定义了getter, 所以对于a进行设置时, set操作会忽略赋值操作, 而且由于get只返回2, 即使有合法的setter也不会对返回值造成影响.
myObject.a = 3;
myObject.a; // 2

// 一般来说get跟set是成对出现的.
var myObject = {
    get a() {
        return this._a_;
    },
    set a(val) {
        this._a_ = val * 2;
    }
}

myObject.a = 2;
myObject.a; // 4
```

**存在性**. 要检查一个属性的存在性, 可以用`in`操作符来实现. 这样可以判断一个属性是存储undefined值还是由于不存在而得到undefined的情况. `in`操作符检查的是属性名是否存在. 因此对于数组, `4 in [2, 4, 6]`会返回false. 因为其属性名只有: `0, 1, 2`.

枚举, 判断属性是否可以枚举除了`for..in`循环以外, 还可以通过`myObject.propertyIsEnumerable('a');`这种方式来实现, 其会检查给定属性是否直接存在于对象中(非原型链)且满足`enumerable: true`.

`Object.keys(..)`会返回一个数组, 包含所有可枚举属性, `Object.getOwnPropertyNames(..)`会返回一个数组, 包含所有属性, 无论是否可枚举.

上面的两个方法都只会查找对象直接包含的属性.

### 遍历

ES5新增了一些数组的辅助迭代器, 包括`forEach(..)`, `every(..)`, `some(..)`.

想要直接遍历数组的值可以使用ES6新增的`for..of`循环语法. 由于数组有`@@iterator`, 因此`for..of`可以直接应用在数组上. 要获取数组的迭代器对象可以通过`Symbol.iterator`函数来实现:

```javascript
var myArray = [1, 2, 3];
var it = myArray[Symbol.iterator]();

it.next() // { value: 1, done: false }
it.next() // { value: 2, done: false }
it.next() // { value: 3, done: false }
it.next() // { done: true }
```

对象没有内置的`@@iterator`, 因此无法自动完成`for..of`遍历, 但是可以给想遍历的对象定义`@@iterator`:

```javascript
var myObject = {
    a: 2,
    b: 3
};

Object.defineProperty(myObject, Symbol.iterator, {
    enumerable: false,
    writable: false,
    configurable: true,
    value: function() {
        var o = this;
        var idx = 0;
        var ks = Object.keys(o);
        return {
            next: function() {
                return {
                    value: o[ks[idx++]],
                    done: (idx > ks.length)
                }
            }
        }
    }
});
```

## 第五章 原型

**属性设置和屏蔽**. 当属性不直接存在于对象上, 而是存在于原型链上层时, 假设`myObject.foo = "bar"`会出现三种情况.

1. 没有标记为只读(writable:false)那么就会直接在`myObject`中添加一个新属性, 且是屏蔽属性.
2. 标记为只读则无法修改已有属性或者在`myObject`上创建屏蔽属性.
3. 上层的foo是一个`setter`, 则foo不会被添加到`myObject`, 也不会重新定义foo这个`setter`.

如果需要在2, 3情况下进行 1 的屏蔽操作则需要使用`Object.defineProperty`来实现.

如果想要修改一个对象的委托属性时, 不能直接通过赋值来修改, 这样会形成隐式屏蔽:

```javascript
var anotherObject = {
    a: 2
};

var myObject = Object.create(anotherObject);
console.log(anotherObject.a);
console.log(myObject.a);

// 实际意图是修改原型链上的anotherObject的属性, 但是却意外创建了myObject对象上的新属性, 形成隐式屏蔽.
// 因为实际操作为: myObject.a = myObject.a + 1;
myObject.a++;

console.log(anotherObject.a);
console.log(myObject.a);
```

#### "类"

面向类的语言中, 类可以被复制(实例化)多次, 实例化一个类就意味着"把类的行为复制到物理对象中", 但是JavaScript中并没有类似的**复制机制**. 不能创建一个类的多个实例, 只能创建多个对象.

真正类中的**继承**意味着复制, 但是JavaScript(默认)并不会复制对象属性. 而是创建对象之间的关联. 一个对象可以通过**委托**访问另一个对象的属性和函数.

进行`prototype`关联, 在ES6之前, 可以使用`Bar.prototype = Object.create(Foo.prototype)`, 而在ES6开始可以直接修改现有的对象的`prototype`: `Object.setPrototypeOf(Bar.prototype, Foo.prototypei)`;

`Object.create(null)`会创建一个没有原型链的对象, 因此不会受到原型链的干扰, 适合用来存储数据.

## 行为委托

JavaScript中的prototype机制本质上来说就是对象之间的关联关系.

### 面向委托的设计

在prototype委托中最好将状态保存在委托者(XYZ)而不是委托目标上(Task): `XYZ = Object.create(Task);`

在使用类时会故意让父类和子类都有相同的方法, 从而利用重写(多态)的优势. 而在prototype这种行为委托中, 需要尽量避免在prototype链的不同级别中使用相同的命名, 否则需要额外的工作才能消除歧义.

委托行为意味着某些对象在找不到属性或者方法引用时会把请求委托给另一个对象. 对象不是按照父类到子类的关系垂直组织的, 而是通过任意方向的委托关联**并排组织**的.

面向对象风格代码:

```javascript
function Foo(who) {
    this.me = who;
}
Foo.prototype.identify = function() {
    return "I am " + this.me;
};

function Bar(who) {
    Foo.call(this, who);
}
Bar.prototype = Object.create(Foo.prototype);
Bar.prototype.speak = function() {
    alert("Hello, " + this.identify() + ".");
};
var b1 = new Bar("b1");
var b2 = new Bar("b2");

b1.speak();
b2.speak();
```

对象关联风格代码:

```javascript
Foo = {
    init: function(who) {
        this.me = who;
    },
    identify: function() {
        return "I am " + this.me;
    }
};
Bar = Object.create(Foo);

Bar.speak = function() {
    alert("Hello, " + this.identify() + ".");
};

var b1 = Object.create(Bar);
b1.init("b1");
var b2 = Object.create(Bar);
b2.init("b2");

b1.speak();
b2.speak();
```

控件例子的实现:

```javascript
var Widget = {
    init: function(width, height) {
        this.width = width || 50;
        this.height = height || 50;
        this.$elem = null;
    },
    insert: function($where) {
        if (this.$elem) {
            this.$elem.css({
                width: this.width + 'px',
                height: this.height + 'px'
            }).appendTo($where);
        }
    }
}

var Button = Object.create(Widget);
Button.setup = function(width, height, label) {
    // 委托调用
    this.init(width, height);
    this.label = label || "Default";

    this.$elem = $('<button>').text(this.label);
};

Button.build = function($where) {
    // 委托调用
    this.insert($where);
    this.$elem.click(this.onClick.bind(this));
};

Button.onClick = function(evt) {
    console.log("Button '" + this.label + "' clicked!");
};

$(document).ready(function() {
    var $body = $(document.body);
    var btn1 = Object.create(Button);
    btn1.setup(125, 30, "Hello");

    var btn2 = Object.create(Button);
    btn2.setup(150, 40, "World");

    btn1.build($body);
    btn2.build($body);
});
```

上面的实现将实现构造和初始化分开了, `(var btn1 = Object.create(Button) 和 btn1.setup(..))`, 因此可以在需要的时候再对实例进行初始化. 不用像类构造函数那样在同一个步骤中实现构造和初始化.

### 更好的语法

在ES6中, 可以使用对象字面形式来改写之前的繁琐的属性赋值语法, 并使用`Object.setPrototypeOf(..)`来修改`[[Prototype]]`:

```javascript
var LoginController = {
    error: [],
    getUser() {
        // ...
    },
    getPassword() {
        // ...
    }
    // ...
};
var AuthController = {
    errors: [],
    checkAuth() {
        // ...
    },
    server(url, data) {
        // ...
    }
    // ...
};

Object.setPrototypeOf(AuthController, LoginController);
```

### 内省

由于使用的是委托的方式, 所以可以直接进行检查, 避免了类方式的各种检查实例类型的麻烦.

```javascript
var Foo = { /* .. */ };
var Bar = Object.create(Foo);
// Bar...
var b1 = Object.create(Bar);

Foo.isPrototypeOf(Bar); // true
Object.getPrototypeOf(Bar) === Foo; // true

Foo.isPrototypeOf(b1); // true
Bar.isPrototypeOf(b1); // true
Object.getPrototypeOf(b1) === Bar; // true;
```