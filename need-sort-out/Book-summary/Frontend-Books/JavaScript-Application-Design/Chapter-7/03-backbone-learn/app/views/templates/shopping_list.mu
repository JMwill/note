<ul>
    {{#shopping_list}}
    <li>
        <span>{{quantity}} x {{name}}</span>
        <button type="button" class="remove" data-name="{{name}}">X</button>
    </li>
    {{/shopping_list}}
</ul>
<fieldset>
    <legend>Add Groceries</legend>
    <label for="name">Name</label>
    <input type="text" name="name" value="{{name}}">

    <label for="quantity">Quantity</label>
    <input type="text" name="quantity" value="{{quantity}}">

    <button type="button" class="add">Add</button>
    {{#error}}
    <p> {{error}} </p>
    {{/error}}
</fieldset>
