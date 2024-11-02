<script setup lang="ts">
import BarWrapper from '@/components/room/BarWrapper.vue'
// import PreDisplay from '@/components/room/PreDisplay.vue'
import QuizzType from '@/components/room/QuizzType.vue'
import { useLoadingStore } from '@/stores/loading'
const loadingStore = useLoadingStore()
onMounted(() => {
  loadingStore.setLoading(true, false)
  setTimeout(() => {
    loadingStore.setLoading(false)
  }, 2000)
})
</script>
<template>
  <div
    class="ralative img-test w-full h-screen p-6 flex flex-col gap-6 overflow-hidden items-center justify-center bg-gray-200 bg-cover transition-all duration-200 ease-in-out"
  >
    <!-- <PreDisplay /> -->
    <QuizzType />
    <BarWrapper></BarWrapper>
  </div>
</template>
<style scoped lang="scss">
.img-test {
  background: url('@/assets/img/bg-image-3.jpg');
  background-size: cover;
}
</style>
