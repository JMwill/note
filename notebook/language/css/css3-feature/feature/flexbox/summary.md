# Flexbox完全指南

## 背景知识

### 目标

提供更高效的方法去布局、对齐和分配元素在容器内的空间，即使元素的大小是未知(或者/和)动态的，所以才叫做flex

flex背后的主要目的是让容器有能力去改变内部元素的宽度/高度（和顺序）去最好地填充进可用的空间内（主要是为了适应所有的显示设备和屏幕大小），一个flex的容器会扩张元素去填充可用的空余空间，或者缩小元素以避免溢出

最重要的是，flexbox布局相对于正常布局（块级元素是垂直型的，行内元素是水平型的）来说是方向无关的，即使正常布局对于在网页上工作得很好，但缺乏灵活性去支持大型的或复杂的应用（特别是当遇到方向变换，大小调整，拉伸，缩小等等）

**注意**：Flexbox布局是最适合在应用内的组件中、小型布局中使用，而[Grid][9b8bfc75]布局是针对大型布局的。

## 基础&术语

因为flexbox是一整个模块而不是单独的一个属性，所以它包含了很多的东西包括它的整套属性。其中一些代表如何在容器上进行设置（父级元素，被称为“flex container”）而其他的代表要在子级上进行的设置（叫做“flex items”）

如果正常的布局是共同基于块级元素和行内元素的流动方向的话，那柔性布局就是基于“柔性流动方向”，请看下面的说明图，解释了柔性布局的背后的主要思想

![felxbox说明图](source/flexbox.png)

一般来说，元素会遵从`main axis`（从`main-start`到`main-end`）布局或者`cross axis`（从`cross-start`到`cross-end`）。
    - **main axis**-柔性容器的主轴是内部柔性元素布局的主要轴承。谨记的是这个主轴不一定是横向的，这个方向取决于`flex-direction`属性（看下文）
    - **main-start | main-end**-内部柔性元素在柔性容器内从main-start到main-end方向放置
    - **main size**-一个内部柔性元素的宽或高，取决于它的主要尺寸，是元素的主要大小。柔性元素的主要大小取决于它的主要尺寸，无论是`width`或`height`属性
    - **cross axis**-垂直于主轴的一个轴，称为十字轴。它的方向依赖于主轴的方向
    - **cross-start | cross-end**-从容器内十字轴的开端到结束一端填充元素的柔性线
    - **cross size**-内部柔性元素的宽或高，取决于横向尺寸，横向尺寸的大小取决于元素横向的`width`或`height`属性

## 父级的属性（flex container）

> **display**

下面的属性用于定义flex的容器，行内或者是块级元素取决于给定的值。这个属性为直接子元素提供柔性布局上下文环境。

```css
.container {
    display: flex; /* or inline-flex */
}
```

> **flex-direction**

这个属性用于设置主轴，从而定义柔性元素的在柔性容器内的排列方向。Flexbox的概念是以单方向布局（除了可选包含）。可以想象柔性元素要么以横向排列要么竖向排列。

```css
.container {
    flex-direction: row | row-reverse | column | column-reverse;
}
```

- row (默认): 在`ltr`中是从左到右；`rtl`中是从右到左
- row-reverse: `ltr`中是从右到左;`rtl`中是从左到右
- column: 跟row一样，但是是从上到下
- column-reverse: 跟row-reverse一样，但是是从下到上

  [9b8bfc75]: http://css-tricks.com/snippets/css/complete-guide-grid/ "Grid"
