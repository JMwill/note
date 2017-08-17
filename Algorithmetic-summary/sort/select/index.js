module.exports = function insertSort(seq) {
    let bigestIndex,
        temp,
        i,
        j;
    for (i = 0, il = seq.length; i < il; i++) {
        bigestIndex = i;
        for (j = i, jl = seq.length; j < jl; j++) {
            if (seq[bigestIndex] < seq[j]) {
                bigestIndex = j;
            }
        }
        temp = seq[i];
        seq[i] = seq[bigestIndex];
        seq[bigestIndex] = temp;
    }
    return seq;
};
