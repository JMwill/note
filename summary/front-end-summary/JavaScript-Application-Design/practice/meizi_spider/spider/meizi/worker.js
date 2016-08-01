const fs              = require('fs');
const path            = require('path');
const log             = require('../../lib/Commons/log').logger;
const cheerio         = require('cheerio');


let urls = [];
let imgInfos = [];
function process(content) {
    let $ = cheerio.load(content);

    // 添加下一个访问的url
    urls.push($('.next-comment-page').eq(0).prop('href'));

    // 提取图片信息
    let imgsContent = $('.commentlist li .text p');
    imgsContent.each(function (i, elem) {
        let $imgGetter = $(this);

        let imgLink = $imgGetter.find('a.view_img_link');
        imgLink = imgLink.length > 0 ? imgLink.prop('href') : null;

        let imgSrc = $imgGetter.find('img');
        imgSrc = imgSrc.length > 0 ? imgSrc.prop('src') : null;

        if (imgLink) {
            imgs.push(imgLink);
        } else if (imgSrc) {
            imgs.push(imgSrc);
        }
    });

    return {
        urls: urls,
        imgInfos: imgInfos
    }
}
