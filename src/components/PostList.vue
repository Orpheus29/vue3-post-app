<template>
  <div v-if="posts.length > 0">
    <transition-group name="post-list">
      <post-item
        v-for="post in posts"
        :post="post"
        :key="post.id"
        @remove="$emit('remove', post)"
      />
    </transition-group>
  </div>
  <h3
    v-else
    style="color: red"
  >
    Post list is empty
  </h3>
</template>

<script>
import PostItem from '@/components/PostItem';

export default {
  components: {
    PostItem,
  },
  props: {
    posts: {
      type: Array,
      required: true,
    }
  }
}
</script>

<style scoped>
/* Для анимации к нейму transition-group необходимо добавлять следующие кейворды: */
.post-list-item {
  display: inline-block;
}

.post-list-enter-active,
.post-list-leave-active {
  transition: all .5s ease;
}

.post-list-enter-from,
.post-list-leave-to {
  opacity: 0;
  transform: translateX(500px);
}

.post-list-move {
  transition: transform .5s ease;
}
</style>
