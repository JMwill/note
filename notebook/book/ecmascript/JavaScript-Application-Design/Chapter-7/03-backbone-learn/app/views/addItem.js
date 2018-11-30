var fs          = require('fs');
var base        = require('../commons/base');
var tmpl        = fs.readFileSync(
    __dirname + '/templates/addItem.mu', {encoding: 'utf8'}
);

var ShoppingItem = require('../models/shoppingItem');
var list         = require('../services/itemCollections');

module.exports = base.extend({
    el: '.view',
    template: tmpl,
    initialize: function () {
        this.updateView();
    },
    events: {
        'click .add': 'addItem'
    },
    updateView: function (vm) {
        this.viewModel = vm || {};
        this.render();
    },
    updateViewWithValidation: function(vm) {
        this.viewModel = {error: vm.error};
        this.render();
    },
    addItem: function (e) {
        var name = this.$('input[name="name"]').val();
        var quantity = parseInt(this.$('input[name="quantity"]').val(), 10);
        var model = list.collection.findWhere({name: name});

        if (model) {
            model.addToOrder(quantity);
        } else {
            model = new ShoppingItem(
                {name: name, quantity: quantity},
                {validate: true}
            );

            if (!model.validationError) {
                list.collection.add(model);
            }
        }

        if (!model.validationError) {
            this.updateView();
            return;
        }

        this.updateViewWithValidation({
            name: name,
            quantity: quantity,
            error: model.validationError
        });
    }
});
