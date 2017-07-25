// 数据封装
var obj = (function () {
    var __prop = 'property';
    return {
        getProp: function () {
            return __prop;
        }
    };
}())

console.log(obj.getProp());
console.log(obj.__prop);
