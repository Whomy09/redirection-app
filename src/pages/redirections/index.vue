<script lang="ts" setup>
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useSearch } from '@/composables/useSearch'
import Input from '@/components/ui/input/Input.vue'
import type { IRedirection } from '@/types/redirection'
import { useRedirectionts } from '@/stores/redirections'
import MainLayout from '@/components/layouts/MainLayout.vue'
import RedirectionsTable from '@/components/tables/RedirectionsTable.vue'
import CreateRedirectionModal from '@/components/modals/CreateRedirectionModal.vue'

const redirectionsStore = useRedirectionts()
const { redirections } = storeToRefs(redirectionsStore)

const { isSearching, searchItems, searchTerm } = useSearch<IRedirection>(
  ['name', 'status'],
  redirections
)

const rows = computed(() => (isSearching.value ? searchItems.value : redirections.value))
</script>

<template>
  <MainLayout>
    <h2 class="text-2xl font-bold">Redirections</h2>
    <div class="mt-8">
      <div class="flex gap-4 mb-8">
        <Input v-model="searchTerm" type="text" placeholder="Search..." />
        <CreateRedirectionModal />
      </div>
      <RedirectionsTable v-bind="{ rows }" />
    </div>
  </MainLayout>
</template>
