/* global define */
define([
    '../base',
    '../../services/todoList',
    './todoItem',
    'text!templates/index.mu'
], function (BaseView, TodosCollection, TodoItemView, indexTmpl) {
    return BaseView.extend({
            el: '.view',
            template: indexTmpl,
            initialize: function () {
                this.render();
                this.partials = {};
                this.$input = this.$('input[name="todo"]');
                this.$todos = this.$('.list');
                TodosCollection.collection.on('add', this.addTodo, this);
                TodosCollection.collection.on('remove', this.removeTodo, this);
                TodosCollection.collection.models.forEach(this.addTodo, this);
            },
            events: {
                'keypress .todo-act input[name="todo"]': 'inputTodo',
                'click .todo-act .remove': 'removeAll',
                'click .todo-act .check': 'checkAll',
                'click .todo-act .uncheck': 'uncheckAll',
            },
            createTodo: function (todo) {
                var now = new Date();

                function formatData(time) {
                    var dateArr = [
                        time.getFullYear(),
                        time.getMonth() + 1,
                        time.getDay(),
                        time.getHours(),
                        time.getMinutes(),
                        time.getSeconds()
                    ];
                    var dayMap = ['星期零', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'];

                    var timeStr = (function () {
                        var timeArr = dateArr.slice(3);
                        timeArr.forEach(function (i, index) {
                            timeArr[index] = i < 10 ? '0' + i : i.toString();
                        });
                        return timeArr.join(':');
                    }());

                    return '创建日期：'
                                + dateArr[0] + '年'
                                + (dateArr[1] < 10 ? '0' + dateArr[1] : dateArr[1]) + '月'
                                + dayMap[dateArr[2]] + ' '
                                + timeStr;
                }

                return {
                    todo: todo,
                    born: formatData(now),
                    time: now,
                    done: false
                }
            },
            inputTodo: function (e) {
                var todo = this.$input.val().trim();
                if (e.which === 13 && todo) {
                    TodosCollection.collection.add(this.createTodo(todo));
                    this.$input.val('');
                }
            },
            addTodo: function (model) {
                var todo = new TodoItemView({
                    model: model
                });
                this.$todos.append(todo.el);
                this.partials[model.cid] = todo;
            },
            removeTodo: function (model) {
                var todo = this.partials[model.cid];
                todo.$el.remove();
                delete this.partials[model.cid];
            },
            removeAll: function () {
                TodosCollection.collection.models.forEach(this.removeTodo, this);
            },
            checkAll: function () {
                TodosCollection.collection.models.forEach(function (model) {
                    model.set({done: true});
                }, this);
            },
            uncheckAll: function () {
                TodosCollection.collection.models.forEach(function (model) {
                    model.set({done: false});
                }, this);
            }
        });
});
