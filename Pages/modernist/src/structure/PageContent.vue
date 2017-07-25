<template>
    <div class="page-content">
        <service-cases></service-cases>
        <latest-work></latest-work>
    </div>
</template>

<script>
import ServiceCases from './ServiceCases';
import LatestWork from './LatestWork';

export default {
    name: 'page-content',
    components: {
        ServiceCases,
        LatestWork,
    },
};
</script>

<style lang="scss">
.page-content {
    border-bottom: solid 1px #000;
    background-color: #660000;
    overflow: hidden;
}
</style>
