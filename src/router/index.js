import { createRouter, createWebHashHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: () => import('@/views/SignUp.vue'),
  },
  {
    path: '/login',
    name: 'LoginPage',
    component: () => import('@/views/LoginPage.vue'),
  },
  {
    path: '/board',
    name: 'Board',
    component: () => import('@/views/Board.vue'),
  },
  {
    path: '/write',
    name: 'Write',
    component: () => import('@/views/Write.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router
