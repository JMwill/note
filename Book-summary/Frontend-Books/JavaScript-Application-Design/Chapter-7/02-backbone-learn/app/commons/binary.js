function padded (value, size, pad) {
    var padding = new Array(size - value.length + 1).join(pad);
    return padding + value;
}

module.exports = {
    formString: function (input) {
        var binary = '';
        var charCode;
        for (var i = 0, l = input.length; i < l; i++) {
            charCode = input.charCodeAt(i).toString(2);
            binary += padded(charCode, 8, 0);
        }
        return binary;
    }
};
