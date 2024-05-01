import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import type { IUser } from '@/types/user'
import { Auth } from '@/services/models/auth'
import type { ICredentials } from '@/types/auth'

export const useUserSession = defineStore('userSession', () => {
  const accessToken = useStorage('redirection_app_access_token', '')

  const user = useStorage('redirection_app_user', {
    uid: '',
    name: '',
    email: '',
    active: false
  })

  async function login(credentials: ICredentials) {
    const loginResponse = await new Auth().login(credentials)
    setAccessToken(loginResponse.accessToken)
    setUser({
      active: true,
      name: 'Admin',
      uid: loginResponse.uid,
      email: credentials.email,
    })
  }

  function logout() {
    setAccessToken('')
    setUser({
      active: false,
      email: '',
      name: '',
      uid: ''
    })
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
    login,
    setUser,
    logout,
    setAccessToken
  }
})
