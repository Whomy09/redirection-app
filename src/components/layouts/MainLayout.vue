<script lang="ts" setup>
import { useRoute } from 'vue-router'
import { menus } from '@/constants/menus'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'

const route = useRoute()

function getClass(name: string) {
  const isActive = route.name === name

  const activeClass = 'bg-gray-100'
  return isActive ? activeClass : ''
}
</script>

<template>
  <div class="h-screen flex flex-col lg:flex-row">
    <!-- navbar mobile -->
    <div class="flex justify-between w-full p-4 h-[70px] lg:hidden">
      <Sheet>
        <SheetTrigger>
          <i class="fa-solid fa-bars text-2xl"></i>
        </SheetTrigger>

        <SheetContent side="left">
          <div class="flex flex-col gap-4 mt-8">
            <RouterLink
              v-for="{ name, icon, label } in menus"
              :key="name"
              class="p-2 hover:bg-gray-100 rounded-md transition ease-in"
              :class="getClass(name)"
              to="{ name }"
            >
              <i :class="icon" class="mr-3" />
              <span>{{ label }}</span>
            </RouterLink>
          </div>
        </SheetContent>
      </Sheet>

      <div class="w-[40px] h-[40px] rounded-full bg-gray-200"></div>
    </div>

    <!-- sidebar -->
    <div class="hidden border border-slate-50 shadow p-6 lg:flex lg:flex-col lg:justify-between lg:w-[300px]">
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

    <div class="w-full p-4 lg:p-6">
      <slot />
    </div>
  </div>
</template>
