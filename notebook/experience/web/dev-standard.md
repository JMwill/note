# 移动开发规范收集

## meta设置

```
<meta name="viewport" content="width=device-width,initial-scale=1.0,user-scalable=no" />  
<!-- scale是描述缩放,width=device-width指页面宽度为视窗宽度。设置minimum-scale=1.0,maximum-scale=1.0可强制禁止用户缩放 -->

<meta name="format-detection" content="telephone=no" /> <!-- 禁止浏览器自动识别手机号码 -->
<meta name="format-detection" content="email=no" /> <!-- 禁止浏览器自动识别邮箱号码 -->

<meta name="apple-mobile-web-app-status-bar-style" content="black" />
<!-- 将网站添加到主屏幕快速启动方式，仅针对ios的safari顶端状态条的样式，可选default、black、black-translucent -->
```

## 字体设置

腾讯移动开发团队推荐使用无衬线字体，无衬线字体可以提高辨识度。适合移动端阅读。

```
body {
    font-family: "Helvetica Neue", Helvetica, STHeiTi, sans-serif;
}
```

字体大小单位在适配机型少时可以通过media检测`@media screen and (min-width:[min-px]) and (max-width:[max-px]){html{font-size:[font-size-px]}}`，单位用px，机型多时单位用rem

上面的设置针对的是ios，英文使用前两个，低于ios4的话会降级使用第二个。STHeiTi为华文黑体,ios系统会自动将华文黑体 STHeiTi 兼容命中系统默认中文字体黑体-简或黑体-繁

原生Android下使用系统的默认无衬线字体即可。

## 基础交互

### 禁止长按弹出菜单与选中文本的行为

```
a, img {
    /* 禁止长按链接与图片弹出菜单 */
    -webkit-touch-callout: none;
}

html, body {
    /* 无特殊要求都需要禁止选中文本 */
    -webkit-user-select: none;
    user-select: noen;
}

```

### 默认样式修改
```
/************** 修改number类型input框默认样式 **********************/
input[type=number]::-webkit-textfield-decoration-container {
    background-color: transparent;    
}
input[type=number]::-webkit-inner-spin-button {
     -webkit-appearance: none;
}
input[type=number]::-webkit-outer-spin-button {
     -webkit-appearance: none;
}
/***************************************************************/


/************************* 表单样式 ******************************/
button,input,optgroup,select,textarea {
    /*去掉webkit默认的表单样式*/
    -webkit-appearance:none;
}
a,button,input,optgroup,select,textarea {
    /*去掉a、input和button点击时的蓝色外边框和灰色半透明背景*/
    -webkit-tap-highlight-color:rgba(0,0,0,0);
    -webkit-user-modify:read-write-plaintext-only; 
}
/***************************************************************/


/******************** placeholder样式 ****************************/
input::-webkit-input-placeholder {
    /*修改webkit中input的planceholder样式*/
    color:#ccc;
}
input:focus::-webkit-input-placeholder {
    /*修改webkit中focus状态下input的planceholder样式*/
    color:#f00;
}
/***************************************************************/


/*************************** 字体语言 ****************************/
<!-- 取消input在ios下，输入的时候英文首字母的默认大写 -->
<input autocapitalize="off" autocorrect="off" />
<!-- ========================================= -->

body {
    /*禁止IOS调整字体大小*/
    -webkit-text-size-adjust: 100%!important;
}
input::-webkit-input-speech-button {
    /*隐藏Android的语音输入按钮*/
    display: none;
}
/***************************************************************/
```

## 移动端触摸

### webkit

#### touch类型
* touchstart——当手指触碰屏幕时候发生。不管当前有多少只手指
* touchmove——当手指在屏幕上滑动时连续触发。通常我们再滑屏页面，会调用event的preventDefault()可以阻止默认情况的发生：阻止页面滚动
* touchend——当手指离开屏幕时触发
* touchcancel——系统停止跟踪触摸时候会触发。例如在触摸过程中突然页面alert()一个提示框，此时会触发该事件，这个事件比较少用

