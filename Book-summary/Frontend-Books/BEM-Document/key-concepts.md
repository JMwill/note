# 关键概念

- [块](#block)
- [元素](#element)
- [修饰符](#modifier)
- [BEM实体](#bem-entity)
- [混合](#mix)
- [BEM树](#bem-tree)
- [块实现](#block-implementation)

## <a name="block">块</a>

一个逻辑上以及功能上都独立的页面组件，相当于Web组件化的组件。一个块包括行为（JavaScript），模板，样式（CSS），以及其他[实现技术](#Block-implementation-technology)。一个独立的块允许对它进行复用，同时也方便[项目的开发以及后期的维护过程][1]

### 块特性

__嵌套结构__

一个块可以嵌套在任何其他的块里面。

例如，一个`head`块，可以包含一个商标（`logo`），一个查找表单（`search`），以及一个登陆块（`auth`）。

![头部块][2]

__任意位置__

块可以在页面中任意移动，在项目的页面之间移动。块作为一个独立的实体的实现使得它可以改变它们在页面中的位置并保证它们功能以及表现的正确性。

因此，商标以及登陆表单可以相互交换而不同修改到块的CSS或者JavaScript代码。

![原始外观][3]

![交换后的外观][4]

__复用__

一个界面可以包含多个相同块的实例。

![同一页面的多个块实例][5]

## <a name="element">元素</a>

一个[块](#block)的构成部分，且不能在块的外部使用。

例如，一个菜单项在不可以在菜单块的上下文之外使用，因此它是一个元素。

![菜单块][6]

> [一个块或者元素应当什么时候用呢？][7]
> [BEM方法不推荐在一个元素中包含另一个元素][8]

## <a name="modifier">修饰符</a>

一个BEM实体就是定义了表现以及行为的[块](#block)或者[元素](#element)。

修饰符的使用是可选择的。

修饰符本质上跟HTML的属性是类似的。一个相同的块因为使用不同的修饰符而看起来不一样。

例如，菜单块（`menu`）的表现取决于使用在其上的修饰符而改变。

![菜单块上应用修饰符][9]

修饰符可以在运行时（例如，作为相应DOM事件的块），或者经过其他的块来进行修改。

例如，当一个用户点击登陆按钮（'click' DOM 事件）登入时，如果资格是不正确的，'visible'修饰符会设置到隐藏的错误消息块上。

## <a name="bem-entity">BEM实体</a>


[块](#block)，[元素](#element)以及[修饰符](#modifier)都称为BEM实体。

这是一个概念，既可以用于指一个单独的BEM实体也作为一个通用术语指块，元素和修饰符。

## <a name="mix">混合</a>

一个托管在单个[DOM节点][10]上具有不同的[BEM实体](#bem-entity)的实例。

混合允许我们去：

- 组合几个BEM实体的行为以及样式且避免代码重复
- 基于已经存在的BEM实体创建具有新语义的界面组件

让我们考虑一种情况，就是包含一个块和另一个块的元素的混合。

让我们假设链接在你的项目中是通过`link`块来实现的。我们需要去格式化菜单项为一个链接。有几种方式可以做到。

- 为菜单项创建一个修饰符使得菜单项成为一个链接。实现这样的一个修饰符必定涉及到复制`link`块的行为以及样式。这就导致了代码重复。
- 将一个通用链接块和一个菜单块的链接元素混合在一起。两个BEM实体的混合允许我们使用基础链接`link`块的功能以及额外的`menu`块的CSS规则，而没有代码复制。

## <a name="bem-tree">BEM树</a>

web页面的结构的块、元素和修饰符的表现形式。这是一个在[DOM树][10]之上的抽象形式，用于描写BEM实体的名称，它们的状态，顺序，嵌套以及辅助数据。

在真实世界的项目中，一个BEM树可以出现在任何格式的树结构。

让我们考虑一下一个DOM树的例子

```html
<header class="header">
    <img class="logo">
    <form class="search-form">
        <input type="input">
        <button type="button"></button>
    </form>
    <ul class="lang-switcher">
        <li class="lang-switcher__item">
            <a class="lang-switcher__link" href="url">en</a>
        </li>
        <li class="lang-switcher__item">
            <a href="url" class="lang-switcher__link">ru</a>
        </li>
    </ul>
</header>
```

对应的BEM树结构看起来会像这样：

```text
header
    ├──logo
    └──search-form
        ├──input
        └──button
    └──lang-switcher
        └──lang-switcher__item
            └──lang-switcher__link
        └──lang-switcher__item
            └──lang-switcher__link
```

在XML以及[BEMJSON][11]格式中，相同的BEM树像接下来显示的那样：

XML

```xml

<block:header>
    <block:logo/>
    <block:search-form>
        <block:input/>
        <block:button/>
    </block:search-form>
    <block:lang-switcher>
        <elem:item>
            <elem:link/>
        </elem:item>
        <elem:item>
            <elem:link/>
        </elem:item>
    </block:lang-switcher>
</block:header>
```

BEMJSON

```bemjson
{
    block: 'header',
    content : [
        { block : 'logo' },
        {
            block : 'search-form',
            content : [
                { block : 'input' },
                { block : 'button' }
            ]
        },
        {
            block : 'lang-switcher',
            content : [
                {
                    elem : 'item',
                    content : [
                        { elem : 'link' }  
                    ]
                },
                {
                    elem : 'item',
                    content : [
                        { elem : 'link' }
                    ]
                }
            ]
        }
    ]
}
```

## <a name="block-implementation">块实现</a>

一整套不同的[技术][12]确定了以下BEM实体的各个方面

- 行为
- 表现
- 测试
- 模板
- 文档
- 依赖关系的描述
- 额外的数据（例如，图像）

### 实现技术

[实现][13]一个块用到的技术。

块的实现可以应用一个或多个技术，例如：

- 行为 —— JavaScript，CoffeeScript
- 表现 —— CSS，Stylus，Sass
- 模板 —— BEMHTML，BH，Pug，Handlebars，XSL
- 文档 —— Markdown，Wiki，XML

例如，如果块的表现是用CSS来定义的，这就意味着块是在CSS技术下实现的。同样地，如果为块写的文档用的是Markdown格式的，这个块的就是在Markdown技术下实现的。

### 块的重定义

通过在不同的[等级](#redefinition-level)上添加新的特性到块上来修改一个块的[实现][13]

### <a name="redefinition-level">重定义等级</a>

一整套BEM实体以及它们的局部[实现][13]。

块的最后实现可以被划分为不同的重定义等级。每一个新的等级拓展自或者重写自块的原来的实现。最终的结果是由独立的[实现技术][12]的所有预先定义的连续顺序的重定义的块组合而成的。

![重定义层级][14]

任意BEM实体的[实现][12]技术都可以被[重定义][15]。

例如，有一个第三方库在单独的某个水平上链接到一个项目。这个库包含有现成的块实现。特定项目的块被保存在不同的重定义等级。

假设我们需要修改一个库的块的外观。这不需要修改到块的源代码的CSS规则或者在项目层级上复制代码。我们只需要在项目的层级上去创建额外的CSS规则。在构建的过程中，由此产生的实现将包括库层级的原始样式和项目层级的新样式规则的组合。

[1]: https://en.bem.info/methodology/solved-problems/
[2]: https://en.bem.info/kFetIbKxQdABHhUecbic45Il0Bg.png
[3]: https://en.bem.info/v80tUiEPgSQtyW9a7C8rxdn-5EM.png
[4]: https://en.bem.info/0bbhZyhaBhRzqBh5nLYQEnFpDTk.png
[5]: https://en.bem.info/VBlEdksG7XkL4DLPWe4rcYb5hGo.png
[6]: https://en.bem.info/cPrdQL4EZZdhPIrcYOayygPBSm4.png
[7]: https://en.bem.info/methodology/faq/#a-block-or-an-element-when-should-i-use-which
[8]: https://en.bem.info/methodology/faq/#why-does-bem-not-recommend-using-elements-within-elements-block__elem1__elem2
[9]: https://en.bem.info/WSU5nwZla7p44W2tdxiP371xx38.png
[10]: https://en.wikipedia.org/wiki/Document_Object_Model
[11]: https://en.bem.info/technology/bemjson/
[12]: https://en.bem.info/methodology/key-concepts/#implementation-technology
[13]: https://en.bem.info/methodology/key-concepts/#block-implementation
[14]: https://en.bem.info/kqvCO2ZXeivuLHCbn2to5chFZrM.png
[15]: https://en.bem.info/methodology/key-concepts/#block-redefinition
