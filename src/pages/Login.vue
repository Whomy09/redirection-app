<script lang="ts" setup>
import * as z from 'zod'
import { useForm } from 'vee-validate'
import { useRouter } from 'vue-router'
import { toTypedSchema } from '@vee-validate/zod'
import Button from '@/components/ui/button/Button.vue'
import { FormField, FormControl, FormMessage } from '@/components/ui/form'
import {
  Card,
  CardTitle,
  CardHeader,
  CardFooter,
  CardContent,
  CardDescription,
} from '@/components/ui/card/'

const router = useRouter()

const formSchema = toTypedSchema(
  z.object({
    email: z.string().email(),
    password: z.string().min(7)
  })
)

const form = useForm({
  validationSchema: formSchema
})

const onSubmit = form.handleSubmit((values) => {
  console.log(values)
  router.push({ name: 'home' })
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
                    type="text"
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
        <Button class="w-full" type="submit" @click="onSubmit"> Login </Button>
      </CardFooter>
    </Card>
  </div>
</template>