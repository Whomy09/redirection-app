<script lang="ts" setup>
import Button from '@/components/ui/button/Button.vue'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import Input from '../ui/input/Input.vue';
import { ref } from 'vue';
import Badge from '../ui/badge/Badge.vue';

const link = ref('')
const links = ref<string[]>([])

function addLink() {
  links.value.push(link.value)
  link.value = ''
}

function truncateString(str: string, maxLength: number) {
    // Check if the length of the string is greater than the maximum length
    if (str.length > maxLength) {
        // Truncate the string to the maximum length and add "..."
        return str.substring(0, maxLength) + '...';
    } else {
        // If the string is equal to or shorter than the maximum length, return the same string
        return str;
    }
}

function removeLink(index: number) {
  links.value = links.value.filter((_, idx) => idx !== index)
}
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
            <label>Id</label>
            <Input disabled />
          </div>
          <div class="w-full">
            <label>Name</label>
            <Input />
          </div>
          <div class="w-full">
            <label>Links</label>
            <div class="flex gap-4">
              <Input v-model="link" />
              <Button @click="addLink">
                <i class="fa-solid fa-plus"></i>
              </Button>
            </div>
          </div>

          <div class="flex flex-wrap gap-2">
            <Badge v-for="(link, index) in links" :key="index" class="flex gap-3">
              <span>
                {{ truncateString(link, 10) }}
              </span>
              <i class="fa-solid fa-xmark hover:cursor-pointer" @click="removeLink(index)"/>
            </Badge>
          </div>
        </div>

        <DialogFooter>
          <Button> Save </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>
