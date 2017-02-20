### null 与 undefined 的区别

- `typeof null`返回的是‘object’，
- 可以认为null表示意料中的空缺，undefined表示意料外的空缺
- 区分null 与 undefined要用‘===’

### Object.create()有什么用

- 创建一个新对象，第一个参数将成为创建后的对象的原型
- 可用null作为第一个参数，从而创建一个没有原型，不具备任何基础方法的新对象
- 创建普通对象`Object.create(Object.prototype)`

### 为什么会出现表单不能自动填充的问题

因为表单自动填充需要浏览器自己进行识别, 而浏览器进行识别是通过`input`或者其他输入类型的标签的`name`属性来进行判断的, 如:

```html
<input name="email" type="text" id="..."/>
<input name="password" type="text" id="..."/>
```

这样的input就能够在保存了账号密码的情况下自动填充到相应的区域, 或者提供填充选项

### webUploader中找不到对象的错误

这样的原因是因为上传的对象被隐藏了而导致的, 因此在需要隐藏某个元素的时候, 不要使用`display: none`来隐藏. 而是:

```css
.element-invisible {
    position: absolute;
    clip: rect(1px 1px 1px 1px);
    clip: rect(1px,1px,1px,1px);
}
```

这样的话元素依然存在, 同时也可以实现隐藏.
