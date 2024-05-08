<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { menus } from '@/constants/menus'
import { useRoute, useRouter } from 'vue-router'
import { useUserSession } from '@/stores/userSession'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent
} from '@/components/ui/dropdown-menu'
import Button from '@/components/ui/button/Button.vue'

const route = useRoute()
const router = useRouter()
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
  <div>
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
              :to="{ name }"
            >
              <i :class="icon" class="mr-3" />
              <span>{{ label }}</span>
            </RouterLink>
          </div>
        </SheetContent>
      </Sheet>

      <div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div class="flex items-center gap-4">
              <span>{{ user.name }}</span>
              <div class="w-[40px] h-[40px] rounded-full bg-gray-200"></div>
            </div>
          </DropdownMenuTrigger>

          <DropdownMenuContent>
            <DropdownMenuItem class="focus:bg-transparent justify-center">
              <Button class="bg-red-500 hover:bg-red-600" @click="handleLogout">Logout</Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  </div>
</template>
