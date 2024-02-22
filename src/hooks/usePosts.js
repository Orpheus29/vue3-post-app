import { onMounted, ref } from 'vue';
import axios from 'axios';


export default function usePosts(limit) {
  const posts = ref([]);
  let page = ref(0);
  const totalPages = ref(0);
  const isPostsLoading = ref(true);
  const fetching = async () => {
    page.value += 1;
    
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
        params: {
          _page: page.value,
          _limit: limit,
        }
      });
      totalPages.value = Math.ceil(response.headers['x-total-count'] / limit); // 101 / 5 = 21
      posts.value = [...posts.value, ...response.data];
    } catch (e) {
      alert('Error');
    } finally {
      isPostsLoading.value = false;
    }
  };

  onMounted(fetching);

  return {
    posts,
    totalPages,
    isPostsLoading,
    fetching,
  }
}
