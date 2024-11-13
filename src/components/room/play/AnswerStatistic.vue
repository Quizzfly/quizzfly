<template>
  <div class="flex justify-center items-center h-full">
    <div class="flex flex-col items-center space-y-6 h-full">
      <!-- Chart Container -->
      <div class="flex items-end space-x-6 h-full">
        <div
          v-for="(option, index) in optionMapped"
          :key="index"
          class="flex flex-col items-center h-full justify-end"
        >
          <!-- Vote Count -->
          <img
            v-if="option.correct"
            v-motion
            :initial="{ opacity: 0, x: -100 }"
            :enter="{ opacity: 1, x: 0 }"
            class="w-[30px]"
            src="@/assets/icons/check.png"
            alt=""
          />
          <div
            class="text-lg font-bold text-white w-full text-center rounded-t-md"
            :style="{ backgroundColor: colorsHex[index].border }"
          >
            {{ option.votes }}
          </div>

          <!-- Bar Column -->
          <div
            v-motion
            :initial="{ height: '0%' }"
            :enter="{ height: `${(option.votes / maxVotes) * 100}%` }"
            :delay="index * 100"
            :duration="500"
            :style="{ backgroundColor: colorsHex[index].primary }"
            class="w-24 flex items-end justify-center transition-all"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { colorsHex } from '@/utils/theme'
import type { SocketSummaryAnswer } from '@/types/socket'
import type { Question, Quiz } from '@/types/question'
const props = defineProps<{
  summaryAnswer: SocketSummaryAnswer
  currentQuestion: Question
}>()

const optionMapped = computed(() => {
  return (props.currentQuestion as Quiz).answers.map((answer, index) => {
    return {
      label: answer.content,
      votes: props.summaryAnswer.answers_count[answer.id],
      color: colorsHex[index].primary,
      correct: props.summaryAnswer.correct_answer_id === answer.id,
    }
  })
})

// Calculate the maximum votes for scaling
const maxVotes = computed(() => {
  return Math.max(...optionMapped.value.map((option) => option.votes))
})
</script>
