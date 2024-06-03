<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Badge from '@/components/ui/badge/Badge.vue'
import Button from '@/components/ui/button/Button.vue'
import type { IRedirection } from '@/types/redirection'
import { useRedirectionts } from '@/stores/redirections'
import StatusLabel from '@/components/base/StatusLabel.vue'
import { useSweetalert } from '@/composables/useSweetalert'
import MainLayout from '@/components/layouts/MainLayout.vue'
import { useNotification } from '@/composables/useNotification'
import { Card, CardDescription, CardTitle } from '@/components/ui/card'
import EditRedirectionModal from '@/components/modals/EditRedirectionModal.vue'
import Statistics from '@/components/Statistics.vue'

const route = useRoute()
const router = useRouter()
const { showQuestion } = useSweetalert()
const redirectionsStore = useRedirectionts()
const { toastError, toastSuccess } = useNotification()

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

async function updateRedirectionStatus() {
  const isConfirmed = await showQuestion(
    'Importante',
    '¿Estas seguro de que quieres cambiar el estado?'
  )
  if (!isConfirmed) return
  const newStatus = redirection.value?.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE'
  await redirectionsStore.update(redirectionId, { status: newStatus })
  getRedirection()
}

function copyToClipboard() {
  if (!redirection.value) return
  navigator.clipboard.writeText(`https://redirection-app-141e9.web.app/${redirection.value.name}`)
  toastSuccess('Link copied to clipboard')
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

    <Card class="mt-8 p-8">
      <div class="flex justify-between">
        <CardTitle>Links</CardTitle>
        <div class="flex gap-4">
          <button class="hover:cursor-pointer">
            <StatusLabel :status="redirection?.status" @click="updateRedirectionStatus" />
          </button>
          <EditRedirectionModal
            :redirection-prop="redirection as IRedirection"
            @update="getRedirection"
          />
        </div>
      </div>
      <CardDescription class="flex flex-col gap-1">
        <div class="flex gap-1 items-center">
          <span class="font-bold text-gray-900">Redirection link:</span>
          <span>{{ `https://redirection-app-141e9.web.app/${redirection?.name}` }}</span>
          <i
            class="fa-solid fa-copy text-lg text-black hover:cursor-pointer"
            @click="copyToClipboard"
          />
        </div>
        <p>Details about your redirect will be displayed here.</p>
      </CardDescription>

      <div class="flex flex-wrap gap-1 mt-4">
        <Badge v-for="({ percentage, url, name }, index) in redirection?.links" :key="index">
          {{ `${name} - ${url} - ${percentage}%` }}
        </Badge>
      </div>

      <div class="mt-6">
        <Statistics />
      </div>
    </Card>
  </MainLayout>
</template>
