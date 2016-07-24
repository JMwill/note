const fs              = require('fs');
const path            = require('path');
const log             = require('../../lib/Commons/log').logger;
const phantom         = require('phantom');
const cheerio         = require('cheerio');

// get config
const globalConfig    = require('../../config/config.json');

const entryUrl = 'http://jandan.net/ooxx/page-1';
const urlQueue = [];
const imgQueue = [];

function getContent(url) {
    let sitePage = null;
    let phInstance = null;
    phantom
        .create(['--ignore-ssl-errors=yes', '--load-images=no'])
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
            let $ = cheerio.load(content);

            // 添加下一个访问的url
            urlQueue.push($('.next-comment-page').eq(0).prop('href'));

            // 提取图片信息
            let imgsContent = $('.commentlist li .text p');
            imgsContent.forEach((i, $imgGetter) => {
                let imgLink = $imgGetter.find('a.view_img_link').prop('href');
                if (!imgLink) {
                    imgLink = $imgGetter.find('img').prop('src');
                }

                if (imgLink) {
                    imgQueue.push(imgLink);
                }
            });
            sitePage.close();
            phInstance.exit();
        })
        .catch(err => {
            log.error(err);
            phInstance.exit();
        });
}

getContent(entryUrl);

log.info(imgQueue);
log.info(urlQueue);
