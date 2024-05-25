import { defineStore, storeToRefs } from 'pinia'
import { useStorage } from '@vueuse/core'
import type { IUser } from '@/types/user'
import { auth } from '@/services/firebase'
import { useRedirectionts } from './redirections'

export const useUserSession = defineStore('userSession', () => {
  const redirectionStore = useRedirectionts()

  const { redirections } = storeToRefs(redirectionStore)
  const accessToken = useStorage('redirection_app_access_token', '')

  const user = useStorage<IUser>('redirection_app_user', {
    uid: '',
    name: '',
    role: '',
    email: '',
    status: '',
    active: false,
    firstTimeToEnter: false
  })

  function logout() {
    setAccessToken('')
    setUser({
      uid: '',
      name: '',
      role: '',
      email: '',
      status: '',
      active: false,
      firstTimeToEnter: false
    })
    redirections.value = []
    auth.signOut()
  }

  function setAccessToken(newAccessToken: string) {
    accessToken.value = newAccessToken
  }

  function setUser(newUser: IUser) {
    user.value = newUser
  }

  return {
    user,
    accessToken,
    setUser,
    logout,
    setAccessToken
  }
})
