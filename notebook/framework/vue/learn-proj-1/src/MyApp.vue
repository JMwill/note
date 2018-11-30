<template>
    <div id="app">
        <main-header></main-header>
        <div class="main">
            <color-palette :selected-colors.sync="selectedColors"></color-palette>
            <color-pool :selected-colors="selectedColors"></color-pool>
        </div>
    </div>
</template>

<script>
import MainHeader from './components/MainHeader';
import ColorPalette from './components/ColorPalette';
import ColorPool from './components/ColorPool';

export default {
    data() {
        return {
            selectedColors: [],
        };
    },
    components: {
        MainHeader,
        ColorPalette,
        ColorPool,
    },
};
</script>

<style>
html, body {
    height: 100%;
    margin: 0;
}

#app {
    font-family: Source Sans Pro, Helvetica, sans-serif;
}

#app a {
    color: #42b983;
    text-decoration: none;
}
.main {
    height: 100%;
}
</style>
