# 第六章: 库和API设计

## 保持一致的约定

在开发库和API时, 保持接口接受参数的一致性是十分重要的, 这能够方便使用者使用库减少学习难度.

## 将'undefined'看做没有值

- 避免用undefined来表示任何非特定值
- 使用描述性的字符串值或命名布尔属性的对象, 而不要使用undefined或null来代表特定应用标志
- 提供参数默认值应当采用测试undefined的方式, 而不是检查arguments.length, 因为传参时, 如果指定参数为undefined, 则参数长度也会响应改变
- 在允许0, NaN或者空字符串为有效参数的地方, 不要通过真值测试来实现参数默认值, 即`param || 'default'`这样的形式.

## 接收关键字参数的选项对象

- 使用选项对象使得API更具有可读性, 更容易记忆
- 所有通过选项对象提供的参数应当被视为可选的
- 使用extend函数抽象出选项对象中提取值的逻辑

## 避免不必要的状态

API可以用状态来将其归为两类, 一类是有状态的API, 一类是无状态的API

**无状态**API提供的函数或方法的行为只取决于输入, 与程序的状态改变无关. 如字符串的`'hello'.tuUpperCase()`总是输出`HELLO`.

**有状态**API意味着对于相同的调用, 根据内部状态的不同会产出不同的结果, 如Date对象的函数.

- 因此设计API时, 尽可能将其设置为无状态的. 尽可能使用无状态的API
- 如果API是有状态的, 标示出每个操作与哪些状态有关联. 或者在使用时, 将其封装成一个无状态的API

## 使用结构类型(鸭子类型)设计灵活的接口

- 一个调用某个对象方法的函数能够与任何实现了相同接口的对象一起工作
- 结构接口更灵活, 更轻量, 可以避免使用繁琐的继承
- 在单元测试时, 可以使用mock对象即接口的替代实现来提供可复验的行为

## 区分数组对象与类数组对象

- 猜测一个对象是否实现了结构类型可以称之为鸭子测试, 但是由于JavaScript中的一般对象没有明确的信息标记来表示它们实现的结构类型. 所以**API绝不应该重载与其他类型有重叠的类型**
- 当重载一个结构类型与其他类型时, 先测试其他类型
- 当重载其他对象类型时, 明确接收真数组而不是类数组对象, 也就是说在传入前需要用其他方法将类数组对象转化为数组对象.
- 文档中需要标注API是否接收真数组或类数组值
- 使用Array.isArray方法来测试真数组

## 避免过度强制转换

过度的强制转换结合重载会让代码变得难以理解, 且容易带来错误, 因此可以通过防御性编程来抵御潜在的错误, 如实现一个检视对象guard

```javascript
var guard = {
    guard: function(x) {
        if (!this.test(x)) {
            throw new TypeError('expected ' + this);
        }
    }
};

// 原型方法链
guard.or = function (other) {
    var result = Object.create(guard);

    var self = this;
    result.test = function(x) {
        return self.test(x) || other.test(x);
    };

    var description = this + ' or ' + other;
    result.toString = function() {
        return description;
    };

    return result;
};

// 实现整数测试
var uint32 = Object.create(guard);

uint32.test = function(x) {
    return typeof x === 'number' && x === (x >>> 0);
};

uint32.toString = function() {
    return 'uint32';
};

// 使用
function SomeFun(x) {
    uint32.or(arrayLike).guard(x);
}

// 实现arrayLike对象监视
var arrayLike = Object.create(guard);
arrayLike.test = function(x) {
    return typeof x === 'Object' && x && uint32.test(x.length);
};

arrayLike.toString = function() {
    return 'array-like Object';
};
```

- 避免强制转换和重载的混用
- 考虑防御性地监视非预期的输入