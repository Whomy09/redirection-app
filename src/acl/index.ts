import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { useUserSession } from '@/stores/userSession'
import { createAcl, defineAclRules } from 'vue-simple-acl'

export function configAcl() {
  const router = useRouter()
  const userSessionStore = useUserSession()
  const { user } = storeToRefs(userSessionStore)

  const rules = () =>
    defineAclRules((setRule) => {
      setRule('is-user-active', (user) => user.active)
      setRule('is-user-inactive', (user) => !user.active)
    })

  return createAcl({
    user,
    rules,
    router
  })
}
