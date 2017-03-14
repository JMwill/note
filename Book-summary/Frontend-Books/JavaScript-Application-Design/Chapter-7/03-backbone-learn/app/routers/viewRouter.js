var Backbone        = require('backbone');
var ListView        = require('../views/shoppingList');
var AddItemView     = require('../views/addItem');

module.exports = Backbone.Router.extend({
    routes: {
        '': 'root',
        'items': 'listItems',
        'items/add': 'addItem'
    },

    root: function () {
        this.navigate('items', {trigger: true});
    },

    listItems: function () {
        new ListView();
    },

    addItem: function () {
        new AddItemView();
    }
});
