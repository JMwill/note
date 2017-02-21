<template>
    <div class="carousel">
        <div class="carousel__inner">
            <propaganda
                class="carousel__item"
                v-for="n in imgItem"
                :class="n == 2 ? 'active' : ''"></propaganda>
        </div>
        <a href="javascript: void 0;" class="carousel__to-prev">
            <span class="carousel__to-prev-icon"></span>
        </a>
        <a href="javascript: void 0;" class="carousel__to-next">
            <span class="carousel__to-next-icon"></span>
        </a>
    </div>
</template>

<script>
import Propaganda from './Propaganda';

export default {
    name: 'Carousel',
    components: {
        Propaganda,
    },
    data() {
        return {
            imgItem: 3,
        };
    },
};
</script>

<style lang="scss">
.carousel {
    position: relative;
    margin: 50px 0;
}
.carousel__inner {
    width: 100%;
    position: relative;
    overflow: hidden;
}
.carousel__item {
    position: relative;
    display: none;
    width: 100%;
}
.carousel-item {
    transition: transform .6s ease-in-out;
    backface-visibility: hidden;
    perspective: 1000px;
}
.carousel__item.active {
    display: block;
}
.carousel__to-prev,
.carousel__to-next {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 15%;
    color: #76c38f;
    text-align: center;
    opacity: .5;
}
.carousel__to-prev {
    left: 0;
    text-align: left;
}
.carousel__to-next {
    right: 0;
    text-align: right;
}
.carousel__to-prev-icon,
.carousel__to-next-icon {
    position: absolute;
    display: inline-block;
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
    height: 20px;
    background: transparent no-repeat center center;
    background-size: 100%;
}
.carousel__to-next-icon {
    background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23fff' viewBox='0 0 8 8'%3E%3Cpath d='M1.5 0l-1.5 1.5 2.5 2.5-2.5 2.5 1.5 1.5 4-4-4-4z'/%3E%3C/svg%3E");
    transform: translateX(-100%);
}
.carousel__to-prev-icon {
    background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23fff' viewBox='0 0 8 8'%3E%3Cpath d='M4 0l-4 4 4 4 1.5-1.5-2.5-2.5 2.5-2.5-1.5-1.5z'/%3E%3C/svg%3E");
}
</style>
