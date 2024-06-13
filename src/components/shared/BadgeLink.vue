<script lang="ts" setup>
import Badge from '../ui/badge/Badge.vue'
import { truncateString } from '@/helpers'
import type { Link } from '@/types/redirection'

defineProps<{
  link: Link
}>()

const emit = defineEmits(['action', 'close'])
</script>

<template>
  <div>
    <Badge class="flex gap-3">
      <div class="cursor-pointer" @click="() => emit('action')">
        <span>
          {{ `${link.name} - ${truncateString(link.url, 25)} - ${link.percentage}%` }}
        </span>
      </div>
      <i class="fa-solid fa-xmark hover:cursor-pointer" @click="() => emit('close')" />
    </Badge>
  </div>
</template>
