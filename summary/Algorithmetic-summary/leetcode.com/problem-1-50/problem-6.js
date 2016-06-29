/**
 * 将给定字符串以“之字形”模式，写成给定的行数，如下所示是由"PAYPALISHIRING"而得：
 * P   A   H   N
 * A P L S I I G
 * Y   I   R
 *
 * 即为："PAHNAPLSIIGYIR"
 *
 * 思路：创建一个长度为未知行数为numRows的二维数组，将字母按照从上到下顺序拼入数组
 * 内，最后在拼接在一起。
 */

var assert = console.assert;
var log = console.log;

/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
var convert = function(s, numRows) {
	// 判断是否需要进行字符拼接
	if (numRows < 2 || s.length < numRows)
		return s;

	// 创建容器
	var charArr = [];
	for (var i = 0; i < numRows; i++) {
		charArr.push('');
	}

	var index = 0, step = 1, charIndex = 0;
	while (s[charIndex]) {
		charArr[index] += s[charIndex];
		if (index === 0)
			step = 1;
		else if (index === numRows - 1)
			step = -1;
		index += step;
		charIndex++;
	}

	return charArr.join('');
};


function test(fun) {
	assert(fun('PAYPALISHIRING', 1), 'PAYPALISHIRING');
	assert(fun('PAYPALISHIRING', 2), 'PYAIHRNAPLSIIG');
	assert(fun('PAYPALISHIRING', 3), 'PAHNAPLSIIGYIR');
}

test(convert);