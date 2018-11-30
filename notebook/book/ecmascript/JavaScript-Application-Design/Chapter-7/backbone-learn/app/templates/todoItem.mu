<p class="todo-content {{#done}}done{{/done}}">
    <button type="button" class="remove">删除</button>
    {{todo}}
</p>
<p class="todo-time"> {{born}} <input type="checkbox" name="done" class="done" {{#done}}checked{{/done}}> </p>
