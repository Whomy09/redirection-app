<script lang="ts" setup>
import { ref } from 'vue';
import { Button } from '@/components/ui/button'

const counter = ref(0)
</script>

<template>
  <div>
    <h1>Hello World!</h1>
    <Button @click="counter++">send</Button>
    <span>Counter: {{ counter }}</span>
  </div>
</template>