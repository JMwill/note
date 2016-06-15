/**
 * 给定一串字符，寻找字符串中的最大无重复连续字符的子序列的长度
 *
 * 例子：给定"abcabcbb", 最长子序列"abc",返回长度为3。
 *
 * 分析：
 * 1. 初始定义结果字符串（结串）、临时字符串（临串）为空，长度为0。
 * 2. 从第一个字符开始比较，如果拼接字符在临串中不存在，将字符拼接到临串中
 * 3. 如果遇到拼接字符在临串中存在，因为需要的是连续字符串，因此直接将临串
 *    在重复位置后一位进行截断。
 * 4. 比较结串与临串的长度，如果结串小于临串，将临串的值赋到结串中。
 * 5. 结束返回结串长度
 */

/**
 * @param {string} s
 * @return {number}
 */
var log = console.log;
var assert = console.assert;
var dir = console.dir;
var lengthOfLongestSubstring = function(s) {
    var relSubStr = '',
    	tempSubStr = '';

    var chr, chrIndex;

    for (var i = 0, l = s.length; i < l; i++) {
    	chr = s[i];
    	chrIndex = tempSubStr.indexOf(chr);
    	if (chrIndex != -1) {
    		tempSubStr = tempSubStr.slice(chrIndex + 1);
    	}
    	tempSubStr += chr;

    	if (relSubStr.length < tempSubStr.length)
    		relSubStr = tempSubStr;
    }
    return relSubStr.length;
    // return relSubStr;
};

/**
 * test string array
 * first is test data, second is result
 */
var testStrArr = [
	['abcabcbb', 'abc'],
	['bbbbb', 'b'],
	['pwwkew', 'wke']
]

testStrArr.forEach(function (strArr, index) {
	assert(
		lengthOfLongestSubstring(strArr[0]) === strArr[1],
		'wrong sub string: ' + lengthOfLongestSubstring(strArr[0]) + '---->' + strArr[1]
	);
});