<script lang="ts" setup>
import { v4 as uuidv4 } from 'uuid'
import { copyObject } from '@/helpers'
import Input from '../ui/input/Input.vue'
import { useVuelidate } from '@vuelidate/core'
import { helpers } from '@vuelidate/validators'
import BadgeLink from '../shared/BadgeLink.vue'
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
const isEditLink = ref(false)
const isModalOpen = ref(false)
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
  createdAt: new Date()
})

const textForButton = computed(() => (isLoading.value ? 'loading...' : 'Update'))
const validPercentage = computed(
  () => redirection.value.links.reduce((acc, crr) => acc + crr.percentage, 0) <= 100
)

const v$ = useVuelidate(rules, redirection)

function resetStateLink() {
  link.value = {
    url: '',
    name: '',
    id: uuidv4(),
    percentage: 0
  }
}

function addLink() {
  const { url: _link, percentage, name } = link.value

  if ((!name && !_link) || percentage <= 0 || percentage > 100) return

  redirection.value.links.push(link.value)

  resetStateLink()
}

function handleEditLink(linkToEdit: Link) {
  link.value = copyObject<Link>(linkToEdit)
  isEditLink.value = true
}

function editLink() {
  const { links } = redirection.value
  redirection.value.links = links.map((oldLink) =>
    oldLink.id === link.value.id ? link.value : oldLink
  )
  resetStateLink()
  isEditLink.value = false
}

function removeLink(id: string) {
  redirection.value.links = redirection.value.links.filter((link) => link.id !== id)
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

watch(isModalOpen, (isModalOpen) => {
  if (isModalOpen) {
    redirection.value = copyObject<IRedirection>(props.redirectionProp)
    resetStateLink()
  }
})

onMounted(() => {
  v$.value.$reset()
})
</script>

<template>
  <div>
    <Dialog v-model:open="isModalOpen">
      <DialogTrigger>
        <Button class="bg-transaparent hover:bg-slate-100">
          <i class="fa-solid fa-pen-to-square text-black" />
        </Button>
      </DialogTrigger>
      <DialogContent class="max-w-xl">
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
                <Button v-if="isEditLink" @click="editLink">
                  <i class="fa-solid fa-pen-to-square" />
                </Button>
                <Button v-else class="w-[10%]" @click="addLink">
                  <i class="fa-solid fa-plus" />
                </Button>
              </div>
            </div>
          </div>
          <div class="flex flex-wrap gap-2">
            <div v-for="link in redirection.links" :key="link.id">
              <BadgeLink
                :link
                @action="() => handleEditLink(link)"
                @close="() => removeLink(link.id)"
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button @click="updateRedirection" :disabled="isLoading"> {{ textForButton }} </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>
