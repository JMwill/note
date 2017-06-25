# 记录

## DOM元素的属性与方法

每个DOM元素都由某个 HTML *Element对象创建出来, 同时这个DOM元素也继承了`HTMLElement`, `Element`, `Node`以及`Object`

HTML元素节点可用的[属性以及方法][1].

其中较为有用的属性以及方法是:

- createElement()
- tagName
- children
- getAttribute()
- setAttribute()
- hasAttribute()
- removeAttribute()
- classList()
- dataset
- attributes

可以在MDN上查看HTML元素的[一般属性和方法][mdn api list]

## 创建元素

创建元素使用的方法是`document.createElement('tagName')`, 其中, tagName是每个想要创建的元素的名称. 传入的名称会自动被转化成小写.

而元素名称可以通过对应的元素实例上的`tagName`或者`nodeName`来获取. [例子][2]

## 获取元素属性以及值的集合

通过`attributes`属性能够获取到一个`NamedNodeMap`类数组对象, 这个对象里面包含了元素拥有的属性, 通过这个对象可以使用`setNamedItem`, `getNamedItem`, `removeNamedItem`方法来实现在元素上调用`setAttributes`, `getAttributes`, `removeAttributes`的效果. [例子][3]

检查元素是否具有特定的属性使用`hasAttributes`方法. 同时, 不管这个属性是否合法存在, 只要有就会返回`true`. [例子][4]

## 获取元素的类属性值, 在IE10之后可以使用`classList`获取, 并通过使用`classList`上的`add`, `remove`, `contains`, `toggle`方法来对类属性的值进行操作, IE10以下则需要使用`className`获得字符串后进行对应操作并赋值.

## 获取与设置`data-*`属性

元素中定义的`data-*`属性, 可以通过在元素对象上的`dataset`对象上进行获取与设置. [例子][5]

`data-*`中定义的属性, 如果是多个短杠连接, 那么最终在`dataset`中的表现是驼峰式命名, 而需要删除对应属性时, 直接使用`delete elm.dataset.fooFoo`这样就可以. `dataset`在IE9以下不支持, 需要用polyfill

[1]:    ./exec/1.html
[2]:    ./exec/2.html
[3]:    ./exec/3.html
[4]:    ./exec/4.html
[5]:    ./exec/5.html
[mdn api list]:    https://developer.mozilla.org/en-US/docs/Web/API/element
