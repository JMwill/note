/**
 * create a random Integer between in max - min;
 * @param  {Number} min=0 the lowest Number
 * @param  {Number} max=2 the max Number
 * @return {Number}       the result
 */
function randomInt(min = 0, max = 1) {
    const range = max - min;
    return Math.floor(Math.random() * range) + min;
}

export {
    randomInt
};
