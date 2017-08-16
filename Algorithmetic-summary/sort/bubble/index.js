module.exports = function bubbleSort(seq) {
    let bigest,
        i,
        j;
    for (i = 0, il = seq.length - 1; i < il; i++) {
        bigest = seq[i];
        for (j = i + 1, jl = seq.length; j < jl; j++) {
            if (bigest < seq[j]) {
                seq[i] = seq[j];
                seq[j] = bigest;
                bigest = seq[i];
            }
        }
    }
    return seq;
};
