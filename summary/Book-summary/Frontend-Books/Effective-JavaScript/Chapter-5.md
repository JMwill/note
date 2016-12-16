# 数组和字典

## 构造轻量级的字典

由于需要避免原型链上的污染, 简便地使用for in方法. 可以通过构造一个以null为原型的对象来实现轻量级的字典:

```javascript
var x = Object.create(null);
Object.getPrototypeOf(x) === null; // true
x.hello = 'hello';
x.param = 'param';

for (var i in x) {
    console.log(i);
    // hello, param;
}
```
这样子构造出来的字典, 即使Obejct的原型链被修改, 也不会影响到它, 可以放心使用for in语法. 而不用检测

## 使用hasOwnProperty方法避免原型污染

由于对象会自带大量属性, 因此使用in操作符的时候就会出现不好的情况

```javascript
var dict = {};

console.log('toString' in dict); // true;
```

上例中, 我们并没有为对象定义toString属性, 但是由于对象自身创建的时候就带有toString方法, 而in操作符不管是什么属性, 只要能够通过原型链访问到都会显示true, 所以不可避免地会出现意外的情况