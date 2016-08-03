const mysql       = require('mysql');
const path        = require('path');
const log         = require('../../lib/Commons/log').logger;

const dbConfigName= path.basename(__dirname) + '_spider_db';
const dbConfig    = require(
    path.resolve('../../config/config.json')
)[dbConfigName];

const cnt = mysql.createPool(dbConfigName);

exports.poolCnt = cnt;
    // .connect((err) => {
    //     if (err) {
    //         let errorStr = 'Create Database ' + dbConfig.database + ' Fail: ' + err.stack;
    //         log.error(errorStr);
    //         throw new Error(errorStr);
    //         return ;
    //     }
    //
    //     exports.cnt = cnt;
    // });
