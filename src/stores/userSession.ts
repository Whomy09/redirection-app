import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import type { ICredentials } from '@/types/auth'
import { Auth } from '@/services/models/auth'
import { useNotification } from '@/composables/useNotification'

const { toastError, toastSuccess } = useNotification()

export const useUserSession = defineStore('userSession', () => {
  const token = useStorage('redirection_app_token', '')
  const refreshToken = useStorage('redirection_app_refresh_token', '')

  const user = useStorage('redirection_app_user', {
    email: '',
    password: '',
    uid: ''
  })

  async function login(credentials: ICredentials) {
    try {
      // const authResponse = await new Auth().login(credentials)
      throw new Error('')
      toastSuccess('Welcome!')
    } catch (error) {
      toastError('Email or password invalid!')
    }
  }

  return {
    user,
    token,
    refreshToken,

    login,
  }
})
