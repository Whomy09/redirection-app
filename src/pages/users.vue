<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import type { IUser } from '@/types/user'
import { useUsers } from '@/stores/users'
import { User } from '@/services/models/user'
import { computed, onMounted, ref } from 'vue'
import { useSearch } from '@/composables/useSearch'
import Input from '@/components/ui/input/Input.vue'
import UsersTable from '@/components/tables/UsersTable.vue'
import MainLayout from '@/components/layouts/MainLayout.vue'
import { useNotification } from '@/composables/useNotification'
import CreateUserModal from '@/components/modals/CreateUserModal.vue'
import MultipleSkeleton from '@/components/base/MultipleSkeleton.vue'

const usersStore = useUsers()
const { setUsers } = usersStore
const { toastError } = useNotification()
const { users } = storeToRefs(usersStore)

const { isSearching, searchItems, searchTerm } = useSearch<IUser>(['name', 'email'], users)

const isLoadingTable = ref(false)

const rows = computed(() => (isSearching.value ? searchItems.value : users.value))

async function getUsers() {
  try {
    isLoadingTable.value = true
    const usersResponse = await new User().getAll()
    setUsers(usersResponse)
  } catch (error) {
    toastError(`Error al obtener los usuarios ${error}`)
  } finally {
    isLoadingTable.value = false
  }
}

onMounted(async () => {
  await getUsers()
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
