<script setup lang="ts">
import type { SocketResultAnswer } from '@/types/socket'
import ConfettiExplosion from 'vue-confetti-explosion'

defineProps<{
  resultAnswer: SocketResultAnswer
}>()
</script>
<template>
  <div class="fixed z-20 top-0 left-0 w-full h-full flex justify-center items-center">
    <div
      v-if="resultAnswer.chosen_answer_id === resultAnswer.correct_answer_id"
      class="flex gap-5 flex-col items-center"
    >
      <Teleport to="body">
        <div class="fixed z-30 top-0 left-0 w-full h-full flex justify-center items-center">
          <ConfettiExplosion :duration="5000" />
        </div>
      </Teleport>
      <img
        v-motion
        :initial="{ opacity: 0, x: -100 }"
        :enter="{ opacity: 1, x: 0 }"
        class="w-[160px]"
        src="@/assets/icons/check.png"
        alt=""
      />
      <p class="text-2xl text-white font-bold">Good job! You got it right</p>
    </div>
    <div
      v-else
      class="flex gap-5 flex-col items-center"
    >
      <img
        v-motion
        :initial="{ opacity: 0, x: -100 }"
        :enter="{ opacity: 1, x: 0 }"
        class="w-[160px]"
        src="@/assets/icons/wrong.png"
        alt=""
      />
      <p class="text-2xl text-white font-bold">Wrong answer!</p>
    </div>
  </div>
</template>
