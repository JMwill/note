# 第三章 形状

## 自适应的椭圆

通过单独指定**水平半径**和**垂直半径**, 可以实现一个椭圆, 或者当元素宽高相等时, 实现为一个圆:

```css
.ellipse-box {
    /* 元素尺寸为200px x 150px */
    border-radius: 100px / 75px;
}
```

但是我们想要的是一个自适应的椭圆, 而其实`border-radius`除了可以接受准确的长度值外, 还可以接受百分比值

```css
.ellipse-box {
    border-radius: 50% / 50%;
    /* 也就是 */
    border-radius: 50%;
}
```

### 半椭圆

`border-radius`这个属性可以向它一次性提供用空格分开的多个值. 而且还可以通过`/`来分别指定水平, 垂直半径.

半椭圆的实现:

- 这个形状是垂直对称的, 也就是左上角和右上角的半径值应该是相同的; 左下角跟右下角的半径也是相同的.
- 顶部边缘没有平直部分, 整个顶边都是曲线, 这意味着左上角和右上角的半径之和应该等于整个形状的宽度.
- 基于上两条, 可以得出左半径和右半径在水平方向上的值应该都是50%.
- 顶部的两个圆角占据了整个元素的高度, 且底部完全没有任何圆角. 也就是垂直方向上的合理值是`100% 100% 0 0`.
- 因为底部两个角的垂直圆角是零, 因此水平圆角是多少完全不重要.

```css
.half-ellipse-box {
    /* 沿横轴劈开的半圆 */
    border-radius: 50% / 100% 100% 0 0;

    /* 沿纵轴劈开的半圆 */
    border-radius: 100% 100% 0 0 / 50%;
}
```

### 四分之一椭圆

这个实现需要其中一个角的水平和垂直半径值都是100%, 其余三个叫都不能是圆角

```css
.quarter-ellipse-box {
    border-radius: 100% 0 0 0;
}
```

但是对于八分之一等等的形状, `border-radius`是无法实现的.

## 平行四边形

视觉设计中, 平行四边形可以传达出一种动感. 通过`skew()`这个变形属性来对矩形进行斜向拉伸

```css
.skew-box {
    /* 只使用这个属性会导致内容也斜向拉伸 */
    transform: skewX(-45deg);
}
```

通过两个元素来实现, 内部元素反向拉伸

```html
<a href="#" class="button">
    <div>Click me</div>
</a>
```

```css
.button { transform: skewX(-45deg); }
.button > div { transform: skewX(45deg); }
```

### 纯CSS解决方案: 伪元素

将所有样式应用到伪元素上, 在对伪元素进行变形

```css
.button {
    position: relative;
}
.button::before {
    content: '';
    position: absolute;
    top: 0; right: 0; bottom: 0; left: 0;
    z-index: -1;
    background: #58a;
    transform: skewX(45deg);
}
```

这种方法适用于其他任何变形样式, 当想要变形一个元素而不改变内容时, 就可以用到它.

还可以将这种方式应用到其他的场景中:

- IE8下实现多重背景
- "边框内圆角"效果实现
- 为某一层"背景"单独设置类似`opacity`等的属性
- 当无法使用"多层边框"的技巧时, 可以用这种方法来更加灵活地模拟多层边框. 如需要多层虚线边框, 或者需要在多重边框之间留有透明空隙等.

## 菱形图片

无须设计师参与的实现菱形的方法在目前有两种: 基于变形的方案, 裁切路径方案

### 基于变形方案

这里的实现是把图片用一个div包裹起来, 对其应用相反的`rotate()`:

```html
<div class="picture">
    <img src="adam-catlace.jpg" alt="...">
</div>

<style>
.picture {
    width: 400px;
    transform: rotate(45deg);
    overflow: hidden;
}
.picture > img {
    max-width: 100%;
    transform: rotate(-45deg);
}
</style>
```

上面的实现由于图片的`max-width: 100%`, 因此图片会被截取成八角形, 因此需要将图片的大小进行一定的修改才能够实现**图片宽度与容器对角线相等**, 因此需要将`max-width`设置为对角线的长度乘以根号2, 也就是`100% * 根号2`, 在上述例子中也就是141.4213562%. 或者向上取整142%. 

实际上使用`scale()`变形样式将图片放大会更加合理, 因为:

- 图片尺寸仍然保持100%, 并在变形样式不受支持时仍然具有合理的布局.
- 通过`scale()`来缩放图片时, 默认是以中心点进行缩放的. 而`width`则是以左上角为原点缩放, 需要用额外的负外边距来进行调整.

最终结果:

```css
.picture {
    width: 400px;
    transform: rotate(45deg);
    overflow: hidden;
}

.picture > img {
    max-width: 100%;
    transform: rotate(-45deg) scale(1.42);
}
```

### 裁切路径方案

上面的实现对于非正方形的图片就会遇到问题, 且需要额外的html标签也不够简洁. 因此下面使用`clip-path`属性来实现菱形效果.

