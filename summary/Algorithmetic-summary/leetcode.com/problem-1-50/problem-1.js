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

var testDataArr = [].push(() => {
	[]
})
var twoSum = function (nums, target) {
	nums = nums.filter((num, index) => {
		return num < target;
	});

	console.log(nums);
}

