// 封装变量
var pluseOne = (function () {
    var begin = 0;
    return function () {
        console.log(begin++);
    }
}());

// 延续局部变量的寿命
// Image对象进行数据上报，低版本浏览器在发起请求前有可能丢失变量
var report = function (src) {
    var img = new Image();
    img.src = src;
}
report('http://data');

// 修改
var report = (function () {
    var imgs = [];
    return function (src) {
        var img = new Image();
        img.src = src;
        imgs.push(img);
    }
}());
