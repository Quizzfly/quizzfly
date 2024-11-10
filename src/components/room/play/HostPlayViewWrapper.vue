<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue'
import Answers from '../common/Answers.vue'
import type { SocketData } from '@/types/socket'
import { useSocketStore } from '@/stores/socket'
import type { Quiz } from '@/types/question'
const socketStore = useSocketStore()

const props = defineProps<{
  socketData: SocketData
}>()

const emits = defineEmits<{
  (e: 'showRanking', val: boolean): void
}>()

const timeCountdown = ref(0)
let countdownInterval: ReturnType<typeof setInterval> | null = null

watch(
  () => props.socketData,
  (newVal) => {
    if (newVal && newVal.start_time && (newVal.question as Quiz)?.time_limit) {
      const timeStart = newVal.start_time // timestamp in milliseconds
      const endTime = timeStart + (newVal.question as Quiz).time_limit * 1000 // ví dụ đếm ngược 60 giây từ `startTime`

      if (countdownInterval) clearInterval(countdownInterval)

      countdownInterval = setInterval(() => {
        const timeRemaining = Math.max(0, Math.floor((endTime - Date.now()) / 1000))
        timeCountdown.value = timeRemaining

        if (timeRemaining <= 0 && countdownInterval) {
          clearInterval(countdownInterval)
          countdownInterval = null
          emits('showRanking', true)

          setTimeout(() => {
            emits('showRanking', false)
            socketStore.handleNextQuestion()
          }, 3000)
        }
      }, 1000)
    }
  },
  { immediate: true },
)

onUnmounted(() => {
  if (countdownInterval) clearInterval(countdownInterval)
})
</script>

<template>
  <div class="relative top-0 flex flex-col justify-between pb-10 h-full w-full">
    <div class="flex items-center justify-center gap-8 mr-32 w-auto">
      <div class="rounded bg-white p-4">
        <p class="font-black text-2xl text-center">
          {{ socketData?.question?.content }}
        </p>
      </div>
    </div>
    <div class="absolute top-0 right-0">
      <Button
        variant="secondary"
        class="font-extrabold text-xl px-8 py-7"
        >Next</Button
      >
    </div>

    <div class="flex items-center justify-between w-full">
      <div class="flex justify-center p-4 rounded-full bg-primary w-[68px] h-[68px]">
        <p class="font-black text-white text-3xl tracking-wider">{{ timeCountdown }}</p>
      </div>
      <div class="flex items-center mt-12 justify-center rounded-sm">
        <img
          src="@/assets/img/bg-image-1.jpg"
          class="w-[500px] object-cover rounded-sm"
          alt=""
        />
      </div>
      <div class="flex flex-col gap-3 justify-center items-center">
        <div class="p-4 rounded-full bg-primary w-[68px] h-[68px] text-center">
          <p class="font-black text-white text-3xl tracking-wider">1</p>
        </div>
        <div class="px-4 py-2 bg-primary rounded-full">
          <p class="flex items-center justify-center text-white font-semibold text-base">Answers</p>
        </div>
      </div>
    </div>
    <div class="">
      <Answers
        v-if="socketData?.question"
        :current-question="socketData?.question"
      />
    </div>
  </div>
</template>
