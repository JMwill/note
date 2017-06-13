# 用NodeJs构建命令行工具

新建立好项目之后, 在入口文件(一般情况下是项目下的index.js)首行中添加: `#!/usr/bin/env node`.

然后在`package.json`中, 添加:

```javascript
{
    ...
    "bin": {
        "package-name": "./index.js"
    }
    ...
}
```

然后使用:

```bash
$ npm install -g
$ package-name
```

这个时候的包文件就可以使用了
