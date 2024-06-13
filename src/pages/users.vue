<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import type { IUser } from '@/types/user'
import { User } from '@/services/models/user'
import { useSearch } from '@/composables/useSearch'
import Input from '@/components/ui/input/Input.vue'
import UsersTable from '@/components/tables/UsersTable.vue'
import MainLayout from '@/components/layouts/MainLayout.vue'
import CreateUserModal from '@/components/modals/CreateUserModal.vue'
import MultipleSkeleton from '@/components/base/MultipleSkeleton.vue'

const users = ref<IUser[]>([])

const { isSearching, searchItems, searchTerm } = useSearch<IUser>(['name', 'email'], users)

const isLoadingTable = ref(false)

const rows = computed(() => isSearching.value ? searchItems.value : users.value)

onMounted(async () => {
  isLoadingTable.value = true
  users.value = await new User().getAll()
  isLoadingTable.value = false
})
</script>

<template>
  <MainLayout>
    <h2 class="text-2xl font-bold">Users</h2>
    <div class="mt-8">
      <div class="flex gap-4 mb-8">
        <Input v-model="searchTerm" placeholder="Search..." />
        <CreateUserModal />
      </div>
      <div>
        <div v-if="isLoadingTable">
          <MultipleSkeleton :length="10" />
        </div>
        <div v-else>
          <UsersTable v-bind="{ rows }" />
        </div>
      </div>
    </div>
  </MainLayout>
</template>
