import { storeToRefs } from 'pinia'
import { useUserSession } from '@/stores/userSession'

export function getPermissions() {
  const userSession = useUserSession()
  const { user } = storeToRefs(userSession)

  const IS_ADMIN = user.value.role === 'ADMIN'
  const IS_CLIENT = user.value.role === 'CLIENT'
  const IS_ACTIVE = user.value.active

  return {
    IS_ADMIN,
    IS_CLIENT,
    IS_ACTIVE,
  }
}
