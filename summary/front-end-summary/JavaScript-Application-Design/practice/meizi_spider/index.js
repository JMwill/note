let MeiziSpider = require('./spider/meizi/index');

let meiziSpider = MeiziSpider('http://jandan.net/ooxx/page-1', {
    phantomSet: ['--ignore-ssl-errors=yes', '--load-images=no', '--proxy=120.52.72.59:80']
});
meiziSpider.randomSpide(10);
