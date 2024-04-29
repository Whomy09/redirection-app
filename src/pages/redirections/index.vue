<script lang="ts" setup>
import Input from '@/components/ui/input/Input.vue'
import MainLayout from '@/components/layouts/MainLayout.vue'
import RedirectionsTable from '@/components/tables/RedirectionsTable.vue'
import CreateRedirectionModal from '@/components/modals/CreateRedirectionModal.vue';
</script>

<template>
  <MainLayout>
    <h2 class="text-2xl font-bold">Redirections</h2>
    <div class="mt-8">
      <div class="flex gap-4 mb-8">
        <Input type="text" placeholder="Search..." />
        <CreateRedirectionModal />
      </div>
      <RedirectionsTable />
    </div>
  </MainLayout>
</template>
