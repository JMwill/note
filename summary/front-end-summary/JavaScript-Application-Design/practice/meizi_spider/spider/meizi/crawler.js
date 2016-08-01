const log             = require('../../lib/Commons/log').logger;
const phantom         = require('phantom');
const worker          = require('./worker');

function crawl(url, optionArr, optionObj) {
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
            worker.process(content, (err, result) => {
                if (err) {
                    log.error(err);
                    throw err;
                    return;
                }
                sitePage.close();
                phInstance.exit();
            });
        })
        .catch(err => {
            log.error(err);
            phInstance.exit();
        });
}

exports.crawl = crawl;
