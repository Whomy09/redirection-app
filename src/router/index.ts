import Home from '@/pages/Home.vue'
import Users from '@/pages/users.vue'
import Login from '@/pages/Login.vue'
import Redirect from '@/pages/redirect.vue'
import WrongRedirect from '@/pages/wrong-redirect.vue'
import Redirections from '@/pages/redirections/index.vue'
import InactiveRedirect from '@/pages/inactive-redirect.vue'
import RedirectionsDetail from '@/pages/redirections/detail.vue'

import { storeToRefs } from 'pinia'
import { useUserSession } from '@/stores/userSession'
import { createRouter, createWebHistory } from 'vue-router'
import { getPermissions } from '@/constants/permissions'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/:name',
      name: 'redirect',
      component: Redirect,
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
    },
    {
      path: '/redirections',
      name: 'redirections',
      component: Redirections,
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
    },
    {
      path: '/users',
      name: 'users',
      component: Users,
      beforeEnter: (to, from, next) => {
        const { IS_ADMIN } = getPermissions()
        if (IS_ADMIN) next()
        else next({ name: 'home' })
      }
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
