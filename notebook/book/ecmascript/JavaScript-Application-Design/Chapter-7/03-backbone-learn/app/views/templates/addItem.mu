<a href="#items" class="cancel">Cancel</a>
<fieldset>
	<legend>Add Groceries</legend>
	<label for="name">Name</label>
	<input type="text" name="name" value="{{name}}">

	<label for="quantity">Quantity</label>
	<input type="text" name="quantity" value="{{quantity}}">

	<button type="button" class="add">Add</button>
</fieldset>
{{#error}}
<p> {{error}} </p>
{{/error}}
