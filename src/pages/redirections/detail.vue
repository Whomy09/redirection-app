<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Badge from '@/components/ui/badge/Badge.vue'
import Button from '@/components/ui/button/Button.vue'
import type { IRedirection } from '@/types/redirection'
import { useRedirectionts } from '@/stores/redirections'
import StatusLabel from '@/components/base/StatusLabel.vue'
import MainLayout from '@/components/layouts/MainLayout.vue'
import { useNotification } from '@/composables/useNotification'
import { Card, CardDescription, CardTitle } from '@/components/ui/card'

const route = useRoute()
const router = useRouter()
const { toastError } = useNotification()
const redirectionsStore = useRedirectionts()

const redirectionId = route.params.id as string

const isLoading = ref(false)
const redirection = ref<IRedirection>()

async function getRedirection() {
  try {
    isLoading.value = true
    redirection.value = await redirectionsStore.get(redirectionId)
  } catch (error: any) {
    toastError(error.message)
    router.push({ name: 'redirections' })
  } finally {
    isLoading.value = false
  }
}

onMounted(async () => {
  await getRedirection()
})
</script>

<template>
  <MainLayout>
    <h2 class="text-xl font-bold">Detail - {{ redirection?.name }}</h2>

    <Button class="mt-8">
      <router-link :to="{ name: 'redirections' }">
        <i class="fa-solid fa-arrow-left"></i>
      </router-link>
    </Button>

    <Card class="h-1/2 mt-8 p-8">
      <div class="flex justify-between">
        <CardTitle>Links</CardTitle>
        <StatusLabel :status="redirection?.status" />
      </div>
      <CardDescription> Details about your redirect will be displayed here. </CardDescription>

      <div class="flex flex-wrap gap-4 mt-4">
        <Badge v-for="(link, index) in redirection?.links" :key="index">
          {{ link }}
        </Badge>
      </div>
    </Card>
  </MainLayout>
</template>

<style scoped></style>
