const cheerio         = require('cheerio');

let imgInfos = [];

function process(content) {
    let $ = cheerio.load(content);

    // 添加下一个访问的url
    urls.push($('.next-comment-page').eq(0).prop('href'));

    // 提取图片信息
    let souce = $('.commentlist li .text');
    souce.each((i, elem) => {
        let $souceGetter = $(this);

        let imgLink = $souceGetter.find('a.view_img_link');
        imgLink = imgLink.length > 0 ? imgLink.prop('href') : null;

        let imgSrc = $souceGetter.find('img');
        imgSrc = imgSrc.length > 0 ? imgSrc.prop('src') : null;

        let upVote = $souceGetter.find('.vote a[title*="圈圈"]').text();
        let downVote = $souceGetter.find('.vote a[title*="叉叉"]').text();

        if (imgLink) {
            imgs.push(imgLink);
        } else if (imgSrc) {
            imgs.push(imgSrc);
        }


    });
}

exports.process = process;
