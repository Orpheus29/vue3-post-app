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

<style>
  .btn {
    border: 1px solid teal;
    color: teal;
    background: none;
    border-radius: 5px;
    padding: 10px 15px;
    cursor: pointer;
  }

  .btn:hover {
    box-shadow: 1px 1px 4px rgba(0, 128, 128, .3);
  }
</style>
