import MainPage from '@/pages/MainPage';
import PostsPage from '@/pages/PostsPage';
import AboutPage from '@/pages/AboutPage';
import PostIDPage from '@/pages/PostIDPage';
import PostsPageWithStore from '@/pages/PostsPageWithStore';
import PostsPageCompositionAPI from '@/pages/PostsPageCompositionAPI';
import { createRouter, createWebHistory } from 'vue-router';

const routes =[
  {
    path: '/',
    component: MainPage,
  },
  {
    path: '/posts',
    component: PostsPage,
  },
  {
    path: '/about',
    component: AboutPage,
  },
  {
    path: '/posts/:id',
    component: PostIDPage,
  },
  {
    path: '/store',
    component: PostsPageWithStore,
  },
  {
    path: '/composition',
    component: PostsPageCompositionAPI,
  },
];

const router = createRouter({
  routes,
  base: '/vue3-post-app/',
  history: createWebHistory(process.env.BASE_URL)
});

export default router;