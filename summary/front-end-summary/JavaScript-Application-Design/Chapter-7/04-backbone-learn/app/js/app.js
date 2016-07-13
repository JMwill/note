// var ShoppingListView = require('../views/shopping_list.js');
// var shoppingListView = new ShoppingListView();
//
var Backbone        = require('backbone');
Backbone.$          = require('jquery');

var ShoppingListView= require('../views/shoppingList');
var shoppingListView= new ShoppingListView();

var AddItemView     = require('../views/addItem');
var addItemView     = new AddItemView({ collection: shoppingListView.collection });
// shoppingListView.viewModel = {
//     shopping_list: [
//     ]
// };
//
// shoppingListView.render();
