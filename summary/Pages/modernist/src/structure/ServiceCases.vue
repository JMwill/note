<template>
    <div class="service-cases">
        <service-case v-for="n in 4"></service-case>
    </div>
</template>

<script>
import ServiceCase from '../components/ServiceCase';

export default {
    name: 'service-cases',
    components: {
        ServiceCase,
    },
};
</script>

<style lang="scss">
.service-cases {
    display: flex;
    align-items: stretch;
    align-content: center;
    justify-content: space-around;
    flex-wrap: wrap;
    margin-top: 50px;
    padding: 0 110px;
}
</style>
