<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import type { IUser } from '@/types/user'
import { User } from '@/services/models/user'
import Input from '@/components/ui/input/Input.vue'
import UsersTable from '@/components/tables/UsersTable.vue'
import MainLayout from '@/components/layouts/MainLayout.vue'
import CreateUserModal from '@/components/modals/CreateUserModal.vue'

const rows = ref<IUser[]>([])

onMounted(async () => {
  rows.value = await new User().getAll()
})
</script>

<template>
  <MainLayout>
    <h2 class="text-2xl font-bold">Users</h2>
    <div class="mt-8">
      <div class="flex gap-4 mb-8">
        <Input type="text" placeholder="Search..." />
        <CreateUserModal />
      </div>
      <UsersTable v-bind="{ rows }" />
    </div>
  </MainLayout>
</template>
