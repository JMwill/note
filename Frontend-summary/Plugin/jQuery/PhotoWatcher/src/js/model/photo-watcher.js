import $ from '../../../node_modules/jquery';
import Hammer from '../../../node_modules/hammerjs';

require('../../css/photo-watcher.css');

class PhotoWatcher {
    constructor(opt) {
        this.cnt = $(opt.cnt).find('.pw-wrapper');
        this.pwWrapper = $(opt.cnt).find('.pw-wrapper');
        this.pwWrapperHam = new Hammer(this.pwWrapper.get(0));
        this.pwWrapperHam.get('pinch').set({ enable: true });
        this.pwWrapperHam.get('pan').set({ direction: Hammer.DIRECTION_ALL });

        this.pwData = {
            tls3dVal: { x: 0, y: 0, z: 0 },
            wrapperWidth: this.cnt.width(),
            minDragDistance: 0.3,
            curIndex: 0,
            slideLen: this.cnt.find('.pw-slide').length,
            animateLoger: {},
            animateTime: 250,
        };

        // prevent img draggable
        this.cnt
            .find('.pw-slide img')
            .on('dragstart', (e) => e.preventDefault());
    }

    init() {
        this.pwData.tls3dVal.x = -this.pwData.wrapperWidth * this.pwData.curIndex;
        this.setTlsAnimateTime(this.pwWrapper, 0);
        this.setTranslate3dVal(this.pwWrapper, this.pwData.tls3dVal.x);
        this.pwWrapperHam.on('pan', (e) => this.wrapperHandlePan(e));
        this.pwWrapperHam.on('panend', (e) => this.wrapperHandlePanEnd(e));
        this.pwWrapperHam.on('pinch', (e) => this.wrapperHandlePinch(e));
    }

    wrapperHandlePan(e) {
        let tls3dVal = this.pwData.tls3dVal;
        this.setTranslate3dVal(this.pwWrapper, tls3dVal.x + e.deltaX);
    }

    wrapperHandlePanEnd(e) {
        let pwData = this.pwData;

        if (e.deltaX > pwData.wrapperWidth * pwData.minDragDistance) {
            pwData.curIndex = pwData.curIndex - 1 < 0 ? 0 : pwData.curIndex - 1;
            pwData.tls3dVal.x = -pwData.wrapperWidth * pwData.curIndex;
        }
        if (e.deltaX < -pwData.wrapperWidth * pwData.minDragDistance) {
            pwData.curIndex = pwData.curIndex + 1 === pwData.slideLen ?
                              pwData.curIndex :
                              pwData.curIndex + 1;
            pwData.tls3dVal.x = -pwData.wrapperWidth * pwData.curIndex;
        }

        this.pwData.animateLoger.tls3dVal = setTimeout(() => {
            if (this.pwData.animateLoger.tls3dVal) {
                clearTimeout(this.pwData.animateLoger.tls3dVal);
            }
            this.setTlsAnimateTime(this.pwWrapper, 0);
        }, this.pwData.animateTime);
        this.setTlsAnimateTime(this.pwWrapper, pwData.animateTime);
        this.setTranslate3dVal(this.pwWrapper, pwData.tls3dVal.x);
    }

    wrapperHandlePinch(e) {
        this.setTranslate3dVal(this.pwWrapper, e.deltaX);
    }

    setTranslate3dVal(elem, x = 0, y = 0, z = 0) {
        elem.css({
            '-webkit-transform': `translate3d(${x}px,${y}px,${z}px)`,
            '-moz-transform': `translate3d(${x}px,${y}px,${z}px)`,
            '-ms-transform': `translate3d(${x}px,${y}px,${z}px)`,
            '-o-transform': `translate3d(${x}px,${y}px,${z}px)`,
            transform: `translate3d(${x}px,${y}px,${z}px)`
        });
    }

    setTlsAnimateTime(elem, time = 0) {
        elem.css({
            'transition-duration': `${time}ms`
        });
    }
}

export default PhotoWatcher;
