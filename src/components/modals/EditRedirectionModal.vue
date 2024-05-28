<script lang="ts" setup>
import Badge from '../ui/badge/Badge.vue'
import Input from '../ui/input/Input.vue'
import { truncateString } from '@/helpers'
import { computed, onMounted, ref, watch } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { helpers } from '@vuelidate/validators'
import { MESSAGE_REQUIRED } from '@/constants/rules'
import ValidateLabel from '../base/ValidateLabel.vue'
import Button from '@/components/ui/button/Button.vue'
import type { IRedirection, Link } from '@/types/redirection'
import { useRedirectionts } from '@/stores/redirections'
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
    minLeng: helpers.withMessage('Debe de ingresar al menos un link', (value: string[]) => {
      return value.length > 0
    })
  },
  uid: {},
  createdAt: {},
  status: {}
}

const emit = defineEmits(['update'])
const props = defineProps<{ redirectionProp: IRedirection }>()

const redirectionStore = useRedirectionts()
const { toastError, toastSuccess } = useNotification()

const link = ref<Link>({
  url: '',
  percentage: 0
})
const isLoading = ref(false)

const redirection = ref<IRedirection>({
  id: '',
  name: '',
  links: [],
  uid: '',
  createdAt: new Date(),
  status: 'ACTIVE'
})

const textForButton = computed(() => (isLoading.value ? 'loading...' : 'Update'))
const validPercentage = computed(
  () => redirection.value.links.reduce((acc, crr) => acc + crr.percentage, 0) <= 100
)

const v$ = useVuelidate(rules, redirection)

function addLink() {
  if (!link.value) return
  redirection.value.links.push(link.value)
  link.value = {
    url: '',
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
      <DialogContent>
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
          <div class="w-full">
            <label>Links</label>
            <div>
              <div class="flex gap-4">
                <Input v-model="link.url" class="w-[70%]" />
                <Input type="number" v-model="link.percentage" class="w-[20%]" />
                <Button class="w-[10%]" @click="addLink">
                  <i class="fa-solid fa-plus"></i>
                </Button>
              </div>
              <ValidateLabel :v$="v$.links" />
              <span v-if="!validPercentage" class="text-red-500 text-xs"
                >La suma de los porcentajes no puede ser mayor a 100%</span
              >
            </div>
          </div>
          <div class="flex flex-wrap gap-2">
            <Badge
              v-for="({ percentage, url }, index) in redirection.links"
              :key="index"
              class="flex gap-3"
            >
              <span>
                {{ `${truncateString(url, 25)} - ${percentage}%` }}
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
