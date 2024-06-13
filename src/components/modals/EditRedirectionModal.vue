<script lang="ts" setup>
import { v4 as uuidv4 } from 'uuid'
import Badge from '../ui/badge/Badge.vue'
import Input from '../ui/input/Input.vue'
import { truncateString } from '@/helpers'
import { useVuelidate } from '@vuelidate/core'
import { helpers } from '@vuelidate/validators'
import { MESSAGE_REQUIRED } from '@/constants/rules'
import ValidateLabel from '../base/ValidateLabel.vue'
import { computed, onMounted, ref, watch } from 'vue'
import Button from '@/components/ui/button/Button.vue'
import { useRedirectionts } from '@/stores/redirections'
import type { IRedirection, Link } from '@/types/redirection'
import { useNotification } from '@/composables/useNotification'
import {
  Dialog,
  DialogTitle,
  DialogFooter,
  DialogHeader,
  DialogContent,
  DialogTrigger,
  DialogDescription
} from '@/components/ui/dialog'

const rules = {
  uid: {},
  status: {},
  createdAt: {},
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

const emit = defineEmits(['update'])
const props = defineProps<{ redirectionProp: IRedirection }>()

const redirectionStore = useRedirectionts()
const { toastError, toastSuccess } = useNotification()

const isLoading = ref(false)
const link = ref<Link>({
  url: '',
  name: '',
  id: uuidv4(),
  percentage: 0
})
const redirection = ref<IRedirection>({
  id: '',
  name: '',
  links: [],
  uid: '',
  status: 'ACTIVE',
  createdAt: new Date(),
})

const textForButton = computed(() => (isLoading.value ? 'loading...' : 'Update'))
const validPercentage = computed(
  () => redirection.value.links.reduce((acc, crr) => acc + crr.percentage, 0) <= 100
)

const v$ = useVuelidate(rules, redirection)

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

async function updateRedirection() {
  try {
    isLoading.value = true

    const isFormValid = await v$.value.$validate()

    if (!isFormValid) return
    if (!validPercentage.value) return

    await redirectionStore.update(redirection.value.id, redirection.value)

    emit('update')
    toastSuccess('Redirect update successfully')
  } catch (error) {
    toastError('Error update redirect')
  } finally {
    isLoading.value = false
  }
}

watch(
  () => props.redirectionProp,
  (newRedirection) => {
    redirection.value = JSON.parse(JSON.stringify(newRedirection))
  }
)

onMounted(() => {
  v$.value.$reset()
})
</script>

<template>
  <div>
    <Dialog>
      <DialogTrigger>
        <Button class="bg-transaparent hover:bg-slate-100">
          <i class="fa-solid fa-pen-to-square text-black"></i>
        </Button>
      </DialogTrigger>
      <DialogContent class="max-w-xl" >
        <DialogHeader>
          <DialogTitle>Update Redirection</DialogTitle>
          <DialogDescription> This is a form for update a redirection </DialogDescription>
        </DialogHeader>
        <div class="flex flex-wrap gap-4">
          <div class="w-full">
            <label>ID</label>
            <Input v-model="redirection.id" disabled />
            <ValidateLabel :v$="v$.id" />
          </div>
          <div class="w-full">
            <label>Name</label>
            <Input v-model="redirection.name" disabled />
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
          </div>
          <div class="flex flex-wrap gap-2">
            <Badge
              v-for="({ percentage, url, name }, index) in redirection.links"
              :key="index"
              class="flex gap-3"
            >
              <span>
                {{ `${name} - ${truncateString(url, 25)} - ${percentage}%` }}
              </span>
              <i class="fa-solid fa-xmark hover:cursor-pointer" @click="removeLink(index)" />
            </Badge>
          </div>
        </div>
        <DialogFooter>
          <Button @click="updateRedirection" :disabled="isLoading"> {{ textForButton }} </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>
