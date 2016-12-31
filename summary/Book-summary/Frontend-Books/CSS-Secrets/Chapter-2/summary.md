# 第二章 背景与边框

## 半透明边框

通过设置边框颜色达到的半透明是相对于本元素的背景色而言的:

```css
.wrapper {
    background-image: url(img.png);
}

.item {
    height: 100px;
    border: 50px solid hsla(0, 0%, 100%, .5);
    background: red;
}
```

上面的item元素的边框颜色会是半透明的红色, 并不会显示父级元素的背图案出来. 而解决方案则是通过使用背景剪裁的属性, 用内边距的外沿把背景剪裁掉. 使背景不侵入边框所在的范围. 

```css
.item {
    ...
    background-clip: padding-box;
}
```

## 多重边框

### 法一: box-shadow方案

通过使用`box-shadow`的第四个参数(扩张半径), 指定一个正值或者负值, 可以让投影面积加大或者减少. 一个正值的扩张半径加上两个为零的偏移量以及为零的模糊值, 得到的投影就是一条实线边框.

```css
.box-shadow-box {
    background: yellowgreen;
    height: 100px;
    box-shadow: 0 0 0 10px #655;
}
```

这种效果可以通过border来实现, 但是由于`box-shadow`支持逗号分隔语法, 可以创建任意数量的投影. 因此可以做到下面的效果.

```html
<div class="wrapper">
    <div class="box-shadow-box"></div>
 </div>
```

```css
.wrapper {
  position: relative;
  height: 200px;
}
.box-shadow-box {
  position: absolute;
  width: 100px;
  height: 100px;
  top: 50%;
  left: 50%;
  margin-top: -50px;
  margin-left: -50px;
  background: yellowgreen;
  height: 100px;
  box-shadow: 0 0 0 10px #655, 0 0 0 15px deeppink;
}
```

可以通过不断添加这些阴影来带到多重边框的效果, 或者在最后添加一个常规的阴影, 需要记住的是:

- 投影的行为跟边框不完全一致, 因为它不会影响布局, 而且不会受到`box-sizing`属性的影响, 如果想要模拟出边框占据空间的效果, 可以通过内边距或者外边距来实现, 这个取决于`box-shadow`的阴影是内嵌还是外扩的.
- 阴影所创建的假"边框"如果出现在元素的外框, 且元素绑定了鼠标事件的话, 在"边框"上是不会触发事件的发生, 如果需要触发事件, 需要给`box-shadow`加上inset关键字来让投影绘制在元素的内部. 这部分空间可以通过内边距来补足.

```html
<div class="wrapper">
    <div class="box-shadow-box"></div>
</div>

<style>
.wrapper {
  position: relative;
  height: 200px;
}
.box-shadow-box {
  position: absolute;
  width: 100px;
  height: 100px;
  top: 50%;
  left: 50%;
  margin-top: -50px;
  margin-left: -50px;
  background: yellowgreen;
  height: 100px;
  box-shadow: 0 0 0 10px #655 inset, 0 0 0 15px deeppink inset;
}
</style>
<script>
var elem = document.querySelector('.box-shadow-box');
elem.addEventListener('click', function() {
    console.log('do not click me!!!!');
}, 'false');
</script>
```

### 法二: outline方案

在只需要两层边框的情况下, 可以先设置一层常规边框, 然后再加上outline(描边)来产生外层的边框, 这种方法在于边框的样式十分灵活, 不像上面的`box-shadow`只能模拟实线边框, 还可以模拟虚线等.

```css
.box-shadow-box {
    border: 10px solid #665;
    outline: 5px solid deeppink;
}
```

另一个好处在于可以通过`outline-offset`属性来控制它跟元素边缘之间的间距, 甚至可以接受负值. 可以实现某些特殊的效果.

需要注意的地方:

- 只适用于双层"边框"的场景, 如果需要多重边框, 前面的方案就是唯一的选择(可以用多个元素模拟?)
- 边框不一定会贴合`border-radius`属性产生的圆角, 因此如果元素是圆角的, 它的描边可能还是直角的. 
