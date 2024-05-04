<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Redirection } from '@/services/models/redirection'

const route = useRoute()
const router = useRouter()

const redirectionId = route.params.id as string

const links = ref<string[]>([])

function getRandomLink() {
  const randomIndex = Math.floor(Math.random() * links.value.length)
  return links.value[randomIndex]
}

function redirectUser() {
  const link = getRandomLink()
  const linkElement = document.createElement('a')
  linkElement.href = link
  linkElement.click()
}

async function getRedirection() {
  const redirection = await new Redirection().getById(redirectionId)
  links.value = redirection.links
}

async function handleRedirectUser() {
  try {
    await getRedirection()
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
