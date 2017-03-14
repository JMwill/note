var Backbone        = require('backbone');
var ShoppingItem    = require('../models/shoppingItem');

module.exports = Backbone.Collection.extend({
    model: ShoppingItem
});
