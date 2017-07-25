;(function($, AF, Trans) {
    'use strict';
    /**
     * ---------------------------------------------------------------------
     * Class Definition
     * ---------------------------------------------------------------------
     */
    var ImgViewer = function(element, options) {
        this.$element = $(element);
        this.$viewer = $(IMG_VIEWER_TEMPLATE);
        this.$viewerList = this.$viewer.find('.x-img-viewer__list');
        this.$viewerItems = this.$viewer.find('.x-img-viewer__item');
        this.$viewerImgs = this.$viewer.find('.x-img-viewer__img');

        this.options = options;
        this.$items = null;
        this.urlObjs = [];

        this._sliding = null;
        this._viewerLocked = null;
        this._pos = ['prev', 'cur', 'next'];
        this._curIndex = 0;
        this._beCoverElem = null;
        this._initScale = 1;

        this._beCoverElem = $('body').children().not('script');
        $('body').append(this.$viewer);

        return this;
    }

    ImgViewer.VERSION = '0.0.0';
    ImgViewer.NAME = 'imgViewer';
    ImgViewer.DEFAULTS = {
        loadingImgPath: '/assets/loading.gif',
        endImgPath: '/assets/loading.gif',
        transitionTime: 200,
        transitionType: 'ease-out',
    };

    /**
     * ---------------------------------------------------------------------
     * Global
     * ---------------------------------------------------------------------
     */
    var IMG_VIEWER_TEMPLATE =
        '<div class="x-img-viewer x-force-full-screen">'
            + '<p id="log"></p>'
            + '<ul class="x-img-viewer__list">'
                + '<li class="x-img-viewer__item">'
                    + '<div class="x-img-viewer__img-box">'
                        + '<img src="" alt="前一张图片" class="x-img-viewer__img">'
                    + '</div>'
                + '</li>'
                + '<li class="x-img-viewer__item">'
                    + '<div class="x-img-viewer__img-box">'
                        + '<img src="" alt="当前图片" class="x-img-viewer__img">'
                    + '</div>'
                + '</li>'
                + '<li class="x-img-viewer__item">'
                    + '<div class="x-img-viewer__img-box">'
                        + '<img src="" alt="后一张图片" class="x-img-viewer__img">'
                    + '</div>'
                + '</li>'
            + '</ul>'
        + '</div>';

    /**
     * ---------------------------------------------------------------------
     * Private Definition
     * ---------------------------------------------------------------------
     */
    // 判断事件的target对象是否是img标签
    function _doesTargetIs(target, comparer) {
        if ((typeof comparer) === 'string') {
            return target.nodeName.toUpperCase() === comparer.toUpperCase();
        } else {
            return target === comparer;
        }
    }

    // 在图片加载到之前都使用loading图片
    // imgObj的结构要是{src: "img src", loaded: "boolean"}
    function _loadImg (imgObj, $elem) {
        if (imgObj.loaded) { return; }
        var img = new Image();

        $elem.attr('src', ''); // 避免前一张图占位
        $elem.attr('src', '/assets/loading.gif');

        img.onload = function() {
            $elem.attr('src', imgObj.src);
            imgObj.loaded = true;
            img.onerror = img.onabort = img.oncancel = img.onload = null;
        }
        img.onerror = img.onabort = img.oncancel = function(evt) {
            console.log(evt.type);
            $elem.attr('src', '');
        }
        img.src = imgObj.src;
    }

    /**
     * 移动元素
     */
    function _move(target, pos) {
        target.translateX += pos.x;
        target.translateY += pos.y;
    }

    /**
     * ---------------------------------------------------------------------
     * API Definition
     * ---------------------------------------------------------------------
     */
    // 保存需要监听的图片对象
    ImgViewer.prototype._storeImgs = function() {
        this.$items = this.$element.find('.x-img-viewer__img');
        this.urlObjs = this.$items.map(function() {
            return {
                src: $(this).attr('src'),
                loaded: false
            };
        }).get();
    };

    // 提供需要从中获取链接的列表, 以及当前图片所在的下标 确保返回的列表在提供的列表的区间内
    ImgViewer.prototype._getCurImgList = function(index) {
        var list = this.urlObjs;
        var len = list.length;
        var endImgObj = {
            src: this.options.endImgPath,
            loaded: true
        };

        if (len === 0) { return []; }
        if (len === 1) { return [endImgObj, list[0], endImgObj]; }

        var resultList = [];
        if (index <= 0) {
            resultList.push(endImgObj);
            resultList = resultList.concat(list.slice(0, 2));
        } else if (index >= len - 1) {
            resultList = resultList.concat(list.slice(-2));
            resultList.push(endImgObj);
        } else {
            resultList = list.slice(index - 1, index + 2);
        }
        return resultList;
    }

    /**
     * 向图片元素填充图片
     */
    ImgViewer.prototype._fillImg = function (imgList, fillAll) {
        if (imgList.length < 3) { return; }
        var that = this;
        this.$viewerItems.each(function(i) {
            var $img = that.$viewerImgs.eq(i);
            var $this = $(this);
            var imgObjIndex = $this.hasClass('prev') ? 0 : $this.hasClass('cur') ? 1 : 2;
            var imgObj = imgList[imgObjIndex];

            if (!imgObj.loaded) {
                _loadImg(imgObj, $img);
            } else {
                if (imgObjIndex !== 1 || fillAll) {
                    $img.attr('src', imgObj.src);
                }
            }
        });
    }

    /**
     * 通过_getCurImgList以及_fillImg来添加图片
     */
    ImgViewer.prototype._updateImg = function (index, all) {
        this._fillImg(this._getCurImgList(index), all);
    };

    /**
     * 调整posList的元素位置, 用于向左切换
     */
    ImgViewer.prototype._posListForward = function() {
        var pos = this._pos;
        pos.unshift(pos.pop());
    };

    /**
     * 调整向左滑动时, indexLog的值
     */
    ImgViewer.prototype._curIndexForward = function() {
        this._curIndex += 1;
    };

    /**
     * 综合向左切换的步骤
     */
    ImgViewer.prototype.moveForward = function() {
        if (this._curIndex < this.urlObjs.length - 1) {
            this._posListForward();
            this._curIndexForward();
            this._resetImg();
        } else {
            this.restoreViewer();
        }
    };

    /**
     * 调整posList的元素位置, 用于向右切换
     */
    ImgViewer.prototype._posListBackward = function() {
        var pos = this._pos;
        pos.push(pos.shift());
    };

    /**
     * 调整向右滑动时, indexLog的值
     */
    ImgViewer.prototype._curIndexBackward = function() {
        this._curIndex -= 1;
    };

    /**
     * 综合向右切换的步骤
     */
    ImgViewer.prototype.moveBackward = function() {
        if (this._curIndex > 0) {
            this._posListBackward();
            this._curIndexBackward();
            this._resetImg();
        } else {
            this.restoreViewer();
        }
    };

    /**
     * 向左切换
     */
    ImgViewer.prototype._toLeft = function(range) {
        var tranViewerList = this.$viewerList.get(0);
        if (!range) { range = tranViewerList.clientWidth; }
        tranViewerList.translateX = -range;
        this.moveForward();
    };

    /**
     * 向左切换
     */
    ImgViewer.prototype._toRight = function(range) {
        var tranViewerList = this.$viewerList.get(0);
        if (!range) { range = tranViewerList.clientWidth; }
        tranViewerList.translateX = range;
        this.moveBackward();
    };

    /**
     * 向上切换, 暂无
     */
    ImgViewer.prototype._toUp = function(range) {
        this.restoreViewer();
    };

    /**
     * 向下切换
     */
    ImgViewer.prototype._toDown = function(range) {
        this.restoreViewer();
    };

    /**
     * 缩放图像
     */
    ImgViewer.prototype._scaleImg = function(target, scale) {
        scale = this._initScale * scale;
        this._updateScale(target, scale);
    }

    // 更新图片缩放比
    ImgViewer.prototype._updateScale = function(target, scale) {
        if (_doesTargetIs(target, 'img')) {
            target.scaleX = scale;
            target.scaleY = scale;
        }
    }

    // 重置图片
    ImgViewer.prototype._resetImg = function() {
        var that = this;
        if (this._initScale === 1) { return; }
        this._initScale = 1;
        this.$viewerImgs.each(function() {
            var $img = $(this).get(0);
            $img.translateX = 0;
            $img.translateY = 0;
            that._updateScale($img, that._initScale);
        });
    }

    /**
     * 为viewerList添加过渡效果
     */
    ImgViewer.prototype.animateViewerList = function(addAnimate) {
        var opt = this.options;
        var transitionStr =
                addAnimate
                ? 'transform ' + opt.transitionTime + 'ms ' + opt.transitionType
                : '';
        this.$viewerList.css({
            transition: transitionStr
        });
    }

    /**
     * 更新图片的className
     */
    ImgViewer.prototype.updateClassName = function() {
        var that = this;
        this.$viewerItems.removeClass(this._pos.join(' '));
        this.$viewerItems.each(function(index) {
            $(this).addClass(that._pos[index]);
        });
    }

    /**
     * 重置viewerList的位置
     */
    ImgViewer.prototype.resetViewerPos = function() {
        this.$viewerList.get(0).translateX = 0;
    }

    /**
     * 复原viewerList
     */
    ImgViewer.prototype.restoreViewer = function() {
        this.animateViewerList(false);
        this._updateImg(this._curIndex);
        this.resetViewerPos();
        this.toLockViewer(false);
    }

    /**
     * 移动元素并对超出的部分距离进行调整
     */
    ImgViewer.prototype.checkPos = function(target, max) {
        if (target.translateX > max.x) {
            target.translateX = max.x;
            this.toLockViewer(false); // 由于到达边界, 所以取消锁定
        }
        if (target.translateX < -max.x) {
            target.translateX = -max.x;
            this.toLockViewer(false); // 由于到达边界, 所以取消锁定
        }
        if (target.translateY > max.y) {
            target.translateY = max.y;
        }
        if (target.translateY < -max.y) {
            target.translateY = -max.y;
        }
    };

    /**
     * 锁定viewer
     */
    ImgViewer.prototype.toLockViewer = function(lock) {
        this._viewerLocked = !!lock;
    };

    /**
     * 显示viewer
     */
    ImgViewer.prototype.showViewer = function(index) {
        this._curIndex = index;
        this._updateImg(this._curIndex, true);
        this.$viewer.show();
    }

    // 对viewer用Trans处理
    ImgViewer.prototype.transViewer = function() {
        // 用Trans进行处理
        Trans(this.$viewerList.get(0));
        this.$viewerImgs.each(function(i) {
            Trans($(this).get(0));
        });
    };

    // 初始化Viewer对象
    ImgViewer.prototype.initViewer = function() {
        this.transViewer();
        this.bindEvt();
        this._storeImgs();
        this.updateClassName();

        var that = this;
        this.$viewerList.on('transitionend', function(evt) {
            that.updateClassName();
            that.restoreViewer();
        });

        this.$viewer.on('click', function() {
            $(this).hide();
        });

    };

    // 绑定事件
    ImgViewer.prototype.bindEvt = function() {
        var that = this;
        this._viewerListAF = new AF(this.$viewerList.get(0), {
            touchMove: function(evt) {
                var movePos = { x: evt.deltaX || 0, y: 0, };
                var target = evt.target;
                if (that._initScale !== 1 && _doesTargetIs(target, 'img')) {
                    // 保证移动时不会让整个画册动
                    that.toLockViewer(true);
                    var scaleRange = that._initScale > 1 ? (that._initScale - 1) / 2 : 0;
                    var xRange = target.width * scaleRange;
                    var yRange = target.height * scaleRange;

                    var maxPos = {
                        x: xRange,
                        y: yRange
                    };
                    movePos.y += evt.deltaY || 0;

                    _move(target, movePos);
                    that.checkPos(target, maxPos);
                    if (target.translateX > -maxPos.x && target.translateX < maxPos.x) {
                        that.resetViewerPos();
                    }
                }
                if (!that._viewerLocked) {
                    movePos.y = 0;
                    _move(that.$viewerList.get(0), movePos);
                }

            },
            touchEnd: function(evt) {
                var target = evt.target;
                if (_doesTargetIs(target, 'img')) {
                    that._initScale = target.scaleX;
                    if (that._initScale < 1) {
                        that._resetImg();
                        // 取消锁定
                        that.toLockViewer(false);
                    }
                }
            },
            swipe: function(evt) {
                if (that._viewerLocked) { return; }
                that.toLockViewer(true);
                that.animateViewerList(true);
                that['_to' + evt.direction]();
            },
            pinch: function(evt) {
                that._scaleImg(evt.target, evt.scale);
            },
        });
    }

    /**
     * ---------------------------------------------------------------------
     * Plugin Definition
     * ---------------------------------------------------------------------
     */
    function Plugin(option) {
        var options = $.extend({}, ImgViewer.DEFAULTS, typeof option == 'object' && option);
        var imgViewer = new ImgViewer(this, options);
        imgViewer.initViewer();
        
        // 显示viewer
        this.on('click', function(evt) {
            if (_doesTargetIs(evt.target, 'img')) {
                imgViewer.showViewer(imgViewer.$items.indexOf(evt.target));
            }
        });

        return imgViewer;
    }

    var old = $.fn.imgViewer;

    $.fn.imgViewer             = Plugin;
    $.fn.imgViewer.Constructor = ImgViewer;

    $.fn.imgViewer.noConflict = function() {
        $.fn.imgViewer = old;
        return this;
    };

    // 消息输出对象
    var $log = $('#log');
    $(window).on('error', function(evt) {
        log(evt.message);
    });
    function log(msg) {
        $('#log').text(JSON.stringify({
            msg: msg
        }));
    }

})(Zepto, AlloyFinger, Transform);