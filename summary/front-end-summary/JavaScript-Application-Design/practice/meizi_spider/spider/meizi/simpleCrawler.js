const log             = require('../../lib/Commons/log').logger;
const request         = require('request');
const HttpProxyAgent  = require('http-proxy-agent');
const saver           = require('./saver');
const cheerio         = require('cheerio');
const crypto          = require('crypto');

function _genMd5(str) {
    return crypto.createHash('md5').update(str).digest('hex');
}

const ReqOption = {
    headers: {
        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36'
    },
    followRedirect: true,
    maxRedirects: 5
};

function Crawl(setting) {
    Object.assign(ReqOption, setting);
};

Crawl.prototype.set = function (setting) {
    Object.assign(ReqOption, setting);
}

Crawl.prototype.crawl = function(spider, url) {
    ReqOption.url = url;
    request.get(ReqOption, (err, res, body) => {
        if (err || res.statusCode != 200) {
            log.error(err);
            log.error(res && res.statusCode);
            this.reCrawlWithProxy(spider, url);
        } else {
            let accessDeny = body.indexOf('current-comment-page') != -1 ? false : true;
            if ( accessDeny ) { this.reCrawlWithProxy(spider, url); }
            else { saver.save(spider, this.process(url, body)); }
        }
    });
}

Crawl.prototype.reCrawlWithProxy = function (spider, url) {
    let proxy = 'http://' + spider.getProxy();
    let agent = new HttpProxyAgent(proxy);
    ReqOption.agent = agent;
    this.crawl(spider, url);
}

Crawl.prototype.process = function (oldUrl, body) {
    let $ = cheerio.load(body);

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
        log.error(body)
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

module.exports = Crawl;
