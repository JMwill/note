<template>
    <div class="latest-work">
        <p class="latest-work__title">
            <span class="latest-work__title-word-wrap">LATEST WORK</span>
        </p>
        <div class="latest-work__display">
            <work-case v-for="n in 6"></work-case>
        </div>
    </div>
</template>

<script>
import WorkCase from '../components/WorkCase';

export default {
    name: 'latest-work',
    components: {
        WorkCase,
    },
};
</script>

<style lang="scss">
.latest-work {
    padding: 0 120px;
    color: #fff;
    overflow: hidden;
}
.latest-work__title {
    position: relative;
    text-align: center;
    &::before {
        content: '';
        position: absolute;
        top: 50%;
        width: 100%;
        left: 0;
        transform: translateY(-50%);
        height: 3px;
        background-color: #303030;
    }
}
.latest-work__title-word-wrap {
    position: relative;
    display: inline-block;
    font-size: 23px;
    padding: 10px 15px;
    border-radius: 10px;
    background-color: #303030;
    z-index: 1;
}
.latest-work__display {
    display: flex;
    justify-content: space-around;
    align-content: center;
    flex-wrap: wrap;
}
</style>
