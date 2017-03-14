<template lang="html">
    <g>
        <polygon :points="points"></polygon>
        <circle cx="100" cy="100" r="80"></circle>
        <axis-label
            v-for="stat in stats"
            :stat="stat"
            :index="$index"
            :total="stats.length">
        </axis-label>
    </g>
</template>

<script>
import valueToPoint from './common.js';
import axisLabel from './label.vue';
export default {
    props: ['stats'],
    replace: true,
    data () {
        return {}
    },
    computed: {
        points() {
            var total = this.stats.length;
            return this.stats.map((stat, i) => {
                var point = valueToPoint(stat.value, i, total);
                return point.x + ',' + point.y;
            }).join(' ');
        }
    },
    components: { axisLabel }
}
</script>

<style lang="css">
body {
    font-family: Helvetica Neue, Arial, sans-serif;
}

polygon {
    fill: #42b983;
    opacity: .75;
}

circle {
    fill: transparent;
    stroke: #999;
}

text {
    font-family: Helvetica Neue, Arial, sans-serif;
    font-size: 10px;
    fill: #666;
}

label {
    display: inline-block;
    margin-left: 10px;
    width: 20px;
}

#raw {
    position: absolute;
    top: 0;
    left: 300px;
}
</style>
