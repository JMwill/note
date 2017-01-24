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

## 元素

一个块的一个复合组成部分是不能将其分开来使用的。

特性：

- 元素的名称描述它的目的（"这是什么？"——`item`，`text`，等等），而不是它状态（"什么类型，或者它看起来是怎样？"——`red`，`big`，等等）
- 一个元素的全称结构是`block-name__element-name`。元素名称跟块名称是用两个下划线分开的。

例子

```html
<!-- `search-form` 块 -->
<form class="search-form">
	<!-- 在`search－form`块中的`input`元素 -->
	<input class="search-form__input">

	<!-- 在`search-form`块中的`button`元素 -->
	<button class="search-form__button">Search</button>
</form>
```

### 元素使用指导

- [嵌套](#elements-nesting)
* [成员](#elements-membership)
* [可选性](#elements-optionality)

<a name="elements-nesting">嵌套</a>

- 元素可以在内部相互嵌套
* 你可以有任意层级的嵌套
* 一个元素总是一个块的一部分，而不是其他元素。这意味着元素名称不可以定义等级制度，如`block_elem1_elem2`。

例子

```html
<!--
	正确，一个元素的全称的结构按照以下模式：
	`block-name__element-name`
-->
<form class="search-form">
	<div class="search-form__content">
		<input class="search-form__input">

		<button class="search-form__button">Search</button>
	</div>
</form>

<!--
	错误， 元素的全称没有遵循下面的模式：
	`block-name__element-name`
-->
<form class="search-form">
	<div class="search-form__content">
		<!-- 推荐`search-form__input`或者`search-form__content-input` -->
		<input class="search-form__content__input">

		<!-- 推荐：`search-form__button`或者`search-form__content-button` -->
		<button class="search-form__content__button">Search</button>
	</div>
</form>
```

块名称定义了命名空间，这保证了这个元素是依赖于这个块（block__elem）。

一个块可以有一个嵌套结构元素的DOM树：

例子

```html
<div class="block">
	<div class="block__elem1">
		<div class="block__elem2">
			<div class="block__elem3"></div>
		</div>
	</div>
</div>
```

然而，这个块结构在BEM方法中总是表现为平坦的列表元素

例子：

```css
.block {}
.block__elem1 {}
.block__elem2 {}
.block__elem3 {}
```

这允许你去修改一个块的DOM结构而不用单独对每个元素做出修改：

例子

```html
<div class="block">
	<div class="block__elem1">
		<div class="block__elem2"></div>
	</div>
	<div class="block__elem3"></div>
</div>
```

块的结构改变了，但是对于元素应用的规则以及它们的名称依然是一样的。

<a name="elements-membership">嵌套</a>

一个元素总是一个块的一部分，而你不应该从一个块中拆分来使用它。

例子

```html
<!-- 正确。元素处于`search-form`块当中 -->
<!-- `search-form` 块-->
<form class="search-form">
	<!-- 在`search-form`块中的`input`元素 -->
	<input class="search-form__input">

	<!-- 在`search_form`块中的`button` -->
	<button class="search-form__button">Search</button>
</form>

<!-- 不正确，元素处于`search-form`块内容的外面 -->
<!-- `search-form`块 -->
<form class="search-form">
</form>

<!-- `search-form`块的`input`元素 -->
<input class="search-form__input">

<!-- `search-form`块的`button`元素 -->
<button class="search-form__button">Search</button>
```

<a name="elements-optionality">可选择性</a>

一个元素是一个可选的块部件，不是所有的块都有元素的。

例子

```html
<!-- `search-form`块 -->
<div class="search-form">
	<!-- `input`块 -->
	<input class="input">

	<!-- `button`块 -->
	<button class="button">Search</button>
</div>
```

## 应该创建一个块还是一个元素

1. 如果一个部分的代码可能会被复用而且它不取决于其他页面的部件的实现，那么你就应该创建一个块。
2. 如果一个部分的代码不能在没有父级实体（块）的情况下拆分出来使用，通常就需要创建一个元素。

其中一些例外的元素是必须划分成更小的部分——子元素——为了简化开发。在BEM方法中，你不能在一个元素里创建一个元素。遇到这种情况，你需要创建一个服务块而不是创建一个元素

## 修饰符

一个实体是一个定义了表现，状态，或者行为的块或者元素。

特性：

- 修饰符的名称描述了它的表现（"有多大？"或者"哪个主题？"等等——`size_s`或者`theme_islands`，它的状态（"它跟其他的如何不同跟？"——`disabled`，`focused`，等等）以及它的行为（"它如何表现？"或者"它是如何响应用户的？"——例如`directions_left-top`）。
* 修饰符的名称是通过耽搁下划线跟块或者元素名称进行分隔的（`_`）。

### 修饰符类型

**布尔型**

* 只有当出现或者不出现对于修饰符来说是重要的同时它的值是无关紧要的时候使用。例如，`disabled`。如果一个布尔修饰符存在，那么它的值假定为真。
* 修饰符的全称结构遵循下面的模式：
	* `block-name_modifier-name`
	* `block-name__element-name_modifier-name`

例子

```html
<!-- 具有`focused`布儿修饰符的`search-form`块 -->
<form class="search-form search-form_focused">
	<input class="search-form__input">

	<!-- 具有`disabled`布尔修饰符的`button`元素 -->
	<button class="search-form__button search-form__button_disabled">Search</button>
</form>
```

**键 - 值**

* 当修饰符的值是重要的时候使用。例如，"一个`islands`设计主题的菜单"：`menu_theme_islands`。
* 修饰符全称结构遵循下面的模式：
	* `block-name_modifier-name_modifier-value`
	* `block-name__element-name_modifier-name_modifier-value`

例子

```html
<!-- 具有`theme`修饰符且值为`islands`的`search-form`块 -->
<form class="search-form search-form_theme_islands">
	<input class="search-form__input">

	<!-- 具有`size`修饰符且值为`m`的`button`元素 -->
	<button class="search-form__button search-form__button_size_m">Search</button>
</form>

<!-- 你不能同时用两个具有不同值的相同的修饰符 -->
<form class="search-form
				search-form_theme_islands
				search-form_theme_lite">
	<input class="search-form__input">
	<button class="search-form__button
					search-form__button_size_s
					search-form__button_size_m">Search</button>
</form>
```
