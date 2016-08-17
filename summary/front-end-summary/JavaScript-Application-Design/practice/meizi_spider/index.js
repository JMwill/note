let MeiziSpider = require('./spider/meizi/index');

let meiziSpider = MeiziSpider('http://www.jandan.net/ooxx', {crawlSet: {timeout: 20000}});
meiziSpider.randomSpide(20);
