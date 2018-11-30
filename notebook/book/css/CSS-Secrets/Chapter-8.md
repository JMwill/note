# 过渡与动画

## 缓动效果

使用关键帧实现缓动动画

```css
/* 普通弹跳效果实现 */
@keyframes bounce {
    60%, 80%, to {
        transform: translateY(400px);
        animation-timing-function: ease-out;
    }
    70% { transform: translateY(300px); }
    90% { transform: translateY(360px); }
}

.ball {
    background: yellow;
    height: 50px;
    width: 50px;
    border-radius: 50%;
    margin: auto;
    animation: bounce 3s ease-in infinite;
}


/* 更加真实的实现 */
@keyframes bounce {
    60%, 80%, to {
        transform: translateY(400px);
        animation-timing-function: ease;
    }
    70% { transform: translateY(300px); }
    90% { transform: translateY(360px); }
}

.ball {
    background: yellow;
    height: 50px;
    width: 50px;
    border-radius: 50%;
    margin: auto;
    animation: bounce 3s cubic-bezier(.1, .25, 1, .25) infinite;
}
```

**弹性过渡**. 实现文本输入框等的提示的展现过渡效果:

```css
input:not(:focus) + .callout {
    transform: scale(0);
}
.callout {
    transition: .5s transform;
    transform-origin: 1.4em -.4em;
}

/* 更加生动的实现 */
@keyframes elastic-grow {
    from { transform: scale(0); }
    70% {
        transform: scale(1.1);
        animation-timing-function: cubic-bezier(.1, .25, 1, .25); /* 反向ease */
    }
}
input:not(:focus) + .callout {
    transform: scale(0);

    /* transition-timing-function: ease; */
    transition: .25s transform; /* 默认值是ease */
}
input:focus + .callout { animation: elastic-grow .5s; }
.callout {
    transform-origin: 1.4em -.4em;
    transition: .5s cubic-bezier(.25, .1, .3, 1.5) transform; /* 加上transform防止应用到不合适的属性上 */
}
```


## 逐帧动画

基础代码:

```css
@keyframes loader {
    to { background-position: -800px 0; }
}

.loader {
    width: 100px; height: 100px;
    background: url(img/loader.png) 0 0;
    animation: loader 1s infinite linear;

    /* 隐藏文本 */
    text-indent: 200%;
    white-space: nowrap;
    overflow: hidden;
}
```

由于所有基于贝塞尔曲线的函数都会在关键帧之间进行插值运算, 因此导致背景图片的过渡是平滑的, 就会导致出现背景动画的两张图片的某部分出现在同一个可视范围内. 这个问题可以通过steps调速函数来解决

```css
.loader {
    ...
    animation: loader 1s infinite steps(8); /* steps的意思应该就是动画过程切分的分数 */
    ...
}
```

## 闪烁效果

首先实现一个平滑的闪烁效果:

```css
@keyframes blink-smooth { to { color: transparent; } }
.highlight { animation: 1s blink-smooth 3; }
```

`animation-direction`属性可以反转每一个循环周期(值: reverse)或第偶数个循环周期(值: alternate)或第奇数个循环周期(值: alternate-reverse), 且其会同时反转调整函数

如果只想要普通的闪烁, 只需要:

```css
@keyframes blink { 50% { color: transparent } } /* 50%的原因是让切换动作发生在中段 */

.highlight {
    animation: 1s blink 3 steps(1);
}
```

## 打字动画

用CSS实现的核心思路是: **让容器的宽度成为动画的主体**, 把文本包裹在容器中, 并以宽度从0开始以步进动画的方式逐个扩张, 但是这个效果**并不适用于多行文本**.

```html
<h1>CSS is awesome!</h1>
```

```css
@keyframes typing { from {width: 0} }
h1 {
    width: 7.7em; /* 文本宽度 */
    overflow: hidden;
    white-space: nowrap;
    animation: typing 6s steps(15);
}
```

由于要确定文字的宽度比较麻烦, 因此, 这里可以使用等宽字体, 并用新的单位: `ch`, 这个单位代表0字符的宽度, 由于是等宽字体, 因此就能够直接用字数来表示宽度.

```css
...
h1 {
    ...
    width: 15ch; /* 15个字符宽度 */
    ...
}
```

然后加上一个闪烁的光标来实现逼真的效果.

```css
@keyframes typing { from { width: 0; } }
@keyframes caret { 50% { border-color: transparent; } }

h1 {
    width: 15ch;
    overflow: hidden;
    white-space: nowrap;
    border-right: .05em solid;
    animation: typing 6s steps(15),
            caret 1s steps(1) infinite;
}
```

