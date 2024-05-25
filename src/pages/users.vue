<script lang="ts" setup>
import Input from '@/components/ui/input/Input.vue'
import MainLayout from '@/components/layouts/MainLayout.vue'
import CreateUserModal from '@/components/modals/CreateUserModal.vue'
</script>

<template>
  <MainLayout>
    <h2 class="text-2xl font-bold">Users</h2>
    <div class="mt-8">
      <div class="flex gap-4">
        <Input type="text" placeholder="Search..."/>
        <CreateUserModal />
      </div>
    </div>
  </MainLayout>
</template>
