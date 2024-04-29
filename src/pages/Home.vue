<script lang="ts" setup>
import { ref } from 'vue';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button'


const counter = ref(0)
</script>

<template>
  <div class="max-w-4xl mx-auto">
    <Card>
      <h1>Hello World!</h1>
      <Button @click="counter++">send</Button>
      <span>Counter: {{ counter }}</span>
    </Card>
  </div>
</template>