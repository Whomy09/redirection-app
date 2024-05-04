<script lang="ts" setup>
import { computed } from 'vue';
import Badge from '../ui/badge/Badge.vue';

type Status = 'ACTIVE' | 'INACTIVE'
type Types = { label: string, color: string }

const props = defineProps<{
  status: Status | undefined
}>()

const TYPES: Record<Status, Types> = {
  ACTIVE: {
    label: 'Active',
    color: 'bg-green-500'
  },
  INACTIVE: {
    label: 'Inactive',
    color: 'bg-red-500'
  }
}

const type = computed(() => props.status ? TYPES[props.status] : '')
</script>

<template>
  <Badge v-if="type" :class="type.color">{{ type.label }}</Badge>
</template>
