<script lang="ts" setup>
import type { Question, Quiz } from '@/types/question'
import Choice from '@/components/quizzfly/create/answer/Choice.vue'
import TrueFalse from '@/components/quizzfly/create/answer/TrueFalse.vue'
const props = defineProps<{
  currentQuestion: Question
  isShowRightAnswer: boolean
}>()

const currentQuestionComputed = computed(() => props.currentQuestion as Quiz)
</script>

<template>
  <div class="">
    <div class="grid grid-cols-2 gap-2">
      <template v-if="currentQuestionComputed.quiz_type === 'MULTIPLE_CHOICE'">
        <Choice
          v-for="(item, index) in currentQuestionComputed.answers"
          :key="item.id"
          v-motion
          :model-value="item"
          :is-show-right-answer="isShowRightAnswer"
          :index="index"
          :class="{
            'item-last-child':
              index === currentQuestionComputed.answers.length - 1 &&
              currentQuestionComputed.answers.length % 2 !== 0,
          }"
          :initial="{ opacity: 0, y: 100 }"
          :enter="{ opacity: 1, y: 0, scale: 1 }"
          :delay="index * 100"
          :edit-mode="false"
          :is-true-false="false"
        />
      </template>

      <template v-else-if="currentQuestionComputed.quiz_type === 'TRUE_FALSE'">
        <TrueFalse
          :is-show-right-answer="isShowRightAnswer"
          :answers="currentQuestionComputed.answers"
        />
      </template>
    </div>
  </div>
</template>
