# 洞悉特性, 属性和样式

html中的特性(attribute)和属性(property)相互间有关联, 但是并不总是相同, 在属性和特性方面需要考虑五个点:

- 跨浏览器命名
- 命名限制
- HTML和XML之间的差异
- 自定义特性和行为
- 性能注意事项

浏览器之间的特性和属性命名之间会有差异, 需要明确这种情况, 如className一般用于获取class特性, 但是许多浏览器也允许直接用class属性获取而不是className属性.

命名限制在于一些属性作为保留字或者以中划线划分的特性无法直接作为属性来使用: for => htmlFor, readonly => readOnly等.

XML不会自动在元素上创建属性值来表示特性值, 因此需要进行区分: `elem.ownerDocument || elem.documentElement.nodeName.toLowerCase() !== 'html'`;

自定义的特性也不会自动转换为元素的属性表示. 需要用`getAttribute`和`setAttribute`实现访问与修改 

属性的访问速度比特性的访问速度要快

## 跨浏览器的attribute问题

### DOM中的id/name问题

表单input元素的id和name特性会作为属性值来引用, 并主动覆盖form元素上已经存在的同名属性.

```html
<form id="testForm" action="/">
    <input type="text" id="id" />
    <input type="text" name="action">
</form>
<script>
    window.onload = function() {
        var form = document.getElementById('testForm');

        console.assert(form.id === 'testForm', 'the id property is untouched');
        console.assert(form.action === '/', 'the action property is untouched');
        console.assert(form.getAttribute('id') === 'testForm', 'the id attribute is untouched');
        console.assert(form.getAttribute('action') === '/', 'the action attribute is untouched');

        // IE浏览器甚至会将getAttribute获取的值也修改到, 因此除了getAttribute这种方式之外, 还可以通过另一种方法来获取
        console.assert(form.getAttributeNode('id').nodeValue === 'testForm', 'the id nodeValue is untouched');
        console.assert(form.getAttributeNode('action').nodeValue === '/', 'the action nodeValue is untouched');
    };
</script>
```

### URL规范化

浏览器中当访问一个引用了URL的属性时(href, src, action等), 该URL会自动将原始值转换成完整规范.

```html
<a href="test.html" id="testSubject">Self</a>
<script type="text/javascript">
    var link = document.getElementById('testSubject');

    // 通过DOM原始节点找到原始值
    var linkHref = link.getAttributeNode('href').nodeValue;
    console.assert(linkHref === 'test.html', 'link node value is ok');
    console.assert(link.href === 'test.html', 'link property value is ok');
    console.assert(link.getAttribute('href') === linkHref, 'link attribute not modified');
</script>
```

## 头疼的样式特性

JavaScript中Dom节点的style属性并不反映css样式表中继承的任何样式信息. 
```html
<style>
    div { font-size: 1.8em; border: 0 solid gold; }
</style>

<div style="color: #000;" title="Ninja power">Test</div>

<script>
    window.onload = function() {
        var div = document.getElementsByTagName('div')[0];
        console.assert(div.style.color === 'rgb(0, 0, 0)' || div.style.color === '#000', 'color was recorded');
        console.assert(div.style.fontSize === '1.8em', 'fontSize was recorded');
        console.assert(div.style.borderWidth === '0', 'borderWidth was recorded');

        div.style.borderWidth = '4px';
        console.assert(div.style.borderWidth == '4px', 'borderWidth was replaced');
    }
</script>
```

一些麻烦还有 **样式属性命名**, **float样式属性 => cssFloat, (IE) => styleFloat**, **像素值的转换过程**, **测量元素高度与宽度, 通过offsetWidth与offsetHeight, 隐藏的元素则修改position以及display还有visiblity后再获取**, **opacity**, **颜色属性**

## 获取计算样式

通过`window.getComputedStyle()`来获取计算后的样式, 通过访问返回对象的`getPropertyValue()`方法来获取属性值