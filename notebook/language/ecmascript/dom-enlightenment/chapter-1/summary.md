# 记录

## 为什么会有DOM

DOM出现的目的是为了提供程序接口给脚本进行(删除, 增加, 替换, 事件发起, 修改等)相关操作的. DOM就是JS中的节点对象层级树.

## [节点对象类型][exec1]

常见的HTML节点对象类型有:

- `DOCUMENT_NODE`           ==> `window.document`
- `ELEMENT_NODE`            ==> `<body>, <a> ...`
- `ATTRIBUTE_NODE`          ==> `class="funEdges"`
- `TEXT_NODE`               ==> 在文档中的所有文本, 包括回车以及空格等
- `DOCUMENT_FRAGMENT_NODE`  ==> `document.createDocumentFragment()`
- `DOCUMENT_TYPE_NODE`      ==> `<!DOCTYPE html>`

节点对应类型:

接口/构造器 | node类型, 来自对象的(.nodeType)
------- | -------
HTML *Element | (1 `ELEMENT_NODE`)
Text | (3 `TEXT_NODE`)
Attr | (2 `ATTRIBUTE_NODE`)
HTMLDocument | (9 `DOCUMENT_NODE`)
DocumentFragment | (11 `DOCUMENT_FRAGMENT_NODE`)
DocumentType | (10 `DOCUMENT_TYPE_NODE`)
Comment | (8 `COMMENT_NODE`)

## [子节点对象都继承自`Node`对象][exec2]

每个典型的节点对象都继承方法以及属性自`Node`对象.

- Object < Node < Element < HTMLElement < (e.g. HTML *Element)
- Object < Node <  Attr (在DOM 4已经弃用)
- Object < Node <  CharacterData <  Text
- Object < Node <  Document <  HTMLDocument
- Object < Node <  DocumentFragment

## [工作节点的属性与方法][exec3]

Node属性:

- childNodes
- firstChild
- lastChild
- nextSibling
- nodeName
- nodeType
- nodeValue
- parentNode
- previousSibling

Node方法:

- appendChild()
- cloneNode()
- compareDocumentPosition()
- contains()
- hasChildNodes()
- insertBefore()
- isEqualNode()
- removeChild()
- replaceChild()

Document方法:

- document.createElement()
- document.createTextNode()

HTML *Element属性:

- innerHTML
- outerHTML
- textContent
- innerText
- outerText
- firstElementChild
- lastElementChild
- nextElementChild
- previousElementChild
- children

HTML element Methods:

- [insertAdjacentHTML()][exec5]

## 识别节点类型以及名称

每个继承自`Node`的节点都具有`nodeType`以及`nodeName`, 节点类型可以在`Node`类属性上找到.

## 获取节点值 (nodeValue)

这个属性只在`Text`以及`Comment`类型的节点中可以进行读写, 其余的`ELEMENT_NODE`等都是返回`null`

## [提取DOM树为JavaScript字符串][exec4]

## 用JavaScript方法来创建元素以及文本节点

JavaScript方法:

- createElement()
- createTextNode()

不常用的方法:

- createAttrbute()
- createComment()
- ...

## 用JavaScript方法创建与添加元素以及文本节点到DOM中

方法有:

- innerHTML
- outerHTML
- insertAdjacentHTML
- textContent
- innerText
- outerText

`textContent`返回的是节点内部的所有文本内容, 包含隐藏的文本以及`script`等标签的内容. 而`innerText`则会辨别并返回有效的文本内容.

## 用[`appendChild`][exec6]以及[`insertBefore`][exec7]添加节点对象到DOM中

`appendChild`是快捷地将节点元素添加到某个节点元素内部最后的位置的方法. 而通过`insertBefore`方法配合定位节点的`nextSibling`等属性, 可以实现插入前面, 插入后面, 在最前面插入等的方法.

## [用`removeChild`以及`replaceChild`来移除/替换节点][exec8]

## 用[`cloneNode()`][exec9]来复制节点

## [获取所有字节点][exec10]

使用`childNodes`属性可以即时获取节点的所有字节点, 用`childNodes`获取到的不仅是元素节点, 文本以及评论节点也都会获取到.

## [遍历DOM中的节点][exec11]

可以通过下面的方法来遍历DOM中的节点

- parentNode
- firstChild
- lastChild
- nextSibling
- previousSibling

通过下面的方法来遍历元素节点.

- firstElementChild
- lastElementChild
- nextElementChild
- previousElementChild
- children

还有个方法需要提及, 它可以获取元素节点的数量: `childElementCount`

可以通过`contains`方法确定节点是否在DOM树中:

```javascript
var inside = document.querySelector('html').contains(document.querySelector('body'));
console.log(inside);
```

想要判断两个元素节点是否[**定义上**][exec12]相等, 判断的标准并不是内存位置一样, 因此需要用方法`isEqualNode`, 如果仅仅是要判断内存位置的话可以直接使用`===`判断符.

[exec1]:    ./practics/exec1.html
[exec2]:    ./practics/exec2.html
[exec3]:    ./practics/exec3.html
[exec4]:    ./practics/exec4.html
[exec5]:    ./practics/exec5.html
[exec6]:    ./practics/exec6.html
[exec7]:    ./practics/exec7.html
[exec8]:    ./practics/exec8.html
[exec9]:    ./practics/exec9.html
[exec10]:    ./practics/exec10.html
[exec11]:    ./practics/exec11.html
[exec12]:    ./practics/exec12.html