import { ref } from 'vue'
import { defineStore } from 'pinia'
import { copyObject } from '@/helpers'
import type { IUser } from '@/types/user'

export const useUsers = defineStore('users', () => {
  const users = ref<IUser[]>([])

  function setUsers(newUsers: IUser[]) {
    users.value = copyObject(newUsers)
  }

  function setUser(newUser: IUser) {
    users.value = users.value.map((oldUser) => (oldUser.uid === newUser.uid ? newUser : oldUser))
  }

  function addUser(newUser: IUser) {
    users.value.push(newUser)
  }

  return {
    users,
    addUser,
    setUser,
    setUsers
  }
})
