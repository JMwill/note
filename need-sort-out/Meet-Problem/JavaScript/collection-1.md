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

### 如果需要在ajax请求回来之后才让页面关闭

可以给ajax的`async`设置为`false`让浏览器等待请求的完成才关闭或者重载页面

### 如何实现更好的ajax请求

记住要实现超时的限制, 并进行一定次数的重试:

```javascript
$.ajax({
    url: 'example.url',
    ...,
    tryCount: 0,
    retryLimit: 3,
    success: function(json) { ... },
    error: function(xhr, textStatus, errorThrown) {
        if (textStatus === 'timeout') {
            this.tryCount += 1;
            if (this.tryCount < this.retryLimit) {
                $.ajax(this);
                return;
            }
            return;
        } else {
            ...
        }
    }
});
```

### :hover等效果在iOS上不能实现

这个问题的原因是iOS设备屏蔽掉了CSS的hover监听, 因为在移动设备上没有这个必要. 通过添加JavaScript点击事件能够触发这些监听从而让效果能够正常显示, 快速的且有效的方法是:

```html
<div onclick=""></div>
<!-- 或者 -->
<div onclick="void 0"></div>
```

上面这样做能够最快速地解决问题, 但是在iOS的机型上会出现点击正常的可点击元素那样的灰色背景一闪而过的情况, 这些通过添加CSS的额外样式可以解决, 或者通过:

```javascript
document.addEventListener('touchstart', function() {}, false);
```

这个方法能够使得触摸的hover效果更快响应, 并且灰色背景闪过的情况基本不会察觉.
