<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { ROLES } from '@/constants/roles'
import { USER_STATUS } from '@/constants'
import type { IUser } from '@/types/user'
import useVuelidate from '@vuelidate/core'
import Input from '@/components/ui/input/Input.vue'
import ValidateLabel from '../base/ValidateLabel.vue'
import Button from '@/components/ui/button/Button.vue'
import { MESSAGE_ALPHA, MESSAGE_REQUIRED } from '@/constants/rules'
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
import { User } from '@/services/models/user'
import { useNotification } from '@/composables/useNotification'

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

const { toastError, toastSuccess } = useNotification()

const isLoading = ref(false)
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
  try {
    const isFormValid = await v$.value.$validate()

    if (!isFormValid) return

    isLoading.value = true

    await new User().update(user.value.uid, user.value)

    toastSuccess('User successfully updated')
  } catch (error) {
    toastError('An error occurred while updating the user')
  } finally {
    isLoading.value = false
  }
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
              <Input v-model="user.name" :disabled="isLoading" />
              <ValidateLabel :v$="v$.name" />
            </div>
            <div>
              <label>Role</label>
              <Select v-model="user.role" :disabled="isLoading">
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
              <Select v-model="user.status" :disabled="isLoading">
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
          <Button @click="updateUser" :disabled="isLoading">{{
            isLoading ? 'Loading...' : 'Update'
          }}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>
