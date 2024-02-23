<template>
  <!-- <h1 style="text-transform: uppercase; ">
    {{ $store.getters.doubleLikes }}
  </h1>
  <div>
    <my-button @click="$store.commit('incrementLikes')">+</my-button>
    <my-button @click="$store.commit('decrementLikes')">-</my-button>
  </div> -->
  <h1 class="main__title">list of posts</h1>

  <my-input
    :modelValue="searchQuery"
    @update:modelValue="setSearchQuery"
    placeholder="Search..."
    :autoFocus="true"
  />

  <div class="app__btns">
    <my-button @click="showDialogue"> Create post </my-button>

    <my-select
      :modelValue="selectedSortOption"
      @update:modelValue="setSelectedSortOption"
      :options="sortOptions"
      class="btn"
      style="padding: 10px 5px;"
    />
  </div>

  <my-dialogue v-model:show="dialogueVisible">
    <post-form @create="createPost" />
  </my-dialogue>

  <post-list
    :posts="sortAndSearchPosts"
    @remove="removePost"
    v-if="!isPostsLoading"
  />

  <div v-else>Loading...</div>

  <div
    v-intersection="fetchPosts"
    class="observer"
  ></div>
</template>

<script>
import PostForm from '@/components/PostForm.vue';
import PostList from '@/components/PostList.vue';
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';

export default {
  name: 'App',
  components: {
    PostForm, PostList,
  },
  data() {
    return {
      dialogueVisible: false,
    }
  },
  methods: {
    ...mapMutations({
      setPage: 'post/setPage',
      setSearchQuery: 'post/setSearchQuery',
      setSelectedSortOption: 'post/setSelectedSortOption',
    }),
    ...mapActions({
      fetchPosts: 'post/fetchPosts',
    }),
    createPost(post) {
      this.posts.push(post);
      this.dialogueVisible = false;
    },
    removePost(post) {
      this.posts = this.posts.filter(
        p => p.id !== post.id
      );
    },
    showDialogue() {
      this.dialogueVisible = true;
    },
  },
  mounted() {
    this.fetchPosts();
  },
  computed: {
    ...mapState({
      posts: state => state.post.posts,
      isPostsLoading: state => state.post.isPostsLoading,
      selectedSortOption: state => state.post.selectedSortOption,
      searchQuery: state => state.post.searchQuery,
      page: state => state.post.page,
      limit: state => state.post.limit,
      totalPages: state => state.post.totalPages,
      sortOptions: state => state.post.sortOptions,
    }),
    ...mapGetters({
      sortPosts: 'post/sortPosts',
      sortAndSearchPosts: 'post/sortAndSearchPosts',
    }),
  },
}
</script>

<style>
.main__title {
  text-transform: uppercase;
  margin-bottom: 15px;
  text-align: center;
}

.app__btns {
  display: flex;
  justify-content: space-between;
  margin-block: 15px;
}

.observer {
  height: 10px;
  background-color: teal;
  border-radius: 3px;
}
</style>
