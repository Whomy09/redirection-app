<script lang="ts" setup>
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
</script>

<template>
  <div>
    <Dialog>
      <DialogTrigger>
        <Button>
          <span>Create User</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create User</DialogTitle>
          <DialogDescription> This is a form for create a user </DialogDescription>
        </DialogHeader>

        <div>
          <p>Content</p>
        </div>

        <DialogFooter>
          <p>footer</p>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>
