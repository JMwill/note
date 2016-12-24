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