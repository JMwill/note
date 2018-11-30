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

## 灵活的背景定位

### background-position的扩展语法方案

通过`background-position`扩展的新语法, 允许在偏移量前指定关键字, 来使背景图能够在某个方位来偏移而不是CSS 2.1中的基于左上角偏移.

```css
.background-box {
    background: url("img-url.png") no-repeat #58a;
    background-position: right 20px bottom 10px;
}

/* 一般来说需要做一下回退方案, 这样就能在不支持position偏移的浏览器下仍能实现一般效果. */
.background-box {
    background: url("img-url.png")
                no-repeat bottom right #58a;
    background-position: right 20px bottom 10px;
}
```

### background-origin方案

当需要的背景图片的偏移距离跟内边距一样时, 使用`background-position`来实现偏移效果的话需要进行较多设置:

```css
.background-box {
    padding: 10px;
    background: url("img-url.png") no-repeat #58a;
    background-position: right 10px bottom 10px;
}
```

为求尽力遵循DRY原则, 可以使用`background-origin`来减少需要做的相同操作:

```css
.background-box {
    padding: 10px;
    background:
        url("img-url.png")
        top left / auto 100px
        no-repeat
        #ccc;
    background-origin: content-box;
}
```

### calc()方案

如果以左上角的思路来考虑实现之前的右下角偏移背景图, 实际上就是`100% - 偏移量`这个计算值, 因此可以使用calc来实现这一效果.

```css
.background-box {
    background: url("img-url.png") no-repeat;
    background-position: calc(100% - 20px) calc(100% - 10px);
}
```

## 边框内圆角

当需要一个外部容器是直角, 内部元素是圆角的外观时, 一般最先想到的做法是使用两个元素:

```html
<div class="something-meaningful">
    <div>I have a nice subtle inner rounding, don't I look pretty? (强行卖一波萌)</div>
</div>

<style>
.something-meaningful {
    background: #665;
    padding: .8em;
}
.something-meaningful > div {
    background: tan;
    border-radius: .8em;
    padding: 1em;
}
</style>
```

那么如果只用一个元素, 且边框是简单的实色效果的话, 可以通过`box-shadow`来达到效果:

```css
.something-meaningful {
    background: tan;
    border-radius: .8em;
    padding: 1em;
    box-shadow: 0 0 0 .6em #655; /* box-shadow制造的边框会跟随元素的圆角走, 但是展现效果也是圆角的 */
    outline: .6em solid #655; /* 描边并不跟随圆角走(但是并不一定在之后也是这样), 用于实现矩形直角 */
}
```

上述的方法如果在描边宽度比 r (圆角半径) 的 (&radic;2 - 1)r 小的话是不可能实现的

## 条纹背景

以前实现条纹背景的方案是使用位图重复来实现的, 但是在有了CSS线性渐变之后, 可以通过渐变来实现这样的条纹背景

```css
.linear-box {
    background: linear-gradient(#fb3, #58a); /* 最简单的渐变使用方式 */
    background: linear-gradient(#fb3 20%, #58a 80%); /* 调整色标位置 */
    background: linear-gradient(#fb3 50%, #58a 50%); /* 重叠两个色标位置, 实现条纹背景 */

    /* 因为渐变背景是用代码生成的图像, 因此可以将其当做一般图像来对待 */
    background-size: 100% 30px;

    /* 通过调整色标位置可以创建不等宽的条纹 */
    background: linear-gradient(#fb3 30%, #58a 30%);

    /*
    借助CSS规范, 可以知道, 如果色标位置小于前面的所有色标的位置, 则会默认被重置为前一个色标的位置
    于是可以只用修改第一个值便能实现任意比例的条纹背景
    */
    background: linear-gradient(#fb3 30%, #58a 0);

    /* 当需要两种以上的条纹背景时, 也可以用渐变来实现 */
    background: linear-gradient(
                    #fb3 33.3%,
                    #58a 0,
                    #58a 66.6%,
                    yellowgreen 0
                );
}
```

### 垂直条纹

垂直条纹生成跟水平条纹是几乎一样的, 除了需要对方向进行限定:

```css
.linear-box {
    background: linear-gradient(
        to right, /* 90deg */
        #fb3 50%, #58a 0
    );
    background-size: 30px 100%;
}
```

### 斜向条纹

直接使用斜向转角45度来实现斜纹并不能够达到预想的效果:

```css
.linear-box {
    /* 单纯地将内部的条纹转向45度是无法实现斜纹的, 需要通过拼接方式来实现斜纹 */
    background: linear-gradient(45deg #fb3 50%, #58a 0);
}
```

