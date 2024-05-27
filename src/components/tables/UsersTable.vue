<script lang="ts" setup>
import type { IUser } from '@/types/user'
import StatusLabel from '../base/StatusLabel.vue'
import { useSweetalert } from '@/composables/useSweetalert'
import { columnsUserTable as columns } from '@/constants/columns'
import EditUserModal from '@/components/modals/EditUserModal.vue'

defineProps<{
  rows: IUser[]
}>()

const { showQuestion } = useSweetalert()

async function handleDeleteUser() {
  const isConfirm = await showQuestion('¿Seguro que quieres eliminar este usuario?', '')
  if (!isConfirm) return
}
</script>

<template>
  <div>
    <vue-good-table
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
      <template #table-row="_props">
        <div v-if="_props.column.field === 'status'">
          <StatusLabel :status="_props.row.status" />
        </div>
        <div v-if="_props.column.field === 'actions'" class="flex gap-4">
          <EditUserModal :user-prop="_props.row" />
          <!-- <a @click="handleDeleteUser"><i class="fa-solid fa-trash text-xl hover:cursor-pointer"></i></a> -->
        </div>
      </template>
    </vue-good-table>
  </div>
</template>
