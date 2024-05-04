<script lang="ts" setup>
import { watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserSession } from './stores/userSession'
import Toaster from '@/components/ui/toast/Toaster.vue'
import { useRedirectionts } from './stores/redirections'
import { Redirection } from './services/models/redirection'

const userSessionStore = useUserSession()
const redirectionsStore = useRedirectionts()
const { user } = storeToRefs(userSessionStore)
const { redirections } = storeToRefs(redirectionsStore)

watch(user, async (newUser) => {
  if (newUser.active) {
    redirections.value = await new Redirection().getByUser(user.value.uid) 
  }
})
</script>

<template>
  <div>
    <Toaster />
    <RouterView />
  </div>
</template>
