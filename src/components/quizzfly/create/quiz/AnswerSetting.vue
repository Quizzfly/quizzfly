<script setup lang="ts">
import Choice from '@/components/quizzfly/create/answer/Choice.vue'
import { useQuestionsStore } from '@/stores/quizzfly/question'
const questionsStore = useQuestionsStore()

function initAnswers() {
  console.log(questionsStore.getCurrentQuestion.quizType)
  if (questionsStore.getCurrentQuestion.answers?.length) return

  switch (questionsStore.getCurrentQuestion.quizType) {
    case 'multiple_choice':
      questionsStore.updateCurrentQuestionAnswers([
        { id: 1, text: '', isCorrect: false },
        { id: 2, text: '', isCorrect: false },
        { id: 3, text: '', isCorrect: false },
        { id: 4, text: '', isCorrect: false },
      ])
      break
    case 'true_false':
      questionsStore.updateCurrentQuestionAnswers([
        { id: 1, text: 'True', isCorrect: true },
        { id: 2, text: 'False', isCorrect: false },
      ])
      break
  }
}
onBeforeMount(() => {
  initAnswers()
})
</script>
<template>
  <div class="">
    <div class="grid grid-cols-2 gap-4">
      <Choice
        v-for="(item, index) in questionsStore.getCurrentQuestionAnswers"
        :key="item.id"
        v-motion
        :model-value="item"
        :index="index"
        :initial="{ opacity: 0, y: 100 }"
        :enter="{ opacity: 1, y: 0, scale: 1 }"
        :delay="index * 100"
        :edit-mode="true"
        @update:model-value="questionsStore.updateCurrentQuestionAnswers"
      />
    </div>
  </div>
</template>
