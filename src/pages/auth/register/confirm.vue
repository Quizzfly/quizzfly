<script setup lang="ts">
import { confirmEmailApi } from '@/services/auth'
import { useLoadingStore } from '@/stores/loading'
import { useConfirmDialog } from '@/stores/modal'
import { apiExceptionHandler } from '@/utils/exceptionHandler'
import { showToast } from '@/utils/toast'
const loadingStore = useLoadingStore()

const confirmDialog = useConfirmDialog()

const router = useRouter()
const route = useRoute()

const openConfirm = async () => {
  const result = await confirmDialog.open({
    title: 'Success',
    question: 'Registration confirmed successfully, please proceed to login',
  })

  if (result) {
    router.push('/login')
  }
  router.push('/login')
}

const confirmEmail = async (token: string) => {
  try {
    await confirmEmailApi(token)
    openConfirm()
  } catch (error: any) {
    console.log(error, 'check error')
    showToast({
      title: 'Confirm failed',
      description: `${apiExceptionHandler(error).message}`,
      variant: 'destructive',
    })
  }
}

onBeforeMount(async () => {
  const token = route.query.token as string
  loadingStore.setLoading(true)
  if (token) {
    await confirmEmail(token)
    loadingStore.setLoading(false)
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
