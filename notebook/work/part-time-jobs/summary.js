/*
* @Author: will
* @Date:   2015-12-14 21:17:22
* @Last Modified by:   will
* @Last Modified time: 2015-12-24 11:56:47
* bee-worker中常用总结
*/

'use strict';

/**
 * 正则公式收集
 */

// 匹配日期,目前想到的是这种方法.
var dateReg = /[^\d]*(\d+)[^\d]+(\d+)[^\d]+(\d+)/;
var dateReg = /[^\d]*(\d+)(?:[^\d]+(\d+)){2}/;
var dateReg = /[^\d]*(\d{4})[^\d]+(\d{2})[^\d]+(\d{2})/;
var dateReg = /[^\d]*(\d{4})(?:[^\d]+(\d{2})){2}/;

// 不包含某个字符串
var unneedStr = /((?!unneedStr).)*/;

// 匹配含有p但不含有ph的单词
var pButNotPh = /\b(?=\w*p)(?!\w*ph)\w*\b/;

/**
* 函数收集
*/

// 不通过window.location跳转某个页面
function gotoWebsite(url, time) {
    var meta = document.createElement('meta');

    if (url.indexOf('http:') < 0) {
        url = 'http:' + url;
    }
    time = time ? time : 0;
    meta.httpEquiv = 'refresh';
    meta.content = time + ';url=' + url;
    document.head.appendChild(meta);
}
