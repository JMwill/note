const utils = require('../utils');

/**
 * 按照约定步长比较的希尔排序
 *
 * @param {Sequence} seq 待排序序列
 * @param {Number} step 排序步长
 * @returns {Sequenct} 原序列
 */
module.exports = function insertSort(seq, step = 1) {
    let cmpIndex,
        cmpCount = 1,
        curIndex = step,
        seqLen = seq.length;
    while (seqLen > curIndex) {

        cmpIndex = curIndex - step;
        // 未到达第 0 个位置时, 都一直执行计算
        while (cmpIndex >= 0) {
            if (seq[curIndex] > seq[cmpIndex]) {
                utils.exchange(seq, curIndex, cmpIndex);

                curIndex = cmpIndex;

                // 比较的位置 = 当前位置 - 步长
                cmpIndex = curIndex - step;
            } else {
                break;
            }
        }
        cmpCount += 1;
        curIndex = cmpCount * step;
    }

    return seq;
};

