<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Redirection } from '@/services/models/redirection'
import type { Link } from '@/types/redirection'

const route = useRoute()
const router = useRouter()

const redirectionName = route.params.name as string

const links = ref<Link[]>([])

function getWeightedIndex() {
  const cumulativeWeights: number[] = []
  let totalWeight = 0

  for (const link of links.value) {
    totalWeight += link.percentage
    cumulativeWeights.push(totalWeight)
  }

  const randomWeight = Math.random() * totalWeight

  for (let i = 0; i < cumulativeWeights.length; i++) {
    if (randomWeight < cumulativeWeights[i]) {
      return i
    }
  }

  return -1
}

function redirectUser() {
  const idxLinkSelected = getWeightedIndex()
  
  if (idxLinkSelected === -1) return
  
  const link = links.value[idxLinkSelected]

  const linkElement = document.createElement('a')
  
  linkElement.href = link.url
  linkElement.click()
}

async function getRedirection() {
  return await new Redirection().getByName(redirectionName)
}

async function handleRedirectUser() {
  try {
    const redirection = await getRedirection()

    if (redirection.status === 'INACTIVE') {
      router.push({ name: 'inactive-redirect' })
      return
    }

    links.value = redirection.links
    redirectUser()
  } catch (error) {
    router.push({ name: 'wrong-redirect' })
  }
}

onMounted(async () => {
  await handleRedirectUser()
})
</script>

<template>
  <div class="h-screen w-screen flex justify-center items-center">
    <h1>Redirecting...</h1>
  </div>
</template>