```css
img {
    clip-path: polygon(50% 0, 100% 50%, 50% 100%, 0 50%);
}
```

只用一行代码就可以实现效果, 还可以通过跟动画属性进行结合得到有趣的效果:

```css
img {
    clip-path: polygon(50% 0, 100% 50%,
                       50% 100%, 0 50%);
    transition: 1s clip-path;
}
img:hover {
    clip-path: polygon(0 0, 100% 0,
                       100% 100%, 0 100%);
}
```

## 切角效果

旧有的切角方案是使用图片遮挡住元素来实现的, 但是相对而言会增加页面加载时间以及维护成本. 因此这里列举多个方案实现切角效果

### 渐变实现切角

由于渐变可以接受一个角度作为方向, 而且色标的位置也可以是绝对长度值, 不会受到容器尺寸的影响. 因此可以通过一个线性渐变来实现效果

```css
.corner-box {
    background: #58a;
    background: linear-gradient(-45deg, transparent 15px, #58a 0);
}
```

由于渐变默认是覆盖整个元素的, 因此在需要实现两个角的切角时需要修改渐变的范围.

```css
.corner-box {
    background: #58a;
    background: linear-gradient(-45deg, transparent 15px, #58a 0) right,
                linear-gradient(45deg, transparent 15px, #655 0) left;
    background-size: 50% 100%;
    /* 关闭重复避免覆盖 */
    background-repeat: no-repeat;
}
```

四角切角

```css
.corner-box {
    background: #58a;
    background:
        linear-gradient(135deg, transparent 15px, #58a 0) top left,
        linear-gradient(-135deg, transparent 15px, #58a 0) top right,
        linear-gradient(-45deg, transparent 15px, #58a 0) bottom right,
        linear-gradient(45deg, transparent 15px, #58a 0) bottom left;
    background-size: 50% 50%;
    background-repeat: no-repeat;
}
```

使用scss避免多处修改.

```scss
@mixin beveled-corners($bg,
        $tl: 0, $tr:$tl, $br:$tl, $bl:$tr) {
    background: $bg;
    background:
        linear-gradient(135deg, transparent $tl, $bg 0) top left,
        linear-gradient(-135deg, transparent $tr, $bg 0) top right,
        linear-gradient(-45deg, transparent $br, $bg 0) bottom right,
        linear-gradient(45deg, transparent $bl, $bg 0) bottom left;
    background-size: 50% 50%;
    background-repeat: no-repeat;
}

@include beveled-corners(#58a, 15px, 15px);
```

#### 弧形切角

通过径向渐变实现弧形内凹切角:

```css
.corner-box {
    background: #58a;
    background:
        radial-gradient(circle at top left,
            transparent 15px, #58a 0) top left,
        radial-gradient(circle at top right,
            transparent 15px, #58a 0) top right,
        radial-gradient(circle at bottom right,
            transparent 15px, #58a 0) bottom right,
        radial-gradient(circle at bottom left,
            transparent 15px, #58a 0) bottom left;
    background-size: 50% 50%;
    background-repeat: no-repeat;
}
```

### 内联SVG与`border-image`方案

由于渐变的方案较为繁琐, 因此, 这里使用SVG加`border-image`的方案实现切角效果

代码如下:

```css
.corner-box {
    /* border: 15px solid transparent; */
    border: 20px solid transparent; /* 由于边框宽度不是按照斜向度量的, 因此需要15 * 根号2 */
    /* 如果想要对不支持border-image的浏览器作回退, 那么需要修改border的颜色 */
    border: 20px solid #58a;
    
    border-image: 1 url('data:image/svg+xml,\
        <svg xmlns="http://www.w3.org/2000/svg" width="3" height="3" fill="%2358a">\
            <polygon points="0,1 1,0 2,0 3,1 3,2 2,3 1,3 0,2"/>\
        </svg>');
    
    background: #58a; /* 添加背景色作回退, 但是需要对背景进行截取避免覆盖边距 */
    background-clip: padding-box;
}
```

### 裁切路径方案

使用裁切路径将元素切出斜面切角的代码如下:

```css
.corner-box {
    background: #58a;
    clip-path: polygon(
        20px 0, calc(100% - 20px) 0, 100% 20px,
        100% calc(100% - 20px), calc(100% - 20px) 100%,
        20px 100%, 0 calc(100% - 20px), 0 20px
    );
}
```

上述方法的最大好处在于可以使用任意类型的背景, 也可以对替换元素进行裁切. 但是具有的缺点是: 支持不完善, 当内边距不够宽时, 会裁切掉文本.

## 梯形标签页

梯形可以用3D旋转模拟出来.

```css
.trapezoid-box {
    transform: perspective(.5em) rotateX(5deg);
}
```

但是由于3D形变效果是不可逆的, 因此这里需要用伪元素来产生梯形, 避免对内容造成影响

