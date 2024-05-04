import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import { Redirection } from '@/services/models/redirection'
import type { IRedirection, IRedirectionForm } from '@/types/redirection'

export const useRedirectionts = defineStore('redirections', () => {
  const redirectionDB = new Redirection()

  const redirections = useStorage<IRedirection[]>('redirecton_app_redirections', [])

  async function create(uid: string, redirectionData: IRedirectionForm) {
    const redirection = await redirectionDB.create(uid, redirectionData)
    redirections.value.push(redirection as IRedirection)
  }

  async function update(id: string, data: Partial<IRedirection>) {
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

  async function get(id: string): Promise<IRedirection> {
    const searchedRedirect = redirections.value.find((redirection) => redirection.id === id)
    if (searchedRedirect) return searchedRedirect
    return await redirectionDB.getById(id)
  }

  function clearRedirections() {
    redirections.value = []
  }

  return {
    redirections,
    get,
    create,
    update,
    clearRedirections
  }
})
