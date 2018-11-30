const log             = require('../../lib/Commons/log').logger;
const phantom         = require('phantom');
const saver           = require('./saver');
const cheerio         = require('cheerio');
const crypto          = require('crypto');

function _genMd5(str) {
    return crypto.createHash('md5').update(str).digest('hex');
}

function Crawl() {};

Crawl.prototype.crawl = function(spider, url, optionArr, optionObj) {
    let sitePage = null;
    let phInstance = null;
    let crawler = phantom.create.call(phantom, optionArr, optionObj);
    crawler
        .then(instance => {
            phInstance = instance;
            return instance.createPage();
        })
        .then(page => {
            sitePage = page;
            page.setting('resourceTimeout', 10000);
            return page.open(url);
        })
        .then(status => {
            if (status === 'success') {
                return sitePage.property('content');
            } else {
                throw new Error('Receive Status: ' + status);
            }
        })
        .then(content => {
            sitePage.close();
            phInstance.exit();
            let accessDeny = false;
            if (content.indexOf('current-comment-page') === -1) {
                accessDeny = true;
            }
            if ( accessDeny ) { this.reCrawlWithProxy(spider, url, optionArr, optionObj); }
            else { saver.save(spider, this.process(url, content)); }
        })
        .catch(err => {
            log.error(err);
            sitePage.close();
            phInstance.exit();
            this.reCrawlWithProxy(spider, url, optionArr, optionObj);
            // spider.queuePush(url);
        });
}

Crawl.prototype.reCrawlWithProxy = function (spider, url, optionArr, optionObj) {
    let proxy = '--proxy=' + spider.getProxy();
    let oldProxyIndex = optionArr.findIndex((elem) => {
        if (elem.indexOf('--proxy=') != -1) { return true; }
    });

    if (oldProxyIndex != -1) {
        optionArr[oldProxyIndex] = proxy;
    } else {
        optionArr.push(proxy);
    }
    log.info('recrawl with proxy optionArr is: ' + optionArr);
    this.crawl(spider, url, optionArr, optionObj);
}

Crawl.prototype.process = function (oldUrl, content) {
    let $ = cheerio.load(content);

    let pageInfo = {
        nextPage: oldUrl,
        imgInfos: []
    };

    let numReg = /\d+/;
    // 提取页码
    let pageNum;
    try {
        pageNum = parseInt(
                numReg.exec(
                    $('.current-comment-page').text()
                )[0]
            );
    } catch (e) {log.error (e);}
    if (!pageNum) { log.info('without pageNum'); return pageInfo; }

    // 添加下一个访问的url
    try {
        pageInfo.nextPage = $('.previous-comment-page').eq(0).prop('href');
    } catch (e) {
        log.error('can not get next page');
        log.error(e);
        log.error(content)
        return pageInfo;
    }
    log.info('next page is ' + pageInfo.nextPage);

    // 提取图片信息
    let imgInfos = [];
    let source = $('.commentlist li .text');
    let keys = [ 'page_num', 'original_url', 'img_up', 'img_down', 'img_md5', 'downloaded' ];

    source.each((i, elem) => {
        let $sourceGetter = $(elem);

        let imgLink = $sourceGetter.find('a.view_img_link');
        if (imgLink.length > 0) {
            imgLink = imgLink.prop('href');
        } else {
            imgLink = $sourceGetter.find('img');
            if (imgLink.length > 0) {
                imgLink = imgLink.prop('src');
            } else {
                imgLink = 'without imgLink';
            }
        }
        imgLink = '"' + imgLink + '"';

        let upVote;
        try {
            upVote = parseInt(
                numReg.exec(
                    $sourceGetter
                        .find('.vote span[id*="cos_support"]')
                        .text()
                )[0]
            );
        } catch (e) {upVote = 0;}

        let downVote
        try {
            downVote = parseInt(
                numReg.exec(
                    $sourceGetter
                        .find('.vote span[id*="cos_unsupport"]')
                        .text()
                )[0]
            );
        } catch (e) {downVote = 0;}

        let vals = [pageNum, imgLink, upVote, downVote, '"' + _genMd5(imgLink) + '"', false];

        let imgInfo = {};
        keys.forEach((key, index) => {
            imgInfo[key] = vals[index];
        });

        imgInfos.push(imgInfo);
    });


    pageInfo.imgInfos = imgInfos;
    return pageInfo;
}

module.exports = new Crawl();
