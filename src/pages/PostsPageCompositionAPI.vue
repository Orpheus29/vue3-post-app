<template>
  <!-- ПРИМЕР С ЛАЙКАМИ -->
  <!-- {{ likes }}
  <button @click="addLike">Add like</button> -->
  <div>
    <h2 style="text-transform: uppercase; ">list of posts</h2>

    <my-input
      v-model="searchQuery"
      type="text"
      placeholder="Search..."
      style="margin-top: 10px;"
      v-focus
    />

    <div class="app__btns">
      <my-button @click="showDialogue"> Create post </my-button>

      <my-select
        v-model="selectedSortOption"
        :options="sortOptions"
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
        {value: 'title', name: 'By title'},
        {value: 'body', name: 'By content'},
      ]
    }
  },
  setup() {
    const { posts, totalPages, isPostsLoading, fetching } = usePosts(10);
    const { sortedPosts, selectedSortOption } = useSortPosts(posts);
    const { searchQuery, sortedAndSearchedPosts } = useSortAndSearchPosts(sortedPosts);

    return {
      posts,
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
