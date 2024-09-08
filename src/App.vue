<script setup lang="ts">
import Toaster from '@/components/ui/toast/Toaster.vue'
import ConfirmModal from './components/base/ConfirmModal.vue'
import { useLoadingStore } from './stores/loading'
import { showToast } from './utils/toast'
import { useConfirmDialog } from './stores/modal'
const route = useRoute()

const layout = computed(() => {
  return route.meta.layout ?? 'DefaultLayout'
})

const loadingStore = useLoadingStore()

onMounted(() => {
  showToast({
    title: 'Welcome to Vite Vue3',
    description: 'This is a simple toast message',
    variant: 'default',
  })
})

const confirmDialog = useConfirmDialog()
const openConfirm = async () => {
  const result = await confirmDialog.open({
    title: 'Are you sure?',
    question: 'Do you really want to delete this item?',
  })
  console.log('result', result)
}
</script>

<template>
  <ConfirmModal />

  <button @click="openConfirm">Open Modal</button>
  <Toaster />
  <div
    v-if="loadingStore.getLoading"
    class="fixed top-0 left-0 w-full h-full flex justify-center items-center z-[999] bg-[#4c4c4c61]"
  >
    <Icon
      icon="svg-spinners:90-ring-with-bg"
      class="w-10 h-10"
    />
  </div>
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
