// 原型继承
var OriginalObj = function () {
    this.name = 'obj';
    this.len = 10;
    this.other = {};
};

var obj = new OriginalObj();

obj.name = 'new obj';
console.log(obj);

var cloneObj = Object.create(obj);
console.log(cloneObj.__proto__); // 继承的属性在原型对象上
