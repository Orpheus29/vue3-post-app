import { ref, computed } from 'vue';

export default function useSortAndSearchPosts(sortedPosts) {
  const searchQuery = ref('');
  const sortedAndSearchedPosts = computed(() => {
    return sortedPosts.value.filter(({ title, body }) => title.toLowerCase().includes(searchQuery.value.toLowerCase()) || body.toLowerCase().includes(searchQuery.value.toLowerCase()));
  });

  return {
    searchQuery,
    sortedAndSearchedPosts,
  }
}
