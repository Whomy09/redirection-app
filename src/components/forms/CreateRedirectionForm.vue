<script lang="ts" setup>
import { ref } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import Input from '../ui/input/Input.vue'
import Badge from '../ui/badge/Badge.vue'
import { truncateString } from '@/helpers'
import Button from '../ui/button/Button.vue'
import type { IRedirectionForm } from '@/types/redirection'
const link = ref('')

const redirection = ref<IRedirectionForm>({
  id: uuidv4(),
  name: '',
  links: []
})

function addLink() {
  redirection.value.links.push(link.value)
  link.value = ''
}

function removeLink(index: number) {
  redirection.value.links = redirection.value.links.filter((_, idx) => idx !== index)
}
</script>

<template>
  <div class="flex flex-wrap gap-4">
    <div class="w-full">
      <label>Id</label>
      <Input v-model="redirection.id" disabled />
    </div>
    <div class="w-full">
      <label>Name</label>
      <Input v-model="redirection.name" />
    </div>
    <div class="w-full">
      <label>Links</label>
      <div class="flex gap-4">
        <Input v-model="link" />
        <Button @click="addLink">
          <i class="fa-solid fa-plus"></i>
        </Button>
      </div>
    </div>

    <div class="flex flex-wrap gap-2">
      <Badge v-for="(link, index) in redirection.links" :key="index" class="flex gap-3">
        <span>
          {{ truncateString(link, 10) }}
        </span>
        <i class="fa-solid fa-xmark hover:cursor-pointer" @click="removeLink(index)" />
      </Badge>
    </div>
  </div>
</template>
