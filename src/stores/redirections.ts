import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import { Redirection } from '@/services/models/redirection'
import type { IRedirection, IRedirectionForm } from '@/types/redirection'

export const useRedirectionts = defineStore('redirections', () => {
  const redirectionDB = new Redirection()

  const redirections = useStorage<IRedirection[]>('redirecton_app_redirections', [])

  async function createRedirection(redirectionData: IRedirectionForm) {
    const redirection = await redirectionDB.create(redirectionData)
    redirections.value.push(redirection as IRedirection)
  }

  async function updateRedirection(id: string, data: Partial<IRedirection>) {
    await redirectionDB.update(id, data)
    const searchedRedirect = redirections.value.find((redirection) => redirection.id === id)
    if (!searchedRedirect) return
    redirections.value = redirections.value.map((redirection) => {
      if (redirection.id === id) {
        return { ...searchedRedirect, ...data }
      }
      return redirection
    })
  }

  async function getRedirection(id: string) {
    const searchedRedirect = redirections.value.find((redirection) => redirection.id === id)
    if (searchedRedirect) return searchedRedirect
    return await redirectionDB.getById(id)
  }

  function clearRedirections() {
    redirections.value = []
  }

  return {
    redirections,
    getRedirection,
    createRedirection,
    updateRedirection,
    clearRedirections
  }
})
