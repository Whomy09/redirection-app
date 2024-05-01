<script lang="ts" setup>
import * as z from 'zod'
import { ref, computed } from 'vue'
import { useForm } from 'vee-validate'
import { useRouter } from 'vue-router'
import { toTypedSchema } from '@vee-validate/zod'
import Input from '@/components/ui/input/Input.vue'
import { useUserSession } from '@/stores/userSession'
import Button from '@/components/ui/button/Button.vue'
import { useNotification } from '@/composables/useNotification'
import { FormField, FormControl, FormMessage } from '@/components/ui/form'
import {
  Card,
  CardTitle,
  CardHeader,
  CardFooter,
  CardContent,
  CardDescription
} from '@/components/ui/card/'

const router = useRouter()
const { login } = useUserSession()
const { toastError, toastSuccess } = useNotification()

const isLoading = ref(false)

const textButton = computed(() => isLoading.value ? 'Loading...' : 'Login')

const formSchema = toTypedSchema(
  z.object({
    email: z.string().email(),
    password: z.string().min(7)
  })
)

const form = useForm({
  validationSchema: formSchema
})

const onSubmit = form.handleSubmit(async (credentials) => {
  try {
    isLoading.value = true
    await login(credentials)
    toastSuccess('Welcome!')
    router.push({ name: 'home' })
  } catch (error) {
    toastError('Email or password invalid!')
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <div class="h-screen flex justify-center items-center">
    <Card class="w-full max-w-sm">
      <CardHeader>
        <CardTitle class="text-2xl"> Login </CardTitle>
        <CardDescription> Enter your email below to login to your account. </CardDescription>
      </CardHeader>
      <CardContent class="grid gap-4">
        <form @submit="onSubmit">
          <div class="flex flex-col gap-2 mt-2">
            <FormField v-slot="{ componentField }" name="email">
              <FormItem class="flex flex-col">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    class="border border-gray-100 rounded-sm"
                    v-bind="componentField"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
            <FormField v-slot="{ componentField }" name="password">
              <FormItem class="flex flex-col">
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    class="border border-gray-100 rounded-sm"
                    v-bind="componentField"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button class="w-full" type="submit" @click="onSubmit" :disabled="isLoading"> 
          {{ textButton }}
        </Button>
      </CardFooter>
    </Card>
  </div>
</template>
