<template>
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
      :posts="sortAndSearchPosts"
      @remove="removePost"
      v-if="!isPostsLoading"
    />

    <div v-else>Loading...</div>

    <!-- БЕСКОНЕЧНАЯ ПОДГРУЗКА ПОСТОВ, ТЕПЕРЬ ВЫНЕСЕНА В ОТДЕЛЬНУЮ ДИРЕКТИВУ v-intersection-->
    <!-- div ref="observer" /div-->
    <div
      v-intersection="fetchPosts"
      class="observer"
    ></div>

    <!-- ПАГИНАЦИЯ -->
    <!-- <div class="page__wrapper">
      <div
        v-for="pageNumber in totalPages"
        :key="pageNumber"
        class="page"
        :class="{
          'current-page': pageNumber === page,
        }"
        @click="changePage(pageNumber)"
      >
        {{ pageNumber }}
      </div>
    </div> -->
  </div>
</template>

<script>
import PostForm from '@/components/PostForm.vue';
import PostList from '@/components/PostList.vue';
import axios from 'axios';

export default {
  name: 'App',
  components: {
    PostForm, PostList,
  },
  data() {
    return {
      posts: [],
      dialogueVisible: false,
      isPostsLoading: true,
      searchQuery: '',
      // БЕСКОНЕЧНАЯ ПОДГРУЗКА ПОСТОВ
      page: 0,
      // ПАГИНАЦИЯ
      // page: 1,
      limit: 10,
      totalPages: 0,
      selectedSortOption: '',
      sortOptions: [
        {value: 'ID', name: 'By ID'},
        {value: 'title', name: 'By title'},
        {value: 'body', name: 'By content'},
      ]
    }
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
    // ПАГИНАЦИЯ
    // changePage(pageNumber) {
    //   this.page = pageNumber;
    //   this.fetchPosts(); // как вариант, вместо добавления этой строки в changePage можно сделать:
    //   // watch: {
    //     // page() {
    //       // this.fetchPosts();
    //     // }
    //   // }
    // },
    async fetchPosts() {
      try {
        // БЕСКОНЕЧНАЯ ПОДГРУЗКА ПОСТОВ
        this.page += 1;
        // ПАГИНАЦИЯ
        // this.isPostsLoading = true;
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _page: this.page,
            _limit: this.limit,
          }
        });
        if (!this.totalPages) {
          this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit); // 101 / 5 = 21
        }
        // ПАГИНАЦИЯ
        // this.posts = response.data;
        // БЕСКОНЕЧНАЯ ПОДГРУЗКА ПОСТОВ
        this.posts = [...this.posts, ...response.data];
      } catch (e) {
        alert('Error');
      }
      finally {
        this.isPostsLoading = false;
      }
    },
  },
  mounted() {
    this.fetchPosts();
    // БЕСКОНЕЧНАЯ ПОДГРУЗКА ПОСТОВ
    // const options = {
    //   rootMargin: '0px',
    //   threshold: 1.0,
    // }
    // const callback = (entries) => {
    //   if (entries[0].isIntersecting && this.page < this.totalPages) {
    //     this.fetchPosts();
    //   }
    // }
    // const observer = new IntersectionObserver(callback, options);
    // observer.observe(this.$refs.observer);
  },
  computed: {
    sortPosts() { // в computed у функции может быть любое название
      return [...this.posts].sort((post1, post2) => post1[this.selectedSortOption]?.localeCompare(post2[this.selectedSortOption]));
    },
    sortAndSearchPosts() {
      return this.sortPosts.filter(({ title, body }) => title.toLowerCase().includes(this.searchQuery.toLowerCase()) || body.toLowerCase().includes(this.searchQuery.toLowerCase())); // (!)предыдущая функция вызывается без скобок
    },
  },
  // watch: {
  //   selectedSortOption(newValue) { // в watch функция-наблюдатель должна иметь такое же название, как и модель
  //     this.posts.sort((post1, post2) => post1[newValue]?.localeCompare(post2[newValue]));
  //     // в данном случае newValue - примитив, но если это будет объект, необходимо включиать глубокое отслеживание объекта:
  //     // watch: {
  //     //   post: {
  //     //     handler(newValue) {...},
  //     //     deep: true,
  //     //   }
  //     // }
  //   },
  // },
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

/* ПАГИНАЦИЯ */
/* .page__wrapper {
  display: flex;
  margin-top: 15px;
}

.page {
  border: 1px solid black;
  padding: 5px 10px;
  cursor: pointer;
}

.current-page {
  border: 2px solid teal;
  background-color: teal;
  color: white
} */

.observer {
  height: 10px;
  background-color: teal;
  border-radius: 3px;
}
</style>
