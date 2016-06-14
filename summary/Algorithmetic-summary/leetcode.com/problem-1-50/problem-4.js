/**
 * 题目：有两组已经排好序的数字数组，长度分别为m与n，找到
 * 两组数中的中间数，算法的时间复杂度应为O(log(m + n))
 * 
 * 例子：
 * m = [1,2,3,4]
 * n = [1,5,6,7]
 * 结果：3.50000
 * 
 * m = [1,2,3,4]
 * n = [5,6,7]
 * 结果：4
 *
 * 分析：
 * 1. 两组数的长度分别为m、n，中间数的开始位置为Math.floor(m+n)
 * 2. 若为寄数则直接采用，若为偶数则多取后一位数
 * 3. 得出取值位置，就需要对数组进行整合，由题目信息可知数组已排序，
 *    同时仅需要到取值位置以及可能需要的后一位的数字，其后的数据可以
 *    免除整合。
 */

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var log = console.log;
var assert = console.assert;
var dir = console.dir;
var findMedianSortedArrays = function(nums1, nums2) {
	var nums1Len = nums1.length, nums2Len = nums2.length;
	var sumLen = nums1Len + nums2Len;

	if (sumLen < 2)
		return nums1[0] || nums2[0];

    var midIndex = Math.floor(sumLen / 2);
    var isEven = sumLen % 2 === 0;

    var tempArr = [];
    var nums1Index = 0, nums2Index = 0;

    for (var i = 0; i < midIndex + 1; i++) {
    	if (!Number.isInteger(nums1[nums1Index])) {
    		tempArr = tempArr.concat(nums2.slice(nums2Index));
    		break;
    	}
    	if (!Number.isInteger(nums2[nums2Index])) {
    		tempArr = tempArr.concat(nums1.slice(nums1Index));
    		break;
    	}
    	if (nums1[nums1Index] < nums2[nums2Index]) {
    		tempArr.push(nums1[nums1Index]);
    		nums1Index++;
    	} else {
    		tempArr.push(nums2[nums2Index]);
    		nums2Index++;
    	}
    }

    if (isEven) {
    	var num1 = tempArr[midIndex - 1], num2 = tempArr[midIndex];
    	// return ((num1 + num2) / 2).toFixed(5);
    	return ((num1 + num2) / 2);
    } else {
    	// return (tempArr.pop()).toFixed(5);
    	return (tempArr[midIndex]);
    }
};

var findMedianSortedArrays2 = function (nums1, nums2) {
	var sumLen = nums1.length + nums2.length;
	var midIndex = sumLen / 2;
	midIndex = Math.floor(midIndex);

	if (sumLen < 2) {
		return nums1[0] || nums2[0];
	}

	var tempArr = [].concat(nums1, nums2);
	tempArr.sort(function (x, y) {
		return x - y;
	});

	if (sumLen % 2 === 0) {
		return (tempArr[midIndex - 1] + tempArr[midIndex]) / 2;
	} else {
		return tempArr[midIndex];
	}
}

var testArr = [
	[[1,2,3,5], [1,5,6,7], 4.00000],
	[[1,2,3,5], [4,5,6,7], 4.50000],
	[[], [1], 1.00000],
	[[1], [], 1.00000],
	[[1], [0], 0.50000],
	[[1,2,3,5], [5,6,7], 5.00000]
]

log('Begin test');
testArr.forEach(function (ta, index) {
	var nums1 = ta.shift();
	var nums2 = ta.shift();
	var rel = ta.shift();

	assert(
		findMedianSortedArrays2(nums1, nums2) === rel,
		'wrong result: ' + findMedianSortedArrays2(nums1, nums2) +
		'; except result is: ' + rel +
		'; in arr: ' + nums1 + ' : ' + nums2
	);
});