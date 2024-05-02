<script lang="ts" setup>
import { ref } from 'vue';
import Input from '../ui/input/Input.vue'
import Badge from '../ui/badge/Badge.vue'
import { truncateString } from '@/helpers'
import Button from '../ui/button/Button.vue'

const link = ref('')
const links = ref<string[]>([])

function addLink() {
  links.value.push(link.value)
  link.value = ''
}

function removeLink(index: number) {
  links.value = links.value.filter((_, idx) => idx !== index)
}
</script>

<template>
  <div class="flex flex-wrap gap-4">
    <div class="w-full">
      <label>Id</label>
      <Input disabled />
    </div>
    <div class="w-full">
      <label>Name</label>
      <Input />
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
      <Badge v-for="(link, index) in links" :key="index" class="flex gap-3">
        <span>
          {{ truncateString(link, 10) }}
        </span>
        <i class="fa-solid fa-xmark hover:cursor-pointer" @click="removeLink(index)" />
      </Badge>
    </div>
  </div>
</template>
