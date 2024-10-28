<script setup lang="ts">
import Choice from '@/components/quizzfly/create/answer/Choice.vue'
import { useQuestionsStore } from '@/stores/quizzfly/question'
import type { Quiz } from '@/types/question'
const questionsStore = useQuestionsStore()

const emits = defineEmits<{
  (e: 'select', value: string): void
}>()

const currentQuestion = computed(() => questionsStore.getCurrentQuestion as Quiz)

const handleUpdateAnswer = (value: any) => {
  if (!currentQuestion.value.answers) return

  const answersResetArr = currentQuestion.value.answers.map((item) => {
    return {
      ...item,
      is_correct: false,
    }
  })

  questionsStore.updateCurrentQuestionAnswers(answersResetArr)
  questionsStore.updateCurrentQuestionAnswer(value)
}
</script>
<template>
  <Choice
    v-for="(item, index) in currentQuestion.answers"
    :key="item.id"
    v-motion
    :model-value="item"
    :index="index"
    :initial="{ opacity: 0, y: 100 }"
    :enter="{ opacity: 1, y: 0, scale: 1 }"
    :delay="index * 100"
    :edit-mode="true"
    :is-true-false="true"
    @select="emits('select', item.id)"
    @update:model-value="handleUpdateAnswer"
  />
</template>
