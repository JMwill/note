var msg = $('.msg');
(function($) {
    function getTranslateVal(obj) {
        var $obj = $(obj);
        var tsfMatrix =
            $obj.css('-webkit-transform') ||
            $obj.css('-moz-transform') ||
            $obj.css('-o-transform') ||
            $obj.css('transform');
        var splitVal = tsfMatrix.replace(/[^\d\-.,]/g, '').split(',');
        return {
            x: splitVal[12] || splitVal[4] || 0,
            y: splitVal[13] || splitVal[5] || 0
        };
    }

    function Pinchable(opt) {
        if (!(this instanceof Pinchable)) {
            return new Pinchable(opt);
        }

        var self = this;
        this.cnt = $(opt.cnt);
        this.hamCnt = this.cnt.hammer();
        this.target = this.cnt.find(opt.target);
        this.maxScale = opt.maxScale || 5;
        this.minScale = opt.minScale || 1;
        var targetRealRect = this.target.get(0).getBoundingClientRect();
        this.pinchData = {
            tarNoScaleWidth: this.target.width(),
            tarNoScaleHeight: this.target.height(),
            maxDeltaX: 0,
            maxDeltaY: 0,
            lastWidth: targetRealRect.width,
            lastHeight: targetRealRect.height,
            lastScale: 1,
            lastPos: getTranslateVal(this.target)
        };
        this.oldStyle = {
            target: this.target.attr('style'),
            cnt: this.cnt.attr('style'),
            pinchData: JSON.stringify(this.pinchData)
        };
    }

    Pinchable.prototype.revert = function() {
        this.target.removeAttr('style');
        this.target.attr('style', this.oldStyle.target);

        this.cnt.removeAttr('style');
        this.cnt.attr('style', this.oldStyle.cnt);

        this.pinchData = JSON.parse(this.oldStyle.pinchData);
    };

    Pinchable.prototype.init = function() {
        var self = this;
        self.initState();
        self.cnt
            .data('hammer')
            .get('pinch')
            .set({enable: true});
        self.cnt.on('pinch', function(e) {
            self.handlePinch(e);
        });

        self.cnt.on('pinchend', function(e) {
            self.handlePinchEnd(e);
        });

        self.cnt.on('pan', function(e) {
            self.handlePan(e);
        });

        self.cnt.on('panend', function(e) {
            self.handlePanEnd(e);
        });

        self.cnt.on('press', function(e) {
            self.revert();
        });
    };

    Pinchable.prototype.initState = function() {
        var pos = this.pinchData.lastPos;
        this.target.css({
            transform: 'translate(' + pos.x + 'px, ' + pos.y + 'px)'
        });
    };

    Pinchable.prototype.handlePinchEnd = function(e) {
        var oldWidth = this.pinchData.lastWidth;
        var newWidth = this.target.get(0).getBoundingClientRect().width;
        this.pinchData.lastScale = newWidth / oldWidth;

        var targetRealRect = this.target.get(0).getBoundingClientRect();
        this.pinchData.maxDeltaX = (targetRealRect.width - this.pinchData.lastWidth) / 2;
        this.pinchData.maxDeltaY = (targetRealRect.height - this.pinchData.lastHeight) / 2;
        if (this.pinchData.maxDeltaX < 0) {
            this.pinchData.maxDeltaX = 0;
        }
        if (this.pinchData.maxDeltaY < 0) {
            this.pinchData.maxDeltaY = 0;
        }
        msg.text(this.pinchData.maxDeltaY + ';' + targetRealRect.height + ';' + this.pinchData.cntHeight);
    };

    Pinchable.prototype.handlePinch = function(e) {
        var scale = this.pinchData.lastScale;
        var extraScale = 1 - e.gesture.scale;
        var target = this.target;
        var finalScale = scale - extraScale;
        var lastPos = this.pinchData.lastPos;
        var transformVal = 'translate(' +
                                lastPos.x + 'px,' +
                                lastPos.y + 'px' +
                            ') ' +
                            'scale(' + finalScale + ')';

        if (finalScale >= this.minScale && finalScale <= this.maxScale) {
            this.target.css({
                '-webkit-transform' : transformVal,
                '-moz-transform'    : transformVal,
                '-ms-transform'     : transformVal,
                '-o-transform'      : transformVal,
                'transform'         : transformVal
            });
        }
    };

    Pinchable.prototype.handlePanEnd = function(e) {
        var data = this.pinchData;
        var lastPos = this.pinchData.lastPos;
        var deltaY = lastPos.y + e.gesture.deltaY;
        var deltaX = lastPos.x + e.gesture.deltaX;

        if (deltaX > data.maxDeltaX) {
            deltaX = data.maxDeltaX;
        }
        if (deltaX < -data.maxDeltaX) {
            deltaX = -data.maxDeltaX;
        }
        if (deltaY > data.maxDeltaY) {
            deltaY = data.maxDeltaY;
        }
        if (deltaY < -data.maxDeltaY) {
            deltaY = -data.maxDeltaY;
        }

        this.pinchData.lastPos = {
            x: deltaX,
            y: deltaY
        }
    }

    Pinchable.prototype.handlePan = function(e) {
        var data = this.pinchData;
        var lastPos = this.pinchData.lastPos;
        var deltaY = lastPos.y + e.gesture.deltaY;
        var deltaX = lastPos.x + e.gesture.deltaX;

        if (deltaX > data.maxDeltaX) {
            deltaX = data.maxDeltaX;
        }
        if (deltaX < -data.maxDeltaX) {
            deltaX = -data.maxDeltaX;
        }
        if (deltaY > data.maxDeltaY) {
            deltaY = data.maxDeltaY;
        }
        if (deltaY < -data.maxDeltaY) {
            deltaY = -data.maxDeltaY;
        }
        msg.text('deltaY:' + deltaY + '; ' + data.maxDeltaY + 'deltaX:' + deltaX + '; ' + data.maxDeltaX);
        var transformVal = 'translate(' +
                                deltaX + 'px,' +
                                deltaY + 'px' +
                            ') ' +
                            'scale(' + data.lastScale + ')';
        this.target.css({
            '-webkit-transform' : transformVal,
            '-moz-transform'    : transformVal,
            '-ms-transform'     : transformVal,
            '-o-transform'      : transformVal,
            'transform'         : transformVal
        });
    };

    var old = $.Pinchable;

    $.Pinchable = Pinchable;

    $.Pinchable.noConflict = function() {
        $.Pinchable = old;
        return this;
    };
})(jQuery);

var test = $('.test');
var pTest = $.Pinchable({
  cnt: test,
  target: 'img',
  minScale: 1,
  maxScale: 5
});

pTest.init();
