let MeiziSpider = require('./spider/meizi/index');

let meiziSpider = MeiziSpider('http://jandan.net/ooxx', {
    phantomSet: ['--ignore-ssl-errors=yes', '--load-images=no']
});
meiziSpider.randomSpide(20);
