# 一个Vue项目的构成

## 项目构建文件文件夹：build

```bash
├── build                                                                       │   ├── setup-dev-server.js
│   ├── vue-loader.config.js
│   ├── webpack.base.config.js
│   ├── webpack.client.config.js
│   └── webpack.server.config.js
```

setup-dev-server.js，以及vue-loader.config.js都是开发时额外添加的功能，主要的配置文件是：webpack.base.config.js、webpack.client.config.js、webpack.server.config.js

webpack.base.config.js提供一个webpack的最基础的配置，而webpack.client以及webpack.server则通过继承webpack.base来实现相关功能的定义。

## 资源文件夹：public

存放一般所需的资源文件，如：图片、第三方库、字体等

## 源程序文件夹：src

```bash
├── src
│   ├── app.js
│   ├── App.vue
│   ├── client-entry.js
│   ├── index.template.html
│   ├── server-entry.js
│   ├── router
│   │   └── index.js
│   ├── components
│   │   ├── Comment.vue
│   │   ├── ItemList.vue
│   │   ├── Item.vue
│   │   └── Spinner.vue
│   ├── filters
│   │   └── index.js
│   ├── store
│   │   ├── api.js
│   │   ├── create-api-client.js
│   │   ├── create-api-server.js
│   │   └── index.js
│   └── views
│       ├── CreateListView.js
│       ├── ItemView.vue
│       └── UserView.vue
```

- app.js是整个web app的实例导出文件
- App.vue则是整个web app的初始外观，提供给app.js导入
- client-entry.js作为web app的入口而存在，初始化store对象以及挂载vue实例到dom上
- index.template.html是根html文件，提供web app的插入点。
- server-entry.js则是服务端渲染的入口文件。



### router文件夹

存放源程序的路由配置对象

### components文件夹

存放页面的各个组织模块

### filters文件夹

存放自定义的filter工具

### store文件夹

存放各个状态的设置文件，数据获取由action来完成

### views文件夹

存放各个页面的vue代码