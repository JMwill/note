const random = require('./random');

const CODE_A = 65;
const CODE_a = 97;
const ALPHABET_LEN = 26;
/**
 * 生成固定长度随机无意义 ascii 字母组合
 *
 * @param {Number} len
 * @return {String}
 */
function _randomWord(len) {
    let word = '';
    let isUpper = false;
    for (let i = 0; i < len; i++) {
        let code = random.int(0, 1) ? CODE_a : CODE_A;
        word += String.fromCharCode(random.range(code, code + ALPHABET_LEN));
    }
    return word;
}

module.exports = {
    /**
     * 返回对应数量的随机单词数组
     *
     * @param {Number} [len=100] 整数数量
     * @param {Number} [start=0] 最小值
     * @param {Number} [end=100] 最大值
     * @return {Number[]}
     */
    getRandomInts: function(len = 100, start = 0, end = 100) {
        let ints = [];
        for (let i = 0; i < len; i++) {
            ints.push(random.int(start, end));
        }
        return ints;
    },

    /**
     * 返回对应数量的随机单词数组
     *
     * @param {Number} [len=100] 单词数量
     * @param {Number} [wordLen=10] 单词长度
     * @return {String[]}
     */
    getRandomWords: function(len = 100, wordLen = 10) {
        let words = [];
        for (let i = 0; i < len; i++) {
            words.push(_randomWord(wordLen));
        }
        return words;
    },
};
