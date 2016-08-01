const crawler  = require('./crawler.js');
const log      = require('../../lib/Commons/log').logger;


function Spider(option) {
    this.spiderInterval;
    this.urlQueue = [];
    this.imgQueue = [];
}

Spider.prototype.stop = function() {
    clearInterval(spiderInterval);
}

Spider.prototype.spide = function(url) {
    crawler.crawl(url, ['--ignore-ssl-errors=yes', '--load-images=no']);
}

Spider.prototype.queuePush = function (url) {
    let args = Array.prototype.slice.call(arguments, 0);
    let urls = [];
    args.forEach(function (arg) {
        if (!isUrl) { return; }
        if (arg instanceof Array) { urls.concat(arg); }
        if (typeof arg === 'string') { urls.push(arg); }
    });
    this.urlQueue.concat(urls);
}

Spider.prototype.infinitySpide = function () {
    let spide = function () {
        let url = this.urlQueue.pop();
        this.spide(url);
    };
    spide = spide.bind(this);
    spiderInterval = setInterval(spide, timeout);
}

function wrapper(entryUrl, options) {
    let spider = new Spider(options);
    if (options) {
        spider.options = {
            timeout: 1000
        };
        Object.assign(spider.options, options);
    }
    spider.queuePush
    return spider;
}

module.exports = wrapper;
