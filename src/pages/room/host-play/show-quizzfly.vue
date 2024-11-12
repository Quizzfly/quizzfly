<script setup lang="ts">
import BarWrapper from '@/components/room/BarWrapper.vue'
import { useLoadingStore } from '@/stores/loading'
import { useSocketStore } from '@/stores/socket'
import HostPlayViewWrapper from '@/components/room/play/HostPlayViewWrapper.vue'
import type { SocketQuizStarted } from '@/types/socket'
import Ranking from '@/components/room/play/Ranking.vue'

const loadingStore = useLoadingStore()
const socketStore = useSocketStore()

const isShowRanking = ref(false)
const socketData = ref<SocketQuizStarted>()

onMounted(() => {
  loadingStore.setLoading(true, false)
  setTimeout(() => {
    loadingStore.setLoading(false)
  }, 2000)
  socketStore.handleStartQuestion()
  setTimeout(() => {
    // socketStore.handleNextQuestion()
  }, 3000)
})
</script>
<template>
  <div
    class="ralative img-test w-full h-screen p-6 flex flex-col gap-6 overflow-hidden items-center justify-center bg-gray-200 bg-cover transition-all duration-200 ease-in-out"
  >
    <Teleport to="body">
      <Ranking v-if="isShowRanking" />
    </Teleport>

    <!-- <PreDisplay /> -->
    <HostPlayViewWrapper
      :socket-data="socketData"
      @show-ranking="isShowRanking = $event"
    />
    <BarWrapper />
  </div>
</template>
<style scoped lang="scss">
.img-test {
  background: url('@/assets/img/bg-image-3.jpg');
  background-size: cover;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  background-color: rgba(255, 255, 255, 0.3);
}
</style>
