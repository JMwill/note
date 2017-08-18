const insertSort = require('../insert');

/**
 * 计算希尔函数步长的函数一
 *
 * @param {Number} i 因子
 * @returns {Number}
 */
function execStepOneEquation(i) {
    return 9 * Math.pow(4, i) - 9 * Math.pow(2, i) + 1;
}

/**
 * 计算希尔函数步长的函数二
 *
 * @param {Number} i 因子
 * @returns {Number}
 */
function execStepTwoEquation(i) {
    return Math.pow(2, i + 2) * (Math.pow(2, i + 2) - 3) + 1;
}

/**
 * 计算某个长度序列的希尔排序的最优步长
 *
 * @param {Number} seqLen 序列长度
 * @returns {Number[]} 计算得到的最优步长
 */
function calBestSteps(seqLen) {
    let factor = 0,
        stepArr = [],
        nextStep = execStepOneEquation(factor);
    if (seqLen > nextStep) { stepArr.push(nextStep); }

    while (stepArr[stepArr.length - 1] < seqLen) {
        nextStep = execStepTwoEquation(factor);
        if (seqLen > nextStep) { stepArr.push(nextStep); }
        else { break; }

        factor += 1;

        nextStep = execStepOneEquation(factor);
        if (seqLen > nextStep) { stepArr.push(nextStep); }
        else { break; }
    }
    return stepArr;
}

module.exports = function shell(seq) {
    const bestSteps = calBestSteps(seq.length);
    while (bestSteps.length) {
        insertSort(seq, bestSteps.pop());
    }
    return seq;
};
