const utils = require('../utils');

// module.exports = function quickSort(seq) {
//     if (seq.length < 2) { return seq; }
//     if (seq.length === 2) {
//         return seq[0] > seq[1] ? seq : [seq[1], seq[0]];
//     }

//     // 直接使用第一个作为基准
//     let cmpVal = seq[0];
//     let cmpSeq = seq.slice(1);

//     let leftSeq = [];
//     let rightSeq = [];

//     for (let i = 0, il = cmpSeq.length; i < il; i++) {
//         (cmpVal < cmpSeq[i]) ? leftSeq.push(cmpSeq[i]) : rightSeq.push(cmpSeq[i]);
//     }

//     return quickSort(leftSeq).concat(cmpVal, quickSort(rightSeq));
// }

module.exports = function quickSort(seq, left, right) {
    // 如果左边等于右边, 不用执行下面的程序
    if (left >= right) { return; }
    left = (typeof left) === 'number' ? left : 0;
    right = (typeof right) === 'number' ? right : seq.length - 1;
    let tmpLeft = left,
        tmpRight = right,
        cmpIndex = Math.floor((tmpLeft + tmpRight) / 2);

    while (tmpLeft < tmpRight) {
        while (tmpLeft < cmpIndex && seq[tmpLeft] >= seq[cmpIndex]) {
            tmpLeft += 1;
        }
        if (seq[tmpLeft] < seq[cmpIndex]) {
            utils.exchange(seq, tmpLeft, cmpIndex);
            cmpIndex = tmpLeft;
        }
        while (tmpRight > cmpIndex && seq[tmpRight] <= seq[cmpIndex]) {
            tmpRight -= 1;
        }
        if (seq[tmpRight] > seq[cmpIndex]) {
            utils.exchange(seq, tmpRight, cmpIndex);
            cmpIndex = tmpRight;
        }
    }
    quickSort(seq, left, cmpIndex - 1);
    quickSort(seq, cmpIndex + 1, right);
    return seq;
}
