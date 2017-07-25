var Backbone            = require('backbone');
var binary              = require('../commons/binary');

module.exports = Backbone.Model.extend({
    getBinary: function () {
        var raw = this.get('raw');
        var bin = binary.formString(raw);

        if (bin.length > 20) {
            return bin.substr(0, 20) + '\u2026';
        }
        return bin;
    },
    isLink: function () {
        var link = /^https?:\/\/.+/i;
        var raw = this.get('raw');
        return link.test(raw);
    }
});
