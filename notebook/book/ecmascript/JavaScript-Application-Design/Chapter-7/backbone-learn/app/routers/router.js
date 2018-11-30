/* global define */
define([
    'backbone',
    '../views/index/index'
], function (Backbone, IndexView) {
    return Backbone.Router.extend({
        routes: {
            '': 'index'
        },
        index: function () {
            new IndexView();
        }
    });
});
