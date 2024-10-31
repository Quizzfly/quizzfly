<script setup lang="ts">
import { confirmEmailApi } from '@/services/auth'
import { useLoadingStore } from '@/stores/loading'
import { useConfirmDialog } from '@/stores/modal'
import { apiError } from '@/utils/exceptionHandler'
import { showToast } from '@/utils/toast'

const loadingStore = useLoadingStore()

const confirmDialog = useConfirmDialog()

const router = useRouter()
const route = useRoute()

const openConfirm = async () => {
  const result = await confirmDialog.open({
    title: 'Success',
    question: 'Registration confirmed successfully, please proceed to login',
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
      title: 'Confirm failed',
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
  <div class="contain object-cover w-full h-full"></div>
</template>

<style scoped lang="scss">
.contain {
  background: url('@/assets/img/auth-bg.jpg');
}
</style>
