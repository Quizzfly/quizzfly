<script setup lang="ts">
import { Button } from '../ui/button'
import InputValidation from '@/components/base/InputValidation.vue'
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import { apiError } from '@/utils/exceptionHandler'
import { showToast } from '@/utils/toast'
import { changePasswordApi } from '@/services/auth'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const isLoading = ref(false)
const { handleSubmit } = useForm({
  validationSchema: yup.object({
    oldPassword: yup
      .string()
      .required(t('profiles.old_password_required'))
      .min(6, t('profiles.password_min_length'))
      .matches(/[A-Z]/, t('profiles.password_uppercase')),
    newPassword: yup
      .string()
      .required(t('profiles.new_password_required'))
      .min(6, t('profiles.password_min_length'))
      .matches(/[A-Z]/, t('profiles.password_uppercase')),
    confirmNewPassword: yup
      .string()
      .oneOf([yup.ref('newPassword')], t('profiles.passwords_must_match'))
      .required(t('profiles.confirm_new_password_required')),
  }),
})

const onSubmit = handleSubmit(async (values, { resetForm }) => {
  isLoading.value = true
  try {
    await changePasswordApi({
      old_password: values.oldPassword,
      new_password: values.newPassword,
      confirm_new_password: values.confirmNewPassword,
    })
    isLoading.value = false
    resetForm()
    showToast({
      title: t('profiles.change_password_success'),
      description: t('profiles.change_password_success_message'),
      variant: 'default',
    })
  } catch (error) {
    showToast({
      title: t('profiles.change_password_failed'),
      description: apiError(error).message,
      variant: 'destructive',
    })
  }
})
</script>

<template>
  <div class="w-full flex items-start gap-6 max-lg:flex-col">
    <div class="w-2/4 p-4 rounded-md shadow flex flex-col gap-6 max-lg:w-full bg-white">
      <div class="header flex items-center justify-between">
        <h3 class="text-lg font-semibold">{{ t('profiles.change_password') }}</h3>
      </div>
      <div class="body flex items-start gap-8">
        <div class="form flex items-center flex-col w-full">
          <div class="form-data w-full font-medium text-base">
            <label
              for="oldPassword"
              class="font-medium text-sm"
              >{{ t('profiles.old_password') }}</label
            >
            <InputValidation
              id="oldPassword"
              :placeholder="t('profiles.enter_old_password')"
              type="password"
              name="oldPassword"
              class="h-10 mt-1 bg-slate-50 border-slate-200 outline-none"
            />
          </div>
          <div class="form-data w-full font-medium text-base">
            <label
              for="newPassword"
              class="font-medium text-sm"
              >{{ t('profiles.new_password') }}</label
            >
            <InputValidation
              id="newPassword"
              :placeholder="t('profiles.enter_new_password')"
              type="password"
              name="newPassword"
              class="h-10 mt-1 bg-slate-50 border-slate-200 outline-none"
            />
          </div>
          <div class="form-data w-full font-medium text-base">
            <label
              for="confirmNewPassword"
              class="font-medium text-sm"
              >{{ t('profiles.confirm_new_password') }}</label
            >
            <InputValidation
              id="confirmNewPassword"
              :placeholder="t('profiles.enter_confirm_new_password')"
              type="password"
              name="confirmNewPassword"
              class="h-10 mt-1 bg-slate-50 border-slate-200 outline-none"
            />
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
        {{ t('profiles.save') }}
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