为了避免每次都需要同步更新样式宽度与内容, 可以用JavaScript来实现这些设置:

```javascript
$$('h1').forEach(function(h1) {
    var len = h1.textContent.length, s = h1.style;

    s.width = len + 'ch';
    s.animationTimingFunction = "steps(" + len + "),steps(1)";
});
```

通过回退措施, 可以避免在不支持相应效果的浏览器上看到不好的样式:

```css
@keyframes caret { 50% { border-color: currentColor; } }

h1 {
    /* ... */
    border-right: .05em solid transparent; /* 避免在不支持的浏览器上出现一条黑边 */
    /* ... */
}
```

## 状态平滑的动画

由于动画并不像是过渡那样在取消时并不会以动画的方式原路返回, 而是直接切换为原始状态. 因此当需要一个动画能够响应操作, 并在操作撤出之后避免生硬的切换, 需要做一些额外的工作. 下面是一个例子:

```css
@keyframes panoramic {
    to { background-position: 100% 0; }
}

.panoramic {
    width: 150px; height: 150px;
    background: url('image.jpg');
    background-size: auto 100%;
    animation: panoramic 10s linear infinite alternate;
    animation-play-state: paused; /* 一直暂停动画, 直到需要的时候在启动动画, 避免生硬的跳转 */
}

.panoramic:hover, .panoramic:focus {
    animation-play-state: running;
}
```

## 环形路径平移的动画

基础HTML:

```html
<div class="path">
    <img src="lea.jpg" class="avatar" />
</div>
```

```css
.path {
    position: relative;
    display: inline-block;
    width: 300px;
    height: 300px;
    border-radius: 150px;
    background-color: yellow;
}
.avatar {
    position: absolute;
    width: 50px;
    height: 50px;
    border-radius: 25px;
    left: 50%;
    transform: translateX(-50%);
}
```

最开始的动画可能是:

```css
@keyframes spin {
    to { transform: rotate(1turn); }
}

.avatar {
    animation: spin 3s infinite linear;
    transform-origin: 50% 150px; /* 150px = 外围圆圈路径的半径 */
}
```

为了让头像不转动的同时位置移动, 需要用到两个元素:

```html
<div class="path">
    <div class="avatar">
        <img src="lea.jpg" />
    </div>
</div>
```

```css
@keyframes spin {
    to { transform: rotate(1turn); }
}
@keyframes spin-reverse {
    from { transform: rotate(1turn); }
}
.avatar {
    animation: spin 2s infinite linear;
    transform-origin: 50% 150px; /* 150px = 路径的半径 */
}
.avatar > img {
    animation: spin-reverse 2s infinite linear;
}
```

但是上面的实现需要额外的元素, 不够精简, 下面可以通过使用多重形变来实现在一个元素上指定多个变形原点:

```css
@keyframes spin {
    from {
        transform: translate(50%, 150px)
                rotate(0turn)
                translate(-50%, 150px);
    }
    to {
        transform: translate(50%, 150px)
                rotate(1turn)
                translate(-50%, 150px);
    }
}
@keyframes spin-reverse {
    from {
        transform: translate(50%, 50%)
                rotate(1turn)
                translate(-50%, -50%);
    }
    to {
        transform: translate(50%, 50%)
                rotate(0turn)
                translate(-50%, -50%);
    }
}
.avatar {
    animation: spin 3s infinite linear;
}
.avatar > img {
    animation: inherit;
    animation-name: spin-reverse;
}
```

上面是原来的两个元素效果, 用translate模拟原点设置的实现, 下面将其合并, 并转化成一个元素的实现:

```css
@keyframes spin {
    from {
        transform: translate(50%, 150px)
                rotate(0turn)
                translate(-50%, -150px)
                translate(50%, 50%)
                rotate(1turn)
                translate(-50%, -50%);
    }
    to {
        transform: translate(50%, 150px)
                rotate(1turn)
                translate(-50%, 150px)
                translate(50%, 50%)
                rotate(0turn)
                translate(-50%, -50%);
    }
}
.avatar {
    animation: spin 3s infinite linear;
}
```

对平移操作进行合并精简:

```css
@keyframes spin {
    from {
        transform: translateY(150px) translateY(-50%)
                rotate(0turn)
                translateY(-150px) translateY(50%)
                rotate(1turn);
    }
    to {
        transform: translateY(150px) translateY(-50%)
                rotate(1turn)
                translateY(-150px) translateY(50%)
                rotate(0turn);
    }
}

.avatar { animation: spin 3s infinite linear; }
```

如果图片一开始就是处于中心的话就可以将上面的: `translateY(150px) translateY(-50%)`给去掉, 因为它的本质就是将头像放到垂直中心.