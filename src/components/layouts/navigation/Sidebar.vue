<script lang="ts" setup>
import { useRoute } from 'vue-router'
import { menus } from '@/constants/menus'

const route = useRoute()

function getClass(name: string) {
  const isActive = route.name === name

  const activeClass = 'bg-gray-100'
  return isActive ? activeClass : ''
}
</script>

<template>
  <div>
    <div
      class="hidden border border-slate-50 shadow p-6 lg:flex lg:flex-col lg:justify-between lg:w-[300px]"
    >
      <div>
        <div class="flex items-center gap-4">
          <i class="fa-solid fa-arrows-up-down-left-right text-xl"></i>
          <h2 class="text-xl font-bold">Redirection App</h2>
        </div>

        <div class="flex flex-col gap-4 mt-8">
          <router-link
            v-for="{ name, icon, label } in menus"
            :key="name"
            class="p-2 hover:bg-gray-100 rounded-md transition ease-in"
            :class="getClass(name)"
            :to="{ name }"
          >
            <i :class="icon" class="mr-3" />
            <span>{{ label }}</span>
          </router-link>
        </div>
      </div>

      <div class="flex items-center gap-4">
        <div class="w-[40px] h-[40px] rounded-full bg-gray-200"></div>
        Jesús Berdugo
      </div>
    </div>
  </div>
</template>
