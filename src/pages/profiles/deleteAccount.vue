<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue'
import InputValidation from '@/components/base/InputValidation.vue'
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import { apiError } from '@/utils/exceptionHandler'
import { showToast } from '@/utils/toast'
import { useAuthStore } from '@/stores/auth'
import { requestDeleteApi, verifyDeleteApi } from '@/services/user'
import { useRouter } from 'vue-router'

const router = useRouter()

const authStore = useAuthStore()
const isCountdown = ref(false)
const timeResend = ref(0)
const secondsResend = ref(0)

const userInfo = computed(() => {
  return authStore.getUser
})

const isLoading = ref(false)
const { handleSubmit } = useForm({
  validationSchema: yup.object({
    code: yup.string().required('Code is required'),
  }),
})

const handleResentEmail = async (time: number) => {
  isLoading.value = true
  try {
    await requestDeleteApi()
    showToast({
      title: 'Success',
      description: 'Resend code success',
      variant: 'default',
    })
    timeResend.value = time
    isCountdown.value = true
    isLoading.value = false
    startTimer()
  } catch (error) {
    showToast({
      title: 'Failed',
      description: 'Resend code failed',
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

const onSubmit = handleSubmit(async (values) => {
  isLoading.value = true
  try {
    await verifyDeleteApi({
      code: values.code,
    })
    isLoading.value = false
    authStore.logout()
    showToast({
      title: 'success',
      description: 'Delete account success',
      variant: 'default',
    })
  } catch (error) {
    showToast({
      title: 'Delete account failed',
      description: apiError(error).message,
      variant: 'destructive',
    })
  }
})
</script>

<template>
  <div class="w-full absolute max-lg:flex-col flex items-center justify-center top-16">
    <div class="w-2/4 flex justify-center items-center flex-col gap-8">
      <div class="flex flex-col gap-4 text-center">
        <h2 class="text-3xl font-semibold">Are you sure you'd like to delete your account?</h2>
        <p>
          We’re sorry to see you go. Once you delete your account, you’ll lose access to the kahoots
          you’ve created.
        </p>
      </div>
      <div class="w-full p-6 rounded-md shadow flex flex-col gap-6 max-lg:w-full bg-white">
        <div class="flex items-center gap-2">
          <div class="w-10 h-10 rounded-full">
            <img
              v-if="userInfo?.user_info.avatar"
              class="w-full h-full object-cover rounded-full"
              :src="userInfo.user_info.avatar"
              alt=""
            />
            <img
              v-else
              class="w-full h-full object-cover rounded-full"
              src="@/assets/img/avatar.jpg"
              alt=""
            />
          </div>
          <p class="text-base font-semibold">{{ userInfo?.user_info.name }}</p>
        </div>
        <div class="">
          <p>
            We’d appreciate if you could share why you decided to delete your account so we can
            improve our services.
          </p>
        </div>
        <div class="flex items-center justify-center gap-3">
          <p class="text-xl font-semibold">Request delete account</p>
          <div class="flex items-center justify-center">
            <div
              v-if="isCountdown"
              class="rounded-full w-28 py-2 flex items-center justify-center bg-secondary text-primary font-semibold"
            >
              {{ timeResend < 10 ? `0${timeResend}` : timeResend }}:{{
                secondsResend < 10 ? `0${secondsResend}` : secondsResend
              }}
            </div>
          </div>
          <Button
            v-if="!isCountdown"
            class="h-10 flex items-center gap-2 w-42"
            :disabled="isLoading"
            :disable-cache="isCountdown"
            @click="handleResentEmail(5)"
          >
            <span
              v-if="isLoading"
              class="i-svg-spinners-ring-resize"
            ></span>
            Request
          </Button>
        </div>
        <div class="">
          <label
            class="font-medium"
            for="code"
            >Code</label
          >
          <InputValidation
            id="code"
            name="code"
            type="string"
            placeholder="Enter code..."
            class="h-10 mt-1 bg-slate-50 border-slate-200 outline-none"
          />
        </div>
        <div class="flex gap-2 w-full justify-center items-center">
          <Button
            class="h-10 flex items-center gap-2 bg-slate-100 w-24"
            variant="secondary"
            @click="router.push('/profiles')"
          >
            Cancel
          </Button>
          <Button
            class="h-10 flex items-center gap-2 w-42"
            :disabled="isLoading"
            variant="destructive"
            @click="onSubmit"
          >
            <span
              v-if="isLoading"
              class="i-svg-spinners-ring-resize"
            ></span>
            Delete account
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.shadow {
  box-shadow:
    rgba(14, 30, 37, 0.1) 0px 2px 20px 0px,
    rgba(14, 30, 37, 0.2) 0px 2px 2px 0px;
}
</style>
