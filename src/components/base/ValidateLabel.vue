<script setup lang="ts">
defineProps<{
  v$: Record<string, any>
}>()
</script>

<template>
  <div class="flex flex-col">
    <span v-for="error in v$.$errors" :key="error.$uid" class="text-red-500 text-xs mt-2">
      {{ error.$message }}
    </span>
  </div>
</template>
