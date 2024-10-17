<script setup lang="ts">
import Choice from '@/components/quizzfly/create/answer/Choice.vue'
import TrueFalse from '@/components/quizzfly/create/answer/TrueFalse.vue'
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
      <template v-if="questionsStore.getCurrentQuestion.quizType === 'multiple_choice'">
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
          :is-true-false="false"
          @update:model-value="questionsStore.updateCurrentQuestionAnswer"
        />
      </template>

      <template v-else-if="questionsStore.getCurrentQuestion.quizType === 'true_false'">
        <TrueFalse />
      </template>
    </div>
  </div>
</template>
