import Home from '@/pages/Home.vue'
import Login from '@/pages/Login.vue'
import Redirect from '@/pages/redirect.vue'
import WrongRedirect from '@/pages/wrong-redirect.vue'
import Redirections from '@/pages/redirections/index.vue'
import InactiveRedirect from '@/pages/inactive-redirect.vue'
import RedirectionsDetail from '@/pages/redirections/detail.vue'

import { storeToRefs } from 'pinia'
import { useUserSession } from '@/stores/userSession'
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
      path: '/:name',
      name: 'redirect',
      component: Redirect,
      meta: {
        can: 'is-user-active',
        onDeniedRoute: '/login'
      }
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
    },
    {
      path: '/inactive-redirect',
      name: 'inactive-redirect',
      component: InactiveRedirect
    }
  ]
})

router.beforeEach((to, _, next) => {
  const userSession = useUserSession()
  const { user } = storeToRefs(userSession)

  if (to.name !== 'login' && !user.value.active) next({ name: 'login' })
  else next()
})

export default router
