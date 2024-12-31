<script setup lang="ts">
import BarWrapper from '@/components/room/BarWrapper.vue'
import { useRoomSocketStore } from '@/stores/socket/room'
import PlayHostView from '@/components/room/play/PlayHostView.vue'
import PlayCountdown from '@/components/room/play/PlayCountdown.vue'
import type { SocketLeaderboard, SocketQuizStarted } from '@/types/socket'
import Ranking from '@/components/room/play/Ranking.vue'
import RankingFinal from '@/components/room/play/RankingFinal.vue'
import { useRoomStore } from '@/stores/room'

const socketStore = useRoomSocketStore()
const roomStore = useRoomStore()
const isShowCountdown = ref(true)
const isGameStarted = ref(false)
const isShowRanking = ref(false)
const isShowFinalRanking = ref(false)
const socketData = ref<SocketQuizStarted>()
const leaderboardData = ref<SocketLeaderboard>()
onMounted(() => {
  // loadingStore.setLoading(true, false)
  // setTimeout(() => {
  //   loadingStore.setLoading(false)
  //   // socketStore.handleStartQuestion()
  // }, 2000)
})

onBeforeUnmount(() => {
  roomStore.$reset()
  window.onbeforeunload = null
})

const handleShowRanking = (value: boolean, data?: SocketLeaderboard) => {
  isShowRanking.value = value
  console.log('data', data)
  leaderboardData.value = data
}

const handleShowFinalRanking = (value: boolean, data?: SocketLeaderboard) => {
  isShowFinalRanking.value = value
  leaderboardData.value = data
}

const handleStartGame = () => {
  isShowCountdown.value = false
  if (!isGameStarted.value) {
    isGameStarted.value = true
    socketStore.handleStartQuestion()
  } else {
    socketStore.handleNextQuestion()
  }
}

const handleNewQuestion = () => {
  isShowCountdown.value = true
  isShowRanking.value = false
}

onBeforeMount(() => {
  window.onbeforeunload = function (e) {
    e = e || window.event

    // For IE and Firefox prior to version 4
    if (e) {
      e.returnValue = 'Sure?'
    }

    // For Safari
    return 'Sure?'
  }
})
</script>
<template>
  <div
    class="relative img-test w-full h-screen flex flex-col gap-6 overflow-hidden items-center justify-center bg-gray-200 bg-cover transition-all duration-200 ease-in-out"
  >
    <Teleport to="body">
      <Ranking
        v-if="isShowRanking && leaderboardData"
        :leaderboard-data="leaderboardData"
        @next-question="handleNewQuestion"
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

    <PlayCountdown
      v-if="isShowCountdown"
      @countdown-end="handleStartGame"
    />
    <PlayHostView
      v-show="!isShowCountdown"
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
  background-image: url(https://images.squarespace-cdn.com/content/v1/54fc8146e4b02a22841f4df7/1503538406982-OOD7PC8BL3DLWBHEFRLW/adve.jpg?format=2500w);
  background-size: cover;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  background-color: rgba(255, 255, 255, 0.3);
}
</style>
