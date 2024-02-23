<template>
  <div class="navbar">
    <div
      @click="$router.push('/')"
      class="navbar__logo"
    >
      Vue3 PostApp
    </div>
    <div class="navbar__btns">
      <my-button @click="$router.push('/posts')">Posts</my-button>
      <my-button @click="$router.push('/about')">About</my-button>
      <my-button @click="$router.push('/store')">Store</my-button>
      <my-button @click="$router.push('/composition')"
        >Composition API</my-button
      >
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
  background-color: rgb(221, 221, 221);
  box-shadow: 2px 2px 4px gray;
  align-items: center;
  padding-inline: 15px;
  justify-content: space-between;
}

.navbar__logo {
  cursor: pointer;
  background-color: rgba(176, 212, 212, .8);
  border: 2px solid rgba(112, 112, 112, 0.1);
  font-size: 14px;
  font-style: italic;
  color: teal;
  border-radius: 5px;
  padding: 8px;
}

  .navbar__logo:hover {
    box-shadow: 1px 1px 4px rgba(0, 128, 128, .3);
  }

.navbar__btns {
  display: flex;
  gap: 10px;
}
</style>
