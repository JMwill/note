# DOM操作

## 向DOM中注入HTML

```javascript
// 确保自关闭元素能正确解析
var tags = /^(abbr|br|col|img|input|link|meta|param|hr|area|embed)$/i;
function convert(html) {
    return html.replace(/(<(\w+)[^>]*?)\/>/g, function(all, front, tag) {
        return tags.test(tag) ?
            all :
            front + "></" + tag + ">";
    });
}

console.assert(convert('<a/>') === '<a></a>', 'Check anchor conversion.');
console.assert(convert('<hr/>') === '<hr/>', 'Check hr conversion.');
```

## 文本内容

W3C => textContent, IE使用|WebKit也支持 => innerText

### 设置文本

插入文本前, 需要对HTML字符进行转义, `<`转成`&lt;`等, 可以使用`document.createTextNode`方法精确实现转义功能, 

### 获取文本

由于textContent以及innerText返回的结果中, 结束符的结果被剥夺了, 因此需要手动进行文本的收集

```javascript
// 如果对返回值的空格并不关心的话, 可以直接使用textContent/innerText
function getText(elem) {
    var text = '';
    for (var i = 0; i < elem.childNodes.length; i++) {
        var cur = elem.childNodes[i];

        if (cur.nodeType === 3) {
            text += cur.nodeValue;
        } else if (cur.nodeType === 1) {
            text += getText(cur);
        }
    }
    return text;
}
```

