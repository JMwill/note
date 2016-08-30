(function($) {
    function Pinchable(opt) {
        // if (!(this instanceof Pinchable)) {
        //     return new Pinchable(opt);
        // }
        //
        var self = this;
        this.cnt = $(this);
        this.hamCnt = this.cnt.hammer();
        this.target = self.find(opt.target);
        this.maxScale = opt.maxScale;
        this.minScale = opt.minScale;
        this.pinchData = {
            width: self.target.get(0).getBoundingClientRect().width,
            height: self.target.get(0).getBoundingClientRect().height,
            lastScale: 1,
            lastPos: {
                top: self.target.position().top,
                left: self.target.position().left
            }
        };
    }

    Pinchable.prototype.revert = function() {
        var self = this;
        this.target.removeAttr('style');
        this.cnt.removeAttr('style');
        this.pinchData = {
            width: self.target.get(0).getBoundingClientRect().width,
            height: self.target.get(0).getBoundingClientRect().height,
            lastScale: 1,
            lastPos: {
                top: self.target.position().top,
                left: self.target.position().left
            }
        };
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
        var pos = this.target.position();
        this.target.css({
            position: 'absolute',
            top: pos.top,
            left: pos.left
        });

        this.cnt.css({
            position: 'relative'
        });
    };

    Pinchable.prototype.handlePinchEnd = function(e) {
        var target = this.target;
        var oldWidth = this.pinchData.width;
        var newWidth = this.target.get(0).getBoundingClientRect().width;

        this.pinchData.lastScale = newWidth / oldWidth;
    };

    Pinchable.prototype.handlePinch = function(e) {
        var scale = this.pinchData.lastScale;
        var extraScale = 1 - e.gesture.scale;
        var target = this.target;
        var finalScale = scale - extraScale;

        if (finalScale >= this.minScale && finalScale <= this.maxScale) {
            this.target.css({
                transform: 'scale(' + finalScale + ',' + finalScale + ')'
            });
        }
    };

    Pinchable.prototype.handlePanEnd = function(e) {
        var target = this.target;
        var lastPos = this.pinchData.lastPos;
        var deltaTop = lastPos.top + e.gesture.deltaY;
        var deltaLeft = lastPos.left + e.gesture.deltaX;
        lastPos.top = lastPos.top + e.gesture.deltaY;
        lastPos.left = lastPos.left + e.gesture.deltaX;
    }

    Pinchable.prototype.handlePan = function(e) {
        var target = this.target;
        var lastPos = this.pinchData.lastPos;
        var deltaTop = lastPos.top + e.gesture.deltaY;
        var deltaLeft = lastPos.left + e.gesture.deltaX;

        target.css({
            top: deltaTop + 'px',
            left: deltaLeft + 'px'
        });
    };

    var old = $.fn.Pinchable;

    $.fn.Pinchable = Pinchable;

    $.fn.Pinchable.noConflict = function() {
        $.fn.Pinchable = old;
        return this;
    }
})(jQuery);
