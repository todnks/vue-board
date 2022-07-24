import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/:writer',
    name: 'writer',
    component: HomeView
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: () => import('@/views/SignUp.vue'),
    meta: {
      header: true
    }
  },
  {
    path: '/login',
    name: 'LoginPage',
    component: () => import('@/views/LoginPage.vue'),
    meta: {
      header: true
    }
  },
  {
    path: '/board/:idx',
    name: 'Board',
    component: () => import('@/views/BBoard.vue')
  },
  {
    path: '/profile/:idx',
    name: 'Profilepage',
    component: () => import('@/views/BProfile.vue')
  },
  {
    path: '/write',
    name: 'Write',
    component: () => import('@/views/BWrite.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.afterEach((to) => {
  to.meta.header ? document.body.classList.add('member-back') : document.body.classList.remove('member-back')
})

export default router
