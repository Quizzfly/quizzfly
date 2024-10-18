<script setup lang="ts">
import { Button } from '../ui/button'
import { Input } from '@/components/ui/input'
import { useForm } from 'vee-validate'
import * as yup from 'yup'
// import { apiError } from '@/utils/exceptionHandler'
// import Toaster from '@/components/ui/toast/Toaster.vue'
// import { showToast } from '@/utils/toast'

const { errors, handleSubmit, defineField } = useForm({
  validationSchema: yup.object({
    email: yup.string().email().required('Email is required'),
    name: yup.string().required('Name is required'),
    username: yup.string().required('Username is required'),
  }),
})

const [oldPassword, oldPasswordAttrs] = defineField('oldPassword')
const [newPassword, newPasswordAttrs] = defineField('newPassword')
const [repeatNewPassword, repeatNewPasswordAttrs] = defineField('repeatNewPassword')
</script>

<template>
  <div class="w-full flex items-start gap-8 max-lg:flex-col">
    <div class="w-2/4 p-4 rounded-md shadow flex flex-col gap-10 max-lg:w-full bg-white">
      <div class="header flex items-center justify-between">
        <h3 class="text-lg font-semibold">Change password</h3>
      </div>
      <div class="body flex items-start gap-8">
        <div class="form flex items-center gap-4 flex-col w-full">
          <div class="form-data w-full font-medium text-base">
            <label
              for="username"
              class="font-medium text-sm"
              >Old password</Label
            >
            <Input
              v-model="oldPassword"
              placeholder="Enter old password..."
              v-bind="oldPasswordAttrs"
              :invalid="errors.oldPassword"
              type="name"
              class="h-10 mt-1 bg-slate-50 border-slate-200 outline-none"
            />
            <ErrorMessage :error="errors.name" />
          </div>
          <div class="form-data w-full font-medium text-base">
            <label
              for="name"
              class="font-medium text-sm"
              >New password</Label
            >
            <Input
              v-model="newPassword"
              placeholder="Enter new password..."
              v-bind="newPasswordAttrs"
              :invalid="errors.newPassword"
              type="name"
              class="h-10 mt-1 bg-slate-50 border-slate-200 outline-none"
            />
            <ErrorMessage :error="errors.name" />
          </div>
          <div class="form-data w-full font-medium text-base">
            <label
              for="email"
              class="font-medium text-sm"
              >Repeat new password</Label
            >
            <Input
              v-model="repeatNewPassword"
              placeholder="Enter repeat new password..."
              v-bind="repeatNewPasswordAttrs"
              :invalid="errors.repeatNewPassword"
              type="email"
              class="h-10 mt-1 bg-slate-50 border-slate-200 outline-none"
            />
            <ErrorMessage :error="errors.email" />
          </div>
        </div>
      </div>
      <Button
        class="h-10 flex items-center gap-4 bg-slate-100 w-24"
        variant="secondary"
        @click="handleSubmit"
      >
        Save
      </Button>
    </div>
    <div class="w-2/4 flex flex-col gap-10"></div>
  </div>
</template>
<style>
.shadow {
  box-shadow:
    rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
    rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
}
</style>
