<template>
  <form
    class="form"
    @submit.prevent
  >
    <h4>Create post</h4>

    <my-input
      v-model="post.title"
      type="text"
      placeholder="Title"
      :autoFocus="true"
    />

    <my-input
      v-model="post.body"
      type="text"
      placeholder="Content"
    />

    <my-button @click="validateAndCreatePost">Create post</my-button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      post: {
        title: '',
        body: '',
      },
    }
  },
  methods: {
    validateAndCreatePost() {
      if (this.post.title !== '' && this.post.body !== '') {
        this.post.id = Date.now();
        this.$emit('create', this.post);
        this.post = { title: '', body: '' };
      }
    },
  },
}
</script>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}
</style>