斜向纹理的实现

```css
.linear-box {
    background: linear-gradient(45deg,
        #fb3 25%, #58a 0,   #58a 50%,
        #fb3 0,   #fb3 75%, #58a 0
    );

    /* 背景宽度为: 边长平方后的两倍再开方, 会有锯齿出现 */
    background-size: 42.426406871px 42.426406871px;
    /* 或者 background-size: 42px 42px; */
}
```

### 更好的斜向条纹

上面的斜向条纹实现的是某种角度的条纹, 当角度修改时, 便要重新计算条纹用该具备的宽度, 实现起来不够方便. 更好的斜向条纹实现是使用`repeating-linear-gradient()`色标无限循环重复的效果来实现斜向条纹. 这种重复的特性能够完美实现条纹效果, 无论是什么方向.

```css
.linear-box {
    /* 一般的使用方法 */
    background: repeating-linear-gradient(45deg,
        #fb3, #58a 30px;
    );

    /* 斜向条纹实现, 基本没有锯齿出现, 视觉效果最好 */
    background: repeating-linear-gradient(45deg,
        #fb3, #fb3 15px, #58a 0, #58a 30px
    );

    /* 通过两者结合实现斜向条纹, 效果并不好, 只是一种实现思路 */
    background: repeating-linear-gradient(45deg,
        #fb3 0, #fb3 25%, #58a 0, #58a 50%
    );
    background-size: 42.426406871px 42.426406871px;
}
```

### 灵活的同色系条纹

通过将最深的颜色指定为主色调, 并叠加半透明白色的条纹在背景上得到同色系的浅色条纹. 能够使得修改颜色的关系在代码中得以体现

```css
.linear-box {
    background: #58a;
    background-image: repeating-linear-gradient(30deg,
        hsla(0, 0%, 100%, .1),
        hsla(0, 0%, 100%, .1) 15px,
        transparent 0, transparent 30px
    );
}
```

## 复杂的背景图像

### 网格

组合多个渐变图案, 可以得到很多好看的效果: (桌布)

```css
.linear-box {
    background: white;
    background-image:
        linear-gradient(90deg,
            rgba(200, 0, 0, .5) 50%, transparent 0),
        linear-gradient(
            rgba(200, 0, 0, .5) 50%, transparent 0);
    background-size: 30px 30px;

}

```

当希望每个格子的大小可以调整, 而网格线条的粗细同时保持固定时, 可以使用长度而不是百分比来作为色的场景

```css
.linear-box {
    background: #58a;
    background-image:
        linear-gradient(white 1px, transparent 0),
        linear-gradient(90deg, white 1px, transparent 0);
    background-size: 30px 30px;
}

```

或者组合两幅不同线宽, 颜色的网格的图案来的到一个更加逼真的图案

```css
.linear-box {
    background: #58a;
    background-image:
        linear-gradient(white 2px, transparent 0),
        linear-gradient(90deg, white 2px, transparent 0),
        linear-gradient(hsla(0, 0%, 100%, .3) 1px,
            transparent 0),
        linear-gradient(90deg, hsla(0, 0%, 100%, .3) 1px,
            transparent 0);
    background-size: 75px 75px, 75px 75px,
                     15px 15px, 15px 15px;
}
```

### 波点

这里使用径向渐变来实现一些其他的背景图.

圆点阵列实现:

```css
/* 一般的圆点阵列 */
.radial-box {
    background: #665;
    background-image: radial-gradient(tan 30%, transparent 0);
    background-size: 30px 30px;
}

/* 组合的原点阵列 */
.radial-box {
    background: #665;
    background-image: radial-gradient(tan 30%, transparent 0),
                      radial-gradient(tan 30%, transparent 0);
    background-size: 30px 30px;
    background-position: 0 0, 15px 15px;
}
```

使用预处理器可以减少重复:

```scss
@mixin polka($size, $dot, $base, $accent) {
    background: $base;
    background-image: radial-gradient($accent $dot, transparent 0),
                      radial-gradient($accent $dot, transparent 0);
    background-size: $size $size;
    background-position: 0 0, $size / 2 $size / 2;
}

/* 使用 */
@include polka(30px, 30%, $65a, tan);
```

### 棋盘

使用CSS来创建的平铺的方块周围是没有空隙的, 因此直接使用这种方式的话是无法创建出棋盘的效果的. 需要通过组合背景图来实现这个效果

