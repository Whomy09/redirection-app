<script setup lang="ts">
defineProps<{
  v$: Record<string, any>
}>()
</script>

<template>
  <span v-for="error in v$.$errors" :key="error.$uid" class="text-red-500 text-sm mt-2">
    {{ error.$message }}
  </span>
</template>
