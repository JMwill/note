# 快速开始

## 介绍

BEM(块, 元素, 修饰符)是一种基于组件的Web开发方法. 这个思想的背后是划分用户界面为独立的块. 这使得界面开发快速且容易, 即使是复杂的UI也是一样, 同时它允许复用已经存在的代码而无需复制粘贴.

## 内容

- [块](#block)
- [元素](#element)
- [我应该创建一个块还是元素](#should-i-create-a-block-or-an-element)
- [修饰符](#modifier)
- [混合](#mix)
- [文件结构](#file-structure)

## <a name="block">块</a>

一个功能独立的页面组件是可以复用的. 在HTML中, 块是通过类属性来表示的.

特性:

- 块名称描述块的目的("它是什么"--菜单还是按钮), 而不是它的状态("它看起来像什么"--红色的还是大的).

例子:

```html
<!-- 正确. "错误"块在语义上是正确的 -->
<div class="error"></div>

<!-- 错误, 它描述的是外观 -->
<div class="red-text"></div>
```

- 块不应该影响到它的环境, 意味着你不应该设置外部的几何形状(margin)或者为块进行定位.
- 当使用BEM时你也不应该用CSS标签或者ID选择.

这确保复用块或者将它们从一个地方移动到另一个地方所必要的独立性.

### 使用块指南

嵌套

- 块可以彼此嵌套
- 你可以有任意数量的嵌套级别

例子:

```html
<!-- `header` block -->
<header class="header">
    <!-- Nested `logo` block -->
    <div class="logo"></div>

    <!-- Nested `search-form` block -->
    <form class="search-form"></form>
</header>
```