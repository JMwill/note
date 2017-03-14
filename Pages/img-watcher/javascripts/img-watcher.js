;(function($, AF, Trans) {
    // 消息输出对象
    var $log = $('#log');
    $(window).on('error', function(evt) {
        log(evt.message);
    });
    function log(msg) {
        $log.text(JSON.stringify({
            msg: msg
        }));
    }

    // 作用的列表对象
    var $gallery = $('.game-intr__gallery');
    var $galleryItems = $gallery.find('.game-intr__pict-box');
    var $galleryImgs = $gallery.find('.game-intr__pict');
    var imgUrls = $galleryImgs.map( function() {
        return {
            src: $(this).attr('src'),
            loaded: false
        };
    }).get();

    $gallery.on('click', function(evt) {
        if (doesTargetIs(evt.target, 'img')) {
            showWatcher($galleryImgs.indexOf(evt.target));
        }
    });

    // 需要的插件的对象
    var $watcher = $('.x-img-watcher');
    var $watcherList = $watcher.find('.x-img-watcher__list');
    var $watcherItems = $watcher.find('.x-img-watcher__item');
    var $watcherImgs = $watcher.find('.x-img-watcher__img');

    var posList = ['prev', 'cur', 'next'];
    var indexLog = 0;


    /**
     * 判断事件的target对象是否是img标签
     */
    function doesTargetIs(target, comparer) {
        if ((typeof comparer) === 'string') {
            return target.nodeName.toUpperCase() === comparer.toUpperCase();
        } else {
            return target === comparer;
        }
    }

    /**
     * 提供一个当前所在的下标, 以及需要从中获取链接的列表
     * 确保返回的列表在提供的列表的区间内
     */
    function getCurImg(list, index) {
        var len = list.length;
        var loadingImgObj = {
            src: '/assets/loading.gif',
            loaded: true,
        };
        if (len === 0) { return [];}
        if (len === 1) { return [loadingImgObj, list[0], loadingImgObj]; }

        var resultList = [];
        if (index <= 0) {
            resultList.push(loadingImgObj);
            resultList = resultList.concat(list.slice(0, 2));
        } else if (index >= len - 1) {
            resultList = resultList.concat(list.slice(-2));
            resultList.push(loadingImgObj);
        } else {
            resultList = list.slice(index - 1, index + 2);
        }
        return resultList;
    }

    /**
     * 在图片加载到之前都使用loading图片
     */
    function loadImg(imgObj, $elem) {
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
     * 向图片元素填充图片
     */
    function fillImg(imgList, fillAll) {
        if (imgList.length < 3) { return; }
        $watcherItems.each(function(i) {
            var $img = $watcherImgs.eq(i);
            var $that = $(this);
            var imgObjIndex = $that.hasClass('prev') ? 0 : $that.hasClass('cur') ? 1 : 2;
            var imgObj = imgList[imgObjIndex];

            if (!imgObj.loaded) {
                loadImg(imgObj, $img);
            } else {
                if (imgObjIndex !== 1 || fillAll) {
                    $img.attr('src', imgObj.src);
                }
            }
        });
    }

    /**
     * 通过getCurImg以及fillImg来为添加图片
     */
    function updateImg(index, all) {
        fillImg(getCurImg(imgUrls, index), all);
    }

    /**
     * 调整posList的元素位置, 用于向左切换
     */
    function posListForward() { posList.unshift(posList.pop()); }

    /**
     * 调整向左滑动时, indexLog的值
     */
    function indexLogForward() { indexLog += 1; }

    /**
     * 综合向左切换的步骤
     */
    function moveForward() {
        if (indexLog < imgUrls.length - 1) {
            posListForward();
            indexLogForward();
            resetImg();
        } else {
            restoreWatcherList();
        }
    }

    /**
     * 调整posList的元素位置, 用于向右切换
     */
    function posListBackward() { posList.push(posList.shift()); }

    /**
     * 调整向右滑动时, indexLog的值
     */
    function indexLogBackward() { indexLog -= 1; }

    /**
     * 综合向右切换的步骤
     */
    function moveBackward() {
        if (indexLog > 0) {
            posListBackward();
            indexLogBackward();
            resetImg();
        } else {
            restoreWatcherList();
        }
    }

    /**
     * 向左切换
     * elem是经过Transform函数处理后的dom对象
     */
    function toLeft(elem, range) {
        if (!range) { range = elem.clientWidth; }
        elem.translateX = -range;
        moveForward();
    }

    /**
     * 向左切换
     * elem是经过Transform函数处理后的dom对象
     */
    function toRight(elem, range) {
        if (!range) { range = elem.clientWidth; }
        elem.translateX = range;
        moveBackward();
    }


    /**
     * 向上切换, 暂无
     */
    function toUp(elem, range) {
        restoreWatcherList();
    }

    /**
     * 向下切换
     */
    function toDown(elem, range) {
        restoreWatcherList();
    }

    var animateFun = {
        toLeft: toLeft,
        toRight: toRight,
        toUp: toUp,
        toDown: toDown
    }

    /**
     * 图片缩放操作
     */
    // 原始缩放比
    var initScale = 1;
    // 缩放图像
    function scaleImg(target, scale) {
        scale = initScale * scale;
        updateScale(target, scale);
    }

    // 更新图片缩放比
    function updateScale(target, scale) {
        if (doesTargetIs(target, 'img')) {
            target.scaleX = scale;
            target.scaleY = scale;
        }
    }

    // 重置图片
    function resetImg() {
        if (initScale === 1) { return; }
        initScale = 1;
        $watcherImgs.each(function() {
            var $img = $(this).get(0);
            $img.translateX = 0;
            $img.translateY = 0;
            updateScale($img, initScale);
        });
    }

    /**
     * 为watcherList添加过渡效果
     */
    function animateWatcherList(addAnimate) {
        transitionStr = addAnimate ? 'transform 150ms ease-out' : '';
        $watcherList.css({
            transition: transitionStr
        });
    }

    /**
     * 更新图片的className
     */
    function updateClassName() {
        $watcherItems.removeClass(posList.join(' '));
        $watcherItems.each(function(index) {
            $(this).addClass(posList[index]);
        });
    }

    /**
     * 重置watcherList的位置
     */
    function resetWatcherPos() {
        $watcherList.get(0).translateX = 0;
    }

    /**
     * 复原watcherList
     */
    function restoreWatcherList() {
        animateWatcherList(false);
        updateImg(indexLog);
        resetWatcherPos();
        toLockWatcher(false);
    }

    /**
     * 移动元素
     */
    function move(target, pos) {
        target.translateX += pos.x;
        target.translateY += pos.y;
    }

    /**
     * 移动元素并对超出的部分距离进行调整
     */
    function checkPos(target, max) {
        if (target.translateX > max.x) {
            target.translateX = max.x;
            toLockWatcher(false); // 由于到达边界, 所以取消锁定
        }
        if (target.translateX < -max.x) {
            target.translateX = -max.x;
            toLockWatcher(false); // 由于到达边界, 所以取消锁定
        }
        if (target.translateY > max.y) {
            target.translateY = max.y;
        }
        if (target.translateY < -max.y) {
            target.translateY = -max.y;
        }
    }
    /**
     * 锁定watcher
     */
    function toLockWatcher(lock) {
        $watcherList.get(0)._locked = !!lock;
    }

    /**
     * 显示watcher
     */
    function showWatcher(index) {
        indexLog = index;
        updateImg(indexLog, true);
        $watcher.show();
    }

    // 用Trans进行处理
    Trans($watcherList.get(0));
    $watcherImgs.each(function(i) {
        Trans($(this).get(0));
    });

    $watcherList.on('transitionend', function(evt) {
        updateClassName();
        restoreWatcherList();
    });

    $watcher.on('click', function() {
        $(this).hide();
    });

    var watcherListAF = new AF($watcherList.get(0), {
        touchMove: function(evt) {
            var movePos = { x: evt.deltaX || 0, y: 0, };
            var target = evt.target;
            if (initScale !== 1 && doesTargetIs(target, 'img')) {
                // 保证移动时不会让整个画册动
                toLockWatcher(true);
                var scaleRange = initScale > 1 ? (initScale - 1) / 2 : 0;
                var xRange = target.width * scaleRange;
                var yRange = target.height * scaleRange;

                var maxPos = {
                    x: xRange,
                    y: yRange
                };
                movePos.y += evt.deltaY || 0;

                move(target, movePos);
                checkPos(target, maxPos, evt.deltaX);
                if (target.translateX > -maxPos.x && target.translateX < maxPos.x) {
                    resetWatcherPos();
                }
            }
            if (!$watcherList.get(0)._locked) {
                movePos.y = 0;
                move($watcherList.get(0), movePos);
            }

        },
        touchEnd: function(evt) {
            var target = evt.target;
            if (doesTargetIs(target, 'img')) {
                initScale = target.scaleX;
                if (initScale < 1) {
                    resetImg();
                    // 取消锁定
                    toLockWatcher(false);
                }
            }
        },
        swipe: function(evt) {
            if ($watcherList.get(0)._locked) { return; }
            toLockWatcher(true);
            animateWatcherList(true);
            animateFun['to' + evt.direction]($watcherList.get(0));
        },
        pinch: function(evt) {
            scaleImg(evt.target, evt.scale);
        },
    });


    /**
     * 
     */
    function init() {
        updateClassName();
    }

    init();

    window.testSuite = {
        getCurImg: getCurImg
    };
})(Zepto, AlloyFinger, Transform);