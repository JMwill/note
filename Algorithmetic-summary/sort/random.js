const random = Math.random;
const floor = Math.floor;

module.exports = {
    /**
     * 随机选择序列对象里面的内容
     *
     * @param {Sequence} seq
     * @return {Any} 序列对象里面的值, 无限制
     */
    choice: function choice(seq) {
        let keys = Object.keys(seq);
        if (keys.length <= 0) throw new RangeError(keys.length + ' out of range!');
        return seq[keys[floor(random() * keys.length)]];
    },

    /**
     * 返回区间[start, end) 内的整数
     *
     * @param {Number} start
     * @param {Number} end
     * @return {Any} 序列对象里面的值, 无限制
     */
    range: function range(start, end) {
        if (isNaN(Number(start)) || isNaN(Number(end))) throw new TypeError(start + ' or/and ' + end + ' is a Number');
        return floor(random() * (end - start) + start);
    },

    /**
     * 返回区间 [start, end] 内的整数
     *
     * @param {Sequence} seq
     * @return {Any} 序列对象里面的值, 无限制
     */
    int: function int(start, end) {
        return this.range(start, end + 1);
    },
};
