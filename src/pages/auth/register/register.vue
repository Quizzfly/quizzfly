<script setup lang="ts">
import { Input } from '@/components/ui/input'
import ErrorMessage from '@/components/base/ErrorMessage.vue'
import { Button } from '@/components/ui/button'

import { useForm } from 'vee-validate'
import * as yup from 'yup'
import { registerApi } from '@/services/auth'
import { apiError } from '@/utils/exceptionHandler'
import Toaster from '@/components/ui/toast/Toaster.vue'
import { showToast } from '@/utils/toast'
import { useConfirmDialog } from '@/stores/modal'
import { useAuthStore } from '@/stores/auth'
import { googleTokenLogin } from 'vue3-google-login'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const confirmDialog = useConfirmDialog()

const { errors, handleSubmit, defineField } = useForm({
  validationSchema: yup.object({
    email: yup.string().email().required(t('auth.email_required')),
    name: yup.string().required(t('auth.name_required')),
    password: yup
      .string()
      .required(t('auth.password_required'))
      .min(6, t('auth.password_min_length'))
      .matches(/[A-Z]/, t('auth.password_uppercase')),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], t('auth.passwords_must_match'))
      .required(t('auth.confirm_password_required')),
  }),
})

const [email, emailAttrs] = defineField('email')
const [password, passwordAttrs] = defineField('password')
const [name, nameAttrs] = defineField('name')
const [confirmPassword, confirmPasswordAttrs] = defineField('confirmPassword')
const isLoading = ref(false)
const router = useRouter()
const authStore = useAuthStore()

const loginGoogle = () => {
  googleTokenLogin().then((response) => {
    authStore.loginGG(response.access_token)
  })
}

const openConfirm = async () => {
  const result = await confirmDialog.open({
    title: t('auth.registration_success'),
    question: t('auth.registration_success_message'),
    onlyConfirm: true,
    success: true,
  })

  if (result.isConfirmed) {
    router.push('/login')
  }
}

const onSubmit = handleSubmit(async (values) => {
  isLoading.value = true
  try {
    await registerApi({
      email: values.email,
      name: values.name,
      password: values.password,
      confirm_password: values.confirmPassword,
    })
    openConfirm()
  } catch (error) {
    showToast({
      title: t('auth.register_failed'),
      description: apiError(error).message,
      variant: 'destructive',
    })
  } finally {
    isLoading.value = false
  }
})
</script>
<template>
  <Toaster />
  <div class="h-full flex p-8">
    <div class="flex-1 flex justify-center items-center">
      <div
        class="rounded-xl max-md:w-full max-sm:p-0 w-96"
        @submit.prevent="onSubmit"
      >
        <form
          class="rounded-xl max-md:w-full max-sm:p-0 w-96"
          @submit.prevent="onSubmit"
        >
          <div class="flex items-center gap-0.5 mb-4">
            <h1 class="text-[344054] text-lg font-semibold">{{ $t('auth.register_account') }}</h1>
          </div>
          <div>
            <h2 class="mt-1 text-[#667085]">{{ $t('auth.new_day_description') }}</h2>
            <h2 class="mt-1 text-[#667085]">{{ $t('auth.register_description') }}</h2>
          </div>
          <div class="mt-6">
            <div class="form-data">
              <label for="email">{{ $t('auth.name') }}</label>
              <Input
                v-model="name"
                :placeholder="$t('auth.name_placeholder')"
                v-bind="nameAttrs"
                :invalid="errors.name"
                type="text"
                class="h-10 mt-1 bg-slate-50 border-slate-200 outline-none"
              />
              <ErrorMessage :error="errors.name" />
            </div>
            <div class="form-data">
              <label for="email">{{ $t('auth.email') }}</label>
              <Input
                v-model="email"
                :placeholder="$t('auth.email_placeholder')"
                v-bind="emailAttrs"
                :invalid="errors.email"
                type="email"
                class="h-10 mt-1 bg-slate-50 border-slate-200 outline-none"
              />
              <ErrorMessage :error="errors.email" />
            </div>
            <div class="form-data">
              <label for="email">{{ $t('auth.password') }}</label>
              <Input
                v-model="password"
                :placeholder="$t('auth.password_placeholder')"
                v-bind="passwordAttrs"
                :invalid="errors.password"
                type="password"
                class="h-10 mt-1 bg-slate-50 border-slate-200 outline-none"
              />
              <ErrorMessage :error="errors.password" />
            </div>
            <div class="form-data">
              <label for="email">{{ $t('auth.confirm_password') }}</label>
              <Input
                v-model="confirmPassword"
                :placeholder="$t('auth.confirm_password_placeholder')"
                v-bind="confirmPasswordAttrs"
                :invalid="errors.confirmPassword"
                type="password"
                class="h-10 mt-1 bg-slate-50 border-slate-200 outline-none"
              />
              <ErrorMessage :error="errors.confirmPassword" />
            </div>
          </div>

          <Button
            :disabled="isLoading"
            class="mt-6 w-full h-10 flex gap-2"
          >
            <span
              v-if="isLoading"
              class="i-svg-spinners-ring-resize"
            ></span>
            {{ $t('auth.sign_up') }}
          </Button>
          <div class="flex items-center gap-2 w-full mt-8">
            <span class="h-px bg-slate-200 w-full"></span>
            <p class="text-base">{{ $t('auth.or') }}</p>
            <span class="h-px bg-slate-200 w-full"></span>
          </div>
        </form>

        <Button
          class="h-10 mt-8 w-full flex items-center gap-4 bg-slate-100"
          variant="secondary"
          @click="loginGoogle()"
        >
          <img
            class="w-5"
            src="@/assets/img/google-logo.png"
            alt=""
          />
          {{ $t('auth.sign_in_with_google') }}
        </Button>
        <div class="flex justify-center mt-6">
          <p>{{ $t('auth.have_account') }}</p>
          <RouterLink
            class="ml-[6px] text-[#0921D9] font-normal"
            to="/login"
          >
            {{ $t('auth.sign_in') }}
          </RouterLink>
        </div>
      </div>
    </div>
    <div class="flex-1 relative max-md:hidden">
      <img
        class="absolute top-0 left-0 w-full h-full object-cover rounded-3xl"
        src="@/assets/img/bg-image-1.jpg"
        alt=""
      />
    </div>
  </div>
</template>
<style scoped></style>
