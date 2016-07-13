{{^editing}}
<span>{{quantity}} x {{name}}</span>
<button type="button" class="edit">Edit</button>
<button type="button" class="remove">X</button>
{{/editing}}

{{#editing}}
<span>{{name}}</span>
<input type="button" name="edit-quantity" value="{{quantity}}" type="number">
<button type="button" class="cancel">Cancel</button>
<button type="button" class="save">Save</button>
{{/editing}}

{{#error}}
<span>{{error}}</span>
{{/error}}
<!-- {{#shopping_list}}
<li>
    <span>{{quantity}} x {{name}}</span>
    <button type="button" class="remove" data-name="{{name}}">X</button>
</li>
{{/shopping_list}} -->
