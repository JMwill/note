const crawler       = require('./crawler.js');
const log           = require('../../lib/Commons/log').logger;
const urlTool       = require('url');
const poolCnt       = require('./db').poolCnt;
const proxyList     = require('../../config/proxy');

function _isUrl(url) {
    let isUrl = true;
    try { urlTool.parse(url); }
    catch(e) { isUrl = false; }
    return isUrl;
}

function Spider(option) {
    this.spiderInterval;
    this.urlQueue = [];
    this.imgQueue = [];
    this.options = {
        timeout: 1000,
        phantomSet: ['--ignore-ssl-errors=yes', '--load-images=no']
    };
    // let argv = process.argv.slice(2);
    // proxyReg = /\-\-proxy=(.+)/;
    // argv.forEach((arg, i) => {
    //     if (proxyReg.test(arg)) {
    //         let index =
    //         this.options.phantomSet.findIndex((elem) => {
    //             proxyReg.test(elem);
    //         })
    //         this.options.phantomSet.push('--proxy=' + proxyReg.exec(arg)[1]);
    //     }
    // });
}


Spider.prototype.stop = function() {
    clearInterval(this.spiderInterval);
    clearTimeout(this.spiderInterval);
}

Spider.prototype.crawl = function(url, options) {
    crawler.crawl(this, url, options);
}

Spider.prototype.queuePush = function (url) {
    let args = Array.prototype.slice.call(arguments, 0);
    let urls = [];
    args.forEach(function (arg) {
        if (!_isUrl(arg)) { return; }
        if (arg instanceof Array) { urls.concat(arg); }
        if (typeof arg === 'string') { urls.push(arg); }
    });
    this.urlQueue = this.urlQueue.concat(urls);
}

Spider.prototype.processEntryUrl = function () {
    let url = this.urlQueue.pop();
    let pageNumReg = /page\-(\d+)/;
    let pageNum = pageNumReg.exec(url)[1];
    poolCnt.getConnection((err, cnt) => {
        if (err) {
            log.error(err);
            cnt.release();
            return;
        }
        cnt.query('SELECT MAX(page_num) FROM meizi_spider', (err, rows, fields) => {
            if (err) {
                log.error(err);
                cnt.release();
                return;
            }

            let pageNum = rows[0]['MAX(page_num)'];
            if (pageNum) {
                if (pageNum > 1) { pageNum--; }
                url = url.replace(pageNumReg, 'page-' + pageNum);
            }

            this.urlQueue.push(url);
        });
    })
}

Spider.prototype.infinitySpide = function () {
    clearInterval(this.spiderInterval);
    this.spiderInterval =
    setInterval(() => {
        let url = this.urlQueue.pop();
        if (!url) {return;}
        log.info(url);
        this.crawl(url, this.options.phantomSet);
    }, this.options.timeout);
}

Spider.prototype.randomSpide = function (second) {
    second = parseInt(second);
    if (isNaN(second)) {return};

    let time = (second + (Math.floor(Math.random() * second))) * 1000;

    clearTimeout(this.spiderInterval);
    this.spiderInterval =
    setTimeout(() => {
        let url = this.urlQueue.pop();
        if (!url) {return;}
        this.crawl(url, this.options.phantomSet);
        this.randomSpide(second);
    }, time);
}

Spider.prototype.getProxy = function () {
    // let proxyList =
    //     this.options.proxyList && this.options.proxyList.length > 0 ?
    //     this.options.proxyList :
    //     gloProxyList;
    // return proxyList[Math.floor(Math.random() * proxyList.length)];
    return proxyList.shift();
}

function wrapper(entryUrl, options) {
    let spider = new Spider(options);
    if (options) {
        Object.assign(spider.options, options);
    }
    spider.queuePush(entryUrl);
    // spider.processEntryUrl();
    return spider;
}

module.exports = wrapper;
