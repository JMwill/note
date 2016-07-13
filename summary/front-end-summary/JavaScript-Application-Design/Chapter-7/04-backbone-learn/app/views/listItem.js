var fs          = require('fs');
var base        = require('../commons/base');
var tmpl        = fs.readFileSync(
    __dirname + '/templates/listItem.mu', {encoding: 'utf8'}
);

module.exports = base.extend({
    tagName: 'li',
    template: tmpl,
    initialize: function () {
        this.model.on('change', this.updateView, this);
        this.updateView();
    },
    events: {
        'click .edit': 'editItem',
        'click .cancel': 'cancelItem',
        'click .remove': 'removeItem',
        'click .save': 'saveItem'
    },
    updateView: function () {
        this.viewModel = this.model.toJSON();
        this.viewModel.error = this.model.validationError;
        this.render();
    },
    removeItem: function (e) {
        this.collection.remove(this.model);
    },
    editItem: function (e) {
        this.model.validationError = null;
        this.model.set('editing', true);
    },
    cancelItem: function (e) {
        this.model.validationError = null;
        this.model.set('editing', false);
    },
    saveItem: function (e) {
        var quantity = parseInt(this.$('input[name="quantity"]').val(), 10);
        this.model.set('quantity', quantity, {validate: true});
        this.model.set('editing', this.model.validationError);
    }
});
