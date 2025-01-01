<script setup lang="ts">
import Toaster from '@/components/ui/toast/Toaster.vue'
import ConfirmModal from './components/base/ConfirmDialog.vue'
import LoadingOverlay from '@/components/base/LoadingOverlay.vue'
import { useNotificationSocketStore } from '@/stores/socket/notification'
import { notifyMe } from './utils/noti'

const notificationStore = useNotificationSocketStore()
const getMessage = computed(() => {
  return notificationStore.getMessage
})

watch(getMessage, (val: any) => {
  if (val.event === 'notification') {
    notifyMe(val.data)
  }
})

const route = useRoute()

const layout = computed(() => {
  return route.meta.layout ?? 'DefaultLayout'
})

onMounted(() => {
  // loadingStore.setLoading(true)
  // showToast({
  //   title: 'Welcome to Vite Vue3',
  //   description: 'This is a simple toast message',
  //   variant: 'default',
  // })
  // openConfirm()
})

// const confirmDialog = useConfirmDialog()
// const openConfirm = async () => {
//   const result = await confirmDialog.open({
//     title: 'Are you sure?',
//     question: 'Do you really want to delete this item?',
//     onlyConfirm: true,
//     warning: true,
//   })
//   console.log('result', result)
// }
</script>

<template>
  <ConfirmModal />
  <LoadingOverlay />
  <!-- <button @click="openConfirm">Open Modal</button> -->
  <Toaster />
  <component :is="layout">
    <RouterView />
  </component>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
