<script lang="ts" setup>
import { v4 as uuidv4 } from 'uuid'
import { storeToRefs } from 'pinia'
import Badge from '../ui/badge/Badge.vue'
import Input from '../ui/input/Input.vue'
import { truncateString } from '@/helpers'
import { useDebounceFn } from '@vueuse/core'
import { computed, onMounted, ref } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { helpers } from '@vuelidate/validators'
import type { StatusForValidName } from '@/types'
import { MESSAGE_REQUIRED } from '@/constants/rules'
import { useUserSession } from '@/stores/userSession'
import ValidateLabel from '../base/ValidateLabel.vue'
import Button from '@/components/ui/button/Button.vue'
import { useRedirectionts } from '@/stores/redirections'
import { STYLES_FOR_INPUT_VALID_NAME } from '@/constants'
import { Redirection } from '@/services/models/redirection'
import type { IRedirectionForm, Link } from '@/types/redirection'
import { useNotification } from '@/composables/useNotification'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'

const rules = {
  id: { MESSAGE_REQUIRED },
  name: { MESSAGE_REQUIRED },
  links: {
    minLength: helpers.withMessage('Debe de ingresar al menos un link', (value: Link[]) => {
      return value.length > 0
    }),
    hundredPercent: helpers.withMessage(
      'La sumatoria de los procentajes siempre debe ser 100%',
      (value: Link[]) => {
        return value.reduce((acc, { percentage }) => acc + percentage, 0) === 100
      }
    )
  }
}

const userSession = useUserSession()
const redirectionStore = useRedirectionts()
const { toastError, toastSuccess } = useNotification()

const isLoading = ref(false)
const validatingUniqueName = ref(false)
const { user } = storeToRefs(userSession)
const isNameValid = ref<StatusForValidName>('UNVALIDATE')

const link = ref<Link>({
  url: '',
  name: '',
  id: uuidv4(),
  percentage: 0
})
const redirection = ref<IRedirectionForm>({
  name: '',
  links: [],
  id: uuidv4()
})
const v$ = useVuelidate(rules, redirection)

const textForButton = computed(() => (isLoading.value ? 'loading...' : 'Save'))
const inputClasses = computed(() => STYLES_FOR_INPUT_VALID_NAME[isNameValid.value])
const validPercentage = computed(
  () => redirection.value.links.reduce((acc, crr) => acc + crr.percentage, 0) <= 100
)

function addLink() {
  const { url: _link, percentage, name } = link.value

  if ((!name && !_link) || percentage <= 0 || percentage > 100) return

  redirection.value.links.push(link.value)

  link.value = {
    url: '',
    name: '',
    id: uuidv4(),
    percentage: 0
  }
}

function removeLink(index: number) {
  redirection.value.links = redirection.value.links.filter((_, idx) => idx !== index)
}

function clearForm() {
  redirection.value = {
    name: '',
    links: [],
    id: uuidv4()
  }
  v$.value.$reset()
}

const debouncedFn = useDebounceFn(async () => {
  try {
    if (redirection.value.name === '') {
      isNameValid.value = 'UNVALIDATE'
      return
    }

    validatingUniqueName.value = true

    const isValid = await new Redirection().validRedirectionName(redirection.value.name)

    isNameValid.value = isValid ? 'VALID' : 'INVALID'
  } catch (error) {
    toastError('Error al validar el nombre')
  } finally {
    validatingUniqueName.value = false
  }
}, 500)

async function createRedirection() {
  try {
    isLoading.value = true

    const isFormValid = await v$.value.$validate()

    if (!isFormValid) return
    if (!validPercentage.value) return

    if (isNameValid.value !== 'VALID') {
      toastError('Nombre no valido')
      return
    }

    await redirectionStore.create(user.value.uid, redirection.value)

    isNameValid.value = 'UNVALIDATE'
    clearForm()
    toastSuccess('Redirect created successfully')
  } catch (error) {
    toastError('Error creating redirect')
  } finally {
    isLoading.value = false
  }
}

function handleInputNameKeyUp() {
  redirection.value.name = redirection.value.name.toLocaleLowerCase()
  debouncedFn()
}

function clearState() {
  redirection.value = {
    name: '',
    links: [],
    id: uuidv4()
  }
  link.value = {
    url: '',
    name: '',
    id: uuidv4(),
    percentage: 0
  }
  isLoading.value = false
  isNameValid.value = 'UNVALIDATE'
  validatingUniqueName.value = false
  v$.value.$reset()
}

onMounted(() => {
  v$.value.$reset()
})
</script>

<template>
  <div>
    <Dialog>
      <DialogTrigger>
        <Button @click="clearState">
          <i class="fa-solid fa-plus"></i>
        </Button>
      </DialogTrigger>
      <DialogContent class="max-w-xl">
        <DialogHeader>
          <DialogTitle>Create Redirection</DialogTitle>
          <DialogDescription> This is a form for create a redirection </DialogDescription>
        </DialogHeader>
        <div class="flex flex-wrap gap-4">
          <div class="w-full">
            <label>ID</label>
            <Input v-model="redirection.id" disabled />
            <ValidateLabel :v$="v$.id" />
          </div>
          <div class="w-full">
            <label>Name</label>
            <div class="flex gap-4 items-center">
              <Input
                v-model="redirection.name"
                :class="inputClasses"
                @keyup="handleInputNameKeyUp"
              />
              <i v-if="validatingUniqueName" class="fa-solid fa-spinner text-2xl animate-spin"></i>
            </div>
            <ValidateLabel :v$="v$.name" />
          </div>
          <div>
            <div class="flex items-center gap-4">
              <div>
                <span>Link Name</span>
                <Input type="text" v-model="link.name" />
              </div>
              <div>
                <span>Link</span>
                <Input type="text" v-model="link.url" />
              </div>
              <div class="w-[15%]">
                <span>%</span>
                <Input type="number" v-model="link.percentage" />
              </div>
              <div>
                <p class="text-transparent">*</p>
                <Button class="w-[10%]" @click="addLink">
                  <i class="fa-solid fa-plus"></i>
                </Button>
              </div>
            </div>
            <ValidateLabel :v$="v$.links" />
            <span v-if="!validPercentage" class="text-red-500 text-xs"
              >La suma de los porcentajes no puede ser mayor a 100%</span
            >
          </div>
          <div class="flex flex-wrap gap-2">
            <Badge v-for="(link, index) in redirection.links" :key="index" class="flex gap-3">
              <span>
                {{ `${link.name} - ${truncateString(link.url, 25)} - ${link.percentage}%` }}
              </span>
              <i class="fa-solid fa-xmark hover:cursor-pointer" @click="removeLink(index)" />
            </Badge>
          </div>
        </div>
        <DialogFooter>
          <Button @click="createRedirection" :disabled="isLoading"> {{ textForButton }} </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>
