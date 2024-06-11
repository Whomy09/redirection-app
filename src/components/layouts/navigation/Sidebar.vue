<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { getMenus } from '@/constants/menus'
import { useRoute, useRouter } from 'vue-router'
import { useUserSession } from '@/stores/userSession'
import Button from '@/components/ui/button/Button.vue'
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent
} from '@/components/ui/dropdown-menu'

const route = useRoute()
const router = useRouter()

const menus = getMenus()
const userSessionStore = useUserSession()
const { user } = storeToRefs(userSessionStore)

function getClass(name: string) {
  const isActive = route.name === name

  const activeClass = 'bg-gray-100'
  return isActive ? activeClass : ''
}

function handleLogout() {
  userSessionStore.logout()
  router.push({ name: 'login' })
}
</script>

<template>
  <div
    class="hidden border border-slate-50 shadow p-6 lg:flex lg:flex-col lg:justify-between lg:w-[300px]"
  >
    <div>
      <div class="flex items-center gap-4">
        <img src="/assets/logo.png" width="150" height="150" />
        <!-- <i class="fa-solid fa-arrows-up-down-left-right text-xl"></i>
        <h2 class="text-xl font-bold">Redirection App</h2> -->
      </div>

      <div class="flex flex-col gap-4 mt-8">
        <template v-for="{ name, icon, label, visible } in menus" :key="name">
          <router-link
            v-if="visible"
            class="p-2 hover:bg-gray-100 rounded-md transition ease-in"
            :class="getClass(name)"
            :to="{ name }"
          >
            <i :class="icon" class="mr-3" />
            <span>{{ label }}</span>
          </router-link>
        </template>
      </div>
    </div>

    <div class="flex justify-between items-center gap-4">
      <div class="flex items-center gap-4">
        <div class="w-[40px] h-[40px] rounded-full bg-gray-200"></div>
        <span>{{ user.name }}</span>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger>
          <i class="fa-solid fa-ellipsis"></i>
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuItem class="focus:bg-transparent justify-center">
            <Button class="bg-red-500 hover:bg-red-600" @click="handleLogout">Logout</Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </div>
</template>
