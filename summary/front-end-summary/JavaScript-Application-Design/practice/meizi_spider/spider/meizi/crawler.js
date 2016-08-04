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
            saver.save(spider, this.process(content));
            sitePage.close();
            phInstance.exit();
            // this.handleDeny(content, sitePage, (needRedirect) => {
            //
            //     if (needRedirect) {
            //         console.log(content);

                    // let proxy = this.getRandomProxy();
                    // if (optionArr.length > 2) {
                    //     optionArr.pop();
                    // }
                    // this.crawl(spider, url, optionArr.concat(['--proxy=' + proxy]), optionObj);
                // } else {
                // }
            // });
        })
        .catch(err => {
            log.error(err);
            phInstance.exit();
        });
}

Crawl.prototype.getRandomProxy = function () {
    let proxyList = [
        '120.52.72.59:80',
        '52.8.230.224:3128',
        '211.87.224.203:203',
        '49.207.64.65:8080'
    ];
    return proxyList[Math.floor(Math.random() * proxyList.length)];
}

Crawl.prototype.handleDeny = function (content, sitePage, cb) {
    if (content.indexOf('超载鸡觉得您访问煎蛋的行为不像是人类哦') != -1) {
        cb(true);
    } else {
        cb(false);
    }
}

Crawl.prototype.process = function (content) {
    let $ = cheerio.load(content);

    let pageInfo = {};
    // 添加下一个访问的url
    try {
        pageInfo.nextPage = $('.next-comment-page').eq(0).prop('href');
    } catch (e) {
        pageInfo.nextPage = null;
    }

    let numReg = /\d+/;
    // 提取页码
    let pageNum =
        parseInt(
            numReg.exec(
                $('.current-comment-page').text()
            )[0]
        );

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

        let upVote = parseInt(
            numReg.exec(
                $sourceGetter
                    .find('.vote span[id*="cos_support"]')
                    .text()
            )[0]
        );
        let downVote = parseInt(
            numReg.exec(
                $sourceGetter
                    .find('.vote span[id*="cos_unsupport"]')
                    .text()
            )[0]
        );

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
