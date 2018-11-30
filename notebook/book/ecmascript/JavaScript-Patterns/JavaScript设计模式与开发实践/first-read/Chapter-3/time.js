// 函数节流
var throttle = function (fn, interval) {
    var __fn = fn;
    var timer;
    var isFirstTime = true;

    return function () {
        var args = arguments;
        var __self = this;
        if (isFirstTime) {
            __fn.apply(__self, args);
            return isFirstTime = false;
        }

        if (timer) { return false; }

        timer = setTimeout(function () {
            clearTimeout(timer);
            timer = null;
            __fn.apply(__self, args);
        }, interval || 500);
    };
};

window.onresize = throttle(function () {
    console.log('resizing!!!!');
}, 500);

// 分时函数
var timeChunk = function (ary, fn, count) {
    var len = ary.length;
    var prop;
    var t;

    var run = function () {
        for (var i = 0; i < Math.min( count || 1, ary.length ); i++) {
            prop = ary.shift();
            fn(prop);
        }
    }

    return function () {
        t = setInterval(function () {
            if (ary.length === 0) { return clearInterval(t); }
            run();
        }, 200);
    };
};

var ary = [];
for (var i = 0; i < 1000; i++) {
    ary.push(i);
}

var tmpAry = [];
var renderList = timeChunk(ary, function (n) {
    tmpAry.push(n);
    console.log(tmpAry);
}, 8);

renderList();
