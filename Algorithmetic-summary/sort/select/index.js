const utils = require('../utils');

module.exports = function selectSort(seq) {
    let bigestIndex,
        i,
        j;
    for (i = 0, il = seq.length; i < il; i++) {
        bigestIndex = i;
        for (j = i, jl = seq.length; j < jl; j++) {
            if (seq[bigestIndex] < seq[j]) {
                bigestIndex = j;
            }
        }
        utils.exchange(seq, i, bigestIndex);
    }
    return seq;
};
