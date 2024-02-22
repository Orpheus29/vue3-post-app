<template>
  <div class="navbar">
    <div @click="$router.push('/')" style="cursor: pointer;">Vue3_PostApp</div>
    <div class="navbar__btns">
      <my-button @click="$router.push('/posts')">Posts</my-button>
      <my-button @click="$router.push('/about')">About</my-button>
      <my-button @click="$router.push('/store')">Store</my-button>
      <my-button @click="$router.push('/composition')">Composition API</my-button>
    </div>
  </div>
</template>

<script>
  export default {

  }
</script>

<style scoped>
  .navbar {
    display: flex;
    height: 50px;
    background-color: lightgray;
    box-shadow: 2px 2px 4px gray;
    align-items: center;
    padding-inline: 15px;
    justify-content: space-between;
  }

  .navbar__btns {
    display: flex;
    gap: 10px;
  }
</style>
