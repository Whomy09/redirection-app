<script lang="ts" setup>
import Button from '@/components/ui/button/Button.vue'
import CreateRedirectionForm from '../forms/CreateRedirectionForm.vue'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
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

        <CreateRedirectionForm />

        <DialogFooter>
          <Button> Save </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>
