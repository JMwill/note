/**
 * 将字符串转换成整数
 *
 * 按照题目的意思，行为跟parseInt一样，直接使用并
 * 注意整型的32位限制就好，第一个解法能够将字符串
 * 内的所有数字进行转换。保留作记录。
 */

/**
 * @param {string} str
 * @return {number}
 */
var log = console.log;
var assert = console.assert;
var myAtoi = function(str) {
	var numMap = '0123456789';
	var isMinus = false;
	var numStr = '';
	for (var i = 0, l = str.length; i < l; i++) {
		if (numMap.indexOf(str[i]) != -1) {
			numStr += str[i];
		}
	}

	if (str[str.indexOf(numStr[0]) - 1] == '-') {
		numStr = '-' + numStr;
	}

	if (!numStr) {
		numStr = 0;
	}
	return parseInt(numStr);
};

var myAtoi2 = function(str) {
	var result = parseInt(str);
	if (!result) {
	    result = 0;
	}
	if (result > 2147483647) {
	    result = 2147483647;
	}
	if (result < -2147483648) {
	    result = -2147483648;
	}
	return result;
};

console.log(myAtoi('') === 0);
var test = function (fun) {
	assert(fun('-2147483649'), -2147483648);
	assert(fun(''), 0);
	assert(fun('test123test'), 123);
	assert(fun('test123test123'), 123123);
	assert(fun('1test123test2'), 11232);
	assert(fun('test-123test'), -123);
	assert(fun('te-123st123test'), -123123);
}

test(myAtoi);