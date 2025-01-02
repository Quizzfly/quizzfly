<script setup lang="ts">
import Instructions from '@/components/room/play/Instructions.vue'
import PlayUserBlock from '@/components/room/play/PlayUserBlock.vue'
import type { SocketLeaderboard, SocketQuizStarted, SocketResultAnswer } from '@/types/socket'
import PlayLoading from '@/components/room/play/PlayLoading.vue'
import PlayUserResult from '@/components/room/play/PlayUserResult.vue'
import RankingFinal from '@/components/room/play/RankingFinal.vue'
import { useRoomSocketStore } from '@/stores/socket/room'
import { useRoomStore } from '@/stores/room'
import type { IKickPlayer, IMember } from '@/types'
import SlideEditor from '@/components/quizzfly/create/slide/SlideEditor.vue'
import { showToast } from '@/utils/toast'

const socketMessage = computed(() => {
  return socketStore.getMessage
})

const router = useRouter()
const socketStore = useRoomSocketStore()
const roomStore = useRoomStore()

const socketData = ref<SocketQuizStarted>()
const participantId = ref('')
const isGameStarted = ref(false)
const isSentAnswer = ref(false)
const isShowResult = ref(false)
const resultAnswer = ref<SocketResultAnswer | null>(null)
const leaderboardData = ref<SocketLeaderboard>()
const isShowFinalRanking = ref(false)

const currentTotalScore = computed(() => {
  return (
    leaderboardData.value?.leader_board.find((item) => item.id === participantId.value)
      ?.total_score || 0
  )
})

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
  const name = localStorage.getItem('name')
  const roomPin = localStorage.getItem('roomPin')

  if (!name || !roomPin) {
    router.push({ name: 'play-lobby' })
    return
  }

  roomStore.setMemberName(name)
  roomStore.setDetailRoom({
    room_pin: roomPin,
  })
  console.log('name', name, 'roomPin', roomPin)
  const participant_id = localStorage.getItem('participantID')
  participantId.value = participant_id || ''
  console.log('participant_id', participant_id)
  const joinRoomData: any = {
    nick_name: name,
    room_pin: roomPin,
  }

  if (participant_id) {
    joinRoomData.participant_id = participant_id
  }
  socketStore.handleJoinRoomData(joinRoomData)
})

watch(socketMessage, (val) => {
  if (val) {
    if (val.event === 'quizFinished') {
      isShowFinalRanking.value = true
      return
    }

    if (val.event === 'participantJoined') {
      participantId.value = (val.data as IMember).new_participant.id
    }

    if (val.event === 'quizStarted' || val.event === 'nextQuestion') {
      isGameStarted.value = true
      isSentAnswer.value = false
      isShowResult.value = false
      socketData.value = val.data as SocketQuizStarted
    }

    if (val.event === 'participantReconnectedSuccess') {
      isGameStarted.value = true
      isSentAnswer.value = false
      isShowResult.value = false
      socketData.value = val.data as SocketQuizStarted
    }

    if (val.event === 'resultAnswer') {
      isShowResult.value = true
      isSentAnswer.value = true
      resultAnswer.value = val.data as SocketResultAnswer
    }

    if (val.event === 'kickParticipant') {
      const id = localStorage.getItem('participantID') // TODO - use socketId
      if (id && id === (val.data as IKickPlayer).participant_left.id) {
        showToast({
          description: 'You have been kicked out of the room',
          variant: 'destructive',
        })
        localStorage.removeItem('roomPin')
        router.push({ name: 'play-lobby' })
      }
    }

    if (val.event === 'updateLeaderboard') {
      leaderboardData.value = val.data as SocketLeaderboard
    }
  }
})

const handleSendAnswer = (answerId: string) => {
  isSentAnswer.value = true
  socketStore.handleAnswerQuestion({
    answer_id: answerId,
    question_id: socketData.value?.question.id || '',
  })
}

onBeforeUnmount(() => {
  window.onbeforeunload = null
  localStorage.removeItem('roomPin')
  localStorage.removeItem('name')
  // localStorage.removeItem('participantID')
})
</script>

<template>
  <div
    class="bg w-full layout-full overflow-hidden flex flex-col justify-center items-center bg-cover gap-8"
  >
    <Instructions v-if="!isGameStarted" />

    <SlideEditor
      v-else-if="socketData && socketData.question.type === 'SLIDE'"
      class="w-full h-full"
      :layout="JSON.parse(socketData?.question?.content)"
    />

    <PlayUserBlock
      v-else-if="socketData && socketData.question.type !== 'SLIDE'"
      :current-question="socketData?.question"
      :is-sent-answer="isSentAnswer"
      :result-answer="resultAnswer"
      @select="handleSendAnswer"
    />

    <PlayLoading v-if="isSentAnswer && !isShowResult" />

    <PlayUserResult
      v-if="isShowResult && resultAnswer"
      :result-answer="resultAnswer"
    />

    <Teleport to="body">
      <div
        v-if="isShowFinalRanking && leaderboardData"
        class="fixed top-0 left-0 w-full h-full z-[99]"
      >
        <RankingFinal
          :is-to-home="true"
          :leaderboard-data="leaderboardData"
        />
      </div>
    </Teleport>
    <div
      v-if="isGameStarted"
      class="w-full h-[64px] text-lg px-4 flex justify-between items-center bg-white"
    >
      <div class="max-w-[50%] overflow-hidden flex gap-2 items-center">
        <img
          v-image
          class="w-10 h-10 border rounded-full object-cover"
          src=""
          alt="avatar"
        />
        <p class="font-bold text-ellipsis overflow-hidden whitespace-nowrap">
          {{ roomStore.getMemberName }}
        </p>
      </div>
      <div>
        <p class="font-bold text-3xl">{{ currentTotalScore }}</p>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.bg {
  background: url('@/assets/img/bg-image-5.jpg');
  background-size: cover;
}

.layout-full {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  max-height: -webkit-fill-available;
  overflow: hidden;
}
</style>
