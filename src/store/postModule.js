import axios from 'axios';

export const postModule = {
  state: () => ({
    posts: [],
    isPostsLoading: true,
    selectedSortOption: '',
    searchQuery: '',
    page: 0,
    limit: 10,
    totalPages: 0,
    sortOptions: [
      { value: 'title', name: 'By title' },
      { value: 'body', name: 'By content' },
    ]
  }),
  getters: {
    sortPosts(state) {
      return [...state.posts].sort((post1, post2) => post1[state.selectedSortOption]?.localeCompare(post2[state.selectedSortOption]));
    },
    sortAndSearchPosts(state, getters) {
      return getters.sortPosts.filter(({ title, body }) => title.toLowerCase().includes(state.searchQuery.toLowerCase()) || body.toLowerCase().includes(state.searchQuery.toLowerCase())); // (!)предыдущая функция вызывается без скобок
    },
  },
  mutations: {
    setPosts(state, posts) {
      state.posts = posts;
    },
    setLoading(state, bool) {
      state.isPostsLoading = bool;
    },
    setPage(state, page) {
      state.page = page;
    },
    setSelectedSortOption(state, selectedSortOption) {
      state.selectedSortOption = selectedSortOption;
    },
    setTotalPages(state, totalPages) {
      state.totalPages = totalPages;
    },
    setSearchQuery(state, searchQuery) {
      state.searchQuery = searchQuery;
    },
  },
  actions: {
    async fetchPosts({ state, commit }) {
      try {
        // БЕСКОНЕЧНАЯ ПОДГРУЗКА ПОСТОВ
        commit('setPage', state.page + 1);
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _page: state.page,
            _limit: state.limit,
          }
        });
        commit('setTotalPages', Math.ceil(response.headers['x-total-count'] / state.limit)); // 101 / 5 = 21
        // ПАГИНАЦИЯ
        // commit('setPosts', response.data);
        // БЕСКОНЕЧНАЯ ПОДГРУЗКА ПОСТОВ
        commit('setPosts', [...state.posts, ...response.data]);
      } catch (e) {
        alert('Error');
      }
      finally {
        commit('setLoading', false);
      }
    },
  },
  namespaced: true,
}