#### touch事件

* touches：屏幕上所有手指的信息
* targetTouches：手指在目标区域的手指信息
* changedTouches：最近一次触发该事件的手指信息
* touchend时，touches与targetTouches信息会被删除，changedTouches保存的最后一次的信息，最好用于计算手指信息

#### 参数信息(changedTouches[0])

* clientX、clientY在显示区的坐标
* target：当前元素

#### 事件响应顺序

1. ontouchstart
2. ontouchmove
3. ontouchend
4. click

### windows phone

winphone下用**e.preventDefault**阻止默认触摸事件是无效的

`html{-ms-touch-action: none;}/* 禁止winphone默认触摸事件 */`

## 屏幕旋转

### 事件 window.orientation +/-90:横屏，0/180：竖屏

```
window.onorientationchange = function (event) {
    var orient = parseInt(window.orientation) === 90 ? '横屏' : '竖屏';
    console.log(orient + window.orientation);
}
```

### 样式

```
/********** 竖屏时使用的样式 ************/
@media all and (orientation:portrait) {
.css{}
}


/********** 横屏时使用的样式 ************/
@media all and (orientation:landscape) {
.css{}
}
```

## 动画

设计高性能CSS3动画的几个要素

* 尽可能地使用合成属性transform和opacity来设计CSS3动画，不使用position的left和top来定位
* 利用translate3D开启GPU加速
[资料](http://www.html5rocks.com/en/tutorials/speed/high-performance-animations/)

## Flex

### 定义Flex布局

```
.class-name {
    display: -webkit-flex; /*webkit*/
    display: flex;
}

/* 行内flex */
.class-name {
    display: -webkit-inline-flex; /*webkit*/
    display:inline-flex;
}
```

### 容器样式

```
.class-name {
    flex-direction: row | row-reverse | column | column-reverse;
    /*主轴方向：左到右（默认） | 右到左 | 上到下 | 下到上*/

    flex-wrap: nowrap | wrap | wrap-reverse;
    /*换行：不换行（默认） | 换行 | 换行并第一行在下方*/

    flex-flow: <flex-direction> || <flex-wrap>;
    /*主轴方向和换行简写*/

    justify-content: flex-start | flex-end | center | space-between | space-around;
    /*主轴对齐方式：左对齐（默认） | 右对齐 | 居中对齐 | 两端对齐 | 平均分布*/

    align-items: flex-start | flex-end | center | baseline | stretch;
    /*交叉轴对齐方式：顶部对齐（默认） | 底部对齐 | 居中对齐 | 上下对齐并铺满 | 文本基线对齐*/

    align-content: flex-start | flex-end | center | space-between | space-around | stretch;
    /*多主轴对齐：顶部对齐（默认） | 底部对齐 | 居中对齐 | 上下对齐并铺满 | 上下平均分布*/
}
```

### 子元素样式

```
.sub-item-class-name {
    order: <integer>;
    /*排序：数值越小，越排前，默认为0*/

    flex-grow: <number>; /* default 0 */
    /*放大：默认0（即如果有剩余空间也不放大，值为1则放大，2是1的双倍大小，以此类推）*/

    flex-shrink: <number>; /* default 1 */
    /*缩小：默认1（如果空间不足则会缩小，值为0不缩小）*/

    flex-basis: <length> | auto; /* default auto */
    /*固定大小：默认为0，可以设置px值，也可以设置百分比大小*/

    flex: none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]
    /*flex-grow, flex-shrink 和 flex-basis的简写，默认值为0 1 auto，*/

    align-self: auto | flex-start | flex-end | center | baseline | stretch;
    /*单独对齐方式：自动（默认） | 顶部对齐 | 底部对齐 | 居中对齐 | 上下对齐并铺满 | 文本基线对齐*/
}
```

### 整合
```
/* ============================================================
   flex：定义布局为盒模型
   flex-v：盒模型垂直布局
   flex-1：子元素占据剩余的空间
   flex-align-center：子元素垂直居中
   flex-pack-center：子元素水平居中
   flex-pack-justify：子元素两端对齐
   兼容性：ios 4+、android 2.3+、winphone8+
   ============================================================ */
.flex{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;}
.flex-v{-webkit-box-orient:vertical;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;}
.flex-1{-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;}
.flex-align-center{-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;}
.flex-pack-center{-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;}
.flex-pack-justify{-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;}

```

```
两端对齐示例

<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no" name="viewport">
<meta content="yes" name="apple-mobile-web-app-capable">
<meta content="black" name="apple-mobile-web-app-status-bar-style">
<meta content="telephone=no" name="format-detection">
<meta content="email=no" name="format-detection">
<style type="text/css">
/* ============================================================
   flex：定义布局为盒模型
   flex-v：盒模型垂直布局
   flex-1：子元素占据剩余的空间
   flex-align-center：子元素垂直居中
   flex-pack-center：子元素水平居中
   flex-pack-justify：子元素两端对齐
   兼容性：ios 4+、android 2.3+、winphone8+
   ============================================================ */
.flex{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;}
.flex-v{-webkit-box-orient:vertical;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;}
.flex-1{-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;}
.flex-align-center{-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;}
.flex-pack-center{-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;}
.flex-pack-justify{-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;}
</style>
</head>
<body>

<div class="flex flex-pack-justify">
    <div>模块一</div>
    <div>模块二</div>
    <div>模块三</div>
    <div>模块四</div>
</div>

</body>
</html>
```

使用注意：

* flex下的子元素必须为块级元素，非块级元素在android2.3机器下flex失效
* flex下的子元素宽度和高度不能超过父元素，否则会导致子元素定位错误，例如水平垂直居中

参考：

* [flexyboxes](http://the-echoplex.net/flexyboxes/)
* [新老flexbox](http://www.w3cplus.com/css3/old-flexbox-and-new-flexbox.html)
* [跨浏览器flexbox](http://www.w3cplus.com/css3/advanced-cross-browser-flexbox.html)

## 小技巧

### 自定义favicon

`<link rel="icon" href="favicon.ico" mce_href="favicon.ico" type="image/x-icon">`

### 定义浏览器点击行为

```
<a href="tel:123456">致电:123456</a>
<a href="sms:123321">发送短信：123321</a>
<a href="mailto:youremail@domain">发送邮件: youremail@domain</a>
```

### 定义文件上传格式

`<input type="file" accept="image/*">`

image可改为video等，**"/"**号后面接格式，**"\*"**则为全部格式。

### 表单自动填充后的提示颜色修改

```
input:-webkit-autofill, textarea:-webkit-autofill, select:-webkit-autofill {
    box-shadow:inset 0 0 0 1000px #fff;
}
```

### 文字截断后显示省略号

```
white-space: nowrap;
text-overflow: ellipsis;
```

### audio元素和video元素在ios和andriod中无法自动播放

```
/*************** 触屏即播 *************/
$('html').one('touchstart',function(){
    audio.play()
})
```

### 消除transition闪屏

```
[未验证]
.class-name {
    /*设置内嵌的元素在 3D 空间如何呈现：保留 3D*/
    -webkit-transform-style: preserve-3d;
    
    /*（设置进行转换的元素的背面在面对用户时是否可见：隐藏）*/
    -webkit-backface-visibility: hidden;
}
```

### 开启硬件加速,解决页面闪白,保证动画流畅

```
.class-name {
   -webkit-transform: translate3d(0, 0, 0);
   -moz-transform: translate3d(0, 0, 0);
   -ms-transform: translate3d(0, 0, 0);
   transform: translate3d(0, 0, 0);
}
```

### 播放视频不全屏
```
<!--
    1.目前只有ios7+、winphone8+支持自动播放
    2.支持Airplay的设备（如：音箱、Apple TV)播放
        x-webkit-airplay="true" 
    3.播放视频不全屏，ios7+、winphone8+支持，部分android4+支持（含华为、小米、魅族）
        webkit-playsinline="true" 
-->
<video x-webkit-airplay="true" webkit-playsinline="true" preload="auto" autoplay src="htt
p://"></video>
```

## 移动性能

:   考虑Android低端机以及2G网络下性能

### 必要检查项

* 所有图片必须有进行过压缩
* 考虑适度的有损压缩，如转化为80%质量的jpg图片
* 考虑把大图切成多张小图，常见在banner图过大的场景

### 加载性能优化，打开要足够快

* 数据离线化，考虑将数据缓存在 **localStorage**
* 初始请求资源数 < 4 **注意！**
* 图片使用CSS Sprites 或 DataURI
* 外链 CSS 中避免 @import 引入
* 考虑内嵌小型的静态资源内容
* 初始请求资源gzip后总体积 < **50kb**
* 静态资源(HTML/CSS/JS/Image)是否优化压缩？
* 避免打包大型类库
* 确保接入层已开启Gzip压缩（考虑提升Gzip级别，使用CPU开销换取加载时间） **注意！**
* 尽量使用CSS3代替图片
* 初始首屏之外的静态资源（JS/CSS）延迟加载 **注意！**
* 初始首屏之外的图片资源按需加载（判断可视区域） **注意！**
* 单页面应用(SPA)考虑延迟加载非首屏业务模块
* 开启Keep-Alive链路复用

### 使用在线性能检测评定工具

* 访问 [Google PageSpeed](http://developers.google.com/speed/pagespeed/insights/) 在线评定网站
* 在地址栏输入目标URL地址，点击分析按钮开始检测
* 按 PageSpeed 分析出的建议进行优化，优先解决红色类别的问题

# 移动web性能--使用浏览器缓存

**缓存标头应当应用到所有可缓存的静态资源中**，包括JS和CSS文件、图像文件及其他二进制对象文件（媒体文件和PDF文件等）。而HTML一般不被视为静态资源，应该视情况而定缓存策略


## Expires (HTTP1.0)和Cache-Control:max-age(HTTP1.1)标头

静态资源应该至少有一周至多一年的缓存有效期。广告或小部件这类的第三方资源也应该至少有一天的缓存有效期。缓存需要使用网址指纹，否则资源有更新的时候，如果获取网址一致，在缓存过期之前浏览器并不会去获取新的资源。

设置标头并下载资源后，浏览器不会为资源发出任何GET请求，直到资源过期或者浏览器缓存被清除。

目前所有的几乎所有的浏览器都支持Cache-Control，因此使用Cache-Control就可以，如果使用Expires的话需要注意，Expires对应的时间是浏览器的，时差会导致一些问题。

## Last-Modifed和ETag标头

两者都用于确定用于缓存的文件是否相同，Last-Modified标头中指定的是日期，而在ETag标头中指定的则可以是唯一标识资源的任意值（通常为文件版本或内容哈希值）。

## 使用谁
Expires与Cache-Control，Last-Modifed与ETag分别在这两组中选择一个进行组合就可以。前者用于确定文件是否过期，后者用于确定文件是否相同。

## 资源网址指纹

指纹识别的常用方法是使用对文件内容的哈希值进行编码的128位十六进制数。因此当资源变化时，指纹会相应变化，浏览器就会重新抓取资源。

## 资源

### 库

[zepto.js](http://zeptojs.com/)

* [浏览器检测](https://github.com/madrobby/zepto/blob/master/src/detect.js)
* [tap事件](https://github.com/madrobby/zepto/blob/master/src/touch.js)

[iscroll.js](http://cubiq.org/iscroll-5)--[官网](http://iscrolljs.com/)

[underscore.js](http://underscorejs.org/)

[FastClick](https://github.com/ftlabs/fastclick)

滑屏

* [slip.js](https://github.com/peunzhang/slip.js)
* [iSlider.js](https://github.com/peunzhang/iSlider)
* [fullpage.js](https://github.com/peunzhang/fullpage)
* [swiper.js](http://www.swiper.com.cn/)