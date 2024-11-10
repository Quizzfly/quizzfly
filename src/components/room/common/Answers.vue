<script lang="ts" setup>
import type { Question, Quiz } from '@/types/question'
import Choice from '@/components/quizzfly/create/answer/Choice.vue'
import TrueFalse from '@/components/quizzfly/create/answer/TrueFalse.vue'
defineProps<{
  currentQuestion: Quiz
}>()
</script>

<template>
  <div class="m-8">
    <div class="grid grid-cols-2 gap-4">
      <template v-if="currentQuestion.quiz_type === 'MULTIPLE_CHOICE'">
        <Choice
          v-for="(item, index) in currentQuestion.answers"
          :key="item.id"
          v-motion
          :model-value="item"
          :index="index"
          :class="{
            'item-last-child':
              index === currentQuestion.answers.length - 1 &&
              currentQuestion.answers.length % 2 !== 0,
          }"
          :initial="{ opacity: 0, y: 100 }"
          :enter="{ opacity: 1, y: 0, scale: 1 }"
          :delay="index * 100"
          :edit-mode="false"
          :is-true-false="false"
        />
      </template>

      <template v-else-if="currentQuestion.quiz_type === 'TRUE_FALSE'">
        <TrueFalse :answers="currentQuestion.answers" />
      </template>
    </div>
  </div>
</template>
