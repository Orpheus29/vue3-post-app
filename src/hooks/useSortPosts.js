import { ref, computed } from 'vue';

export default function useSortPosts(posts) {
  const selectedSortOption = ref('');
  const sortedPosts = computed(() => {
    return [...posts.value].sort((post1, post2) => post1[selectedSortOption.value]?.localeCompare(post2[selectedSortOption.value]));
  });

  return {
    selectedSortOption,
    sortedPosts,
  }
}
