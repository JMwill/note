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

