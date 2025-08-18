<script setup lang="ts">
import { forgotPasswordApi } from '@/services/auth'
import ErrorMessage from '@/components/base/ErrorMessage.vue'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import { showToast } from '@/utils/toast'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const errorEmail = ref()
const isForgot = ref(false)
const isCountdown = ref(false)
const timeResend = ref(0)
const secondsResend = ref(0)
const isLoading = ref(false)

const handleForgot = async () => {
  try {
    if (!email.value) {
      errorEmail.value = t('auth.email_must_not_blank')
      return
    }
    await forgotPasswordApi(email.value)
    isLoading.value = true
    showToast({
      title: t('auth.forgot_success'),
      description: t('auth.forgot_success_message'),
      variant: 'default',
    })
    isForgot.value = true
  } catch (error) {
    showToast({
      title: t('auth.forgot_failed'),
      description: `${((error as any).data?.error?.message as string) || t('auth.forgot_failed_message')}`,
      variant: 'destructive',
    })
  } finally {
    isLoading.value = false
  }
}

const handleResentEmail = async (time: number) => {
  try {
    await forgotPasswordApi(email.value)
    showToast({
      title: t('auth.forgot_success'),
      description: t('auth.forgot_success_message'),
      variant: 'default',
    })
    isForgot.value = true
    timeResend.value = time
    isCountdown.value = true
    startTimer()
  } catch (error) {
    showToast({
      title: t('auth.resend_failed'),
      description: t('auth.resend_failed_message'),
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
    email: yup.string().email().required(t('auth.email_required')),
  }),
})

const [email, emailAttrs] = defineField('email')
</script>
<template>
  <div class="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex p-8 gap-12">
    <!-- Left Side - Forgot Password Form -->
    <div class="flex-1 flex justify-center items-center">
      <div
        class="login-container backdrop-blur-xl bg-white/70 border border-white/20 shadow-2xl rounded-3xl p-8 max-md:w-full max-sm:p-6 w-[440px] relative overflow-hidden"
      >
        <!-- Animated background decoration -->
        <div
          class="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20 animate-pulse"
        ></div>
        <div
          class="absolute -bottom-20 -left-20 w-32 h-32 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full opacity-20 animate-pulse"
        ></div>

        <!-- Header Section -->
        <div class="text-center mb-8 relative z-10">
          <div
            class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl mb-4 shadow-lg"
          >
            <span class="text-white text-2xl font-bold">Q</span>
          </div>
          <h1
            class="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-2"
          >
            {{ $t('auth.forgot_password') }}
          </h1>
          <p
            v-if="!isForgot"
            class="text-gray-500 leading-relaxed"
          >
            {{ $t('auth.forgot_password_description') }}
          </p>
          <div
            v-else
            class="text-center"
          >
            <i18n-t
              keypath="auth.forgot_password_sent"
              tag="p"
              class="text-gray-600 text-sm"
            >
              <template #email>
                <span class="text-indigo-600 font-semibold">{{ email }}</span>
              </template>
            </i18n-t>
          </div>
        </div>

        <!-- Form Section -->
        <form
          v-if="!isForgot"
          class="relative z-10 space-y-6"
          @submit.prevent="handleForgot"
        >
          <div class="form-group">
            <label
              for="email"
              class="block text-sm font-semibold text-gray-700 mb-2"
            >
              {{ $t('auth.email') }}
            </label>
            <div class="relative">
              <div
                class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10"
              >
                <span class="i-material-symbols-light-mail-outline text-gray-400 text-xl"></span>
              </div>
              <Input
                id="email"
                v-model="email"
                :placeholder="$t('auth.email_placeholder')"
                v-bind="emailAttrs"
                :invalid="errors.email"
                type="email"
                class="w-full h-12 pl-12 pr-4 bg-white/80 backdrop-blur border-2 border-gray-200/50 rounded-xl outline-none transition-all duration-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 focus:bg-white hover:border-gray-300"
              />
            </div>
            <ErrorMessage
              class="text-xs mt-1 text-red-500"
              :error="errors.email"
            />
          </div>

          <Button
            :disabled="isLoading"
            type="submit"
            class="w-full h-12 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span
              v-if="isLoading"
              class="i-svg-spinners-ring-resize mr-2"
            ></span>
            <span
              v-if="!isLoading"
              class="i-material-symbols-light-send mr-2"
            ></span>
            {{ $t('auth.submit') }}
          </Button>
        </form>

        <!-- Resend Section -->
        <div
          v-else
          class="relative z-10 space-y-6"
        >
          <div class="text-center">
            <div
              class="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4"
            >
              <span class="i-material-symbols-light-mark-email-read text-green-600 text-3xl"></span>
            </div>
            <h2 class="text-xl font-semibold text-gray-800 mb-2">
              {{ $t('auth.check_your_email') }}
            </h2>
            <p class="text-gray-600 text-sm">
              {{ $t('auth.reset_link_sent') }}
            </p>
          </div>

          <Button
            v-if="!isCountdown"
            class="w-full h-12 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
            @click="handleResentEmail(5)"
          >
            <span class="i-material-symbols-light-refresh mr-2"></span>
            {{ $t('auth.resend') }}
          </Button>

          <div
            v-if="isCountdown"
            class="flex items-center justify-center"
          >
            <div
              class="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 rounded-full border border-gray-200"
            >
              <span class="i-material-symbols-light-timer text-gray-500"></span>
              <span class="text-gray-700 font-medium">
                {{ timeResend < 10 ? `0${timeResend}` : timeResend }}:{{
                  secondsResend < 10 ? `0${secondsResend}` : secondsResend
                }}
              </span>
            </div>
          </div>
        </div>

        <!-- Back to Login Link -->
        <div class="flex justify-center mt-8 pt-6 border-t border-gray-200/50 relative z-10">
          <RouterLink
            class="text-indigo-600 font-semibold hover:text-indigo-500 transition-colors duration-200 flex items-center gap-2"
            to="/login"
          >
            <span class="i-material-symbols-light-arrow-back text-lg"></span>
            {{ $t('auth.come_back') }}
          </RouterLink>
        </div>
      </div>
    </div>

    <!-- Right Side - Hero Image with Enhanced Design -->
    <div class="flex-1 relative max-md:hidden">
      <div
        class="absolute inset-0 bg-gradient-to-br from-indigo-600/20 to-purple-600/20 rounded-3xl"
      ></div>
      <img
        class="absolute top-0 left-0 w-full h-full object-cover rounded-3xl shadow-2xl"
        src="@/assets/img/bg-image-1.jpg"
        alt="Background"
      />
      <!-- Overlay with content -->
      <div
        class="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent rounded-3xl flex items-end"
      >
        <div class="p-8 text-white">
          <h2 class="text-3xl font-bold mb-2">Secure Password Recovery</h2>
          <p class="text-lg opacity-90">
            We'll help you get back to creating amazing quizzes in no time.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
