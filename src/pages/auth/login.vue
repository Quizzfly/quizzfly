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
</script>
<template>
  <div class="h-full flex p-8 gap-12">
    <div class="flex-1 flex justify-center items-center">
      <div class="rounded-xl max-md:w-full max-sm:p-0 w-96">
        <form
          class="rounded-xl max-md:w-full max-sm:p-0 w-96"
          @submit="onSubmit"
        >
          <div class="flex items-center gap-0.5 mb-4">
            <h1 class="text-[344054] text-lg font-semibold mt-3">{{ $t('auth.welcome_back') }}</h1>
          </div>
          <div>
            <h2 class="mt-1 text-[#667085]">{{ $t('auth.new_day_description') }}</h2>
            <h2 class="mt-1 text-[#667085]">{{ $t('auth.sign_in_description') }}</h2>
          </div>
          <div class="mt-6">
            <div class="form-data">
              <label for="email">{{ $t('auth.email') }}</label>
              <InputValidation
                id="email"
                :placeholder="$t('auth.email_placeholder')"
                type="email"
                name="email"
                class="h-10 mt-1 bg-slate-50 border-slate-200 outline-none"
              />
            </div>
            <div class="form-data mt-3">
              <label for="password">{{ $t('auth.password') }}</label>
              <InputValidation
                id="password"
                :placeholder="$t('auth.password_placeholder')"
                type="password"
                name="password"
                class="h-10 mt-1 bg-slate-50 border-slate-200 outline-none"
              />
            </div>
          </div>
          <div class="text-end">
            <RouterLink
              class="text-[#0921D9] text-xs font-normal"
              to="/password/forgot"
            >
              {{ $t('auth.forgot_password') }}
            </RouterLink>
          </div>
          <Button
            :disabled="isLoading"
            class="mt-6 w-full h-10 bg-primary flex gap-2 items-center"
          >
            <span
              v-if="isLoading"
              class="i-svg-spinners-ring-resize"
            ></span>
            {{ $t('auth.sign_in') }}
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
          <p>{{ $t('auth.no_account') }}</p>
          <RouterLink
            class="ml-[6px] text-[#0921D9] font-normal"
            to="/register"
          >
            {{ $t('auth.sign_up') }}
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
<style scoped>
.btn-gg {
  &:deep() {
    .nsm7Bb-HzV7m-LgbsSe {
      width: 100% !important;
      max-width: 100% !important;
      border-radius: 60px;
      margin-top: 32px;
    }
  }
}
</style>
