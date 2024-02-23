<template>
  <navbar-block></navbar-block>
  <div class="app">
    <router-view></router-view>
  </div>
</template>

<script>
import NavbarBlock from '@/components/NavbarBlock.vue';

  export default {
    components: {
      NavbarBlock,
    }
  }
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Arial', sans-serif;
}

.app {
  padding: 20px;
  font-size: 15px;
}
</style>
