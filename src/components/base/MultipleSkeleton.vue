<script lang="ts" setup>
import { Skeleton } from '@/components/ui/skeleton'

defineProps<{
  length: number
}>()
</script>

<template>
  <div class="flex flex-col gap-3">
    <Skeleton v-for="(_, index) in length" :key="index" class="h-5" />
  </div>
</template>
