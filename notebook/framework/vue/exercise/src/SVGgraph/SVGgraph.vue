<template>
    <div>
        <svg width="200" height="200">
            <polygraph :stats="stats"></polygraph>
        </svg>

        <div v-for="stat in stats">
            <label>{{stat.label}}</label>
            <input type="range" v-model="stat.value" min="0" max="100">
            <span>{{stat.value}}</span>
            <button @click="remove(stat)">X</button>
        </div>
        <form id="add">
            <input name="newlabel" v-model="newLabel">
            <button @click="add">Add a Stat</button>
        </form>
        <pre id="raw"> {{stats | json}} </pre>
    </div>
</template>

<script>
var stats = [
    { label: 'A', value: 100 },
    { label: 'B', value: 100 },
    { label: 'C', value: 100 },
    { label: 'D', value: 100 },
    { label: 'E', value: 100 },
    { label: 'F', value: 100 }
];
import polygraph from './polygraph.vue';
import {valueToPoint} from './common.js'
export default {
    data () {
        return {
            newLabel: '',
            stats: stats
        }
    },
    methods: {
        add(e) {
            e.preventDefault();
            if (!this.newLabel) return;
            this.stats.push({
                label: this.newLabel,
                value: 100
            });
            this.newLabel = '';
        },
        remove(stat) {
            if (this.stats.length > 3) {
                this.stats.$remove(stat);
            } else {
                alert('can not delete more!');
            }
        }
    },
    components: {
        polygraph
    }
}
</script>

<style lang="css">
</style>
