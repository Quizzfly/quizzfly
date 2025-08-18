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
  <div class="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex p-8 gap-12">
    <div class="flex-1 flex justify-center items-center">
      <div
        class="login-container backdrop-blur-xl bg-white/70 border border-white/20 shadow-2xl rounded-3xl p-8 max-md:w-full max-sm:p-6 w-[440px] relative overflow-hidden"
      >
        <div
          class="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20 animate-pulse"
        ></div>
        <div
          class="absolute -bottom-20 -left-20 w-32 h-32 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full opacity-20 animate-pulse"
        ></div>
        <form
          class="relative z-10 space-y-6"
          @submit.prevent="onSubmit"
        >
          <div class="text-center mb-8">
            <div
              class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl mb-4 shadow-lg"
            >
              <span class="text-white text-2xl font-bold">Q</span>
            </div>
            <h1
              class="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-2"
            >
              {{ $t('auth.reset_password') }}
            </h1>
            <p class="text-gray-500 leading-relaxed">
              {{ $t('auth.new_day_description') }}<br />
              {{ $t('auth.reset_password_description') }}
            </p>
          </div>
          <div class="form-group">
            <label
              for="password"
              class="block text-sm font-semibold text-gray-700 mb-2"
            >
              {{ $t('auth.password') }}
            </label>
            <div class="relative">
              <div
                class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10"
              >
                <span class="i-material-symbols-light-lock-outline text-gray-400 text-xl"></span>
              </div>
              <Input
                v-model="password"
                :placeholder="$t('auth.password_placeholder')"
                type="password"
                class="w-full h-12 pl-12 pr-4 bg-white/80 backdrop-blur border-2 border-gray-200/50 rounded-xl outline-none transition-all duration-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 focus:bg-white hover:border-gray-300"
                v-bind="passwordAttrs"
                :invalid="errors.password"
              />
            </div>
            <ErrorMessage
              class="text-xs mt-1 text-red-500"
              :error="errors.password"
            />
          </div>
          <div class="form-group">
            <label
              for="confirm-password"
              class="block text-sm font-semibold text-gray-700 mb-2"
            >
              {{ $t('auth.confirm_password') }}
            </label>
            <div class="relative">
              <div
                class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10"
              >
                <span class="i-material-symbols-light-lock-outline text-gray-400 text-xl"></span>
              </div>
              <Input
                v-model="confirmPassword"
                :placeholder="$t('auth.confirm_password_placeholder')"
                type="password"
                class="w-full h-12 pl-12 pr-4 bg-white/80 backdrop-blur border-2 border-gray-200/50 rounded-xl outline-none transition-all duration-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 focus:bg-white hover:border-gray-300"
                v-bind="confirmPasswordAttrs"
                :invalid="errors.confirmPassword"
              />
            </div>
            <ErrorMessage
              class="text-xs mt-1 text-red-500"
              :error="errors.confirmPassword"
            />
          </div>
          <Button
            :disabled="isLoading"
            class="w-full h-12 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed gap-2 flex"
          >
            <span
              v-if="isLoading"
              class="i-svg-spinners-ring-resize mr-2"
            ></span>
            <span
              v-if="!isLoading"
              class="i-material-symbols-light-key mr-2"
            ></span>
            {{ $t('auth.reset_password') }}
          </Button>
        </form>
      </div>
    </div>
    <div class="flex-1 relative max-md:hidden">
      <div
        class="absolute inset-0 bg-gradient-to-br from-indigo-600/20 to-purple-600/20 rounded-3xl"
      ></div>
      <img
        class="absolute top-0 left-0 w-full h-full object-cover rounded-3xl shadow-2xl"
        src="@/assets/img/bg-image-1.jpg"
        alt="Background"
      />
      <div
        class="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent rounded-3xl flex items-end"
      >
        <div class="p-8 text-white">
          <h2 class="text-3xl font-bold mb-2">Reset Your Password</h2>
          <p class="text-lg opacity-90">Create a new password and get back to quizzing!</p>
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
</style>
