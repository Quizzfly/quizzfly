<script setup lang="ts">
import { Button } from '../ui/button'
import { Input } from '@/components/ui/input'
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import { apiError } from '@/utils/exceptionHandler'
import { showToast } from '@/utils/toast'
import { changePasswordApi } from '@/services/auth'
import ErrorMessage from '../base/ErrorMessage.vue'

const isLoading = ref(false)
const { errors, handleSubmit, defineField } = useForm({
  validationSchema: yup.object({
    oldPassword: yup.string().required('Old password is required'),
    newPassword: yup.string().required('New password is required'),
    confirmNewPassword: yup
      .string()
      .oneOf([yup.ref('newPassword')], 'Passwords must match')
      .required('Confirm new password is required'),
  }),
})

const onSubmit = handleSubmit(async (values) => {
  isLoading.value = true
  try {
    await changePasswordApi({
      old_password: values.oldPassword,
      new_password: values.newPassword,
      confirm_new_password: values.confirmNewPassword,
    })
    isLoading.value = false
    resetData()
    showToast({
      title: 'success',
      description: 'Change password success',
      variant: 'default',
    })
  } catch (error) {
    showToast({
      title: 'Change password failed',
      description: apiError(error).message,
      variant: 'destructive',
    })
  }
})

const resetData = () => {
  oldPassword.value = ''
  newPassword.value = ''
  confirmNewPassword.value = ''
}

const [oldPassword, oldPasswordAttrs] = defineField('oldPassword')
const [newPassword, newPasswordAttrs] = defineField('newPassword')
const [confirmNewPassword, confirmNewPasswordAttrs] = defineField('confirmNewPassword')
</script>

<template>
  <div class="w-full flex items-start gap-6 max-lg:flex-col">
    <div class="w-2/4 p-4 rounded-md shadow flex flex-col gap-6 max-lg:w-full bg-white">
      <div class="header flex items-center justify-between">
        <h3 class="text-lg font-semibold">Change password</h3>
      </div>
      <div class="body flex items-start gap-8">
        <div class="form flex items-center flex-col w-full">
          <div class="form-data w-full font-medium text-base">
            <label
              for="username"
              class="font-medium text-sm"
              >Old password</label
            >
            <Input
              v-model="oldPassword"
              placeholder="Enter old password..."
              v-bind="oldPasswordAttrs"
              :invalid="errors.oldPassword"
              type="password"
              class="h-10 mt-1 bg-slate-50 border-slate-200 outline-none"
            />
            <ErrorMessage :error="errors.oldPassword" />
          </div>
          <div class="form-data w-full font-medium text-base">
            <label
              for="name"
              class="font-medium text-sm"
              >New password</label
            >
            <Input
              v-model="newPassword"
              placeholder="Enter new password..."
              v-bind="newPasswordAttrs"
              :invalid="errors.newPassword"
              type="password"
              class="h-10 mt-1 bg-slate-50 border-slate-200 outline-none"
            />
            <ErrorMessage :error="errors.newPassword" />
          </div>
          <div class="form-data w-full font-medium text-base">
            <label
              for="email"
              class="font-medium text-sm"
              >Confirm new password</label
            >
            <Input
              v-model="confirmNewPassword"
              placeholder="Enter confirm new password..."
              v-bind="confirmNewPasswordAttrs"
              :invalid="errors.confirmNewPassword"
              type="password"
              class="h-10 mt-1 bg-slate-50 border-slate-200 outline-none"
            />
            <ErrorMessage :error="errors.confirmNewPassword" />
          </div>
        </div>
      </div>
      <Button
        class="h-10 flex items-center gap-2 bg-slate-100 w-24"
        :disabled="isLoading"
        variant="secondary"
        @click="onSubmit"
      >
        <span
          v-if="isLoading"
          class="i-svg-spinners-ring-resize"
        ></span>
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
