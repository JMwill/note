# 第四章 对象和原型

## 获取prototype的方法有两种:

- 标准方法: `Object.getPrototypeOf(obj)`
- 非标准方法: `obj.__proto__`

记住要使用`Object.getPrototypeOf`函数而不要使用`__proto__`属性

虽然`__proto__`提供了修改对象原型链接的能力, 但是会导致很多的问题, 因此不要使用`__proto__`

## 使构造函数与new操作符无关

可以让使用者无论怎么调用都返回一个实例

```javascript
function Fun(param1, param2) {
    if (!(this instanceof Fun)) {
        return new Fun(param1, param1);
    }
    this.param1 = 'param1';
    this.param2 = 'param2';
}
```

但是上述方法不适用于不定参数的函数, 没有一种直接模拟apply方法将可变参数函数作为构造函数调用的方式. 可以利用ES5的Object.create函数来进行另一种实现

```javascript
function Fun(param1, param1) {
    var self = this instanceof Fun
               ? this
               : Object.create(Fun.prototype);
    self.param1 = 'param1';
    self.param2 = 'param2';

    return self;
}
```

## 将方法存储在原型中

将方法存储在原型中, 能够避免在实例中创建函数的多个副本. 由于JavaScript引擎的深度优化, 缩短调用链不一定优化方法查找速度.

## 使用闭包存储私有数据

通过闭包能够对安全敏感的信息进行隐藏, 实现私有属性

```javascript
function Fun(param1, param2) {
    this.toString = function() {
        return '[Fun ' + param1 + ']';
    }
    this.getParam2 = function() {
        return param2;
    }
}
```

由于没有存储param1以及param2, 因此无法直接获得param1跟param2, 但是通过实例方法可以实现对这两个参数的访问. 保证了信息不会被轻易改动.

## 正确认识this的隐式绑定问题

每个函数都有一个this变量的隐式绑定. 这个this的绑定值是在调用该函数的时候确定的. this变量隐式地绑定到**最近的封闭函数**. 要引用到不同作用域的this变量, 可以通过在需要引用的作用域内存储一个this的别名的变量, 或者通过ES5的回调函数的bind方法来进行绑定.

## 在子类的构造函数中调用父类的构造函数

- 在子类构造函数中显式地传入this作为显式的接受者调用父类的构造函数.
- 使用Object.create函数来构造子类的原型对象以避免调用父类的构造函数.

通过在子类的构造函数中调用父类的构造函数, 能够在不希望初始化原型时就调用到父类, 如:

```javascript
function Human(world, name, sex) {
    this.name = name;
    this.sex = sex;
    this.world = world;

    world.addHumans(this);
}
Human.prototype.laugh = function() {
    console.log('hahaha');
}

// 如果要以这个父类来实现一个子类, 由于在创建子类的过程中就不能直接在实现子类的原型阶段就调用父类
// 这里不能通过Chinese.prototype = new Human()来进行继承, 因为创建时还无法确定world, name, sex等信息. 这些信息也不适合放在原型上.
function Chinese(world, name, sex, city) {
    Human.apply(this, world, name, sex);
    this.city = city;
}

Chinese.prototype = Object.create(Human.prototype);
```