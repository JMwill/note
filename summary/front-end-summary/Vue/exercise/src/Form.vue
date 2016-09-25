<template>
    <div id="app">
        <script type="text/x-template" id="grid-template">
        </script>
        <form id="search">
            Search <input name="query" v-model="searchQuery">
        </form>
        <demogrid
            :data="gridData"
            :columns="gridColumns"
            :filter-key="searchQuery">
        </demogrid>
    </div>
</template>

<script>
let apiURL = 'https://api.github.com/repos/JMwill/wiki/commits';
let tmpl = `<div class="Form Component">
                <table>
                    <thead>
                        <tr>
                            <th
                                v-for="key in columns"
                                @click="sortBy(key)"
                                :class="{active: sortKey == key}">
                                {{ key | capitalize }}
                                <span
                                    class="arrow"
                                    :class="sortOrders[key] > 0 ? 'asc' : 'des'">
                                </span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="entry in data
                            | filterBy filterKey
                            | orderBy sortKey sortOrders[sortKey]">
                            <td v-for="key in columns">
                                {{ entry[key] }}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>`;
let demogrid = {
    template: tmpl,
    props: {
        data: Array,
        columns: Array,
        filterKey: String
    },
    data() {
        var sortOrders = {};
        this.columns.forEach((key) => {
            sortOrders[key] = 1;
        });
        return {
            sortKey: '',
            sortOrders
        };
    },
    methods: {
        sortBy(key) {
            this.sortKey = key;
            this.sortOrders[key] = this.sortOrders[key] * -1
        }
    }
}
export default {
    components: {
        demogrid
    },
    data () {
        return {
            searchQuery: '',
            gridColumns: ['name', 'power'],
            gridData: [
                { name: 'Chuck Norris', power: Infinity },
                { name: 'Bruce Lee', power: 9000 },
                { name: 'Jackie Chan', power: 7000 },
                { name: 'Jet Li', power: 8000 }
            ]
        };
    }
}
</script>

<style>
body {
    font-family: Helvetica, sans-serif;
}
</style>
