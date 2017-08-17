module.exports = {
    /**
     * 交换序列中的两个数, 并返回第一个引用的值
     *
     * @param {Sequenct} seq 序列
     * @param {String|Number} refer1 第一个值的索引
     * @param {String|Number} refer2 第二个值的索引
     * @return {Any} 第一个索引所引用的值
     */
    exchange: function exchange(seq, refer1, refer2) {
        let temp = seq[refer1];
        seq[refer1] = seq[refer2];
        seq[refer2] = temp;
        return temp;
    },
};
