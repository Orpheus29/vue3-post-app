<template>
  <div class="post">
    <div>
      <div>
        <strong>{{ post.id }}</strong>
      </div>
      <div><strong>Title: </strong>{{ post.title }}</div>
      <div><strong>Body: </strong>{{ post.body }}</div>
    </div>
    <div class="post__btns">
      <my-button @click="$router.push(`/posts/${post.id}`)"> Open </my-button>
      <my-button @click="$emit('remove', post)"> Remove </my-button>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    post: {
      type: Object,
      required: true,
    }
  },
}
</script>

<style scoped>
.post {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  margin-top: 15px;
  border: 2px solid teal;
  border-radius: 5px;
}

.post__btns {
  display: flex;
  gap: 10px;
  margin-left: 10px;
}
</style>
