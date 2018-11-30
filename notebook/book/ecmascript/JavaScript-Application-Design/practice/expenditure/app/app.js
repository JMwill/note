/* global require */
'use strict';

// Require js allows to configure shortcut alias
require.config({
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        }
    },
    paths: {
        jquery: '../node_modules/zepto/dist/zepto.min',
        underscore: '../node_modules/underscore/underscore-min',
        backbone: '../node_modules/backbone/backbone-min',
        mustache: '../node_modules/mustache/mustache.min',
        text: '../node_modules/text/text'
    }
});
require([
    'backbone',
    'routers/router'
], function (Backbone, Router) {
    // Initial routing and start Backbone.history()
    new Router();
    Backbone.history.start();
});
