<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue'
import { ROLES } from '@/constants/roles'
import { USER_STATUS } from '@/constants'
import type { IUser } from '@/types/user'
import Input from '@/components/ui/input/Input.vue'
import Button from '@/components/ui/button/Button.vue'
import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogFooter,
  DialogContent,
  DialogTrigger,
  DialogDescription
} from '@/components/ui/dialog'
import {
  Select,
  SelectItem,
  SelectGroup,
  SelectValue,
  SelectContent,
  SelectTrigger
} from '@/components/ui/select'
import { MESSAGE_ALPHA, MESSAGE_REQUIRED } from '@/constants/rules'
import useVuelidate from '@vuelidate/core'
import ValidateLabel from '../base/ValidateLabel.vue'

const rules = {
  name: {
    MESSAGE_REQUIRED,
    MESSAGE_ALPHA
  },
  role: {
    MESSAGE_REQUIRED
  },
  status: {
    MESSAGE_REQUIRED
  }
}

const props = defineProps<{
  userProp: IUser
}>()

const user = ref<IUser>({
  uid: '',
  role: '',
  name: '',
  email: '',
  status: '',
  firstTimeToEnter: false
})

const v$ = useVuelidate(rules, user)

async function updateUser() {
  const isFormValid = await v$.value.$validate()
  if (!isFormValid) return
}

function clearState() {
  v$.value.$reset()
}

onMounted(() => {
  user.value = JSON.parse(JSON.stringify(props.userProp))
})
</script>

<template>
  <div>
    <Dialog>
      <DialogTrigger>
        <a @click="clearState">
          <i class="fa-solid fa-pencil text-xl hover:cursor-pointer" />
        </a>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create User</DialogTitle>
          <DialogDescription> This is a form for create a user </DialogDescription>
        </DialogHeader>
        <div class="flex flex-col gap-4">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label>Name</label>
              <Input v-model="user.name" />
              <ValidateLabel :v$="v$.name" />
            </div>
            <div>
              <label>Role</label>
              <Select v-model="user.role">
                <SelectTrigger>
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem v-for="{ id, value } in ROLES" :key="id" :value="id">
                      {{ value }}
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <ValidateLabel :v$="v$.role" />
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label>Status</label>
              <Select v-model="user.status">
                <SelectTrigger>
                  <SelectValue placeholder="Select a status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem v-for="{ id, value } in USER_STATUS" :key="id" :value="id">
                      {{ value }}
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <ValidateLabel :v$="v$.status" />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button @click="updateUser">Update</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>
