<template>
  <button class="btn">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "my-button",
}
</script>

<style scoped>
  .btn {
    align-self: flex-end;
    border: 1px solid teal;
    color: teal;
    background: none;
    border-radius: 5px;
    padding: 10px 15px;
    cursor: pointer;
  }
</style>
