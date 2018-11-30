// 自己实现的迭代器
// 属于内部迭代器，内部已经定义好了迭代规则，完全接手整个迭代过程
var each = function(ary, fn) {
    for (var i = 0, l = ary.length; i < l; i++) {
        fn.call(ary[i], i, ary[i]);
    }
};

each([1, 2, 4], function (i, n) {
    console.log(i, n);
});

// 外部迭代器必须要显式地请求迭代下一个元素
var Iterator = function(obj) {
    var current = 0;

    var next = function() {
        current += 1;
    };

    var isDone = function() {
        return current >= obj.length;
    };

    var getCurrentItem = function() {
        return obj[current];
    };

    return {
        next: next,
        isDone: isDone,
        getCurrentItem: getCurrentItem
    };
};
