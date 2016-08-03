const crawler  = require('./crawler.js');
const log      = require('../../lib/Commons/log').logger;


function Spider(option) {
    this.spiderInterval;
    this.urlQueue = [];
    this.imgQueue = [];
    this.options = {
        timeout: 1000
    };
}

Spider.prototype.stop = function() {
    clearInterval(spiderInterval);
}

Spider.prototype.crawl = function(url) {
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
        if (!url) {return;}
        this.crawl(url);
    };
    spide = spide.bind(this);

    clearInterval(this.spiderInterval);
    this.spiderInterval = setInterval(spide, timeout);
}

Spider.prototype.randomSpide = function (second) {
    second = parseInt(second);
    if (isNaN(second)) {return};

    let time = Math.floor(Math.random() * second);

    clearTimeout(this.spiderInterval);
    this.spiderInterval = setTimeout((function {
        let url = this.urlQueue.pop();
        if (!url) {return;}
        this.crawl(url);
        this.randomSpide(second)
        this.randomSpide(second);
    }).bind(this), this.options.timeout);
}

function wrapper(entryUrl, options) {
    let spider = new Spider(options);
    if (options) {
        Object.assign(spider.options, options);
    }
    spider.queuePush(entryUrl);
    return spider;
}

module.exports = wrapper;
