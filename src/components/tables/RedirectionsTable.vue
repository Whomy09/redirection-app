<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import Badge from '@/components/ui/badge/Badge.vue'
import type { IRedirection } from '@/types/redirection'
import { Redirection } from '@/services/models/redirection'
import MultipleSkeleton from '../base/MultipleSkeleton.vue'
import { columnsRedirectionTable as columns } from '@/constants/columns'
import { useNotification } from '@/composables/useNotification'

const { toastError } = useNotification()

const isLoading = ref(false)
const rows = ref<IRedirection[]>([])

async function getRedirections() {
  try {
    isLoading.value = true
    rows.value = await new Redirection().getAll()
  } catch (error) {
    toastError('Error in loading redirections')
  } finally {
    isLoading.value = false
  }
}

onMounted(async () => {
  await getRedirections()
})
</script>

<template>
  <div>
    <MultipleSkeleton v-if="isLoading" :length="15" />

    <vue-good-table
      v-else
      v-bind="{ columns, rows }"
      :sort-options="{
        enabled: false
      }"
      :pagination-options="{
        enabled: true,
        mode: 'records',
        perPage: 10,
        position: 'top',
        perPageDropdown: [10, 15, 20],
        dropdownAllowAll: false,
        setCurrentPage: 1,
        nextLabel: 'Siguiente',
        prevLabel: 'Atras',
        rowsPerPageLabel: 'Filas por Pagina',
        ofLabel: 'de',
        pageLabel: 'pagina',
        allLabel: 'Todas'
      }"
      style-class="vgt-table"
    >
      <template #table-row="props">
        <div v-if="props.column.field === 'status'">
          <Badge v-if="props.row.status === 'ACTIVE'" class="bg-green-500">Active</Badge>
          <Badge v-if="props.row.status === 'INACTIVE'" class="bg-red-500">Inactive</Badge>
        </div>
        <div v-if="props.column.field === 'actions'">
          <router-link :to="{ name: 'redirections-detail', params: { id: props.row.id } }">
            <i class="fa-regular fa-clipboard text-xl hover:cursor-pointer" />
          </router-link>
        </div>
      </template>

      <template #emptystate>
        <h2 class="text-center p-2">No hay datos en la tabla</h2>
      </template>
    </vue-good-table>
  </div>
</template>
