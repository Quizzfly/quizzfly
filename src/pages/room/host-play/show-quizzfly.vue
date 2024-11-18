<script setup lang="ts">
import BarWrapper from '@/components/room/BarWrapper.vue'
import { useLoadingStore } from '@/stores/loading'
import { useSocketStore } from '@/stores/socket'
import PlayHostView from '@/components/room/play/PlayHostView.vue'
import type { SocketLeaderboard, SocketQuizStarted } from '@/types/socket'
import Ranking from '@/components/room/play/Ranking.vue'
import RankingFinal from '@/components/room/play/RankingFinal.vue'
import { useRoomStore } from '@/stores/room'

const loadingStore = useLoadingStore()
const socketStore = useSocketStore()
const roomStore = useRoomStore()

const isShowRanking = ref(false)
const isShowFinalRanking = ref(false)
const socketData = ref<SocketQuizStarted>()
const leaderboardData = ref<SocketLeaderboard>()

onMounted(() => {
  loadingStore.setLoading(true, false)
  setTimeout(() => {
    loadingStore.setLoading(false)
    socketStore.handleStartQuestion()
  }, 2000)
})

onBeforeUnmount(() => {
  roomStore.$reset()
})

const handleShowRanking = (value: boolean, data?: SocketLeaderboard) => {
  isShowRanking.value = value
  leaderboardData.value = data
}

const handleShowFinalRanking = (value: boolean, data?: SocketLeaderboard) => {
  isShowFinalRanking.value = value
  leaderboardData.value = data
}
</script>
<template>
  <div
    class="relative img-test w-full h-screen flex flex-col gap-6 overflow-hidden items-center justify-center bg-gray-200 bg-cover transition-all duration-200 ease-in-out"
  >
    <Teleport to="body">
      <Ranking
        v-if="isShowRanking && leaderboardData"
        :leaderboard-data="leaderboardData"
      />
    </Teleport>

    <Teleport to="body">
      <div
        v-if="isShowFinalRanking && leaderboardData"
        class="fixed top-0 left-0 w-full h-full z-20"
      >
        <RankingFinal :leaderboard-data="leaderboardData" />
      </div>
    </Teleport>

    <!-- <PreDisplay /> -->
    <PlayHostView
      :socket-data="socketData"
      @show-ranking="handleShowRanking"
      @show-final-ranking="handleShowFinalRanking"
    />
    <BarWrapper />
  </div>
</template>
<style scoped>
.img-test {
  /* background: url('@/assets/img/bg-image-3.jpg'); */
  background-size: cover;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  background-color: rgba(255, 255, 255, 0.3);
}
</style>
