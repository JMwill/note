# CSS选择器

querySelector以及querySelectorAll在执行**元素级**查询时, 只检查选择器的最后一部分是否匹配: 

```html
<div id="test">
    <b>Hello</b>, in #test
</div>
<script>
window.onload = function() {
    var b = document.getElementById('test').querySelector('div b');
    console.assert(b, 'Only the last part of the selector matters');
}
</script>
```

可以通过强制在目标元素上添加一个新的id来改变根元素的上下文来解决问题

```html
<div id="test">
    <b>Hello</b>, in #test
</div>
<script>
(function() {
    var count = 1;
    this.rootedQuerySelectorAll = function(elem, query) {
        var oldID = elem.id;
        elem.id = 'rooted' + (count++);

        try {
            return elem.querySelectorAll('#' + elem.id + " " + query);
        } catch(e) {
            throw e;
        } finally {
            elem.id = oldID;
        }
    }
})();
window.onload = function() {
    var b = rootedQuerySelectorAll(
        document.getElementById('test'), 'div b'
    );
    console.assert(b.length === 0, 'The selector is now rooted properly.');
}
</script>
```

在浏览器中还可以使用xpath表达式的方式来查询需要的元素:

```javascript
if (typeof document.evaluate === 'function') {
    function getElementsByXPath(expression, parentElement) {
        var results = [];
        var query = document.evaluate(expression,
            parentElement || document,
            null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        for (var i = 0, length = query.snapshotLength; i < length; i++) {
            results.push(query.snapshotItem(i));
        }
        return results;
    }
}
```