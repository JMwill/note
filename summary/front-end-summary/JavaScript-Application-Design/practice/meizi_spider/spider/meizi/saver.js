const log             = require('../../lib/Commons/log').logger;
let poolCnt = require('./db').poolCnt;

function _createInsertSql(sourceObj) {
    let keys = [
        'page_num',
        'original_url',
        'img_up',
        'img_down',
        'img_md5',
        'downloaded'
    ]
    let values = keys.map(function (key) {
        return sourceObj[key];
    });

    return 'INSERT INTO meizi_spider (' + keys.join(',') + ') VALUES (' + values.join(',') + ')';
}

function save(spider, saveObj) {
    // 插入下一次访问的链接
    if (!saveObj.nextPage) {
        return;
    }
    spider.urlQueue.push(saveObj.nextPage);

    saveObj.imgInfos.forEach((imgInfo, index) => {
        let sql = _createInsertSql(imgInfo);
        poolCnt.getConnection((err, cnt) => {
            if (err) {
                log.error('get connection with error: ' + err.stack);
                cnt.release();
                return;
            }
            cnt.query(sql, (err, result) => {
                if (err) {
                    log.error('insert with error: ' + err.stack);
                    cnt.release();
                    return;
                }
                log.info('insert successful: ' + sql + ' ');
                cnt.release();
            });
        });
    });
}

exports.save = save;
