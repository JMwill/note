<template>
    <header class="header">
        <nav class="header-nav">
            <div class="brand">
                <div class="brand__word">
                    The Modernist
                </div>
                <div class="brand__desc">
                    Free PSD Website Template
                </div>
            </div>
            <ul class="header-nav__list">
                <li class="header-nav__item active">HOME</li>
                <li class="header-nav__item">STYLE DEMO</li>
                <li class="header-nav__item">FULL WIDTH</li>
                <li class="header-nav__item">DROPDOWN</li>
                <li class="header-nav__item">PORTFOLIO</li>
                <li class="header-nav__item">GALLERY</li>
            </ul>
        </nav>
        <carousel></carousel>
    </header>
</template>

<script>
import Carousel from '../components/Carousel';

export default {
    name: 'page-header',
    components: {
        Carousel,
    },
};
</script>

<style lang="scss">
.header {
    position: relative;
    padding: 0 120px;
    border-top: solid #76c38f 5px;
    background-color: #280000;
    color: #fff;
    overflow: hidden;
}
.header-nav {
    position: relative;
    font-size: 9px;
    margin-top: 42px;
    text-align: right;
}
.brand,
.header-nav__list,
.header-nav__item {
    display: inline-block;
    vertical-align: middle;
}
.brand {
    position: absolute;
    left: 0;
    text-align: left;
}
.brand__word {
    font-size: 20px;
}
.brand__desc {
    font-size: 12px;
    transform: scale(.5);
    transform-origin: left;
    color: #979797;
}
.header-nav__list {
    margin: 0;
    padding: 0;
    margin-left: 143px;
}
.header-nav__item {
    padding: 10px 20px;
    border-radius: 10px;
    margin-left: 22px;
}
.header-nav__item.active {
    background-color: #76c38f;
}
</style>
