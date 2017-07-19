export default (Vue, Options = {}) => {
    const DEFAULT_URL = 'data:img/jpg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABA'
                      + 'QMAAAAl21bKAAAAA1BMVEXs7Oxc9QatAAAACklEQVQI12NgAAAAAg'
                      + 'AB4iG8MwAAAABJRU5ErkJggg==';

    const Opt = Object.assign({}, {
        loadPosRate: 1.2,
        errorImg: DEFAULT_URL,
        loadingImg: DEFAULT_URL,
        tryTimes: 3,
        parentEl: 'body',
    }, Options);
    const UrlCache = [];
    const _ = {
        on(el, type, func) {
            el.addEventListener(type, func);
        },
        off(el, type, func) {
            el.removeEventListener(type, func);
        },
        isStr(str) {
            return _.isType('string', str);
        },
        isType(type, obj) {
            return Object.prototype.toString
                                .call(obj)
                                .slice(8, -1)
                                .toLowerCase() === type.toLowerCase();
        },
        isObj(obj) {
            return _.isType('object', obj);
        },
        remove(arr, item) {
            if (!arr.length) { return; }
            if (arr.indexOf(item) > -1) {
                arr.splice(item, 1);
            }
        },
    };

    let LazyerCnt = {};

    const throttle = (action, delay, ...args) => {
        let running = false;
        return (evt) => {
            if (running) { return; }
            running = true;

            let context = this;
            setTimeout(() => {
                running = false;
                action.apply(context, [evt].concat(args));
            }, delay);
        };
    };

    const setEl = (el, styleKey, src, state) => {
        if (!styleKey) {
            el.setAttribute('src', src);
        } else {
            el.setAttribute('style', `${styleKey}: url(${src})`);
        }
        el.dataset.loadState = state;
    };

    const loadImageAsync = lazyer =>
        new Promise((resolve, reject) => {
            let image = new Image();
            image.src = lazyer.src;

            image.onload = () => {
                resolve({
                    naturalHeight: image.naturalHeight,
                    naturalWidth: image.naturalWidth,
                    src: lazyer.src,
                });
            };
            image.onerror = () => reject();
        });

    const render = (lazyer) => {
        if (lazyer.attempt >= Opt.attempt) { return; }

        lazyer.attempt += 1;
        loadImageAsync(lazyer)
            .then(() => {
                setEl(lazyer.el, lazyer.styleKey, lazyer.src, 'loaded');
                UrlCache.push(lazyer.src);
                _.remove(LazyerCnt[lazyer.parentEl].lazyers, lazyer);
            })
            .catch(() => {
                setEl(lazyer.el, lazyer.styleKey, lazyer.errorImg, 'error');
            });
    };

    const checkCanShow = (cntDom, lazyer) => {
        if (UrlCache.indexOf(lazyer.src) > -1) {
            return setEl(lazyer.el, lazyer.styleKey, lazyer.src, 'loaded');
        }
        let rect = lazyer.el.getBoundingClientRect();
        let parentRect = cntDom.dom.getBoundingClientRect();

        let parentRectTop = parentRect.top + cntDom.dom.clientHeight;
        let parentRectLeft = parentRect.left + cntDom.dom.clientWidth;
        const canShow =
            (rect.top < parentRectTop * Opt.loadPosRate && rect.bottom > 0)
         && (rect.left < parentRectLeft * Opt.loadPosRate && rect.right > 0);

        if (canShow) { render(lazyer); }
        return true;
    };

    const lazyLoadHandler = throttle((evt) => {
        if (!evt) {
            Object.keys(LazyerCnt).forEach(
                cnt => LazyerCnt[cnt].lazyers.forEach(
                    lazyer => checkCanShow(LazyerCnt[cnt], lazyer)
                )
            );
            return;
        }
        const LazyerCntKeys = Object.keys(LazyerCnt);
        for (let i = 0, l = LazyerCntKeys.length; i < l; i += 1) {
            let curCnt = LazyerCnt[LazyerCntKeys[i]];
            if (curCnt.dom === evt.target) {
                curCnt.lazyers.forEach(lazyer => checkCanShow(curCnt, lazyer));
            }
        }
    }, 300);

    const onListen = (el) => {
        _.on(el, 'scroll', lazyLoadHandler);
        _.on(el, 'resize', lazyLoadHandler);
        _.on(el, 'animationend', lazyLoadHandler);
        _.on(el, 'transitionend', lazyLoadHandler);
    };

    const offListen = (el) => {
        _.off(el, 'scroll', lazyLoadHandler);
        _.off(el, 'resize', lazyLoadHandler);
        _.off(el, 'animationend', lazyLoadHandler);
        _.off(el, 'transitionend', lazyLoadHandler);
    };

    const removeLazyer = (el, binding) => {
        if (!el) { return; }
        let parentCnt = LazyerCnt[binding.value.parentEl || Opt.parentEl];
        if (!parentCnt) { return; }

        parentCnt.lazyers = parentCnt.lazyers.filter(i => i.el !== el);

        if (parentCnt.lazyers.length === 0) {
            parentCnt.binded = false;
            offListen(parentCnt.dom);
            delete LazyerCnt[binding.value.parentEl]
        }
    };

    const isElExist = (el, parentEl) => {
        let hasIt = false;
        hasIt = LazyerCnt[parentEl]
                && LazyerCnt[parentEl].lazyers.filter(item => item.el === el).length;

        if (hasIt) {
            return Vue.nextTick(() => {
                lazyLoadHandler();
            });
        }
        return hasIt;
    };

    const addLazyer = (el, binding) => {
        const newLazyer = Object.assign({}, Opt, {
            styleKey: binding.arg,
            attempt: 0,
            el,
        });
        if (_.isStr(binding.value)) { newLazyer.src = binding.value; }
        if (_.isObj(binding.value)) { Object.assign(newLazyer, binding.value); }

        let parentEl = newLazyer.parentEl || Opt.parentEl;
        if (el.dataset.loadState === 'loaded' || isElExist(el, parentEl)) { return; }

        if (LazyerCnt[parentEl]) {
            LazyerCnt[parentEl].lazyers.push(newLazyer);
        } else {
            LazyerCnt[parentEl] = {
                binded: false,
                lazyers: [newLazyer],
                dom: document.querySelector(parentEl),
            };
        }
        setEl(el, newLazyer.styleKey, newLazyer.loadingImg, 'loading');
        Vue.nextTick(() => {
            Object.keys(LazyerCnt).forEach((cntKey) => {
                let cnt = LazyerCnt[cntKey];
                if (!cnt.binded && cnt.lazyers.length) {
                    cnt.binded = true;
                    onListen(cnt.dom);
                }
            });
            lazyLoadHandler();
        });
    };

    Vue.directive('lazy', {
        // bind: addLazyer,
        inserted: addLazyer,
        update: addLazyer,
        unbind: removeLazyer,
    });
};
