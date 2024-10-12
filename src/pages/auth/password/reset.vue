<script setup lang="ts">
import { onMounted } from 'vue'
import { validPass, validPassConfirm } from '@/utils/validate'
import { resetPasswordApi } from '@/services/auth'
import Toaster from '@/components/ui/toast/Toaster.vue'
import { useConfirmDialog } from '@/stores/modal'
import { Input } from '@/components/ui/input'
import ErrorMessage from '@/components/base/ErrorMessage.vue'
import { Button } from '@/components/ui/button'
import { apiExceptionHandler } from '@/utils/exceptionHandler'
import { showToast } from '@/utils/toast'

const router = useRouter()
const route = useRoute()
const confirmDialog = useConfirmDialog()
const password = ref('')
const confirmPassword = ref('')
const token = ref()
const errorPassword = ref('')
const errorConfirmPassword = ref('')

onMounted(() => {
  token.value = route.query.token
  console.log(token.value, 'check token')
  if (!token) {
    router.push('/login')
  }
})

const checkPassword = () => {
  const check = validPass(password.value)
  errorPassword.value = check.mess

  return check.check
}

const checkConfirmPassword = () => {
  const check = validPassConfirm(confirmPassword.value, password.value)
  errorConfirmPassword.value = check.mess

  return check.check
}

const openConfirm = async () => {
  const result = await confirmDialog.open({
    title: 'Success',
    question: 'Reset password successful',
  })

  if (result) {
    router.push('/login')
  }
}

const onSubmit = async () => {
  if (checkPassword() && checkConfirmPassword()) {
    try {
      await resetPasswordApi({
        confirm_token: token.value,
        password: password.value,
        confirm_password: confirmPassword.value,
      }).then(() => {
        openConfirm()
      })
    } catch (error) {
      showToast({
        title: 'Resend failed',
        description: `${apiExceptionHandler(error).message}`,
        variant: 'destructive',
      })
    }
  }
}
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
            <Label for="password">Password</Label>
            <Input
              v-model="password"
              placeholder="Enter password..."
              type="password"
              class="h-10 mt-1 bg-slate-50 border-slate-200 outline-none"
              @input="checkPassword"
            />
            <ErrorMessage :error="errorConfirmPassword" />
          </div>
          <div class="form-data">
            <Label for="confirm-password">Confirm password</Label>
            <Input
              v-model="confirmPassword"
              placeholder="Enter email..."
              type="password"
              class="h-10 mt-1 bg-slate-50 border-slate-200 outline-none"
              @input="checkConfirmPassword"
            />
            <ErrorMessage :error="errorConfirmPassword" />
          </div>
        </div>
        <Button class="mt-6 w-full h-10"> Reset Password </Button>
      </form>
    </div>
    <div class="flex-1 relative max-md:hidden">
      <img
        class="absolute top-0 left-0 w-full h-full object-unset rounded-3xl"
        src="@/assets/img/auth-bg.jpg"
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
