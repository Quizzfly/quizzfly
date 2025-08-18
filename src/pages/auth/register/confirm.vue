<script setup lang="ts">
import { confirmEmailApi } from '@/services/auth'
import { useLoadingStore } from '@/stores/loading'
import { useConfirmDialog } from '@/stores/modal'
import { apiError } from '@/utils/exceptionHandler'
import { showToast } from '@/utils/toast'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const loadingStore = useLoadingStore()

const confirmDialog = useConfirmDialog()

const router = useRouter()
const route = useRoute()

const openConfirm = async () => {
  const result = await confirmDialog.open({
    title: t('auth.confirm_success'),
    question: t('auth.confirm_success_message'),
    onlyConfirm: true,
  })

  if (result.isConfirmed) {
    router.push('/login')
  }
}

const confirmEmail = async (token: string) => {
  loadingStore.setLoading(true)
  try {
    await confirmEmailApi(token)
    openConfirm()
  } catch (error: any) {
    showToast({
      title: t('auth.confirm_failed'),
      description: apiError(error).message,
      variant: 'destructive',
    })
  }
  loadingStore.setLoading(false)
}

onBeforeMount(async () => {
  const token = route.query.token as string
  if (token) {
    await confirmEmail(token)
  } else {
    router.push({ name: 'login' })
  }
})
</script>
<template>
  <div
    class="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-8"
  >
    <div
      class="confirm-container backdrop-blur-xl bg-white/70 border border-white/20 shadow-2xl rounded-3xl p-8 w-[440px] max-md:w-full max-sm:p-6 relative overflow-hidden flex flex-col items-center"
    >
      <div
        class="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20 animate-pulse"
      ></div>
      <div
        class="absolute -bottom-20 -left-20 w-32 h-32 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full opacity-20 animate-pulse"
      ></div>
      <div class="relative z-10 flex flex-col items-center">
        <div
          class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-400 to-green-600 rounded-2xl mb-4 shadow-lg"
        >
          <span class="i-material-symbols-light-mark-email-read text-white text-3xl"></span>
        </div>
        <h1
          class="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-2 text-center"
        >
          {{ $t('auth.confirm_success') }}
        </h1>
        <p class="text-gray-600 text-lg text-center mb-4">
          {{ $t('auth.confirm_success_message') }}
        </p>
        <router-link
          to="/login"
          class="mt-6 text-indigo-600 font-semibold hover:text-indigo-500 transition-colors duration-200 flex items-center gap-2"
        >
          <span class="i-material-symbols-light-login text-lg"></span>
          {{ $t('auth.sign_in') }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
/* Enhanced confirmation card animations */
.confirm-container {
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

@supports (backdrop-filter: blur(20px)) {
  .confirm-container {
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
  }
}

@media (max-width: 768px) {
  .confirm-container {
    margin: 1rem;
    padding: 2rem 1.5rem;
  }
}
</style>
