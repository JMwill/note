const utils = require('../utils');

/**
 * 构建大顶堆
 *
 * @param {Sequence} seq 需要构建的序列
 * @return {Sequence} 构建后的序列
 */
function buildDecHeap(seq) {
    for (let i = Math.floor(seq.length / 2); i >= 0; i--) {
        heapify(seq, i)
    }
    return seq;
}

/**
 * 进行堆调整
 *
 * @param {Sequence} seq 需要调整的序列
 * @param {any} i 调整的起始位置
 */
function heapify(seq, i) {
    let left = 2 * i + 1,
        right = 2 * i + 2,
        largest = i,
        len = seq.length;
    if (left < len && seq[left] > seq[largest]) {
        largest = left;
    }
    if (right < len && seq[right] > seq[largest]) {
        largest = right;
    }
    if (largest != i) {
        utils.exchange(seq, i, largest);
        heapify(seq, largest);
    }
}

module.exports = function heapSort(seq) {
    let sortedSeq = [];
    seq = buildDecHeap(seq.slice());
    for (let i = seq.length - 1; i > 0; i--) {
        utils.exchange(seq, 0, i);
        sortedSeq.push(seq.pop());
        heapify(seq, 0);
    }
    return sortedSeq;
};
