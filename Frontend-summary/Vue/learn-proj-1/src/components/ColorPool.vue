<template>
    <div class="balls-pool">
        <span
            v-for="ball in balls"
            class="ball"
            :style="ball.style"
        ></span>
    </div>
</template>

<script>
export default {
    data() {
        return {
            /* eslint max-len: ["error", 300] comma-dangle: "off" */
            balls: [
                { pos: { x: Math.abs(Math.random() * 10 + 5), y: Math.abs(Math.random() * 10 + 5), }, style: { top: '0px', left: '0px', backgroundColor: 'white' }, },
                { pos: { x: Math.abs(Math.random() * 10 + 5), y: Math.abs(Math.random() * 10 + 5), }, style: { top: '0px', left: '0px', backgroundColor: 'white' }, },
                { pos: { x: Math.abs(Math.random() * 10 + 5), y: Math.abs(Math.random() * 10 + 5), }, style: { top: '0px', left: '0px', backgroundColor: 'white' }, },
                { pos: { x: Math.abs(Math.random() * 10 + 5), y: Math.abs(Math.random() * 10 + 5), }, style: { top: '0px', left: '0px', backgroundColor: 'white' }, },
                { pos: { x: Math.abs(Math.random() * 10 + 5), y: Math.abs(Math.random() * 10 + 5), }, style: { top: '0px', left: '0px', backgroundColor: 'white' }, },
                { pos: { x: Math.abs(Math.random() * 10 + 5), y: Math.abs(Math.random() * 10 + 5), }, style: { top: '0px', left: '0px', backgroundColor: 'white' }, },
                { pos: { x: Math.abs(Math.random() * 10 + 5), y: Math.abs(Math.random() * 10 + 5), }, style: { top: '0px', left: '0px', backgroundColor: 'white' }, },
                { pos: { x: Math.abs(Math.random() * 10 + 5), y: Math.abs(Math.random() * 10 + 5), }, style: { top: '0px', left: '0px', backgroundColor: 'white' }, },
                { pos: { x: Math.abs(Math.random() * 10 + 5), y: Math.abs(Math.random() * 10 + 5), }, style: { top: '0px', left: '0px', backgroundColor: 'white' }, },
                { pos: { x: Math.abs(Math.random() * 10 + 5), y: Math.abs(Math.random() * 10 + 5), }, style: { top: '0px', left: '0px', backgroundColor: 'white' }, },
                { pos: { x: Math.abs(Math.random() * 10 + 5), y: Math.abs(Math.random() * 10 + 5), }, style: { top: '0px', left: '0px', backgroundColor: 'white' }, },
                { pos: { x: Math.abs(Math.random() * 10 + 5), y: Math.abs(Math.random() * 10 + 5), }, style: { top: '0px', left: '0px', backgroundColor: 'white' }, },
            ],
            poolWidth: 0,
            poolHeight: 0,
            ballBasicSpeed: 5,
            ballWidth: 0,
            ballHeight: 0,
        };
    },
    props: {
        selectedColors: {
            type: Array,
            required: true,
        },
    },
    ready() {
        const pool = document.getElementsByClassName('balls-pool')[0];
        const ball = pool.getElementsByClassName('ball')[0];

        if (!pool || !ball) { return; }

        const poolStyles = window.getComputedStyle(pool);
        const ballStyles = window.getComputedStyle(ball);

        this.poolWidth = parseInt(poolStyles.width, 10);
        this.poolHeight = parseInt(poolStyles.height, 10);

        this.ballWidth = parseInt(ballStyles.width, 10);
        this.ballHeight = parseInt(ballStyles.height, 10);

        this.updateBallsPosition();

        window.addEventListener('resize', this.resizePool);
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.resizePool);
    },
    methods: {
        resizePool() {
            const pool = document.getElementsByClassName('balls-pool')[0];
            const poolStyles = window.getComputedStyle(pool);
            this.poolWidth = parseInt(poolStyles.width, 10);
            this.poolHeight = parseInt(poolStyles.height, 10);
        },
        updateAnimateFrame() {
            this.poolAnimationFrame = requestAnimationFrame(() => {
                this.updateBallsPosition();
            });
        },
        randomSpeed(oldSpeed, sign) {
            return sign * Math.floor(Math.random() * Math.abs(oldSpeed) + this.ballBasicSpeed);
        },
        updateBallsPosition() {
            const ballWidth = parseInt(this.ballWidth, 11);
            const ballHeight = parseInt(this.ballHeight, 10);
            const boundaryLeft = 0;
            const boundaryTop = 0;
            const boundaryRight = this.poolWidth - ballWidth;
            const boundaryBottom = this.poolHeight - ballHeight;
            this.balls.forEach((ball, index) => {
                if (this.selectedColors[index % 2]) {
                    ball.style.backgroundColor = this.selectedColors[index % 2];
                }
                let top = parseInt(ball.style.top, 10);
                let left = parseInt(ball.style.left, 10);

                top += ball.pos.x;
                left += ball.pos.y;
                if (top < boundaryTop) {
                    top = boundaryTop;
                    ball.pos.x = this.randomSpeed(ball.pos.x, 1);
                }
                if (top > boundaryBottom) {
                    top = boundaryBottom;
                    ball.pos.x = this.randomSpeed(ball.pos.x, -1);
                }
                if (left < boundaryLeft) {
                    left = boundaryLeft;
                    ball.pos.y = this.randomSpeed(ball.pos.y, 1);
                }
                if (left > boundaryRight) {
                    left = boundaryRight;
                    ball.pos.y = this.randomSpeed(ball.pos.y, -1);
                }

                /* eslint no-param-reassign: ["error", { "props": false }] */
                ball.style.left = `${left}px`;
                ball.style.top = `${top}px`;
            });
            this.updateAnimateFrame();
        },
    },
};
</script>

<style lang="css">
.balls-pool {
    position: absolute;
    left: 50%;
    right: 0;
    top: 55px;
    bottom: 0;
    background-color: #000;
}

.ball {
    position: absolute;
    display: inline-block;
    width: 20px;
    height: 20px;
    background-color: black;
    border-radius: 50%;
}
</style>
