import Home from '@/pages/Home.vue'
import Login from '@/pages/Login.vue'
import Redirect from '@/pages/redirect.vue'
import WrongRedirect from '@/pages/wrong-redirect.vue'
import Redirections from '@/pages/redirections/index.vue'
import RedirectionsDetail from '@/pages/redirections/detail.vue'

import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        can: 'is-user-active',
        onDeniedRoute: '/login'
      }
    },
    {
      path: '/:id',
      name: 'redirect',
      component: Redirect
    },
    {
      path: '/wrong-redirect',
      name: 'wrong-redirect',
      component: WrongRedirect
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        can: 'is-user-inactive',
        onDeniedRoute: '/'
      }
    },
    {
      path: '/redirections',
      name: 'redirections',
      component: Redirections,
      children: []
    },
    {
      path: '/redirections/:id',
      name: 'redirections-detail',
      component: RedirectionsDetail
    }
  ]
})

export default router
