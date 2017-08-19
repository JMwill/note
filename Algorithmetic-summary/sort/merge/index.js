const utils = require('../utils');

function merge(seq1, seq2) {
    seq1 = [].concat(seq1);
    seq2 = seq2 !== undefined ? [].concat(seq2): [];

    let s1 = 0,
        s2 = 0,
        sortedArr = [];
    while (seq1.length > 0 && seq2.length > 0) {
        if (seq1[0] < seq2[0]) {
            sortedArr.push(seq2.shift());
        } else {
            sortedArr.push(seq1.shift());
        }
    }
    if (seq1.length) {
        sortedArr = sortedArr.concat(seq1);
    }
    if (seq2.length) {
        sortedArr = sortedArr.concat(seq2);
    }
    return sortedArr;
}

module.exports = function mergeSort(seq) {
    const step = 2;

    let formatedSeq = seq;
    while (formatedSeq.length > 1) {
        let tempSeq = formatedSeq;
        formatedSeq = [];
        for (let i = 0, il = tempSeq.length; i < il; i += step) {
            formatedSeq.push(merge(tempSeq[i], tempSeq[i + 1]));
        }
    }

    return formatedSeq[0];
};