```css
.linear-box {
    /* 创建大四角方块的右上角的三角形 */
    background: #eee;
    background-image: linear-gradient(45deg, transparent 75%, #bbb 0);
    background-size: 30px 30px;

    /* 创建大四角方块的左下角的三角形 */
    background: #eee;
    background-image: linear-gradient(45deg, #bbb 25%, transparent 0);
    background-size: 30px 30px;
}
```

将两个角进行组合, 并将第二层渐变在水平和垂直方向均移动贴片长度的一半, 拼接成一个完整的方块:

```css
.linear-box {
    background: #eee;
    background-image:
        linear-gradient(45deg, #bbb 25%, transparent 0),
        linear-gradient(45deg, transparent 75%, #bbb 0);
    background-position: 0 0, 15px 15px;
    background-size: 30px 30px;

    /* 真正组合出一个棋盘 */
    background: #eee;
    background-image:
        linear-gradient(45deg, #bbb 25%, transparent 0),
        linear-gradient(45deg, transparent 75%, #bbb 0),
        linear-gradient(45deg, #bbb 25%, transparent 0),
        linear-gradient(45deg, transparent 75%, #bbb 0);
    background-position: 0 0, 15px 15px,
                         15px 15px, 30px 30px;
    background-size: 30px 30px;

    /* 优化实现, 使代码更加的DRY */
    background: #eee;
    background-image:
        linear-gradient(45deg,
            rgba(0,0,0,.25) 25%, transparent 0,
            transparent 75%, rgba(0,0,0,.25) 0),
        linear-gradient(45deg,
            rgba(0,0,0,.25) 25%, transparent 0,
            transparent 75%, rgba(0,0,0,.25) 0);
    background-position: 0 0, 15px 15px;
    background-size: 30px 30px;
}
```

上述的代码用起来还是比较不方便, 因此这里可以使用预处理器的mixin来实现, 以方便我们使用

```scss
@mixin checkerboard($size, $base, $accent: rgba(0,0,0,.25)) {
    background: $base;
    background-image:
        linear-gradient(45deg,
            $accent 25%, transparent 0,
            transparent 75%, $accent 0),
        linear-gradient(45deg,
            $accent 25%, transparent 0,
            transparent 75%, $accent 0);
    background-position: 0 0, $size $size,
    background-size: 2 * $size 2 * $size;
}

@include checkerboard(15px, #58a, tan);
```

或者使用SVG来实现:

```svg
<svg xmlns="http://www.w3.org/2000/svg"
     width="100" height="100" fill-opacity=".25" >
    <rect x="50" width="50" height="50" />
    <rect y="50" width="50" height="50" />
</svg>
```

或者将SVG作为data URI来减少请求

```css
.checkerboard-box {
    background: #eee url('data:image/svg+xml,\
        <svg xmlns="http://www.w3.org/2000/svg" \
            width="100" height="100" fill-opacity=".25" > \
            <rect x="50" width="50" height="50" /> \
            <rect y="50" width="50" height="50" /> \
        </svg>');
    background-size: 30px 30px;
}
```

## 伪随机背景

初始设置, 四种颜色的条纹图案:

```css
.four-line-bg {
    background: linear-gradient(90deg,
                    #fb3 15%, #665 0, #665 40%,
                    #ab4 0, #ab4 65%, hsl(20, 40%, 90%) 0);
    background-size: 80px 100%;
}
```

将条纹从一个平面拆散成为多个图层: 一种颜色作为底色, 另外三种颜色作为条纹, 然后让条纹以不同的间隔进行重复平铺.

```css
.four-line-bg {
    background: hsl(20, 40%, 90%);
    background-image:
        linear-gradient(90deg, #fb3 10px, transparent 0),
        linear-gradient(90deg, #ab4 10px, transparent 0),
        linear-gradient(90deg, #655 20px, transparent 0);
    background-size: 80px 100%, 60px 100%, 40px 100%;
}
```

背景的重复跟条纹的尺寸的最小公倍数有关, 因此为了达到最大化, 条纹宽度的选取最好是相对质数, 而得到的最小公倍数就是它们的乘积. 或者最简单地, 只选择质数, 因为质数跟任意其他数字都是相对质数.

```css
.four-line-bg {
    background: hsl(20, 40%, 90%);
    background-image:
        linear-gradient(90deg, #fb3 11px, transparent 0),
        linear-gradient(90deg, #ab4 23px, transparent 0),
        linear-gradient(90deg, #665 41px, transparent 0);
    background-size: 41px 100%, 61px 100%, 83px 100%;
}
```

"禅原则"可以用于涉及到有规律重复的情况. 如:

