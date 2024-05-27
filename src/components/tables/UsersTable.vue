<script lang="ts" setup>
import type { IUser } from '@/types/user'
import StatusLabel from '../base/StatusLabel.vue'
import { columnsUserTable as columns } from '@/constants/columns'
import EditUserModal from '@/components/modals/EditUserModal.vue'

defineProps<{
  rows: IUser[]
}>()
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
        <div v-if="_props.column.field === 'actions'">
          <EditUserModal :user-prop="_props.row" />
        </div>
      </template>
    </vue-good-table>
  </div>
</template>
