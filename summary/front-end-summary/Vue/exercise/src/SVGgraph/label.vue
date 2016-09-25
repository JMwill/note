<template lang="html">
    <text :x="point.x" :y="point.y">{{stat.label}}</text>
</template>

<script>
import valueToPoint from './common.js'
export default {
    props: {
        stat: Object,
        index: Number,
        total: Number
    },
    data () {
        return {}
    },
    replace: true,
    computed: {
        point() {
            return valueToPoint(
                +this.stat.value + 10,
                this.index,
                this.total
            )
        }
    },
}
</script>

<style lang="css">
</style>
