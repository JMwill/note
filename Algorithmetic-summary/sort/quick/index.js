const utils = require('../utils');

module.exports = function quickSort(seq) {
    if (seq.length < 2) { return seq; }
    if (seq.length === 2) {
        if (seq[0] < seq[1]) {
            return [seq[1], seq[0]];
        } else {
            return seq;
        }
    }

    // 找到中间的数
    let middleIndex = Math.floor(seq.length / 2);

    // 将序列拆分成三份
    let leftSeq = seq.slice(0, middleIndex - 1);
    let middleSeq = seq.slice(middleIndex - 1, middleIndex);
    let rightSeq = seq.slice(middleIndex);

    let tempLeftSeq = [];
    let tempRightSeq = [];
    for (let i = 0, il = leftSeq.length; i < il; i++) {
        if (leftSeq[i] > middleSeq[0]) {
            tempLeftSeq.push(leftSeq[i]);
        } else {
            tempRightSeq.push(leftSeq[i]);
        }
    }

    for (let j = 0, jl = rightSeq.length; j < jl; j++) {
        if (rightSeq[j] > middleSeq[0]) {
            tempLeftSeq.push(rightSeq[j]);
        } else {
            tempRightSeq.push(rightSeq[j]);
        }
    }

    return quickSort(tempLeftSeq).concat(middleSeq, quickSort(tempRightSeq));

}
