# bee-worker爬取流程个人总结:

## 开始

### 路由

```
/**
 * 路由采用正则匹配, 严格在上,宽松在下
 * @type {Array}
 */
var route = [
    [/www\.ipc\.me/, 'index']
];

module.exports = function() {
    return {
        'route': route
    };
};
```

### 基础模板
```
/**
 * 每个文件引入的模块
 * 其他需要的模块可以通过按需添加
 * 常用的如下:
 * _ = require('underscore')
 * cheerio = require('cheerio')
 * ua = require('../../../components/header/ua.js')
 * request = require('request')
 */
var logger = console.log,
    Grab = require('../../../components/grab/grab'),

    // 一般在每个文件夹内添加有一个tools.js文件,用来包含常用的操作,方便管理.
    Tools = require('./tools'); 
    
module.exports = function(task) {
    var flower = [],
        honey = [],
        grab = new Grab(),
        done = task.done;

    grab.get(task.url)
        .set({
            /**
             * set内部查找规则按照css的匹配规则
             * 可以使用not, last-child等新的选择器
             * @符号后选取的内容为标签内的属性
             * /html()选取的是匹配的标签内的html代码
             * 默认选取标签内包含的内容
             */
            'productPost[]': '.post/html()',
            'nextUrl': '.more-notes .load-more-notes@href'
        })
        .data(function (data) {
            /**
             * data内部对set收集到的data进行进一步处理,
             * 整理出需要的内容格式后将内容存储到honey以及flower中
             * honey为空或者flower为空则不用添加到harvest中
             */
        })
        .done(function () {
            task.harvest = {
                'author': 'Will',
                'tag': 'idea',
                'honey': honey,
                'flower': flower
            };
            done(null, task);
        });
};
```

### Ajax请求
```
var logger = console.log,
    Grab = require('../../../components/grab/grab');

module.exports = function(task) {
    var flower = [],
        grab = new Grab(),
        done = task.done,
        T = new Tools();

    grab.config({
            /**
             * 使用config进行请求前的基础配置
             * 通过使用chrome控制台抓包可以看到
             * 需要的字段
             */
            'Accept': 'application/json, text/javascript, */*; q=0.01',
            'X-Requested-With': 'XMLHttpRequest'
        })
        .get(task.url)
        .data(function (data) {
            一般处理
        })
        .then(function(context, data, next) {
            /**
             * data进行的处理按照需求来决定是否需要,
             * then方法用于request请求ajax等的情况
             * 每次进行完处理,需要在request或其他函数
             * 的内部回调或末尾调用next方法.执行下一步的
             * done操作.这样grab才能正常退出
             */
        })
        .done(function () {
            task.harvest = {
                'author': 'Will',
                'flower': flower
            };
            done(null, task);
        });
};
```