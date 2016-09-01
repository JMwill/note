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

    function calNewPos(e, lastPos, maxPos) {
        var newPos = {
            x: lastPos.x + e.gesture.deltaX,
            y: lastPos.y + e.gesture.deltaY
        };
        if (newPos.x > maxPos.x) {
            newPos.x = maxPos.x;
        }
        if (newPos.x < -maxPos.x) {
            newPos.x = -maxPos.x;
        }
        if (newPos.y > maxPos.y) {
            newPos.y = maxPos.y;
        }
        if (newPos.y < -maxPos.y) {
            newPos.y = -maxPos.y;
        }
        return newPos;
    }

    function Pinchable(opt) {
        if (!(this instanceof Pinchable)) {
            return new Pinchable(opt);
        }

        var self = this;
        this.cnt = $(opt.cnt);
        this.hamCnt = this.cnt.hammer();
        this.target = this.cnt.find(opt.target);
        this.maxScale = opt.maxScale || 2;
        this.minScale = opt.minScale || 1;
        var targetRealRect = this.target.get(0).getBoundingClientRect();
        this.pinchData = {
            cntWidth: self.cnt.width(),
            cntHeight: self.cnt.height(),
            tarMaxDeltaX: 0,
            tarMaxDeltaY: 0,
            lastWidth: targetRealRect.width,
            lastHeight: targetRealRect.height,
            lastScale: 1,
            lastPos: getTranslateVal(self.target)
        };
        this.oldStyle = {
            target: this.target.attr('style'),
            cnt: this.cnt.attr('style'),
            pinchData: JSON.stringify(this.pinchData)
        };
    }

    Pinchable.prototype.updateTransform = function(data) {
        var transformVal = 'translate3d(' +
                                data.translate.x + 'px,' +
                                data.translate.y + 'px,' +
                            '0px) ' +
                            'scale(' + data.scale + ')';
        this.target.css({
            '-webkit-transform' : transformVal,
            '-moz-transform'    : transformVal,
            '-ms-transform'     : transformVal,
            '-o-transform'      : transformVal,
            'transform'         : transformVal
        });
    };

    Pinchable.prototype.revert = function() {
        this.target.removeAttr('style');
        this.target.attr('style', this.oldStyle.target);

        this.cnt.removeAttr('style');
        this.cnt.attr('style', this.oldStyle.cnt);

        this.target.removeClass('transform-animate');
        this.pinchData = JSON.parse(this.oldStyle.pinchData);
        this.updateTransform({
            translate: {
                x: this.pinchData.lastPos.x,
                y: this.pinchData.lastPos.y
            },
            scale: this.pinchData.lastScale
        });
        this.cnt.removeClass('swiper-no-swiping');
    };

    Pinchable.prototype.init = function() {
        var self = this;
        self.cnt
            .data('hammer')
            .get('pinch')
            .set({enable: true});
        self.cnt
            .data('hammer')
            .get('pan')
            .set({direction: Hammer.DIRECTION_ALL});

        self.cnt.on('pinch', function(e) {
            self.handlePinch(e);
        });

        self.cnt.on('pinchend', function(e) {
            self.handlePinchEnd(e);
        });

        self.cnt.on('panmove', function(e) {
            self.handlePan(e);
        });

        self.cnt.on('panend', function(e) {
            self.handlePanEnd(e);
        });

        self.cnt.on('press', function(e) {
            self.revert();
        });

        self.cnt.on('hammer.input', function(e) {
            if (e.gesture.isFirst) {
                self.firstTouch(e);
            }
        });
    };

    Pinchable.prototype.firstTouch = function(e) {
        msg.text('firstTouch');
        this.target.removeClass('transform-animate');
        var data = this.pinchData;
        var lastPos = this.pinchData.lastPos;

        if (lastPos.x > 0) {
            if (lastPos.x >= data.tarMaxDeltaX ) {
                this.cnt.removeClass('swiper-no-swiping');
            } else {
                this.cnt.addClass('swiper-no-swiping');
            }
        }
        if (lastPos.x < 0) {
            if (lastPos.x <= -data.tarMaxDeltaX) {
                this.cnt.removeClass('swiper-no-swiping');
            } else {
                this.cnt.addClass('swiper-no-swiping');
            }
        }
    };

    Pinchable.prototype.handlePinchEnd = function(e) {
        var data = this.pinchData;

        // 更新可移动距离
        var targetRealRect = this.target.get(0).getBoundingClientRect();
        data.tarMaxDeltaX = (targetRealRect.width - data.cntWidth) / 2;
        data.tarMaxDeltaY = (targetRealRect.height - data.cntHeight) / 2;

        if (data.tarMaxDeltaX < 0) {
            data.tarMaxDeltaX = 0;
        }

        if (data.tarMaxDeltaY < 0) {
            data.tarMaxDeltaY = 0;
        }
        var lastPos = data.lastPos;
        var maxPos = {
            x: data.tarMaxDeltaX,
            y: data.tarMaxDeltaY
        };
        var newPos = calNewPos(e, lastPos, maxPos);
        data.lastPos = newPos;

        // 更新缩放比
        data.lastScale = data.lastScale + e.gesture.scale - 1;
        if (data.lastScale < this.minScale) {
            data.lastScale = this.minScale;
        }
        if (data.lastScale > this.maxScale) {
            data.lastScale = this.maxScale;
        }

        this.target.addClass('transform-animate');
        this.updateTransform({
            translate: {
                x: data.lastPos.x,
                y: data.lastPos.y
            },
            scale: data.lastScale
        });
    };

    Pinchable.prototype.handlePinch = function(e) {
        var data = this.pinchData;
        var newScale = data.lastScale + e.gesture.scale - 1;
        if (newScale > this.maxScale) {
            newScale = this.maxScale;
        }
        this.updateTransform({
            translate: {
                x: data.lastPos.x,
                y: data.lastPos.y
            },
            scale: newScale
        });
    };

    Pinchable.prototype.handlePanEnd = function(e) {
        var data = this.pinchData;
        var lastPos = this.pinchData.lastPos;
        var maxPos = {
            x: data.tarMaxDeltaX,
            y: data.tarMaxDeltaY
        };
        var newPos = calNewPos(e, lastPos, maxPos);

        data.lastPos = newPos;
        this.updateTransform({
            translate: newPos,
            scale: data.lastScale
        });
    };

    Pinchable.prototype.handlePan = function(e) {
        var data = this.pinchData;
        var lastPos = this.pinchData.lastPos;
        var maxPos = {
            x: data.tarMaxDeltaX,
            y: data.tarMaxDeltaY
        };
        var newPos = calNewPos(e, lastPos, maxPos);
        msg.text(JSON.stringify(newPos));
        if (newPos.x > 0) {
            if (newPos.x >= data.tarMaxDeltaX ) {
                this.cnt.removeClass('swiper-no-swiping');
            } else {
                this.cnt.addClass('swiper-no-swiping');
            }
        }
        if (newPos.x < 0) {
            if (newPos.x <= -data.tarMaxDeltaX) {
                this.cnt.removeClass('swiper-no-swiping');
            } else {
                this.cnt.addClass('swiper-no-swiping');
            }
        }

        this.updateTransform({
            translate: newPos,
            scale: data.lastScale
        });
    };

    var old = $.Pinchable;

    $.Pinchable = Pinchable;

    $.Pinchable.noConflict = function() {
        $.Pinchable = old;
        return this;
    };
})(jQuery);


var mySwiper = new Swiper ('.swiper-container', {
  // Optional parameters
  loop: true
})
var slides = $('.swiper-slide');
var slidesCntArr = [];
slides.each(function(i, elem) {
    var pinSlide = $.Pinchable({
        cnt: $(this),
        target: 'img'
    });
    pinSlide.init();
    slidesCntArr.push(pinSlide);
});
