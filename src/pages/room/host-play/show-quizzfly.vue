<script setup lang="ts">
import BarWrapper from '@/components/room/BarWrapper.vue'
// import PreDisplay from '@/components/room/PreDisplay.vue'
import QuizzType from '@/components/room/QuizzType.vue'
import { useLoadingStore } from '@/stores/loading'
import { useSocketStore } from '@/stores/socket'
import type { Question } from '@/types/question'
import HostPlayViewWrapper from '@/components/room/play/HostPlayViewWrapper.vue'
import type { SocketData } from '@/types/socket'
import { convertToSnakeCase } from '@/utils/convert'
import Ranking from '@/components/room/play/Ranking.vue'

const loadingStore = useLoadingStore()
const socketStore = useSocketStore()

const socketMessage = computed(() => {
  return socketStore.getMessage
})

watch(socketMessage, (newVal) => {
  console.log('socketMessage', newVal)
})

const isShowRanking = ref(false)
const socketData = ref<SocketData>()

watch(socketMessage, (newVal) => {
  console.log('socketMessage', newVal)
  if (newVal.event === 'quizStarted' || newVal.event === 'nextQuestion') {
    socketData.value = convertToSnakeCase(newVal.data)
  }
})
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
      v-if="socketData"
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
}
</style>
