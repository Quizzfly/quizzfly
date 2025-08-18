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

const showPassword = ref(false)
const showConfirmPassword = ref(false)

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}

const toggleConfirmPasswordVisibility = () => {
  showConfirmPassword.value = !showConfirmPassword.value
}

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
  <div class="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex p-8 gap-12">
    <!-- Left Side - Register Form -->
    <div class="flex-1 flex justify-center items-center">
      <div
        class="register-container backdrop-blur-xl bg-white/70 border border-white/20 shadow-2xl rounded-3xl p-8 max-md:w-full max-sm:p-6 w-[480px] relative overflow-hidden"
      >
        <!-- Animated background decoration -->
        <div
          class="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-r from-green-400 to-blue-500 rounded-full opacity-20 animate-pulse"
        ></div>
        <div
          class="absolute -bottom-20 -left-20 w-32 h-32 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20 animate-pulse"
        ></div>

        <form
          class="relative z-10"
          @submit.prevent="onSubmit"
        >
          <!-- Header Section -->
          <div class="text-center mb-8">
            <div
              class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl mb-4 shadow-lg"
            >
              <span class="text-white text-2xl font-bold">Q</span>
            </div>
            <h1
              class="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-2"
            >
              {{ $t('auth.register_account') }}
            </h1>
          </div>

          <!-- Form Fields -->
          <div class="space-y-5">
            <!-- Name Field -->
            <div class="form-group">
              <label
                for="name"
                class="block text-sm font-semibold text-gray-700 mb-2"
              >
                {{ $t('auth.name') }}
              </label>
              <div class="relative">
                <div
                  class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10"
                >
                  <span
                    class="i-material-symbols-light-person-outline text-gray-400 text-xl"
                  ></span>
                </div>
                <Input
                  v-model="name"
                  v-bind="nameAttrs"
                  :placeholder="$t('auth.name_placeholder')"
                  :invalid="errors.name"
                  type="text"
                  class="w-full h-12 pl-12 pr-4 bg-white/80 backdrop-blur border-2 border-gray-200/50 rounded-xl outline-none transition-all duration-300 focus:border-green-500 focus:ring-4 focus:ring-green-500/20 focus:bg-white hover:border-gray-300"
                />
              </div>
              <ErrorMessage :error="errors.name" />
            </div>

            <!-- Email Field -->
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
                  v-model="email"
                  v-bind="emailAttrs"
                  :placeholder="$t('auth.email_placeholder')"
                  :invalid="errors.email"
                  type="email"
                  class="w-full h-12 pl-12 pr-4 bg-white/80 backdrop-blur border-2 border-gray-200/50 rounded-xl outline-none transition-all duration-300 focus:border-green-500 focus:ring-4 focus:ring-green-500/20 focus:bg-white hover:border-gray-300"
                />
              </div>
              <ErrorMessage :error="errors.email" />
            </div>

            <!-- Password Field -->
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
                  v-bind="passwordAttrs"
                  :placeholder="$t('auth.password_placeholder')"
                  :invalid="errors.password"
                  :type="showPassword ? 'text' : 'password'"
                  class="w-full h-12 pl-12 pr-12 bg-white/80 backdrop-blur border-2 border-gray-200/50 rounded-xl outline-none transition-all duration-300 focus:border-green-500 focus:ring-4 focus:ring-green-500/20 focus:bg-white hover:border-gray-300"
                />
                <button
                  type="button"
                  class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors z-10"
                  @click="togglePasswordVisibility"
                >
                  <span
                    v-if="showPassword"
                    class="i-material-symbols-light-visibility-off text-xl"
                  ></span>
                  <span
                    v-else
                    class="i-material-symbols-light-visibility text-xl"
                  ></span>
                </button>
              </div>
              <ErrorMessage :error="errors.password" />
            </div>

            <!-- Confirm Password Field -->
            <div class="form-group">
              <label
                for="confirmPassword"
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
                  v-bind="confirmPasswordAttrs"
                  :placeholder="$t('auth.confirm_password_placeholder')"
                  :invalid="errors.confirmPassword"
                  :type="showConfirmPassword ? 'text' : 'password'"
                  class="w-full h-12 pl-12 pr-12 bg-white/80 backdrop-blur border-2 border-gray-200/50 rounded-xl outline-none transition-all duration-300 focus:border-green-500 focus:ring-4 focus:ring-green-500/20 focus:bg-white hover:border-gray-300"
                />
                <button
                  type="button"
                  class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors z-10"
                  @click="toggleConfirmPasswordVisibility"
                >
                  <span
                    v-if="showConfirmPassword"
                    class="i-material-symbols-light-visibility-off text-xl"
                  ></span>
                  <span
                    v-else
                    class="i-material-symbols-light-visibility text-xl"
                  ></span>
                </button>
              </div>
              <ErrorMessage :error="errors.confirmPassword" />
            </div>
          </div>

          <!-- Register Button -->
          <Button
            :disabled="isLoading"
            class="mt-8 w-full h-12 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span
              v-if="isLoading"
              class="i-svg-spinners-ring-resize mr-2"
            ></span>
            <span
              v-if="!isLoading"
              class="i-material-symbols-light-person-add mr-2"
            ></span>
            {{ $t('auth.sign_up') }}
          </Button>

          <!-- Divider -->
          <div class="flex items-center gap-4 w-full mt-8">
            <span
              class="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent flex-1"
            ></span>
            <p class="text-sm font-medium text-gray-500 bg-white px-3 rounded-full">
              {{ $t('auth.or') }}
            </p>
            <span
              class="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent flex-1"
            ></span>
          </div>
        </form>

        <!-- Google Register Button -->
        <Button
          class="h-12 mt-6 w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-50 text-gray-700 font-semibold border-2 border-gray-200 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
          variant="secondary"
          @click="loginGoogle()"
        >
          <img
            class="w-5 h-5"
            src="@/assets/img/google-logo.png"
            alt="Google"
          />
          {{ $t('auth.sign_in_with_google') }}
        </Button>

        <!-- Sign In Link -->
        <div class="flex justify-center mt-8 pt-6 border-t border-gray-200/50">
          <p class="text-gray-600">{{ $t('auth.have_account') }}</p>
          <RouterLink
            class="ml-2 text-green-600 font-semibold hover:text-green-500 transition-colors duration-200"
            to="/login"
          >
            {{ $t('auth.sign_in') }}
          </RouterLink>
        </div>
      </div>
    </div>

    <!-- Right Side - Hero Image with Enhanced Design -->
    <div class="flex-1 relative max-md:hidden">
      <div
        class="absolute inset-0 bg-gradient-to-br from-green-600/20 to-blue-600/20 rounded-3xl"
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
          <h2 class="text-3xl font-bold mb-2">Join Our Community</h2>
          <p class="text-lg opacity-90">
            Create engaging quizzes, collaborate with teams, and make learning fun for everyone.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