/* Enhanced login form animations */
.login-container {
  animation: slideInUp 0.6s ease-out;
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Form group styling */
.form-group {
  position: relative;
}

.form-group label {
  transition: all 0.2s ease-in-out;
}

/* Enhanced input styling */
.form-group input:focus + label,
.form-group input:not(:placeholder-shown) + label {
  /* transform: translateY(-8px) scale(0.85); */
  color: #4f46e5;
}

/* Floating label animation */
.form-group input {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.form-group input:focus {
  /* transform: translateY(-2px); */
  box-shadow: 0 10px 25px rgba(79, 70, 229, 0.15);
}

/* Button hover effects */
.btn-gradient {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: relative;
  overflow: hidden;
}

.btn-gradient::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, transparent 100%);
  transition: left 0.5s;
}

.btn-gradient:hover::before {
  left: 100%;
}

/* Enhanced backdrop blur effect */
@supports (backdrop-filter: blur(20px)) {
  .login-container {
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
  }
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .login-container {
    margin: 1rem;
    padding: 2rem 1.5rem;
  }
}

/* Enhanced focus states */
button:focus-visible {
  outline: 2px solid #4f46e5;
  outline-offset: 2px;
}

/* Enhanced divider */
.divider-gradient {
  background: linear-gradient(90deg, transparent, #e5e7eb, transparent);
}

/* Link hover effects */
a {
  position: relative;
}

a::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background: currentColor;
  transition: width 0.3s ease-in-out;
}

a:hover::after {
  width: 100%;
}

/* Success state animations */
.success-icon {
  animation: scaleIn 0.5s ease-out;
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* Timer animation */
.timer-display {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}
</style>
