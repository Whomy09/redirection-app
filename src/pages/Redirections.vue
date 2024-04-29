<script lang="ts" setup>
import MainLayout from '@/components/layouts/MainLayout.vue'
import Badge from '@/components/ui/badge/Badge.vue';
import Button from '@/components/ui/button/Button.vue';
import Input from '@/components/ui/input/Input.vue';
import { ref } from 'vue'

const columns = [
  {
    label: 'ID',
    field: 'id',
  },
  {
    label: 'Name',
    field: 'name',
  },
  {
    label: 'Status',
    field: 'status',
  },
  {
    label: 'Actions',
    field: 'actions',
  }
]

const rows = ref([
  {
    id: '0101011001',
    name: 'Social Network',
    status: 'active'
  }
])
</script>

<template>
  <MainLayout>
    <h2 class="text-2xl font-bold">Redirections</h2>

    <div class="mt-8">
      <div class="flex gap-4 mb-8">
        <Input type="text" placeholder="Search..."/>
        <Button>
          <i class="fa-solid fa-plus"></i>
        </Button>
      </div>

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
        <template #table-row="props">
          <div v-if="props.column.field === 'status'">
            <Badge v-if="props.row.status === 'active'" class="bg-green-500">Active</Badge>
          </div>
          <div v-if="props.column.field === 'actions'">
            <i class="fa-regular fa-clipboard text-xl hover:cursor-pointer" />
          </div>
        </template>
        
        <template #emptystate> 
          <h2 class="text-center p-2">No hay datos en la tabla</h2>
        </template>
      </vue-good-table>
    </div>
  </MainLayout>
</template>
