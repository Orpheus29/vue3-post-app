<template>
  <!-- ПРИМЕР С ЛАЙКАМИ -->
  <!-- {{ likes }}
  <button @click="addLike">Add like</button> -->
  <div>
    <h1 class="main__title">list of posts</h1>

    <my-input
      v-model="searchQuery"
      type="text"
      placeholder="Search..."
      v-focus
    />

    <div class="app__btns">
      <my-button @click="showDialogue"> Create post </my-button>

      <my-select
        v-model="selectedSortOption"
        :options="sortOptions"
        class="btn"
        style="padding: 10px 5px;"
      />
    </div>

    <my-dialogue v-model:show="dialogueVisible">
      <post-form @create="createPost" />
    </my-dialogue>

    <post-list
      :posts="sortedAndSearchedPosts"
      @remove="removePost"
      v-if="!isPostsLoading"
    />

    <div v-else>Loading...</div>

    <div
      v-intersection="fetching"
      class="observer"
    ></div>
  </div>
</template>

<script>
import PostForm from '@/components/PostForm.vue';
import PostList from '@/components/PostList.vue';
import usePosts from '@/hooks/usePosts';
import useSortPosts from '@/hooks/useSortPosts';
import useSortAndSearchPosts from '@/hooks/useSortAndSearchPosts';

export default {
  name: 'App',
  components: {
    PostForm,
    PostList,
  },
  data() {
    return {
      dialogueVisible: false,
      sortOptions: [
        {value: 'ID', name: 'By ID'},
        {value: 'title', name: 'By title'},
        {value: 'body', name: 'By content'},
      ]
    }
  },
  setup() {
    const { posts, page, totalPages, isPostsLoading, fetching } = usePosts(10);
    const { sortedPosts, selectedSortOption } = useSortPosts(posts);
    const { searchQuery, sortedAndSearchedPosts } = useSortAndSearchPosts(sortedPosts);

    return {
      posts,
      page,
      totalPages,
      sortedPosts,
      searchQuery,
      isPostsLoading,
      selectedSortOption,
      sortedAndSearchedPosts,
      fetching,
    }
    // ПРИМЕР С ЛАЙКАМИ
    // const likes = ref(2);

    // const addLike = () => {
    //   likes.value += 1;
    // }

    // return {
    //   likes,
    //   addLike,
    //   props,
    // }
  },
  methods: {
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
  height: 8px;
  background-color: rgba(0, 128, 128, .3);
  margin-top: -2px;
}
</style>
