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

const router = useRouter()
const route = useRoute()
const confirmDialog = useConfirmDialog()

const { errors, handleSubmit, defineField } = useForm({
  validationSchema: yup.object({
    password: yup.string().required('Password is required'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], 'Passwords must match')
      .required('Confirm password is required'),
  }),
})

const token = ref()
const [password, passwordAttrs] = defineField('password')
const [confirmPassword, confirmPasswordAttrs] = defineField('confirmPassword')
const isLoading = ref(false)

onMounted(() => {
  token.value = route.query.token
  console.log(token.value, 'check token')
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
  const result = await confirmDialog.open({
    title: 'Success',
    question: 'Reset password successful',
    onlyConfirm: true,
  })

  if (result) {
    router.push('/login')
  }
}

const openConfirmError = async () => {
  const result = await confirmDialog.open({
    title: 'Failed',
    question: 'Expired password recovery link',
    onlyConfirm: true,
  })

  if (result) {
    router.push('/login')
  }
}

const onSubmit = handleSubmit(async (values) => {
  isLoading.value = true
  try {
    await resetPasswordApi({
      token: token.value,
      password: values.password,
      confirm_password: values.confirmPassword,
    })
    isLoading.value = false
    openConfirmSuccess()
  } catch (error) {
    showToast({
      title: 'Resend failed',
      description: apiError(error).message,
      variant: 'destructive',
    })
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
          <h1 class="text-[344054] text-lg font-semibold">Reset Password</h1>
        </div>
        <div>
          <h2 class="mt-1 text-[#667085]">Today is a new day. It's your day. You shape it.</h2>
          <h2 class="mt-1 text-[#667085]">Sign in to start managing your projects</h2>
        </div>
        <div class="mt-6">
          <div class="form-data">
            <label for="password">Password</label>
            <Input
              v-model="password"
              placeholder="Enter password..."
              type="password"
              class="h-10 mt-1 bg-slate-50 border-slate-200 outline-none"
              v-bind="passwordAttrs"
              :invalid="errors.password"
            />
            <ErrorMessage :error="errors.password" />
          </div>
          <div class="form-data">
            <label for="confirm-password">Confirm password</label>
            <Input
              v-model="confirmPassword"
              placeholder="Enter email..."
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
          Reset Password
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
