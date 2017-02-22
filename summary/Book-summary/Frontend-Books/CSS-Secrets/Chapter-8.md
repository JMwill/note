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