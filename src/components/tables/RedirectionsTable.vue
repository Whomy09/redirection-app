<script lang="ts" setup>
import { formatDate } from '@/helpers'
import StatusLabel from '../base/StatusLabel.vue'
import type { IRedirection } from '@/types/redirection'
import { columnsRedirectionTable as columns } from '@/constants/columns'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

defineProps<{
  rows: IRedirection[]
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
      <template #table-row="props">
        <div v-if="props.column.field === 'createdAt'">
          <span>{{ formatDate(props.row.createdAt.seconds || props.row.createdAt) }}</span>
        </div>
        <div v-if="props.column.field === 'status'">
          <StatusLabel :status="props.row.status" />
        </div>
        <div v-if="props.column.field === 'actions'">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger as-child>
                <router-link :to="{ name: 'redirections-detail', params: { id: props.row.id } }">
                  <i class="fa-regular fa-clipboard text-xl hover:cursor-pointer" />
                </router-link>
              </TooltipTrigger>
              <TooltipContent class="bg-gray-900 text-white">
                <p>See details</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </template>

      <template #emptystate>
        <h2 class="text-center p-2">No hay datos en la tabla</h2>
      </template>
    </vue-good-table>
  </div>
</template>
