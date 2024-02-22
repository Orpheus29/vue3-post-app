<template>
  <div class="dialogue" v-if="show" @click="hideDialogue">
    <div class="dialogue__content" @click.stop>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import toggleMixin from "@/mixins/toggleMixin"

export default {
  name: "my-dialogue",
  mixins: [toggleMixin],
}
</script>

<style scoped>
  .dialogue {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    background-color: rgba(0, 0, 0, .5);
  }

    .dialogue__content {
      margin: auto;
      padding: 15px;
      min-width: 300px;
      min-height: 50px;
      background-color: white;
      border-radius: 12px;
    }
</style>
