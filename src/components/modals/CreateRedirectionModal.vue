<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import Badge from '../ui/badge/Badge.vue'
import Input from '../ui/input/Input.vue'
import { truncateString } from '@/helpers'
import { useVuelidate } from '@vuelidate/core'
import { helpers } from '@vuelidate/validators'
import { MESSAGE_REQUIRED } from '@/constants/rules'
import ValidateLabel from '../base/ValidateLabel.vue'
import Button from '@/components/ui/button/Button.vue'
import type { IRedirectionForm } from '@/types/redirection'
import { Redirection } from '@/services/models/redirection'
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
  links: { minLeng: helpers.withMessage('Debe de ingresar al menos un link', (value: string[]) => {
    return value.length > 0
  }) }
}

const { toastError, toastSuccess } = useNotification()

const link = ref('')

const redirection = ref<IRedirectionForm>({
  name: '',
  links: [],
  id: uuidv4()
})
const v$ = useVuelidate(rules, redirection)

function addLink() {
  if (!link.value) return
  redirection.value.links.push(link.value)
  link.value = ''
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

async function createRedirection() {
  try {
    const isFormValid = await v$.value.$validate()

    if (!isFormValid) return

    await new Redirection().create(redirection.value)
    clearForm()
    toastSuccess('Redirect created successfully')
  } catch (error) {
    toastError('Error creating redirect')
  }
}

onMounted(() => {
  v$.value.$reset()
})
</script>

<template>
  <div>
    <Dialog>
      <DialogTrigger>
        <Button>
          <i class="fa-solid fa-plus"></i>
        </Button>
      </DialogTrigger>
      <DialogContent>
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
            <Input v-model="redirection.name" />
            <ValidateLabel :v$="v$.name" />
          </div>
          <div class="w-full">
            <label>Links</label>
            <div>
              <div class="flex gap-4">
                <Input v-model="link" />
                <Button @click="addLink">
                  <i class="fa-solid fa-plus"></i>
                </Button>
              </div>
              <ValidateLabel :v$="v$.links" />
            </div>
          </div>

          <div class="flex flex-wrap gap-2">
            <Badge v-for="(link, index) in redirection.links" :key="index" class="flex gap-3">
              <span>
                {{ truncateString(link, 10) }}
              </span>
              <i class="fa-solid fa-xmark hover:cursor-pointer" @click="removeLink(index)" />
            </Badge>
          </div>
        </div>

        <DialogFooter>
          <Button @click="createRedirection"> Save </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>
