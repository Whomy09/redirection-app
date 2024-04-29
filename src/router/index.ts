import Home from '@/pages/Home.vue'
import Login from '@/pages/Login.vue'
import Redirections from '@/pages/Redirections.vue'
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
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/redirections',
      name: 'redirections',
      component: Redirections
    },
  ]
})

export default router
