<script setup lang="ts">
import { forgotPasswordApi } from '@/services/auth'
import ErrorMessage from '@/components/base/ErrorMessage.vue'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import { showToast } from '@/utils/toast'

const errorEmail = ref()
const isForgot = ref(false)
const isCountdown = ref(false)
const timeResend = ref(0)
const secondsResend = ref(0)
const isLoading = ref(false)

const handleForgot = async () => {
  try {
    if (!email.value) {
      errorEmail.value = 'Email must not be blank'
      return
    }
    await forgotPasswordApi(email.value)
    isLoading.value = true
    showToast({
      title: 'Success',
      description: 'Resend email success',
      variant: 'default',
    })
    isForgot.value = true
    isLoading.value = false
  } catch (error) {
    showToast({
      title: 'Resend email failed',
      description: `${((error as any).data?.error?.message as string) || 'Send forgot password error'}`,
      variant: 'destructive',
    })
  }
  console.log('hello')
}

const handleResentEmail = async (time: number) => {
  try {
    await forgotPasswordApi(email.value)
    showToast({
      title: 'Success',
      description: 'Resend email success',
      variant: 'default',
    })
    isForgot.value = true
    timeResend.value = time
    isCountdown.value = true
    startTimer()
  } catch (error) {
    showToast({
      title: 'Failed',
      description: 'Resend email failed',
      variant: 'default',
    })
  }
}

const startTimer = () => {
  secondsResend.value = checkSecond(secondsResend.value - 1)

  if (secondsResend.value == 59) {
    timeResend.value = timeResend.value - 1
  }
  if (timeResend.value < 0) {
    isCountdown.value = false
    // clearInterval(interval)
  }

  setTimeout(startTimer, 1000)
}

const checkSecond = (sec: number) => {
  if (sec < 0) {
    sec = 59
  }
  return sec
}

const { errors, defineField } = useForm({
  validationSchema: yup.object({
    email: yup.string().email().required('Email is required'),
  }),
})

const [email, emailAttrs] = defineField('email')
</script>
<template>
  <div class="h-full flex p-8">
    <div class="flex-1 flex justify-center items-center">
      <div class="rounded-xl max-md:w-full max-sm:p-0 w-96">
        <div class="flex items-center gap-4 justify-center">
          <img
            class="w-10 h-10 rounded-md object-contain"
            src="@/assets/img/logo.png"
            alt=""
          />
          <h2 class="text-lg font-semibold">Quizzfly</h2>
        </div>
        <div class="flex flex-col items-start gap-2 mb-2 mt-6">
          <h1 class="text-[344054] text-lg font-semibold">Forgot password</h1>
          <h1
            v-if="isForgot"
            class="text-[344054] text-sm font-medium"
          >
            A password reset link has been sent to <span class="text-primary">{{ email }}</span
            >. Click the link to complete the password reset. If you still haven't received the
            email, please hit resend below.
          </h1>
        </div>
        <div>
          <h2
            v-if="!isForgot"
            class="mt-1 text-[#667085]"
          >
            Enter your email to reset password
          </h2>
        </div>
        <div class="mt-6">
          <form
            v-if="!isForgot"
            class="form-data"
            @submit.prevent="handleForgot"
          >
            <label for="email">Email</label>
            <Input
              v-if="!isForgot"
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
            <Button
              :disabled="isLoading"
              type="submit"
              class="mt-4 w-full h-10 bg-primary flex gap-2"
            >
              <span
                v-if="isLoading"
                class="i-svg-spinners-ring-resize"
              ></span>
              Submit
            </Button>
          </form>
          <Button
            v-else-if="!isCountdown"
            class="mt-4 w-full h-10 bg-primary"
            :variant="isCountdown ? 'secondary' : 'default'"
            :disable-cache="isCountdown"
            @click="handleResentEmail(5)"
          >
            Resend
          </Button>
          <div class="flex items-center justify-center w-full">
            <div
              v-if="isCountdown"
              class="rounded-full w-28 py-2 flex items-center justify-center bg-secondary text-primary font-semibold"
            >
              {{ timeResend < 10 ? `0${timeResend}` : timeResend }}:{{
                secondsResend < 10 ? `0${secondsResend}` : secondsResend
              }}
            </div>
          </div>
        </div>
        <div class="text-end mt-6">
          <RouterLink
            class="text-[#0921D9] text-xs font-semibold"
            to="/login"
          >
            Come back
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
