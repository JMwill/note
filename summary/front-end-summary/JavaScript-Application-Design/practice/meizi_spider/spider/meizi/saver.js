var poolCnt = require('./db').poolCnt;
function _createInsertSql(sourceObj) {
    var keys = [
        'page_num',
        'original_url',
        'local_location',
        'img_up',
        'img_down'
    ]
    var values = keys.map(function (key) {
        return sourceObj[key];
    });

    return 'INSERT INTO meizi_spider (' + keys.join(',') + ')VALUES (' + values.join(',') + ')';
}

function save(saveObj) {
    var sql = _createInsertSql(saveObj);
    poolCnt.getConnection(function (err, cnt) {
        if (err) { log.error('get connection with error: ' + err.stack); return; }
        cnt.query(sql, function (err, result) {
            if (err) { log.error('insert with error: ' + err.stack); return;}
            log.info('insert successful: ' + sql + ' ' + result);
        });
    });
}

exports.save = save;
