<template>
    <div class="lm-container">
        <div class="lm-content" :class="{
            'is-released': dropReleased || pullReleased,
            'restore-animate': animate && restoring
        }" :style="{ 'transform': 'translate3d(0, ' + translate + 'px, 0)' }">
            <slot name="drop">
                <div class="lm-drop" v-if="dropMethod">
                    <span v-if="dropStatus === 'loading'" class="lm-spinner"></span>
                    <span class="lm-msg">{{ dropMsg }}</span>
                </div>
            </slot>
            <slot></slot>
            <slot name="pull">
                <div class="lm-pull" v-if="pullMethod">
                    <span v-if="pullStatus === 'loading'" class="lm-spinner"></span>
                    <span class="lm-msg">{{ pullMsg }}</span>
                </div>
            </slot>
            <slot name="scroll">
                <div class="lm-scroll" v-if="scrollLoadMethod && !pullMethod">
                    <span v-if="scrollLoadStatus === 'loading'" class="lm-spinner"></span>
                    <span class="lm-msg">{{ scrollLoadMsg }}</span>
                </div>
            </slot>
        </div>
    </div>
</template>

<style>
.lm-container {
	overflow: hidden;
}

.lm-container .lm-content.dropped {
	transition: .2s;
}

.lm-container .lm-drop,
.lm-container .lm-pull,
.lm-container .lm-scroll {
	text-align: center;
	height: 50px;
	line-height: 50px;
}

.lm-container .lm-drop {
	margin-top: -50px;
}

.lm-container .lm-pull,
.lm-container .lm-scroll {
	margin-bottom: -50px;
}

.lm-container .lm-spinner {
	display: inline-block;
	margin-right: 5px;
	vertical-align: middle;
    height: 30px;
    width: 30px;
    background-image: url(./assets/ripple.svg);
    background-size: cover;
}

.lm-container .lm-msg {
	vertical-align: middle;
}
.restore-animate {
    transition: transform .2s ease-out;
}
</style>

