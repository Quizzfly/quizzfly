<script setup lang="ts">
import Choice from '@/components/quizzfly/create/answer/Choice.vue'
import { useQuestionsStore } from '@/stores/quizzfly/question'
const questionsStore = useQuestionsStore()

function initAnswers() {
  if (
    questionsStore.getCurrentQuestion.answers?.length ||
    !questionsStore.getCurrentQuestion.quizType
  )
    return

  questionsStore.initAnswers(questionsStore.getCurrentQuestion.quizType)
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
        :is-true-false="questionsStore.getCurrentQuestion.quizType === 'true_false'"
        @update:model-value="questionsStore.updateCurrentQuestionAnswers"
      />
    </div>
  </div>
</template>
