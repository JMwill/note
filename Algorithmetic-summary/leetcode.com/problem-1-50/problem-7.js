/**
 * 反转整数，例子：
 * x = 123, return 321
 * x = -123, return -321
 *
 * 思路：
 * 1. 首先判断正负值，存储正负状态
 * 2. 将整数反转，在javascript中可以通过将数字转化为字符串，切分
 *    为数组后用数组的反转方法，然后拼接起来，并还原正负状态
 *
 * 思路2：
 * 
 */

/**
 * @param {number} x
 * @return {number}
 */
var log = console.log;
var assert = console.assert;

var reverse = function(x) {
	var xArr = x.toString().split('');
	var signal = '';

	xArr.reverse();
	if (isNaN(parseInt(xArr[xArr.length - 1]))) {
		signal = xArr.pop();
	}
	xArr.unshift(signal);

	var result = parseInt(xArr.join(''));

	// 题目有整型大小限制
	if (result > 2147483648 || result < -2147483648) {
		result = 0;
	}
	return result;
};

var reverse2 = function (x) {
	var signal = x < 0 ? '-' : '';
	var result = '';
	x = Math.pow(Math.pow(x, 2), 0.5);
	do {
		result += x % 10;
		x = parseInt(x / 10);
	} while(x);

	// 题目有整型大小限制
	if (result > 2147483648) {
		result = 0;
	}
	return parseInt(signal + result);
}

function test(fun) {
	assert(fun(-123) === -321);
	assert(fun(0) === 0);
	assert(fun(123) === 321);
	assert(fun(100) === 1);
	assert(fun(-1) === -1);
	assert(fun(1) === 1);
}

// test(reverse);
test(reverse2);