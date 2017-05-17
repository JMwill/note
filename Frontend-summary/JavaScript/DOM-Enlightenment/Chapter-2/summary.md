# 记录

## [HTMLDocument][]的属性以及方法(包括继承的)

- doctype
- documentElement
- implementation.*
- activeElement
- body
- head
- title
- lastModified
- referrer
- URL
- defaultview
- compatMode
- ownerDocument
- hasFocus()

## `document`[子节点][2]

`document`对象至少具有两个字节点: `<!DOCTYPE html>`以及`<html lang="en">`

## `document`提供了对`<!DOCTYPE>`, `<html lang="en">`, `<head>`, 以及`<body>`的快捷访问

- document.doctype refers to `<!DOCTYPE>`
- document.documentElement refers to `<html lang="en">`
- document.head refers to `<head>`
- document.body refers to `<body>`

## 获取`document`中的focus/active节点的引用

可以通过[`document.activeElement`][3]来获取文档中被聚焦的节点的引用

## 判断`document`是否获得焦点

使用[`document.hasFocus`][4]可以获知文档是否获得焦点

## `document.defaultView`是获取JavaScript中的顶部对象的快捷方式, 正常情况下是`window`

## 从元素中获取`Document`对象

使用元素的[`ownerDocument`][5]属性可以获取到所属的对应文档对象. 在`Document`节点上调用这个属性的话, 返回的是`null`.

[1]:    ./exec/1.html
[2]:    ./exec/2.html
[3]:    ./exec/3.html
[4]:    ./exec/4.html
[5]:    ./exec/5.html