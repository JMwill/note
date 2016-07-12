var fs          = require('fs');
var base        = require('../commons/base.js');
var tmpl        = fs.readFileSync(
    __dirname + '/templates/sample.mu', 'utf8'
);

module.exports = base.extend({
    el: '.view',
    template: tmpl
});
