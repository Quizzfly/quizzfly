<script setup lang="ts">
import Instructions from '@/components/room/play/Instructions.vue'
import PlayUserBlock from '@/components/room/play/PlayUserBlock.vue'
import type { SocketQuizStarted, SocketResultAnswer } from '@/types/socket'
import PlayLoading from '@/components/room/play/PlayLoading.vue'
import PlayUserResult from '@/components/room/play/PlayUserResult.vue'

import { useSocketStore } from '@/stores/socket'
import { useRoomStore } from '@/stores/room'

const socketMessage = computed(() => {
  return socketStore.getMessage
})

const router = useRouter()
const socketStore = useSocketStore()
const roomStore = useRoomStore()
const socketData = ref<SocketQuizStarted>()

const isGameStarted = ref(false)
const isSentAnswer = ref(false)
const isShowResult = ref(false)
const resultAnswer = ref<SocketResultAnswer | null>(null)

onBeforeMount(() => {
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
  socketStore.handleJoinRoomData({
    name: name || '',
    roomPin: roomPin || '',
  })
})

watch(socketMessage, (val) => {
  if (val) {
    if (val.event === 'quizStarted' || val.event === 'nextQuestion') {
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

    if (val.event === 'kickPlayer') {
      router.push({ name: 'play-lobby' })
    }
  }
})

const handleSendAnswer = (answerId: string) => {
  isSentAnswer.value = true
  socketStore.handleAnswerQuestion({
    answerId,
    questionId: socketData.value?.question.id || '',
  })
}
</script>

<template>
  <div class="relative bg w-full h-full flex flex-col justify-center items-center bg-cover gap-8">
    <Instructions v-if="!isGameStarted" />
    <PlayUserBlock
      v-else-if="socketData"
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
  </div>
</template>
<style lang="scss" scoped>
.bg {
  background: url('@/assets/img/bg-image-5.jpg');
  background-size: cover;
}
</style>
