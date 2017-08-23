/**
 * 给定非负整数 a1, a2, ... an, 每个对应的坐标点 (i, ai). n 条垂直线画在点 (i, ai) 以及点 (i, 0) 上
 * 找到两个线, 它们与 x 轴一起形成一个容器, 找到让这个容器能容纳最多水的两条线. n 最少为 2.
 */

/**
 * 计算对应的容积
 *
 * @param {number} h1 高度1
 * @param {number} h2 高度2
 * @param {number} x1 x 轴位置1
 * @param {number} x2 x 轴位置2
 */
function calArea(h1, h2, x1, x2) {
    let align = Math.abs(x1 - x2);
    return Math.min(h1, h2) * align;
}
/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function(height) {
    // 最终面积: abs(i2 - i1) * min(a1, a2) + abs(i2 - i1) * abs(a2 - a1) / 2
    // 也就是 i2, i1 之间的差距越大越好, a2, a1 之间的差距越小越好
    let area = 0;
    let leftIndex = 0;
    let rightIndex = height.length - 1;
    while (leftIndex < rightIndex) {
        area = Math.max(area, calArea(height[leftIndex], height[rightIndex], leftIndex, rightIndex));
        if (height[leftIndex] < height[rightIndex]) {
            leftIndex += 1;
        } else {
            rightIndex -= 1;
        }
    }
    return area;
};

