<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useUsers } from '@/stores/users'
import { ROLES } from '@/constants/roles'
import useVuelidate from '@vuelidate/core'
import { User } from '@/services/models/user'
import { helpers } from '@vuelidate/validators'
import type { FormCreateUser } from '@/types/user'
import Input from '@/components/ui/input/Input.vue'
import ValidateLabel from '../base/ValidateLabel.vue'
import Button from '@/components/ui/button/Button.vue'
import { useNotification } from '@/composables/useNotification'
import { EMAIL_ALREADY_IN_USE } from '@/constants/firebase-errors'
import { MESSAGE_ALPHA, MESSAGE_EMAIL, MESSAGE_REQUIRED } from '@/constants/rules'
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


const userRules = {
  name: {
    MESSAGE_REQUIRED,
    MESSAGE_ALPHA
  },
  role: {
    MESSAGE_REQUIRED
  },
  email: {
    MESSAGE_REQUIRED,
    MESSAGE_EMAIL
  }
}
const usersStore = useUsers()
const { addUser } = usersStore
const { toastError, toastSuccess } = useNotification()

const isCreatingUser = ref(false)
const user = ref<FormCreateUser>({
  name: '',
  role: '',
  email: '',
  password: ''
})

const handlePassword = ref({
  password: '',
  confirmPassword: ''
})

const passwordsRules = computed(() => ({
  password: {
    MESSAGE_REQUIRED,
    minLength: helpers.withMessage(
      'Debe de tener minimo (7) caracteres',
      (value: string) => value.length >= 7
    ),
    equal: helpers.withMessage(
      'La contraseña no coincide',
      (value: string) => value === handlePassword.value.confirmPassword
    )
  },
  confirmPassword: {
    MESSAGE_REQUIRED,
    minLength: helpers.withMessage(
      'Debe de tener minimo (7) caracteres',
      (value: string) => value.length >= 7
    ),
    equal: helpers.withMessage(
      'La contraseña no coincide',
      (value: string) => value === handlePassword.value.password
    )
  }
}))

const vUser$ = useVuelidate(userRules, user, { $scope: false })
const vPasswords$ = useVuelidate(passwordsRules, handlePassword, { $scope: false })

function clearState() {
  user.value = {
    name: '',
    role: '',
    email: '',
    password: ''
  }
  handlePassword.value = {
    password: '',
    confirmPassword: ''
  }
  vUser$.value.$reset()
  vPasswords$.value.$reset()
}

async function createUser() {
  const isUserFormValid = await vUser$.value.$validate()
  const isPasswordsValid = await vPasswords$.value.$validate()

  if (!(isUserFormValid && isPasswordsValid)) return

  user.value.password = handlePassword.value.password

  try {
    isCreatingUser.value = true
    const newUser = await new User().create(user.value)
    clearState()
    addUser(newUser)
    toastSuccess('User created successfully')
  } catch (error: any) {
    if (error.message === EMAIL_ALREADY_IN_USE) {
      toastError('This email is in use')
      return 
    }
    toastError('Error creating user')
  } finally {
    isCreatingUser.value = false
  }
}
</script>

<template>
  <div>
    <Dialog>
      <DialogTrigger>
        <Button @click="clearState">Create User</Button>
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
              <Input v-model="user.name" :disabled="isCreatingUser" />
              <ValidateLabel :v$="vUser$.name" />
            </div>
            <div>
              <label>Email</label>
              <Input v-model="user.email" :disabled="isCreatingUser" />
              <ValidateLabel :v$="vUser$.email" />
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label>Password</label>
              <Input type="password" v-model="handlePassword.password" :disabled="isCreatingUser" />
              <ValidateLabel :v$="vPasswords$.password" />
            </div>
            <div>
              <label>Confirm Password</label>
              <Input type="password" v-model="handlePassword.confirmPassword" :disabled="isCreatingUser" />
              <ValidateLabel :v$="vPasswords$.confirmPassword" />
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label>Role</label>
              <Select v-model="user.role" :disabled="isCreatingUser">
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
              <ValidateLabel :v$="vUser$.role" />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button :disabled="isCreatingUser" @click="createUser">{{
            isCreatingUser ? 'Creating...' : 'Save'
          }}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>
