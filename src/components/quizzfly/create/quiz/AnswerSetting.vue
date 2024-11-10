<script setup lang="ts">
import Choice from '@/components/quizzfly/create/answer/Choice.vue'
import TrueFalse from '@/components/quizzfly/create/answer/TrueFalse.vue'
import { useQuestionsStore } from '@/stores/quizzfly/question'
import type { Quiz } from '@/types/question'

const questionsStore = useQuestionsStore()

const currentQuestion = computed(() => questionsStore.getCurrentQuestion as Quiz)

function initAnswers() {
  if (currentQuestion.value.answers?.length || !currentQuestion.value.quiz_type) return

  questionsStore.initAnswers(currentQuestion.value.quiz_type)
}
onBeforeMount(() => {
  initAnswers()
})

const handleUpdateAnswer = (value: any) => {
  if (!currentQuestion.value.answers) return

  const answersResetArr = currentQuestion.value.answers.map((item) => {
    return {
      ...item,
      is_correct: false,
    }
  })

  questionsStore.updateCurrentQuestionAnswers(answersResetArr)
  questionsStore.updateCurrentQuestionAnswer({
    ...value,
    is_correct: true,
  })
}
</script>
<template>
  <div class="">
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
          :edit-mode="true"
          :is-true-false="false"
          @update:model-value="questionsStore.updateCurrentQuestionAnswer"
        />
      </template>

      <template v-else-if="currentQuestion.quiz_type === 'TRUE_FALSE'">
        <TrueFalse
          :edit-mode="true"
          :answers="currentQuestion.answers"
          @update:model-value="handleUpdateAnswer"
        />
      </template>
    </div>
  </div>
</template>
<style scoped>
.item-last-child {
  grid-column: span 2;
}
</style>