```css
.trapezoid-box {
    position: relative;
    display: inline-block;
    padding: .5em 1em .35em;
    color: white;
}

.trapezoid-box::before {
    content: '';
    position: absolute;
    top: 0; right: 0; bottom: 0; left: 0;
    z-index: -1;
    background: #58a;
    transform: perspective(.5em) rotateX(5deg);
}
```

为了让变形效果更好掌控, 避免占据的空间, 高度等的多方面影响, 需要设置一下`transform-origin`:

```css
.trapezoid-box {
    ...

    transform: scaleY(1.3) perspective(.5em) rotateX(5deg); /* scaleY用于补足高度上减少的距离 */
    transform-origin: bottom;
}
```

使用这种方法实现后可以给梯形添加背景, 边框, 圆角, 投影等一系列样式. 且只需要设置`transform-origin`为不同的值就能得到左倾斜等效果. 但是对于元素内容长度不等时, 由于**斜边的角度依赖于元素的宽度**, 要得到斜度一致的梯形就很难实现.

## 简单的饼图

**基于transform的解决方案**.

```html
<div class="pie"></div>
```

```css
.pie {
    width: 100px; height: 100px;
    border-radius: 50%;
    background: yellowgreen;
    background-image: linear-gradient(to right, transparent 50%, #655 0);
}
.pie::before {
    content: '';
    display: block;
    margin-left: 50%;
    height: 100%;
    border-radius: 0 100% 100% 0 / 50%;
    background-color: inherit;
    transform-origin: left;
    transform: rotate(.1turn);
}

/* 0 ~ 100%的动画 */
@keyframes spin {
    to { transform: rotate(.5turn); }
}
@keyframes bg {
    50% { background: #655; }
}

.pie::before {
    content: '';
    display: block;
    margin-left: 50%;
    height: 100%;
    border-radius: 0 100% 100% 0 / 50%;
    background-color: inherit;
    transform-origin: left;
    animation: spin 3s linear infinite,
                bg 6s step-end infinite;
}
```

实现不同比率的饼图, 并使得代码具备封装抽象度, 可维护性以及可访问性.

```html
<div class="pie">20%</div>
<div class="pie">60%</div>
```

```css
.pie {
    position: relative;
    width: 100px; line-height: 100px;
    border-radius: 50%;
    background: yellowgreen;
    background-image: linear-gradient(to right, transparent 50%, #655 0);
}
@keyframes spin {
    to { transform: rotate(.5turn); }
}

@keyframes spin {
    50% { background: #655; }
}

.pie::before {
    /* 其余样式保持原样 */
    content: '';
    border-radius: 0 100% 100% 0 / 50%;
    background-color: inherit;
    transform-origin: left;
    animation: spin 50s linear infinite,
                bg 100s step-end infinite;
    animation-play-state: paused;
    animation-delay: inherit;
  
    /* 居中文字 */
    width: 50%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 50%;
}
```

```javascript
$$('.pie').forEach(function(pie) {
    var p = parseFloat(pie.textContent);
    pie.style.animationDelay = '-' + p + 's';
});
```

**SVG解决方案**

```html
<svg width="100" height="100">
    <circle r="30" cx="50" cy="50"/>
</svg>
```

```css
circle {
  fill: yellowgreen;
  stroke: #655;
  stroke-width: 50;
  stroke-dasharray: 60 158;
}

svg {
  transform: rotate(-90deg);
  background: yellowgreen;
  border-radius: 50%;
}

/* 添加动画 */
@keyframes fillup {
    to { stroke-dasharray: 158 158; }
}

circle {
    /* 与上面一样 */
    animation: fillup 5s linear infinite;
}
```

改进

```html
<svg viewBox="0 0 32 32">
    <circle r="16" cx="16" cy="16"/>
    <!-- 16 是由 100 / 2 pi 得出的 -->
</svg>
```

```css
svg {
    width: 100px; height: 100px;
    transform: rotate(-90deg);
    background: yellowgreen;
    border-radius: 50%;
}
circle {
    fill: yellowgreen;
    stroke: #655;
    stroke-width: 32;
    stroke-dasharray: 38 100;
}
```

svg配合脚本生成饼图:

```html
<div class="pie">20%</div>
<div class="pie">60%</div>
```

```javascript
$('.pie').forEach(function(pie) {
    var p = parseFloat(pie.textContent);
    var NS = 'http://www.w3.org/2000/svg';
    var svg = document.createElementNS(NS, 'svg');
    var circle = document.createElementNS(NS, 'circle');
    var title = document.createElementNS(NS, 'title');
    circle.setAttribute('r', 16);
    circle.setAttribute('cx', 16);
    circle.setAttribute('cy', 16);
    circle.setAttribute('stroke-dasharray', p + ' 100');
    svg.setAttribute('viewBox', '0 0 32 32');
    title.textContent = pie.textContent;
    pie.textContent = '';
    svg.appendChild(title);
    svg.appendChild(circle);
    pie.appendChild(svg);
});
```

css需要去掉`stroke-dasharray: 38 100;`