<script lang="ts" setup>
import Badge from '../ui/badge/Badge.vue';

type Status = 'ACTIVE' | 'INACTIVE'
type Types = { label: string, color: string }

const props = withDefaults(defineProps<{
  status: Status  
}>(),
{
  status: 'ACTIVE'
})

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

const type = TYPES[props.status]
</script>

<template>
  <Badge :class="type.color">{{ type.label }}</Badge>
</template>
