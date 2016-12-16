var fs           = require('fs');
var base         = require('../commons/base');
var ShoppingList = require('../collections/shoppingList');
var ListItemView = require('./listItem');
var list         = require('../services/itemCollections');
var tmpl         = fs.readFileSync(
    __dirname + '/templates/list.mu', {encoding: 'utf8'}
)

module.exports = base.extend({
    el: '.view',
    template: tmpl,
    initialize: function () {
        this.partials = {};
        this.render();
        this.$list = this.$('.items');
        list.collection.on('add', this.addItem, this);
        list.collection.on('remove', this.removeItem, this);
        list.collection.models.forEach(this.addItem, this);
    },
    addItem: function (model) {
        var item = new ListItemView({
            model: model
        });
        this.$list.append(item.el);
        this.partials[model.cid] = item;
    },
    removeItem: function (model) {
        var item = this.partials[model.cid];
        item.$el.remove();
        delete this.partials[model.cid];
    }
});
