var fs          = require('fs');
var base        = require('../commons/base.js');
var tmpl        = fs.readFileSync(
    __dirname + '/templates/sample.mu', 'utf8'
);
var SampleModel = require('../models/sample.js');

module.exports = base.extend({
    el: '.view',
    template: tmpl,
    initialize: function () {
        this.model = new SampleModel();
        this.model.on('change', this.updateView, this);
        this.model.set('raw', 'https://jmwill.github.io');
    },
    updateView: function () {
        this.viewModel = {
            raw: this.model.get('raw'),
            binary: this.model.getBinary(),
            isLink: this.model.isLink()
        },
        this.render();
    },
    events: {
        'change .input': 'inputChanged'
    },
    inputChanged: function (e) {
        this.model.set('raw', e.target.value);
    }
});
