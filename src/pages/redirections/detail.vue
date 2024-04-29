<script lang="ts" setup>
import MainLayout from '@/components/layouts/MainLayout.vue';
import Badge from '@/components/ui/badge/Badge.vue';
import Button from '@/components/ui/button/Button.vue';
import { Card, CardDescription, CardTitle } from '@/components/ui/card';
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()

const links = ref([
  'https://www.facebook.com/',
  'https://www.instagram.com/',
  'https://twitter.com/home'
])
</script>

<template>
  <MainLayout>
    <h2 class="text-xl font-bold">Detail - {{ route.params.id }}</h2>

    <Button class="mt-8">
      <router-link :to="{ name: 'redirections' }">
        <i class="fa-solid fa-arrow-left"></i>
      </router-link>
    </Button>

    <Card class="h-1/2 mt-8 p-8">
      <CardTitle>
        Links
      </CardTitle>
      <CardDescription>
        Details about your redirect will be displayed here.
      </CardDescription>

      <div class="flex flex-wrap gap-4 mt-4">
        <Badge v-for="(link, index) in links" :key="index">
          {{ link }}
        </Badge>
      </div>
    </Card>
  </MainLayout>
</template>

<style scoped></style>
