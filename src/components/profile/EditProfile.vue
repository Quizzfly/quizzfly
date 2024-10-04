<script setup lang="ts">
import { Button } from '../ui/button'
import { Input } from '@/components/ui/input'
import { useForm } from 'vee-validate'
import * as yup from 'yup'
// import { apiExceptionHandler } from '@/utils/exceptionHandler'
// import Toaster from '@/components/ui/toast/Toaster.vue'
// import { showToast } from '@/utils/toast'

const { errors, handleSubmit, defineField } = useForm({
  validationSchema: yup.object({
    email: yup.string().email().required('Email is required'),
    name: yup.string().required('name is required'),
    username: yup.string().required('Username is required'),
  }),
})

const [email, emailAttrs] = defineField('email')
const [username, usernameAttrs] = defineField('username')
const [name, nameAttrs] = defineField('name')
</script>

<template>
  <div class="w-full flex items-start gap-8">
    <div class="w-2/4 p-4 rounded-md shadow flex flex-col gap-10">
      <div class="header flex items-center justify-between">
        <h3 class="text-lg font-semibold">User information</h3>
        <Button
          class="h-10 flex items-center gap-4 bg-slate-100"
          variant="secondary"
          @click="handleSubmit"
        >
          Save
        </Button>
      </div>
      <div class="body flex items-start gap-8">
        <div class="img relative w-32 h-32">
          <img
            src="@/assets/img/avatar.jpg"
            alt=""
          />
        </div>
        <div class="form flex items-center gap-4 flex-col w-full">
          <div class="form-data w-full">
            <Label
              for="username"
              class="font-medium text-sm"
              >Username</Label
            >
            <Input
              v-model="username"
              placeholder="Enter name..."
              v-bind="usernameAttrs"
              :invalid="errors.username"
              type="name"
              class="h-10 mt-1 bg-slate-50 border-slate-200 outline-none"
            />
            <ErrorMessage :error="errors.name" />
          </div>
          <div class="form-data w-full">
            <Label
              for="name"
              class="font-medium text-sm"
              >Name</Label
            >
            <Input
              v-model="name"
              placeholder="Enter name..."
              v-bind="nameAttrs"
              :invalid="errors.name"
              type="name"
              class="h-10 mt-1 bg-slate-50 border-slate-200 outline-none"
            />
            <ErrorMessage :error="errors.name" />
          </div>
          <div class="form-data w-full">
            <Label
              for="email"
              class="font-medium text-sm"
              >Email</Label
            >
            <Input
              v-model="email"
              placeholder="Enter email..."
              v-bind="emailAttrs"
              :invalid="errors.email"
              type="email"
              class="h-10 mt-1 bg-slate-50 border-slate-200 outline-none"
            />
            <ErrorMessage :error="errors.email" />
          </div>
        </div>
      </div>
      <div class="footer flex flex-col gap-2">
        <h2 class="text-lg font-semibold">Verified profile</h2>
        <div class="flex gap-2">
          <div class="w-28">
            <img
              src="@/assets/img/avatar.jpg"
              alt=""
              class="rounded-full w-full"
            />
          </div>
          <p class="text-sm">
            Apply for your verified profile today to offer your learning resources for free or for
            sale on the marketplace and join a global community.
            <span class="font-semibold cursor-pointer">Go to application</span>
          </p>
        </div>
      </div>
    </div>
    <div class="w-2/4 flex flex-col gap-10">
      <div class="shadow rounded-md p-4 flex flex-col gap-8">
        <div class="header">
          <h3 class="text-lg font-semibold">Account details</h3>
        </div>
        <div class="w-full grid gap-4 grid-cols-2">
          <div class="form-data">
            <Label
              for="username"
              class="font-medium text-sm"
              >Organization</Label
            >
            <Input
              v-model="username"
              placeholder="Enter name..."
              v-bind="usernameAttrs"
              :invalid="errors.username"
              type="name"
              class="h-10 mt-1 bg-slate-50 border-slate-200 outline-none"
            />
            <ErrorMessage :error="errors.name" />
          </div>
          <div class="form-data">
            <Label
              for="name"
              class="font-medium text-sm"
              >Language</Label
            >
            <Input
              v-model="name"
              placeholder="Enter name..."
              v-bind="nameAttrs"
              :invalid="errors.name"
              type="name"
              class="h-10 mt-1 bg-slate-50 border-slate-200 outline-none"
            />
            <ErrorMessage :error="errors.name" />
          </div>
          <div class="form-data">
            <Label
              for="email"
              class="font-medium text-sm"
              >Account type</Label
            >
            <Input
              v-model="email"
              placeholder="Enter email..."
              v-bind="emailAttrs"
              :invalid="errors.email"
              type="email"
              class="h-10 mt-1 bg-slate-50 border-slate-200 outline-none"
            />
            <ErrorMessage :error="errors.email" />
          </div>
          <div class="form-data">
            <Label
              for="email"
              class="font-medium text-sm"
              >Type of workplace</Label
            >
            <Input
              v-model="email"
              placeholder="Enter email..."
              v-bind="emailAttrs"
              :invalid="errors.email"
              type="email"
              class="h-10 mt-1 bg-slate-50 border-slate-200 outline-none"
            />
            <ErrorMessage :error="errors.email" />
          </div>
        </div>
      </div>
      <div class="flex flex-col gap-2">
        <p class="text-base font-semibold underline underline-offset-2 cursor-pointer">
          Delete account
        </p>
        <p class="text-sm">
          If you delete your account, you'll lose access to all the quizzfly you created
        </p>
      </div>
    </div>
  </div>
</template>
<style>
.shadow {
  box-shadow:
    rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
    rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
}
</style>
