/**
 * 给定一个整数数组，返回一个地址数组包含两个数相加为指定值的数的位置。
 * 可以假定每个输入都有正确的输出
 *
 * 例子：
 * 给定 nums = [2, 7, 11, 15], target = 9,
 *
 * 因为 nums[0] + nums[1] = 2 + 7 = 9,
 * 返回 [0, 1]
 *
 * 思路分析：由题目可知
 * 1. 需要两个数相加，因此对于一个数就已经大于等于目标值的数可以直接忽略
 * 2. 开始进行逐个数匹配，同时对于已经进行匹配尝试，却没有答案的数据可以进行忽略。
 */

/*******************************************
 * tools function
 * @type {function}
 * 
 *******************************************/
var assert = console.assert;
var log = console.log;

var twoSum = function (nums, target) {
	for (var i = 0, l = nums.length; i < l; i++) {
		if (isNaN(nums[i]))
			continue;
		for (var j = i + 1; j < l; j++) {
			if (nums[i] + nums[j] === target)
				return [i, j];
			if (nums[i] === nums[j])
				nums[j] = NaN;
		}
	}
	return [];
}

var twoSum2 = function (nums, target) {
	for (var i = 0, l = nums.length; i < l; i++) {
		var minusNum = target - nums[i];
		var nextNumIndex = nums.indexOf(minusNum, i + 1);
		if (nextNumIndex != -1)
			return [i, nextNumIndex];
	}
	return [];
}

/**
 * Test data and the last is target
 * @type {Array}
 */
var testArr = [
	[1, 2, 3, 4, 5, 9],
	[0, 12, 3, 0, 0],
	[-1, 2, 1, 0]
];
testArr.forEach((numsArr, index) => {
	log('------------begin----------->');
	log(
		'Test Arr is: ' + numsArr +
		'\nIndex is: ' + index + 
		// '\nResult is: '+ twoSum(numsArr, numsArr.pop())
		'\nResult is: '+ twoSum2(numsArr, numsArr.pop())
	);
	log('---------------------------->');
})

