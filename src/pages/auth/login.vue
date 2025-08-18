<script setup lang="ts">
import { Button } from '@/components/ui/button'
import InputValidation from '@/components/base/InputValidation.vue'
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import { useAuthStore } from '@/stores/auth'
import { googleTokenLogin } from 'vue3-google-login'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const { handleSubmit } = useForm({
  validationSchema: yup.object({
    email: yup.string().email().required(t('auth.email_required')),
    password: yup
      .string()
      .required(t('auth.password_required'))
      .min(6, t('auth.password_min_length'))
      .matches(/[A-Z]/, t('auth.password_uppercase')),
  }),
})

const authStore = useAuthStore()
const isLoading = ref(false)
const showPassword = ref(false)

const onSubmit = handleSubmit(async (values) => {
  isLoading.value = true
  await authStore.login(values.email, values.password)
  isLoading.value = false
})

const loginGoogle = () => {
  googleTokenLogin().then((response) => {
    authStore.loginGG(response.access_token)
  })
}

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}
</script>
<template>
  <div class="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex p-8 gap-12">
    <!-- Left Side - Login Form -->
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

        <form
          class="relative z-10"
          @submit="onSubmit"
        >
          <!-- Header Section -->
          <div class="text-center mb-8">
            <div
              class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl mb-4 shadow-lg"
            >
              <span class="text-white text-2xl font-bold">Q</span>
            </div>
            <h1
              class="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-2"
            >
              {{ $t('auth.welcome_back') }}
            </h1>
            <p class="text-gray-500 leading-relaxed">
              {{ $t('auth.new_day_description') }}<br />
              {{ $t('auth.sign_in_description') }}
            </p>
          </div>

          <!-- Form Fields -->
          <div class="space-y-5">
            <div class="form-group">
              <label
                for="email"
                class="block text-sm font-semibold text-gray-700 mb-2"
              >
                {{ $t('auth.email') }}
              </label>
              <div class="relative">
                <div
                  class="absolute top-[13px] left-0 pl-3 flex items-center pointer-events-none z-10"
                >
                  <span class="i-material-symbols-light-mail-outline text-gray-400 text-xl"></span>
                </div>
                <InputValidation
                  id="email"
                  :placeholder="$t('auth.email_placeholder')"
                  type="email"
                  name="email"
                  class="w-full h-12 pl-12 pr-4 bg-white/80 backdrop-blur border-[1px] border-gray-200/50 rounded-xl outline-none transition-all duration-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 focus:bg-white hover:border-gray-300"
                />
              </div>
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
                  class="absolute top-[13px] left-0 pl-3 flex items-center pointer-events-none z-10"
                >
                  <span class="i-material-symbols-light-lock-outline text-gray-400 text-xl"></span>
                </div>
                <InputValidation
                  id="password"
                  :placeholder="$t('auth.password_placeholder')"
                  :type="showPassword ? 'text' : 'password'"
                  name="password"
                  class="w-full h-12 pl-12 pr-12 bg-white/80 backdrop-blur border-[1px] border-gray-200/50 rounded-xl outline-none transition-all duration-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 focus:bg-white hover:border-gray-300"
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
            </div>
          </div>

          <!-- Forgot Password Link -->
          <div class="text-right mt-4">
            <RouterLink
              class="text-indigo-600 text-sm font-medium hover:text-indigo-500 transition-colors duration-200"
              to="/password/forgot"
            >
              {{ $t('auth.forgot_password') }}
            </RouterLink>
          </div>

          <!-- Login Button -->
          <Button
            :disabled="isLoading"
            class="mt-8 w-full h-12 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span
              v-if="isLoading"
              class="i-svg-spinners-ring-resize mr-2"
            ></span>
            <span
              v-if="!isLoading"
              class="i-material-symbols-light-login mr-2"
            ></span>
            {{ $t('auth.sign_in') }}
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

        <!-- Google Login Button -->
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

        <!-- Sign Up Link -->
        <div class="flex justify-center mt-8 pt-6 border-t border-gray-200/50">
          <p class="text-gray-600">{{ $t('auth.no_account') }}</p>
          <RouterLink
            class="ml-2 text-indigo-600 font-semibold hover:text-indigo-500 transition-colors duration-200"
            to="/register"
          >
            {{ $t('auth.sign_up') }}
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
          <h2 class="text-3xl font-bold mb-2">Start Your Quiz Journey</h2>
          <p class="text-lg opacity-90">
            Create, share, and play interactive quizzes with friends and colleagues.
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
  transform: translateY(-8px) scale(0.85);
  color: #4f46e5;
}

/* Floating label animation */
.form-group input {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.form-group input:focus {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(79, 70, 229, 0.15);
}

/* Button hover effects */
.btn-gradient {
  background: linear-gradient(135deg, #4f46e5 0%, #9333ea 100%);
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
  border-color: #4f46e5;
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
}

/* Enhanced form field spacing */
.form-group:not(:last-child) {
  margin-bottom: 1.25rem;
}
</style>
