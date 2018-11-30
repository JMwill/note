# 用户体验

## 选用合适的鼠标光标

值得常用与重视的光标:

1. 提示禁用状态

```css
:disabled, [disabled], [aria-disabled="true"] {
    cursor: not-allowed;
}
```

2. 隐藏鼠标光标:

```css
video {
    cursor: url('transparent.gif'); /* css2.1回退方案 */
    cursor: none;
}
```

