/**
 * 给定一个字符串，找出其中最长的回文字串，可以假定字符串的
 * 最大长度为1000，且存在唯一的最长回文字串
 *
 * 思路：
 * 1. 首先将字符串的第一位字符赋值为初始最长回文字符串
 * 2. 定位中心点，情况有两种，单个字符作为中心点，或两
 *    个字符作为中心点，（两个字符的话必须是相同字符）
 * 3. 确定中心点后，向左右拓展，若不能拓展，则移动初始
 *    中心位置向后一位
 * 4. 判断是否为回文，若不是向后移动中心点，若是回文且
 *    比目前的最长回文长，则赋值
 *
 * 改进：
 * 按照上述的思路，需要对每一种情况进行枚举，复杂度过高
 * 其实，由于最长字串的长度是不断增长的，因此以一个字符
 * 为中心，向外扩展查找回文子串，这样就只需要枚举中心，
 *
 * 还有一种O(n)复杂度的算法是Manacher
 */

/**
 * @param {string} s
 * @return {string}
 */

var log = console.log;
var assert = console.assert;

var isPalindrome = function (s) {
	var revStr = (s.split('').reverse()).join('');
	return revStr === s;
};

var extendPalStr = function(s, extStr, start, end) {
	extStr = s[start] + extStr + s[end];
	if (s[start] && s[end] && s[start] === s[end]) {
		return extStr
	}
	return '';
}

// 全量枚举
var longestPalindrome = function(s) {
    var palStr = '';
    var tempS = '';
    var start = 0, end = 0;
	if (!s)
		return palStr;

	// odd char
	for (var i = 0, l = s.length; i < l; i++) {
		tempS = s[i];
		start = end = i;

		var extStr = tempS;
		while(extStr) {
			start--;
			end++;
			tempS = extStr;
			extStr = extendPalStr(s, extStr, start, end);
		}

		if (tempS.length > palStr.length) {
			palStr = tempS;
		}
	}

	// even char
	for (var i = 1, l = s.length; i < l; i++) {
		tempS = s[i - 1] + s[i];
		if (!isPalindrome(tempS)) {
			continue;
		}

		start = i - 1;
		end = i;

		var extStr = tempS;
		while(extStr) {
			start--;
			end++;
			tempS = extStr;
			extStr = extendPalStr(s, extStr, start, end);
		}
		if (tempS.length > palStr.length) {
			palStr = tempS;
		}
	}

	return palStr;
};

// 全量枚举
var longestPalindrome2 = function (s) {
    var palStr = s;
    var sLen = s.length;
	if (!s)
		return palStr;

	var tempLen = sLen;
	var index = 0;
	while (sLen > 1) {
		do {
			palStr = s.substr(index, sLen);
			if (palStr && isPalindrome(palStr)) {
				return palStr;
			}
			index++;
		} while (index + palStr.length < tempLen)
		sLen--;
	}
	return s[0];
}


// 枚举中心
var longestPalindrome3 = function (s) {
    var palStr = '';
    var sLen = s.length;
	if (!s)
		return palStr;

	var start, end, tempS;
	for (var i = 0; i < sLen; i++) {
		for (var j = 0; j < 2; j++) {
			start = i;
			end = i + (j % 2);
			while (s[start] && s[end] && s[start] === s[end]) {
				start--; end++;
			}
			tempS = s.slice(start + 1, end);
			if (tempS.length > palStr.length)
				palStr = tempS;
		}
	}

	return palStr;
}

// Manacher算法
// 1. 首先通过在字符串的每个字符的两边插入特殊符号，将字符串长度转化成奇数
// 2. 通过记录以每个字符为中心的最长回文子串向左或右的扩张程度得出最长回文子串长度
// 3. 通过长度与位置得出最长回文子串
// 
var manacherLongestPalindrome = function(s) {
	var tempS = '#' + s.split('').join('#') + '#';
	var tempLen = tempS.length;
	var RL = (function () {
		var a = [];
		for (var i = 0; i < tempLen; i++)
			a.push(0);
		return a;
	}());
	var maxRight = 0, pos = 0, maxLen = 0;

	for (var i = 0; i < tempLen; i++) {
		if (i < maxRight)
			RL[i] = Math.min(RL[2 * pos - i], maxRight - i)
		else
			RL[i] = 1;

		while (i - RL[i] >= 0 && i + RL[i] < tempLen && tempS[i - RL[i]] === tempS[i + RL[i]]) {
			RL[i] += 1;
		}
		if (RL[i] + i - 1 > maxRight) {
			maxRight = RL[i] + i - 1;
			pos = i
		}

		maxLen = Math.max(maxLen, RL[i]);
	}

	// slice palindrome string
	var midPos = RL.indexOf(maxLen),
		palLen = maxLen - 1;

	return tempS.substr(midPos - palLen, palLen * 2)
				.split('#')
				.join('');
}

// Test
var isPalindromeTest = function () {
	var testData = [
		['abcdefghijklm', false],
		['aaabaaa', true],
		['a', true],
		['bb', true],
		['', true]
	];

	testData.forEach(function (td, index) {
		assert(
			isPalindrome(td[0]) === td[1],
			'Wrong! Result should be: ' + td[1] +
			'Fact is: ' + isPalindrome(td[0])
		);
	});
};

var testData = [
	['abcdefghijklm', 'a'],
	['aaabaaa', 'aaabaaa'],
	['a', 'a'],
	['bb', 'bb'],
	['', ''],
	['abbaaaabbbaaa', 'aaabbbaaa'],
	// 耗时太久
	['abababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababa', 'abababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababa', 'abababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababa']
];
var longestPalindromeTest = function (testData, fun) {
	testData.forEach(function (td, index) {
		assert(
			fun(td[0]) === td[1],
			'Wrong! Result should be: ' + td[1] +
			' Fact is: ' + fun(td[0])
		);
	});
}

isPalindromeTest();
longestPalindromeTest(testData, manacherLongestPalindrome);
