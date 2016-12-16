/* global define */
define([
    'backbone',
    'mustache'
], function (Backbone, Mustache) {
    'use strict';
    return Backbone.View.extend({
        render: function () {
            this.el.innerHTML = Mustache.to_html(this.template, this.viewModel);
        }
    })
});
