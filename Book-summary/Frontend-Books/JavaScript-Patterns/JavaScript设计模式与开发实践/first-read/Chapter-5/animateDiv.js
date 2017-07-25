var tween = {
    linear: function (usedTime, startPos, targetPos, duration) {
        return targetPos * usedTime / duration + startPos;
    },
    easeIn: function (usedTime, startPos, targetPos, duration) {
        return targetPos * (usedTime /= duration) * usedTime + startPos;
    },
    strongEaseIn: function (usedTime, startPos, targetPos, duration) {
        return targetPos * (usedTime /= duration) * usedTime * usedTime * usedTime * usedTime + startPos;
    },
    strongEaseOut: function (usedTime, startPos, targetPos, duration) {
        return targetPos * ((usedTime = usedTime / duration - 1) * usedTime * usedTime * usedTime * usedTime + 1) + startPos;
    },
    sineaseIn: function (usedTime, startPos, targetPos, duration) {
        return targetPos * (usedTime /= duration) * usedTime * usedTime + startPos;
    },
    sineaseOut: function (usedTime, startPos, targetPos, duration) {
        return targetPos * ((usedTime = usedTime / duration - 1) * usedTime * usedTime + 1) + startPos;
    }
};

var Animate = function(dom) {
    this.dom = dom;
    this.startTime = 0;
    this.startPos = 0;
    this.endPos = 0;
    this.propertyName = null;
    this.easing = null;
    this.duration = null;
};

Animate.prototype.start = function(propertyName, endPos, duration, easing) {
    this.startTime = +new Date;
    this.startPos = this.dom.getBoundingClientRect()[propertyName];
    this.propertyName = propertyName;
    this.endPos = endPos;
    this.duration = duration;
    this.easing = tween[easing];

    var self = this;
    var timeId = setInterval(function () {
        if (self.step() === false) {
            clearInterval(timeId);
        }
    }, 19);
};


Animate.prototype.step = function() {
    var t = +new Date;
    if (t >= this.duration + this.startTime) {
        this.update(this.endPos);
        return false;
    }
    var pos = this.easing(
        t - this.startTime,
        this.startPos,
        this.endPos - this.startPos,
        this.duration
    );
    this.update(pos);
};

Animate.prototype.update = function(pos) {
    this.dom.style[this.propertyName] = pos + 'px';
};

var div = document.getElementById('');
var animate = new Animate(div);

animate.start('left', 500, 1000, 'linear');
// animate.start('top', 500, 1000, 'strongEaseIn');
