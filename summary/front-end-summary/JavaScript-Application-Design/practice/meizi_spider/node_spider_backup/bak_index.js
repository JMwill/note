var request         = require('request');
var fs              = require('fs');
var path            = require('path');
var log             = require('./lib/Commons/log').logger;
var zlib            = require('zlib');
var mkdirp          = require('mkdirp');
var async           = require('async');


// get config
var globalConfig    = require('./config/config.json');
var urls = JSON.parse(fs.readFileSync('./task/task_urls.json'));

var headers = {
    'Accept'            : 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8A',
    'Accept-Encoding'   : 'gzip, deflate, sdch',
    'Accept-Language'   : 'zh-CN,zh;q=0.8,en;q=0.5',
    'Cache-Control'     : 'max-age=0',
    'Connection'        : 'keep-alive',
    'Host'              : 'jandan.net',
    'User-Agent'        : 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36',
    'Upgrade-insecure-Requests': 1,
};

urls.forEach(function (url, index) {
    var opt = {
        url: url,
        headers: headers,
        encoding: null
    };

    function saveFile(path, data) {
        fs.writeFile(path, data, function (err) {
            if (err) { log.error(err); }
        });
    }

    request.get(opt, function (err, response, body) {
        if (err) { log.error(err); return; }

        var isGzip = false;
        var filePath = path.resolve(
            __dirname, './source/' + url.slice(url.lastIndexOf('/')) + '-' + index + '.html'
        );
        if (response.headers['content-encoding'].toLowerCase().indexOf('gzip') != -1) {
            isGzip = true;
        }

        if (isGzip) {
            zlib.gunzip(body, function (err, decode) {
                if (err) { log.error(err); return; }

                body = decode.toString();
                response.body = body;

                saveFile(filePath, body);
            });
        } else {
            saveFile(filePath, body);
        }
    });
});
