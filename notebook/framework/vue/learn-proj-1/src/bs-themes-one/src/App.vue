<template>
  <div id="app" class="container-fluid">
    <nav-bar></nav-bar>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue';

export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components: {
    NavBar,
  }
}
</script>