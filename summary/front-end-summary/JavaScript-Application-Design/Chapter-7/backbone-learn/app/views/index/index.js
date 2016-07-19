/* global define */
define([
    '../base',
    '../../collections/index/todos',
    'text!templates/index.mu'
], function (BaseView, Todos, indexTmpl) {
    return BaseView.extend({
            el: '.view',
            template: indexTmpl,
            initialize: function () {
                this.render();
                this.$input = this.$('input[name="todo"]');
            },
            events: {
                'keypress .add-todo': 'addTodo'
            },
            createTodo: function (todo) {
                var now = new Date();

                function formatData(time) {
                    var str = time.toISOString();
                    var dateStr = str.slice(0, str.indexOf('T'));
                    var timeStr = str.slice(str.indexOf('T'), str.indexOf('.'));

                    return '创建日期：' + dateStr + '时间：' + timeStr;
                }

                return {
                    todo: todo,
                    born: formatData(now),
                    time: now,
                    done: false
                }
            },
            addTodo: function (e) {
                if (e.which === 13 && this.$input.val()) {
                    Todos.add(this.createTodo(this.$input.val()));
                }
            }
        });
});
