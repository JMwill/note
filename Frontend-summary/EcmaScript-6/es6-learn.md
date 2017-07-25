# ES6学习记录

## 局部变量与静态变量

es6提供语句块内的局部变量，通过let定义，同时使用const可以生成静态变量

```
{
    let a = 'a word';

    console.log(a);
}
console.log(a); // error;

const b = 'word';
b = 'another word';
console.log(b); // 'word'
```

## 箭头函数

像常规的函数一样使用，省却了输入多余的function的烦恼。如果省却大括号则默认返回运算后的结果，需要知道的是，箭头函数的this指向是最近的对象，无需进行特殊绑定。

```
() => {
    // do something
}

var numList = [1, 2, 3, 4, 5];
var oddNums = numList.filter(v => v % 2 != 0)

oddNums.forEach((v, i) {
    if (v % 3 === 0) {
        console.log('aha!');
    }
});
```

## 类

es6引入了类，方便进行面向对象开发，具有一般的类功能。

```
class Child extends Parent {
    constructor(name, skill) {
        super (name, skill);
        this.birth = new Date();
        this.sex = Child.getSex();
        this.age = Child.getAge();
        // ...
    }
    static getSex() {
        return Date.now() % 2 === 0 ? 'Male' : 'Female';
    }
    getAge() {
        getAge = super.getAge || () => Date.now() - this.birth;
        super.getAge();
    }
}
```

## 增强的对象

对象标示名称与对象变量同名可以直接使用名称返回。对象内还支持运算以及函数省略function标识，同时对象支持动态的属性名称，可经过计算得出。

```
var obj = {
    handler,
    getDate() {
        return new Date();
    },
    ["prop" + (() => Date.now())()]: 'prop with timestamp!'
}
```

## 字符串模板

es6提供字符串模板，使用反撇号包围，可以进行多行编辑无需进行换行处理。通过使用**${}**包围引入变量，可以向字符串传值，同时使用无转义字符串也可以通过String.raw来实现

```
`Simple string like normal`

`Multiple line 
and do not need +`

var name = 'will', sex = 'man';
`Hello my name is ${name}, I am ${sex}!`

String.raw`In ES5 "\n" is a line-feed`

var name = 'will', sex = 'man';
function strTester(strList, ...valList) {
    strList.forEach((str) => {
        console.log(str);
    });
    valList.forEach((val) => {
        console.log(val);
    });

    return 'return string';
}

strTester`Just a test String, I am ${name} and I am a ${sex}!`
```

## 解构

es6目前能够对赋值，函数传参等情况进行参数解构以及识别。还能够对对象内的值进行自动查找和匹配，方便日常开发。

```
// 列表:
var [a, ,b] = [1, 2, 3];
var [c, d, ...rest] = [1, 2, 3, 4, 5];
console.log(
    a === 1,
    b === 3,
    c === 1,
    d === 2
)
console.log(rest);

[a, b] = [b, a]; // 交换变量

function fun() {
    return [1, 2, 3]; // 返回多个值
}

// 对象:
var obj = {a: 123, b: false};
var {a, b} = obj;
console.log(a, b);
var {a: aaa, b: bbb} = o; // 新变量名赋值
console.log(aaa, bbb);

function fun({par: 'default value'}) {
    // ...
    console.log(par);
}

fun({par: 'custom value!'});

function matchObj () {
    return {
        test: 'test obj',
        match: {
            'another': 'oh, another obj'
        }
    }
}
var {test: outsideTest, match: {outsideAnother}} = matchObj();
const {a, b} = require('modules/tools'); // 加载模块

```

## 函数参数默认值，参数解构

es6提供设定函数参数默认值，参数解构的功能

```
function fun(x, y = 12) {
    return x + y;
}
console.log(fun(12) === 24);

function fun2(x, ...y) {
    console.log(y.length);
}
fun2(1, 2, 3, 4);

function fun3(x, y, z) {
    return x + y + z;
}
console.log(fun3(...[1, 2, 3]) === 6);
```
