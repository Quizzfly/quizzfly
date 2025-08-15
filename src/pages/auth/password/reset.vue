<script setup lang="ts">
import { onMounted } from 'vue'
import { resetPasswordApi, verifyResetPasswordApi } from '@/services/auth'
import Toaster from '@/components/ui/toast/Toaster.vue'
import { useConfirmDialog } from '@/stores/modal'
import { Input } from '@/components/ui/input'
import ErrorMessage from '@/components/base/ErrorMessage.vue'
import { Button } from '@/components/ui/button'
import { apiError } from '@/utils/exceptionHandler'
import { showToast } from '@/utils/toast'
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const router = useRouter()
const route = useRoute()
const confirmDialog = useConfirmDialog()

const { errors, handleSubmit, defineField } = useForm({
  validationSchema: yup.object({
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

const token = ref()
const [password, passwordAttrs] = defineField('password')
const [confirmPassword, confirmPasswordAttrs] = defineField('confirmPassword')
const isLoading = ref(false)

onMounted(() => {
  token.value = route.query.token
  if (!token) {
    router.push('/login')
  }
  verifyResetPassword(token.value)
})

const verifyResetPassword = async (token: string) => {
  try {
    await verifyResetPasswordApi(token)
  } catch (error) {
    openConfirmError()
  }
}

const openConfirmSuccess = async () => {
  await confirmDialog.open({
    title: t('auth.reset_success'),
    question: t('auth.reset_success_message'),
    onlyConfirm: true,
    success: true,
  })

  router.push('/login')
}

const openConfirmError = async () => {
  await confirmDialog.open({
    title: t('auth.reset_failed'),
    question: t('auth.reset_expired'),
    onlyConfirm: true,
    warning: true,
  })

  router.push('/login')
}
const onSubmit = handleSubmit(async (values) => {
  isLoading.value = true
  try {
    await resetPasswordApi({
      token: token.value,
      password: values.password,
      confirm_password: values.confirmPassword,
    })
    openConfirmSuccess()
  } catch (error) {
    showToast({
      title: t('auth.reset_error'),
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
      <form
        class="rounded-xl max-md:w-full max-sm:p-0 w-96"
        @submit.prevent="onSubmit"
      >
        <div class="flex items-center gap-0.5 mb-4">
          <h1 class="text-[344054] text-lg font-semibold">{{ $t('auth.reset_password') }}</h1>
        </div>
        <div>
          <h2 class="mt-1 text-[#667085]">{{ $t('auth.new_day_description') }}</h2>
          <h2 class="mt-1 text-[#667085]">{{ $t('auth.reset_password_description') }}</h2>
        </div>
        <div class="mt-6">
          <div class="form-data">
            <label for="password">{{ $t('auth.password') }}</label>
            <Input
              v-model="password"
              :placeholder="$t('auth.password_placeholder')"
              type="password"
              class="h-10 mt-1 bg-slate-50 border-slate-200 outline-none"
              v-bind="passwordAttrs"
              :invalid="errors.password"
            />
            <ErrorMessage :error="errors.password" />
          </div>
          <div class="form-data">
            <label for="confirm-password">{{ $t('auth.confirm_password') }}</label>
            <Input
              v-model="confirmPassword"
              :placeholder="$t('auth.confirm_password_placeholder')"
              type="password"
              class="h-10 mt-1 bg-slate-50 border-slate-200 outline-none"
              v-bind="confirmPasswordAttrs"
              :invalid="errors.confirmPassword"
            />
            <ErrorMessage :error="errors.confirmPassword" />
          </div>
        </div>
        <Button
          :disabled="isLoading"
          class="mt-6 w-full h-10 gap-2 flex"
        >
          <span
            v-if="isLoading"
            class="i-svg-spinners-ring-resize"
          ></span>
          {{ $t('auth.reset_password') }}
        </Button>
      </form>
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

<style scoped>
.forgot-header {
  width: 100%;
  height: 56px;
  background: #334d6e;
  display: flex;
  align-items: center;
}

.forgot-container {
  text-align: center;
}

.forgot-container-head {
  font-weight: bold;
  font-size: 36px;
  line-height: 42px;
  text-align: center;

  /* Dark green */
  color: #00693b;
  margin-top: 74px;
}

.forgot-container-intro {
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;

  /* or 150% */
  text-align: center;
  letter-spacing: 0.02em;

  /* Body text 2 */
  color: #525252;
  margin-top: 24px;
  max-width: 556px;
  clear: both;
  display: inline-block;
}

.forgot-input-label {
  font-weight: normal;
  font-size: 15px;
  line-height: 24px;

  /* identical to box height, or 160% */
  letter-spacing: 0.02em;

  /* Title text */
  color: #363445;
}

.forgot-input-container {
  width: 556px;
  height: 200px;
  clear: both;
  display: inline-block;
  text-align: left;
  margin-top: 24px;
}

.forgot-input {
  width: 566px;
  height: 48px;

  background: #dde1cd;
  border-radius: 4px;
  border: none;

  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.02em;
  color: #525252;
  padding: 0px 12px;
}

.login-validation {
  font-weight: normal;
  font-size: 14px;
  line-height: 22px;

  /* identical to box height, or 157% */
  display: flex;
  align-items: center;
  letter-spacing: 0.02em;

  /* highlight */
  color: #f46414;
  min-height: 24px;
}

.fotgot-btn {
  width: 566px;
  height: 48px;

  /* Dark green */
  background: #00693b;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;

  /* identical to box height, or 150% */
  text-align: center;
  letter-spacing: 0.02em;

  color: #ffffff;
}

.fotgot-btn:hover {
  cursor: pointer;
}
</style>
