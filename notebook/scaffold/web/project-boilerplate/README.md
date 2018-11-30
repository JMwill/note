# 开发目录定义

## 具有一定语义的开发概念

- 模块化资源: js模块, css模块或组件
- 页面资源: 网站html或后端模板页面, 引用模块化框架, 加载模块
- 非模块化资源: 如提供模块化框架的js本身

## 目录定义

```javascript
/* Version 1 */
project
    - components        存放模块化资源
    - pages             存放页面资源
    - static            存放非模块化资源

/* Version 2 */
project
    - components_modules    存放外部模块资源
    - components            存放项目模块资源
    - pages                 存放页面资源
    - static                存放非模块化资源

/* Version 3 使用Node作为后端, 迎合express结构 */
project
    - components_modules    存放外部模块资源
    - components            存放项目模块资源
    - views                 存放页面资源
    - public                存放非模块化资源

/* Version 4 public不具语义, 与views合并, 
   views负责存放页面资源和非模块化资源 */
project
    - components_modules    存放外部模块资源
    - components            存放项目模块资源
    - views                 存放页面资源
```

## 部署目录设计

```javascript
/* 项目源码目录 */
release
    - public
        - components_modules        模块化资源部署在这个目录下
            - module_a
                - 1.0.0             根据发布的版本分类不同版本的组件, 这个是对于一个项目同时有多个版本在线所需要做的分类, 只有一个版本的项目无需这样做
                    - module_a.js
                    - module_a.css
                    - module_a.png
                - 1.0.1
                ...
            - 项目名
                - 版本号
        - 项目名
            - 1.0.0             1.0.0 版本的非模块化静态资源都构建在此
            - 1.0.1             1.0.1 ~~
            ...
    - views
        - 项目名
            - 1.0.0             1.0.0 版本的后端模板都构建在此
            - 1.0.1             1.0.1 ~~
            ...

/* 对应的发布版本  */
release
    - public
        - c                         模块化资源部署在这个目录下
            - 公共模块
                - 版本号
            - 项目名
                - 版本号
        - 项目名
            - 版本号                 非模块化资源都部署在这个目录
    - views
        - 项目名
            - 版本号                 后端模板构建在这个目录下
```
