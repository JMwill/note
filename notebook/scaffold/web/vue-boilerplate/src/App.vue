<template>
    <div id="app">
        <app-header></app-header>
        <router-view transition transition-mode="out-in"></router-view>
    </div>
</template>

<script>
import AppHeader from './Header';

export default {
    name: 'app',
    components: {
        AppHeader,
    },
};
</script>

<style>
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
}
</style>
