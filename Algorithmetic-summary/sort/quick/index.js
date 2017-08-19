const utils = require('../utils');

module.exports = function quickSort(seq) {
    if (seq.length < 2) { return seq; }
    if (seq.length === 2) {
        return seq[0] > seq[1] ? seq : [seq[1], seq[0]];
    }

    // 直接使用第一个作为基准
    let cmpVal = seq[0];
    let cmpSeq = seq.slice(1);

    let leftSeq = [];
    let rightSeq = [];

    for (let i = 0, il = cmpSeq.length; i < il; i++) {
        (cmpVal < cmpSeq[i]) ? leftSeq.push(cmpSeq[i]) : rightSeq.push(cmpSeq[i]);
    }

    return quickSort(leftSeq).concat(cmpVal, quickSort(rightSeq));
}
