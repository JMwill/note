const log             = require('../../lib/Commons/log').logger;
let poolCnt = require('./db').poolCnt;

const keys = [
    'page_num',
    'original_url',
    'img_up',
    'img_down',
    'img_md5',
    'downloaded'
];

function _createInsertSql(sourceObj) {
    let values = keys.map(function (key) {
        return sourceObj[key];
    });
    return 'INSERT INTO meizi_spider (' + keys.join(',') + ') VALUES (' + values.join(',') + ')';
}

function _createUpdateSql(id, sourceObj) {
    let keyVal = keys.map(function (key) {
        return key + ' = ' + sourceObj[key];
    });
    return 'UPDATE meizi_spider SET ' + keyVal.join(',') + ' WHERE id = ' + id;
}

function _queryImgInfoSql(cnt, sql) {
    cnt.query(sql, (err, result) => {
        if (err) {
            log.error('exec sql ' + sql + ' with error: ' + err.stack);
            cnt.release();
            return;
        }
        cnt.release();
    });
}


function save(spider, saveObj) {
    // 插入下一次访问的链接
    if (!saveObj.nextPage) {
        log.error('without next page' + JSON.stringify(saveObj));
        return;
    }
    spider.urlQueue.push(saveObj.nextPage);

    saveObj.imgInfos.forEach((imgInfo, index) => {
        poolCnt.getConnection((err, cnt) => {
            if (err) {
                log.error('get connection with error: ' + err.stack);
                return;
            }
            let selectImgIdWithMd5 = 'SELECT id FROM meizi_spider WHERE img_md5 = ' + imgInfo.img_md5;
            cnt.query(selectImgIdWithMd5, (err, result) => {
                let sql;
                if (err) {
                    sql = _createInsertSql(imgInfo);
                } else {
                    if (result.length) {
                        sql = _createUpdateSql(result[0].id, imgInfo);
                    } else {
                        sql = _createInsertSql(imgInfo);
                    }
                }
                _queryImgInfoSql(cnt, sql);
            });
        });
    });
}

exports.save = save;
