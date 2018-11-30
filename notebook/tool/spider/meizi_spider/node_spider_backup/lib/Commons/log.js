/**
 * log4js配置文件(日志模块)
 * log分级：
 *      异常跟踪: trace
 *      调试日志: debug
 *      日常日志: info(默认)
 *      警告日志: warn
 *      错误日志: error
 *      异常日志: fatal(将导致系统崩溃，当前请求断开等严重问题)
 * 使用：
 *      假设引入模块名为: log, 引入模块后: log.info('消息');
 */

var log4js = require('log4js');
var config = require('../../config/config.json');

log4js.configure({
    appenders:[
        {type: 'console', category: 'console'}, // 控制台输出
        {
            type: 'dateFile',
            filename: config['LogLocation'],
            pattern: '-yyyy-MM-dd-hh.log',
            maxLogSize: 1024,
            alwaysIncludePattern: true
        } // 日志记录格式
    ],
    replaceConsole: true,
    levels: {
        dateFileLog: 'INFO'
    }
});

var dateFileLog = log4js.getLogger('dateFileLog');

exports.logger = dateFileLog;

exports.use = function (app) {
    app.use(log4js.connectLogger(dateFileLog, {
        level: 'INFO',
        format: ':remote-addr :method :req[host] :url :referrer :user-agent'
    }));
}
