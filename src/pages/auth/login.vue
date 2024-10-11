<script setup lang="ts">
import { Input } from '@/components/ui/input'
import ErrorMessage from '@/components/base/ErrorMessage.vue'
import { Button } from '@/components/ui/button'
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import { useAuthStore } from '@/stores/auth'

const { errors, handleSubmit, defineField } = useForm({
  validationSchema: yup.object({
    email: yup.string().email().required('Email is required'),
    password: yup.string().required('Password is required'),
  }),
})

const [email, emailAttrs] = defineField('email')
const [password, passwordAttrs] = defineField('password')

const authStore = useAuthStore()
const onSubmit = handleSubmit(async (values) => {
  authStore.login(values.email, values.password)
})
</script>
<template>
  <div class="h-full flex p-8">
    <div class="flex-1 flex justify-center items-center">
      <form
        class="p-6 rounded-xl max-md:w-full max-sm:p-0"
        @submit="onSubmit"
      >
        <div class="flex items-center gap-0.5 mb-4">
          <h1 class="text-[344054] text-lg font-semibold mt-3">Welcome Back</h1>
        </div>
        <div>
          <h2 class="mt-1 text-[#667085]">Today is a new day. It's your day. You shape it.</h2>
          <h2 class="mt-1 text-[#667085]">Sign in to start managing your projects</h2>
        </div>
        <div class="mt-6">
          <div class="form-data">
            <Label for="email">Email</Label>
            <Input
              id="email"
              v-model="email"
              placeholder="Enter email..."
              v-bind="emailAttrs"
              :invalid="errors.email"
              type="email"
              class="h-10 mt-1 bg-slate-50 border-slate-200 outline-none"
            />
            <ErrorMessage
              class="text-xs mt-0.5"
              :error="errors.email"
            />
          </div>
          <div class="form-data">
            <Label for="password">Password</Label>
            <Input
              id="password"
              v-model="password"
              placeholder="Enter password..."
              v-bind="passwordAttrs"
              :invalid="errors.password"
              type="password"
              class="h-10 mt-1 bg-slate-50 border-slate-200 outline-none"
            />

            <ErrorMessage
              class="text-xs mt-0.5"
              :error="errors.password"
            />
          </div>
        </div>
        <div class="text-end">
          <RouterLink
            class="text-[#0921D9] text-xs font-normal"
            to="/password/forgot"
          >
            Forgot Password?
          </RouterLink>
        </div>
        <Button class="mt-6 w-full h-10 bg-primary"> Sign in </Button>
        <div class="flex items-center gap-2 w-full mt-8">
          <span class="h-px bg-slate-200 w-full"></span>
          <p class="text-base">Or</p>
          <span class="h-px bg-slate-200 w-full"></span>
        </div>
        <Button
          class="h-10 mt-8 w-full flex items-center gap-4 bg-slate-100"
          variant="secondary"
        >
          <img
            class="w-5"
            src="@/assets/img/google-logo.png"
            alt=""
          />
          Sign in with Google
        </Button>
        <div class="flex justify-center mt-6">
          <p>Don't you have an account?</p>
          <RouterLink
            class="ml-[6px] text-[#0921D9] font-normal"
            to="/register"
          >
            Sign up
          </RouterLink>
        </div>
      </form>
    </div>
    <div class="flex-1 relative max-md:hidden">
      <img
        class="absolute top-0 left-0 w-full h-full object-cover rounded-3xl"
        src="@/assets/img/auth-bg.png"
        alt=""
      />
    </div>
  </div>
</template>
<style scoped></style>
