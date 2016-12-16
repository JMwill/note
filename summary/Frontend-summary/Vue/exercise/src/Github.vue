<template>
    <div id="app">
        <h1>GitHub Commit</h1>
        <template v-for="branch in branches">
            <input
                type="radio"
                name="branch"
                :id="branch"
                :value="branch"
                v-model="currentBranch"
            >
            <label :for="branch">{{ branch }}</label>
        </template>
        <p> vuejs/vue@{{currentBranch}} </p>
        <ul>
            <li v-for="record in commits">
                <a
                    :href="record.html_url"
                    target="_blank"
                    class="commit"
                >{{ record.sha.slice(0, 7) }} - </a>
                <span class="message">{{ record.commit.message | truncate }}</span><br>
                by <span class="author">{{ record.commit.author.name }}</span>
                at <span class="date">{{ record.commit.author.date | formatDate }}</span>
            </li>
        </ul>
    </div>
</template>

<script>
let apiURL = 'https://api.github.com/repos/JMwill/wiki/commits';
export default {
    data () {
        return {
            branches: ['master', 'dev'],
            currentBranch: 'master',
            commits: null
        };
    },
    created() {
        this.fetchDate();
    },
    watch: {
        currentBranch: 'fetchDate'
    },
    filters: {
        truncate(v) {
            let newline = v.indexOf('\n');
            return newline > 0 ? v.slice(0, newline) : v;
        },
        formatDate(v) {
            return v.replace('/T|Z/g', '');
        }
    },
    methods: {
        fetchDate() {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', apiURL);
            console.log(apiURL + this.currentBranch);
            xhr.onload = () => {
                this.commits = JSON.parse(xhr.responseText);
            }
            xhr.send();
        }
    }
}
</script>

<style>
body {
    font-family: Helvetica, sans-serif;
}
</style>