- 在图片库中, 为每幅图片应用细微的伪随机旋转效果时, 可以使用多个`:nth-child(a)`选择符, 且让a是质数
- 如果要生成一个动画, 且想让它看起来不是按照明显的规律循环时, 应用多个时长为质数的动画.

## 连续的图像边框

问题: 将一幅图案应用为边框, 而不是背景. 且在元素的尺寸扩大或者缩小时, 图片可以自动延伸并覆盖完整的边框区域.

由于`border-image`用的是九宫格伸缩法, 因此就算针对特定的元素宽高和边框厚度找到了切割位置, 这个结果也无法适配尺寸稍有差异的其他元素. 当希望元素宽高和边框厚度变化而拐角处的边框图像也会变化时, 只使用`border-image`是不可能实现的.

其中一个最简单的办法是使用两个HTML元素: 一个元素用来把图片设为背景, 一个用来存放内容, 并设置一个合适的背景覆盖前者.

```html
<div class="something-meaningful">
    <div>
    I have a nice stone art border,
    don't I look pretty?
    </div>
</div>
```

```css
.something=meaningful {
    background: url(stone-art.jpg);
    background-size: cover;
    padding: 1em;
}

.something-meaningful > div {
    background: white;
    padding: 1em;
}
```

只用一个元素的实现, 主要的思路是在背景图片上在叠加一层需要的内容背景颜色, 然后为不同的两层背景指定不同的`background-clip`值. 而在多重背景的最底层设置背景色, 可以通过一个纯色到纯色的CSS渐变来模拟出纯色背景的效果.

```css
.border-bg-box {
    padding: 1em;
    border: 1em solid transparent;
    background: linear-gradient(white, white),
                url(stone-art.jpg);
    background-size: cover;
    background-clip: padding-box border-box;
}
```

上面的实现由于`background-origin`的默认值是`padding-box`, 因此图片显示尺寸取决于padding box的尺寸且放置在了padding box的原点上, 并以平铺的方式蔓延到border box区域. 要修正这个问题需要设置`background-origin`为`border-box`

```css
.border-bg-box {
    padding: 1em;
    border: 1em solid transparent;
    background: linear-gradient(white, white),
                url(stone-art.jpg);
    background-size: cover;
    background-clip: padding-box, border-box;
    background-origin: border-box;
}

/* 融合新属性到background简写中 */
.border-bg-box {
    padding: 1em;
    border: 1em solid transparent;
    background:
        linear-gradient(white, white) padding-box,
        url(stone-art.jpg) border-box / 0 cover;
}
```

在渐变图案上使用, 生成老式信封样式的边框:

```css
.border-bg-box {
    padding: 1em;
    border: 1em solid transparent;
    background: linear-gradient(white, white) padding-box,
                repeating-linear-gradient(-45deg,
                    red 0, red 12.5%,
                    transparent 0, transparent 25%,
                    #56a 0, #58a 37.5%,
                    transparent 0, transparent 50%)
                    0 / 5em 5em;

    /* 或者通过border-image实现 */
    /* 存在的一些问题:
            1. 每次改变border-image-slice时, 都需要同时修改border-width来相互匹配
            2. border-image-slice中无法使用em单位, 只能把边框厚度指定为像素单位
            3. 条纹宽度需要在色标的位置信息中写好, 改变条纹宽度时, 需要修改四处
    */
    padding: 1em;
    border: 16px solid transparent;
    border-image: 16 repeating-linear-gradient(-45deg,
                        red 0, red 1em,
                        transparent 0, transparent 2em,
                        #58a 0, #58a 3em,
                        transparent 0, transparent 4em);
}
```

创建行军蚁效果:

```css
@keyframes ants { to { background-position: 100% } }
.marching-ants {
    padding: 1em;
    border: 1px solid transparent;
    background:
        linear-gradient(white, white) padding-box,
        repeating-linear-gradient(-45deg,
            black 0, black 25%, white 0, white 50%
        ) 0 / .6em .6em;
    animation: ants 12s linear infinite;
}
```

这种技巧可以创建出各种特殊样式的虚线框: 不管是为虚线线段指定不同的颜色, 还是自定义线段的长度和间隙的长度都可以实现.

使用`border-image`来实现的话, 唯一的办法是指定一个GIF动画, 或者当浏览器开始支持渐变插值的时候, 使用渐变插值来实现, 但是比较繁琐

`border-image`应用起来十分简便的地方: 传统注脚的实现

```css
.footnote-box {
    border-top: .2em solid transparent;
    border-image: 100% 0 0 linear-gradient(90deg,
        currentColor 4em,
        transparent 0);
    padding-top: 1em;
}
```

这个注脚还能根据父级的字体大小来相应调整自身.