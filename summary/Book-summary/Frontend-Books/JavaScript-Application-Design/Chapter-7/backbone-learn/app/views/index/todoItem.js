/* global define */
define([
    '../base',
    '../../services/todoList',
    'text!../../templates/todoItem.mu'
], function (BaseView, Todos, TodoItemTmpl) {
    return BaseView.extend({
        tagName: 'li',
        template: TodoItemTmpl,
        initialize: function () {
            this.model.on('change', this.updateView, this);
            this.updateView();
        },
        events: {
            'change .done': 'todoDone',
            'click .remove': 'remove'
        },
        updateView: function () {
            this.viewModel = this.model.toJSON();
            this.render();
        },
        remove: function () {
            Todos.collection.remove(this.model);
        },
        todoDone: function (e) {
            this.model.set('done', e.target.checked);
        }
    })
});
