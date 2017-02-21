<template>
  <div id="app">
    <page-header></page-header>
    <page-content></page-content>
    <page-footer></page-footer>
  </div>
</template>

<script>
import PageHeader from './structure/PageHeader';
import PageContent from './structure/PageContent';
import PageFooter from './structure/PageFooter';

export default {
    name: 'app',
    components: {
        PageHeader,
        PageContent,
        PageFooter,
    },
};
</script>

<style>
body {
  margin: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
