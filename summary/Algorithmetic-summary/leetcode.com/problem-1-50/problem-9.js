/**
 * 回文数
 * 判断一个整数是否是回文数，完成题目，同时不需要额外的空间
 *
 * 思路：将数据逐个位拆出来，向后拼接，得出一个反转数后相比较
 */

/**
 * @param {number} x
 * @return {boolean}
 */
var assert = console.assert;
var log = console.log;
var isPalindrome = function(x) {
	if (x < 0) {return false;}
	var revertX = 0, tempX = x;

	do {
		revertX *= 10;
		revertX += tempX % 10;
		tempX = parseInt(tempX / 10);
	} while (tempX)

	return revertX === x;
};

var test = function (fun) {
	assert(fun(123321) === true, 'wrong result: ' + 123321);
	assert(fun(13321) === false, 'wrong result: ' + 13321);
	assert(fun(11) === true, 'wrong result: ' + 11);
	assert(fun(-11) === true, 'wrong result: ' + 11);
	assert(fun(0) === true, 'wrong result: ' + 0);
}

test(isPalindrome)