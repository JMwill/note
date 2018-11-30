# 记录

## 选择特定的元素节点

从HTML的document中获取某个元素节点的引用的最常用方法是: `document.querySelector()`以及`document.getElementById()`. 同时`querySelector`还定义在元素节点上, 因此可以限制带元素节点上进行对应元素的查找. [例子][1]

## 为元素获取/创建节点列表

在HTML的document中常用的获取/创建元素列表的方法是: [例子][2]

- querySelectorAll()
- getElementsByTagName()
- getElementsByClassName()

由`getElementsByTagName()`以及`getElementsByClassName()`方法创建得到的节点列表是动态映射到文档中的节点的, 即使节点在列表创建后有改动, 依然能够在列表内的元素上体现出来.

而由`querySelectorAll()`创建出来的列表, 即使原文档内的元素有任何删改, 列表都会保留创建时获得的引用. 因此列表是静态的.

上述三个方法都可以用在特定的节点上进行字节点的查找.

想要获取文档内所有的元素可以在`querySelectorAll`以及`getElementsByTagName`使用`*`号选择符

同时需要注意的是: `childNodes`也会返回一个动态的节点列表

### 选择所有直接子元素节点

读取元素的`children`属性能够获取元素的直接子元素节点, [例子][3]

### 预配置的选择/元素节点列表

document对象上有一些预先配置好的节点列表. 能够通过这些预配置的属性来快速访问到节点:

- document.all 所有的元素
- document.forms 所有`<form>`元素
- document.images 所有`<img>`元素
- document.links 所有`<a>`元素
- document.scripts 所有`<script`>元素
- document.styleSheets 所有`<link>`或者`<style>`对象

### 使用`matchesSelector()`来校验元素

通过使用`matchesSelector()`方法可以判断元素是否跟给定的选择器字符串匹配. 但是, 这个方法需要加上各个浏览器的前缀. 目前现代浏览器中方法名已经重命名为: `matches`. [例子][4]

[1]:    ./exec/1.html
[2]:    ./exec/2.html
[3]:    ./exec/3.html
[4]:    ./exec/4.html