<script type="text/babel">
export default {
    name: 'load-more',
    props: {
        autoFill: {
            type: Boolean,
            default: true,
        },
        distanceIndex: {
            type: Number,
            default: 4,
        },
        dropWaitingMsg: {
            type: String,
            default: '下拉刷新',
        },
        dropReleaseMsg: {
            type: String,
            default: '释放更新',
        },
        dropLoadingMsg: {
            type: String,
            default: '加载中...',
        },
        dropDistance: {
            type: Number,
            default: 70,
        },
        dropShowSpace: {
            type: Number,
            default: 50,
        },
        dropMethod: {
            type: Function,
        },
        pullWaitingMsg: {
            type: String,
            default: '上拉刷新',
        },
        pullReleaseMsg: {
            type: String,
            default: '释放更新',
        },
        pullLoadingMsg: {
            type: String,
            default: '加载中...',
        },
        pullDistance: {
            type: Number,
            default: 70,
        },
        pullShowSpace: {
            type: Number,
            default: 50,
        },
        pullMethod: {
            type: Function,
        },
        scrollLoadWaitingMsg: {
            type: String,
            default: '马上加载',
        },
        scrollLoadLoadingMsg: {
            type: String,
            default: '加载中...',
        },
        scrollLoadShowSpace: {
            type: Number,
            default: 50,
        },
        scrollLoadMethod: {
            type: Function,
        },
        allLoaded: {
            type: Boolean,
            default: false,
        },
        animate: {
            type: Boolean,
            default: true,
        },
    },
    data() {
        return {
            uuid: null,
            translate: 0,
            scrollEventTarget: null,
            containerFilled: false,
            dropMsg: '',
            dropReleased: false,
            pullMsg: '',
            pullReleased: false,
            scrollLoadMsg: '',
            isReachBottom: false,
            direction: '',
            startY: 0,
            startScrollTop: 0,
            currentY: 0,
            dropStatus: '',
            pullStatus: '',
            scrollLoadStatus: '',
            restoring: false,
        };
    },
    watch: {
        dropStatus(val) {
            this.$emit('drop-status-change', val);
            switch (val) {
            case 'waiting':
                this.dropMsg = this.dropWaitingMsg;
                break;
            case 'drop':
                this.dropMsg = this.dropReleaseMsg;
                break;
            case 'loading':
                this.dropMsg = this.dropLoadingMsg;
                break;
            default:
                break;
            }
        },
        pullStatus(val) {
            this.$emit('pull-status-change', val);
            switch (val) {
            case 'waiting':
                this.pullMsg = this.pullWaitingMsg;
                break;
            case 'pull':
                this.pullMsg = this.pullReleaseMsg;
                break;
            case 'loading':
                this.pullMsg = this.pullLoadingMsg;
                break;
            default:
                break;
            }
        },
        scrollLoadStatus(val) {
            this.$emit('scroll-load-status-change', val);
            switch (val) {
            case 'waiting':
                this.scrollLoadMsg = this.scrollLoadWaitingMsg;
                break;
            case 'loading':
                this.scrollLoadMsg = this.scrollLoadLoadingMsg;
                break;
            default:
                break;
            }
        },
    },
    methods: {
        onDropLoaded(id) {
            if (id === this.uuid) {
                this.translate = 0;
                setTimeout(() => {
                    this.dropStatus = 'waiting';
                }, 200);
            }
            this.animateRestore();
        },
        onPullLoaded(id) {
            this.pullStatus = 'waiting';
            this.pullReleased = false;
            if (id === this.uuid) {
                this.restoreToBottom(this.pullShowSpace);
            }
            if (!this.allLoaded && !this.containerFilled) {
                this.fillContainer();
            }
            this.animateRestore();
        },
        onScrollLoaded(id) {
            this.scrollLoadStatus = 'waiting';
            if (id === this.uuid) {
                this.restoreToBottom(this.scrollLoadShowSpace);
            }
            if (!this.allLoaded && !this.containerFilled) {
                this.fillContainer();
            }
            this.animateRestore();
        },
        restoreToBottom(space) {
            this.$nextTick(() => {
                if (this.scrollEventTarget === window) {
                    document.body.scrollTop += space;
                } else {
                    this.scrollEventTarget.scrollTop += space;
                }
                this.translate = 0;
            });
        },
        animateRestore() {
            if (this.animate && (this.checkTopReached() || this.checkBottomReached())) {
                this.restoring = true;
                setTimeout(() => { this.restoring = false; }, 200);
            }
        },
        throttle(fun, delay = 200, ...args) {
            let running = false;
            return (evt) => {
                if (running) { return; }
                running = true;
                setTimeout(() => {
                    running = false;
                    fun.apply(this, [evt].concat(args));
                }, delay);
            };
        },
        getScrollEventTarget(element) {
            let currentNode = element;
            while (currentNode
                && currentNode.tagName !== 'HTML'
                && currentNode.tagName !== 'BODY'
                && currentNode.nodeType === 1
            ) {
                let overflowY = document.defaultView.getComputedStyle(currentNode).overflowY;
                if (overflowY === 'scroll' || overflowY === 'auto') {
                    return currentNode;
                }
                currentNode = currentNode.parentNode;
            }
            return window;
        },
        getScrollTop(element) {
            if (element === window) {
                return Math.max(window.pageYOffset || 0, document.documentElement.scrollTop);
            }
            return element.scrollTop;
        },
        bindTouchEvents() {
            this.$el.addEventListener('touchstart', this.handleTouchStart);
            this.$el.addEventListener('touchmove', this.handleTouchMove);
            this.$el.addEventListener('touchend', this.handleTouchEnd);
        },
        bindScrollEvents() {
            this.scrollEventTarget.addEventListener('scroll', this.handleScroll);
        },
        init() {
            this.dropStatus = 'waiting';
            this.pullStatus = 'waiting';
            this.scrollLoadStatus = 'waiting';
            // this.dropMsg = this.dropWaitingMsg;
            this.scrollEventTarget = this.getScrollEventTarget(this.$el);
            if (typeof this.pullMethod === 'function') {
                this.fillContainer();
                this.bindTouchEvents();
            }
            if (typeof this.dropMethod === 'function') {
                this.bindTouchEvents();
            }
            if (typeof this.pullMethod !== 'function'
                && typeof this.scrollLoadMethod === 'function'
            ) {
                this.handleScroll = this.throttle(this.handleScroll);
                this.bindScrollEvents();
            }
        },
        fillContainer() {
            if (this.autoFill) {
                this.$nextTick(() => {
                    if (this.scrollEventTarget === window) {
                        this.containerFilled = this.$el.getBoundingClientRect().bottom >=
                        document.documentElement.getBoundingClientRect().bottom;
                    } else {
                        this.containerFilled = this.$el.getBoundingClientRect().bottom >=
                        this.scrollEventTarget.getBoundingClientRect().bottom;
                    }
                    if (!this.containerFilled) {
                        this.pullStatus = 'loading';
                        this.pullMethod(this.uuid);
                    }
                });
            }
        },
        checkBottomReached(threshold = 0) {
            if (this.scrollEventTarget === window) {
                return document.body.scrollTop + document.documentElement.clientHeight
                    >= document.body.scrollHeight - threshold;
            }
            return this.$el.getBoundingClientRect().bottom - threshold
                <= this.scrollEventTarget.getBoundingClientRect().bottom + 1;
        },
        checkTopReached() {
            return this.getScrollTop(this.scrollEventTarget) === 0;
        },
        handleTouchStart(event) {
            this.startY = event.touches[0].clientY;
            this.startScrollTop = this.getScrollTop(this.scrollEventTarget);
            this.isReachBottom = false;
            if (this.dropStatus !== 'loading') {
                this.dropStatus = 'waiting';
                this.dropReleased = false;
            }
            if (this.pullStatus !== 'loading') {
                this.pullStatus = 'waiting';
                this.pullReleased = false;
            }
        },
        handleTouchMove(event) {
            if (this.startY < this.$el.getBoundingClientRect().top
                && this.startY > this.$el.getBoundingClientRect().bottom
            ) { return; }

            this.currentY = event.touches[0].clientY;
            let distance = (this.currentY - this.startY) / this.distanceIndex;
            this.direction = distance > 0 ? 'down' : 'up';

            if (typeof this.dropMethod === 'function'
                && this.direction === 'down'
                && this.checkTopReached()
                && this.dropStatus !== 'loading'
            ) {
                event.preventDefault();
                event.stopPropagation();
                this.translate = distance - this.startScrollTop;
                if (this.translate < 0) {
                    this.translate = 0;
                }
                this.dropStatus = this.translate >= this.dropDistance ? 'drop' : 'waiting';
            }
            if (this.direction === 'up') {
                this.isReachBottom = this.isReachBottom || this.checkBottomReached();
            }
            if (typeof this.pullMethod === 'function'
                && this.isReachBottom
                && this.pullStatus !== 'loading'
                && !this.allLoaded
            ) {
                event.preventDefault();
                event.stopPropagation();
                this.translate =
                    (this.getScrollTop(this.scrollEventTarget) - this.startScrollTop)
                    + distance;
                if (this.translate > 0) {
                    this.translate = 0;
                }
                this.pullStatus = -this.translate >= this.pullDistance ? 'pull' : 'waiting';
            }
        },
        handleTouchEnd() {
            if (this.direction === 'down'
                && this.checkTopReached()
                && this.translate > 0
            ) {
                this.dropReleased = true;
                this.restoring = true;
                if (this.dropStatus === 'drop') {
                    this.translate = `${this.dropShowSpace}`;
                    this.dropStatus = 'loading';
                    this.dropMethod(this.uuid);
                } else {
                    this.translate = '0';
                    this.dropStatus = 'waiting';
                }
                if (this.dropStatus !== 'loading') {
                    this.animateRestore();
                }
            }
            if (this.direction === 'up' && this.isReachBottom && this.translate < 0) {
                this.pullReleased = true;
                this.restoring = true;
                this.isReachBottom = false;
                if (this.pullStatus === 'pull') {
                    this.translate = `-${this.pullShowSpace}`;
                    this.pullStatus = 'loading';
                    this.pullMethod(this.uuid);
                } else {
                    this.translate = '0';
                    this.pullStatus = 'waiting';
                }
                if (this.pullStatus !== 'loading') {
                    this.animateRestore();
                }
            }
            this.direction = '';
        },
        handleScroll() {
            if (this.checkBottomReached()
                && this.scrollLoadStatus !== 'loading'
            ) {
                this.translate = `-${this.scrollLoadShowSpace}`;
                this.scrollLoadStatus = 'loading';
                this.scrollLoadMethod(this.uuid);
            }
        },
    },
    mounted() {
        this.uuid = Math.random().toString(36).substring(3, 8);
        this.init();
    },
};
</script>
