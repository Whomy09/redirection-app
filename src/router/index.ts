import Home from '@/pages/Home.vue'
import Login from '@/pages/Login.vue'
import Redirections from '@/pages/redirections/index.vue'
import RedirectionsDetail from '@/pages/redirections/detail.vue'
import Redirect from '@/pages/redirect.vue'

import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/:id',
      name: 'redirect',
      component: Redirect 
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/redirections',
      name: 'redirections',
      component: Redirections
    },
    {
      path: '/redirections/:id',
      name: 'redirections-detail',
      component: RedirectionsDetail
    },
  ]
})

export default router
