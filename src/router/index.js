import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue')
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
