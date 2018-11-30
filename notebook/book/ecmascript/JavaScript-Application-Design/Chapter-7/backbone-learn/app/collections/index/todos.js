/* global define */
define([
    'backbone',
    '../../models/index/todo'
], function (Backbone, Todo) {
    return Backbone.Collection.extend({
        model: Todo
    });
});
