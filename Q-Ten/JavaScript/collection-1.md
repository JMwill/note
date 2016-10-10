### null 与 undefined 的区别

- `typeof null`返回的是‘object’，
- 可以认为null表示意料中的空缺，undefined表示意料外的空缺
- 区分null 与 undefined要用‘===’

### Object.create()有什么用

- 创建一个新对象，第一个参数将成为创建后的对象的原型
- 可用null作为第一个参数，从而创建一个没有原型，不具备任何基础方法的新对象
- 创建普通对象`Object.create(Object.prototype)`