/* Enhanced register form animations */
.register-container {
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
  color: #059669;
}

/* Floating label animation */
.form-group input {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.form-group input:focus {
  /* transform: translateY(-2px); */
  box-shadow: 0 10px 25px rgba(5, 150, 105, 0.15);
}

/* Button hover effects */
.btn-gradient {
  background: linear-gradient(135deg, #059669 0%, #2563eb 100%);
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
  .register-container {
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
  }
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .register-container {
    margin: 1rem;
    padding: 2rem 1.5rem;
  }
}

/* Enhanced focus states */
button:focus-visible {
  outline: 2px solid #059669;
  outline-offset: 2px;
}

/* Password visibility toggle animation */
.password-toggle {
  transition: all 0.2s ease-in-out;
}

.password-toggle:hover {
  transform: scale(1.1);
}

/* Google button enhanced styling */
.google-btn {
  position: relative;
  overflow: hidden;
}

.google-btn::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  background: rgba(66, 133, 244, 0.1);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition:
    width 0.3s,
    height 0.3s;
}

.google-btn:hover::after {
  width: 300px;
  height: 300px;
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

/* Error message styling enhancement */
:deep(.error-message) {
  animation: slideInDown 0.3s ease-out;
}

@keyframes slideInDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Input validation states */
.form-group input.error {
  border-color: #ef4444;
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}

.form-group input.valid {
  border-color: #059669;
  box-shadow: 0 0 0 3px rgba(5, 150, 105, 0.1);
}

/* Enhanced form field spacing */
.form-group:not(:last-child) {
  margin-bottom: 1.25rem;
}

/* Improved password strength indicator */
.password-strength {
  height: 4px;
  background: #e5e7eb;
  border-radius: 2px;
  margin-top: 8px;
  overflow: hidden;
}

.password-strength-bar {
  height: 100%;
  border-radius: 2px;
  transition: all 0.3s ease;
}

.strength-weak {
  background: #ef4444;
  width: 33%;
}

.strength-medium {
  background: #f59e0b;
  width: 66%;
}

.strength-strong {
  background: #059669;
  width: 100%;
}
</style>
