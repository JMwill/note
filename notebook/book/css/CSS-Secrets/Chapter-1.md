# 前言

检测某个样式属性是否被支持, 核心思路就是在任意一个元素的`element.style`对象上检查该属性是否存在.

```javascript
var root = document.documentElement; // html

if ('textShadow' in root.style) {
    root.classList.add('textshadow');
} else {
    root.classList.add('no-textshadow');
}
```

如果要检测某个具体的属性值是否被支持, 那就要将属性值赋值到一个元素上, 并检测值是否被保留

```javascript
var dummy = document.createElement('p');
dummy.style.backgroundImage = 'linear-gradient(red, tan)';

if (dummy.style.backgroundImage) {
    root.classList.add('lineargradients');
} else {
    root.classList.add('no-lineargradients');
}
```

# 第一章 引言

## CSS编码技巧

### 尽量减少代码的重复

即使是编写CSS也需要有编码的逻辑与严谨性. 需要谨记DRY原则.

```css
/* 制作一个可伸缩的按钮 */
padding: .3em .8em; /* 使用em作为单位与父级的字号对应起来, 如果想要跟html元素的字号对应起来, 则使用rem单位 */
border: 1px solid #446d88;
background: #58a linear-gradient(#77a0bb, #58a);
border-radius: .2em;
box-shadow: 0 .05em .25em gray;
color: white;
text-shadow: 0 -.05em .05em #335166;
font-size: 125%; /* 避免使用确定的值, 通过用百分比, 将按钮与父级字体大小对应起来 */
line-height: 1.5; /* 保持缩放的行高 */

/* 通过使用半透明的黑色或者白色叠加在主色调上, 可以实现亮暗的变色 */
background: #58a linear-gradient(hsla(0,0%,100%,.2), transparent);

/* 实现透明边界, 适配非白色背景颜色 */
border: 1px solid rgba(0,0,0,.1);
box-shadow: 0 .05em .25em rgba(0,0,0,.5);
text-shadow: text-shadow: 0 -.05em .05em rgba(0,0,0,.5);
```

1. 代码易维护性 VS 代码量少

有时候, 为了易维护性, 多写一些代码, 如:

```css
/* 改动的时候需要改3个地方 */
border-width: 10px 10px 10px 0;

/* 虽然代码多了, 但是更易改动 */
border-width: 10px;
border-left-width: 0;
```

2. currentColor

CSS3中新增了一个颜色值: currentColor, 这个值一直被解析为color的值.

```css
hr {
    color: yellow;
    height: .5em;
    background: currentColor; /* background的颜色等于color的颜色 */
}
```

3. 善用继承

### 响应式网页设计

每个媒体查询都会增加成本, 因此需要尽心合理的利用, 媒体查询的断电不应该有具体的设备来决定. 应该根据设计自身来决定.

因此为了遵从**"尽量减少代码的重复"**这个原则, 需要避免不必要的媒体查询

- 使用百分比长度取代固定长度. 如果不行, 也尽量使用与视口相关的单位(vw, vh, vmin, vmax), 值代表视口宽度或高度的百分比.
- 当需要在较大分辨率下得到固定宽度时, 使用`max-width`而不是`width`, 这样可以适应较小的分辨率, 而无需使用媒体查询
- 为替换元素(img, object, video, iframe等)设置一个`max-width`, 值为100%.
- 如果背景图片需要完整地铺满一个容器, 不管容器尺寸如何变化, `background-size: cover`都可以做到.
- 当图片(或者其他元素)进行行列式布局时, 让视口的宽度来决定列的数量. 使用弹性盒布局(Flexbox)或者`display: inline-block;`加上常规文本折行行为, 可以实现这一点.
- 使用多列文本时, 指定`column-width`(列宽)而不是指定`column-count`(列数), 这样可以在较小的屏幕上自动显示为单列布局.

### 合理使用简写

展开式属性无法保证元素不会收到其他的影响, 因此当需要时, 可以明确使用简写属性, 以确保得到需要的样式, 这是一种良好的防卫性编码方式, 如: 

```css
background: rebeccapurple; /* 能够保证得到纯色背景 */

background-color: rebeccapurple; /* 无法确定不会收到其他属性的影响, 如background-image等 */
```

同时, 展开式属性跟简写属性配合使用会使得代码更加的DRY, 对于接受用逗号分隔的列表的属性, 尤其有用.

```css
/* 这里background-size以及background-repeat的值被重复了三次 */
background: url(tr.png) no-repeat top right / 2em 2em;
            url(br.png) no-repeat bottom right / 2em 2em;
            url(bl.png) no-repeat bottom left / 2em 2em;


/* 通过列表扩散规则, 能够只为某个属性提供一个值, 然后值会扩散并应用到列表中的每一项. */
background: url(tr.png) top right,
            url(br.png) bottom right,
            url(bl.png) bottom left;

background-size: 2em 2em;
background-repeat: no-repeat;
```