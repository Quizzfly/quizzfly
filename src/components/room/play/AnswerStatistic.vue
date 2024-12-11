<template>
  <div class="flex justify-center items-center h-full">
    <div class="flex flex-col items-center space-y-6 h-full">
      <!-- Chart Container -->
      <div class="flex items-end space-x-6 h-full">
        <div
          v-for="(option, index) in optionMapped"
          :key="option.id"
          class="flex flex-col items-center h-full justify-end"
        >
          <!-- Bar Column -->
          <div
            :style="{
              height: `calc(${(option.votes / maxVotes) * 100}% + 50px)`,
            }"
            class="w-24 flex flex-col items-center justify-end"
          >
            <!-- Vote Count -->
            <div class="flex flex-col justify-center w-full h-fit">
              <div class="flex justify-center h-[30px]">
                <img
                  v-if="option.correct"
                  v-motion
                  :initial="{ opacity: 0, x: -100 }"
                  :enter="{ opacity: 1, x: 0 }"
                  class="w-[30px]"
                  src="@/assets/icons/check.png"
                  alt=""
                />
              </div>
              <div
                class="block w-full text-lg font-bold text-white text-center rounded-t-md"
                :style="{ backgroundColor: colorsHex[index].border }"
              >
                {{ option.votes }}
              </div>
            </div>
            <div
              :style="{
                backgroundColor: colorsHex[index].primary,
              }"
              class="item w-full"
            ></div>
          </div>
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
      id: answer.id,
      label: answer.content,
      votes: props.summaryAnswer.choices[answer.id],
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

<style scoped>
@keyframes heightFromZero {
  from {
    height: 0;
  }
  to {
    height: 100%;
  }
}
.item {
  animation: heightFromZero 1s forwards;
  transition: height 0.5s;
}
</style>
