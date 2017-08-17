const utils = require('../utils');

module.exports = function bubbleSort(seq) {
    let i,
        j;
    for (i = 0, il = seq.length - 1; i < il; i++) {
        for (j = i + 1, jl = seq.length; j < jl; j++) {
            if (seq[i] < seq[j]) {
                utils.exchange(seq, i, j);
            }
        }
    }
    return seq;
};
