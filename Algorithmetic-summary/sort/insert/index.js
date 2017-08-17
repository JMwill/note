const utils = require('../utils');

module.exports = function insertSort(seq) {
    let temp,
        cmpIndex,
        i,
        j;
    for (i = 1, il = seq.length; i < il; i++) {
        temp = seq[i];
        cmpIndex = i;
        for (j = i - 1; j >= 0; j--) {
            if (seq[j] > temp) {
                seq[cmpIndex] = seq[j];
                cmpIndex -= 1;
            } else {
                break;
            }
        }
        seq[cmpIndex] = temp;
    }
    return seq;
};
