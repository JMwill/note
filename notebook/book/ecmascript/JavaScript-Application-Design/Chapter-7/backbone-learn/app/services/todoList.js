/* global define */
define([
    'backbone',
    '../collections/index/todos'
], function (Backbone, Todos) {
    var data = [
        { todo: '制作Todo清单', born: '创建日期：2016年07月，星期三 13:40:04', time: 1468979761569, done: false },
    ];

    return {
        collection: new Todos(data)
    };
});
