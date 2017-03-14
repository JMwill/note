// 加载图片
var myImage = (function () {
    var imgNode = document.createElement('img');
    document.body.appendChild(imgNode);

    return {
        setSrc: function (src) {
            imgNode.src = src;
        }
    };
})();

// 为避免加载时出现空白情况，构造代理对象使用占位图
var proxyImage = (function() {
    var img = new Image;
    img.onload = function () {
        myImage.setSrc(this.src);
    };

    return {
        setSrc: function (src) {
            myImage.setSrc('/loadImg.gif');
            img.src = src;
        }
    };
})();

proxyImage.setSrc('http://img2.imgtn.bdimg.com/it/u=395920684,863299018&fm=21&gp=0.jpg');


// 代理的意义
// 不用代理的预加载图片函数
// 在不需要预加载功能时，需要深入本体进行修改。这是一个虚拟代理的例子
var MyImage = (function () {
    var imgNode = document.createElement('img');
    document.body.appendChild(imgNode);
    var img = new Image();

    img.onload = function () {
        imgNode.src = this.src;
    };

    return {
        setSrc: function (src) {
            imgNode.src = '/loadingImg.gif';
            img.src = src;
        }
    };
})();

// 合并HTTP请求
var synchronousFile = function (id) {
    console.log('同步文件：' + id);
};

var proxySynchronousFile = (function () {
    var cache = [];
    var timer;

    return function (id) {
        cache.push(id);
        if (timer) {
            return timer;
        }

        setTimeout(function () {
            synchronousFile(cache.join(','));
            clearTimeout(timer);
            timer = null;
            cache.length = 0;
        }, 2000);
    }
})();

var checkBoxs = document.querySelectorAll('input[type="checkbox"]');
for (var i = 0, c; c = checkbox[i++];) {
    c.onclick = function () {
        if (this.checked === true) {
            proxySynchronousFile(this.id);
        }
    }
};

// 缓存代理
// mult函数继续进行专注自身的职责，额外的缓存功能由代理对象实现
var mult = function () {
    console.log('开始计算');
    var a = 1;
    for (var i = 0, l = arguments.length; i < l; i++) {
        a = a * arguments[i];
    }
    return a;
}

mult(1, 2);
mult(2, 3, 4);

var proxyMult = (function () {
    var cache = {};
    return function () {
        var args = Array.prototype.join.call(arguments, ',');
        if (args in cache) {
            return cache[args];
        }
        return cache[args] = mult.apply(this, arguments);
    }
})();

// 高阶函数动态创建代理
var createProxyFactory = function (fn) {
    var cache = {};
    return function () {
        var args = Array.prototype.join.call(arguments, ',');
        if (args in cache) {
            return cache[args];
        }
        return cache[args] = fn.apply(this, arguments);
    }
}
var proxyMult = createProxyFactory(mult);
