# xpath 使用小结

常用的方式是 **双斜线** 开头的形式，直接选择后接标签的所有元素的开始路径，例子：`//div[@id="only-one"]` 选择的就是所有 div 中带有 id 属性为 `only-one` 的元素，其中如果后接的标签是 `*` 号则代表选择全部元素

---

xpath 中包含有许多的函数，其中：

- text() 函数用于选择元素显示在页面上的文本，地位与属性选择相当，`//*[text()='UserID']`
- contains() 函数，用于部分匹配，`//*[contains(@class, 'sub')]`，`//*[contains(text(), 'Login')]`
- start-with() 函数，匹配条件的元素属性尾部动态变化的情况，`//label[starts-with(@id, 'message')]`
- and & or 连接选择，`//*[contains(@name, 'btn') or contains(text(), 'User')]`，`//div[@id='rt-feature' and @class='rt-alpha']`
- axes 方法，就是基于元素相互之间的关系来进行选择，需要用时再学习

---

xpath 中的 `[]` 运算符的优先级比 `//` 要高，因此在选择某个集合中的一个元素时，就需要用括号括起来：

`//li[@class='fa fa-chevron-circle-right'][1]` 选择 class 属性为 `fa fa-chevron-circle-right'` 而且是其 parent 元素的第一个 child 的元素

`(//li[@class='fa fa-chevron-circle-right'])[1]` 选择 class 属性满足要求的元素中的第一个

---

xpath 中，`not()` 跟 `!=` 之间并不是对等的，not 代表需要的东西没有或者不匹配的情况，而 != 则是判断的属性需要存在并且值不相等的情况。也就如果目标元素没有某个属性或者属性值不是预期值，那只能用 not。如果目标元素一定有某个属性值但属性值不是预期值那就应该用 !=。

