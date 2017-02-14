# 第七章 结构与布局

## 自适应内部元素

问题: 如果不给定元素的高度, 它会自动适应其内容的高度, 但是如果需要width具有相同的行为需要怎么做呢?

基础html代码

```html
<p>Some text [...]</p>
<figure>
    <img src="http://p3.qhimg.com/t01e3c6e3f41597f55f.jpg" alt="cat photo">
    <figcaption>The great Sir Adam Catlace was named after Countess Ada Lovelace, the first programmer.</figcaption>
</figure>
<p>More text [...]</p>
```

```css
figure {
    width: min-content;
    margin: auto;
}

/* 提供旧版浏览器的回退样式 */
figure {
    max-width: 300px;
    max-width: min-content;
    margin: auto;
}

figure > img { max-width: inherit; }
```

## 精确控制表格列宽

```css
table {
    table-layout: fixed;
    width: 100%;

    /* 使用了fixed属性之后, 单元格会自动平均分配宽度或者使用设定的宽度, 且对overflow以及text-overflow都可以正常生效. */
}
```

## 根据兄弟元素的数量来设置样式

对于只有一个元素的场景: 可以用伪类选择符`only-child`:

```css
li:only-child {
    /* 只有一个列表项时的样式 */
}
```

`only-child`其实相当于`li:only-child:last-child`也就是`li:only-child:nth-last-child(1)`, 借用这种方式可以匹配出需要额定数量的元素的情况:

```css
li:first-child:nth-last-child(4),
li:first-child:nth-last-child(4) ~ li {
    /* 当列表正好包含四项时, 命中所有列表项 */
}
```

预处理实现

```css
@mixin n-items($n) {
    &:first-child:nth-last-child(#{$n}),
    &:first-child:nth-last-child(#{$n}) ~ & {
        @content;
    }
}

li {
    @include n-items(4) {
        /* 属性与值 */
    }
}
```

**根据兄弟元素的数量范围来匹配元素**

因为`:nth-child()`这个属性可以使用`an+b`这样的范围形式来进行元素选择, 因此可以达到选择某个数量范围内的元素的效果:

```css
li:first-child:nth-last-child(n+4),
li:first-child:nth-last-child(n+4) ~ li {
    /* 当列表多于四项时, 命中所有列表项 */
}
```

```css
li:first-child:nth-last-child(-n+4),
li:first-child:nth-last-child(-n+4) ~ li {
    /* 当列表最多包含四项时, 命中所有列表项 */
}
```

进行技巧组合后, 可以实现不是从零开始的范围:

```css
li:first-child:nth-last-child(n+2):nth-last-child(-n+6),
li:first-child:nth-last-child(n+2):nth-last-child(-n+6) ~ li {
    /* 当列表最多包含四项时, 命中所有列表项 */
}
```

## 满幅的背景, 定宽的内容

一般的实现是使用两个元素, 外部元素应用满幅背景, 内部元素定宽内容并居中:

```html
<footer>
    <div class="wrapper">
        <!-- 内容 -->
    </div>
</footer>
```

```css
footer {
    background: #333;
}
.wrapper {
    max-width: 900px;
    margin: 1em auto;
}
```

如果想要只用一个元素实现则可以:

```css
footer {
    padding: 1em; /* 合理的回退值 */
    padding: 1em calc(50% - 450px);
    background: #333;
}
/* 除去wrapper元素 */
```

## 垂直居中

流行的技巧有**表格布局法**, **行内块法**. [链接][1]

但是这里使用现代浏览器提供的功能来进行更方便的实现:

基础html代码

```html
<main>
    <h1> Am I centered yet?</h1>
    <p>Center me, please?</p>
</main>
```

```css
/* 常见办法 */
main {
    position: absolute;
    top: 50%; left: 50%;
    margin-top: -3em; margin-left: -9em;
    width: 18em; height: 6em;
}

/* 更少量的代码 */
main {
    position: absolute;
    top: calc(50% - 3em);
    left: calc(50% - 9em);
    width: 18em; height: 6em;
}

/* 使用内容的垂直居中 */
main {
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);

    /* 如果导致元素有些模糊可以使用一些hack来避免 */
    transform-style: preserve-3d;
}

/* 不使用绝对定位实现垂直居中, 只适用于基于视口居中的场景 */
main {
    width: 18em;
    padding: 1em 1.5em;
    margin: 50vh auto 0;
    transform: translateY(-50%);
}

/* 基于Flexbox的解决方案 */
body {
    display: flex;
    min-height: 100vh;
    margin: 0;
}
main {
    margin: auto;
}
```

Flexbox还可以将匿名容器(没有被标签包裹的文本节点)垂直居中.

```html
<main>Center me, please!</main>
```

```css
main {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 18em;
    height: 10em;
}
```

## 紧贴底部的页脚

固定高度的解决方案

```html
<header>
  <h1>Site name</h1>
</header>
<main>
  <p>Bacon Ipsum dolor sit amet</p>
</main>
<footer>
  <p>2015 No rights reserved.</p>
  <p>Made with by an anonymous pastafarian.</p>
</footer>
```

```css
main {
    min-height: calc(100vh - 2.5em - 7em); /* 假设页头高度为2.5em, 页脚总高度7em */
    box-sizing: border-box;
}
```

更灵活的解决方案, 使用Flexbox:

```css
body {
    display: flex;
    flex-flow: column;
    min-height: 100vh;
}
main { flex: 1; }
```

[1]: https://css-tricks.com/centering-in-the-unknown/