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
</script>
<template>
  <div class="">
    <div class="grid-container grid grid-cols-2 gap-4">
      <template v-if="currentQuestion.quiz_type === 'MULTIPLE_CHOICE'">
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
          :is-true-false="false"
          @update:model-value="questionsStore.updateCurrentQuestionAnswer"
        />
      </template>

      <template v-else-if="currentQuestion.quiz_type === 'TRUE_FALSE'">
        <TrueFalse />
      </template>
    </div>
  </div>
</template>
<style scoped>
.grid-container div:last-child {
  grid-column: span 2;
}
</style>
