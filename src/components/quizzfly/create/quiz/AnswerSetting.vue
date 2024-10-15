<script setup lang="ts">
import Choice from '@/components/quizzfly/create/answer/Choice.vue'
import { useSlidesStore } from '@/stores/quizzfly/quizzflySlide'
const slidesStore = useSlidesStore()

function initAnswers() {
  console.log(slidesStore.getCurrentSlide.quizType)
  if (slidesStore.getCurrentSlide.answers?.length) return

  switch (slidesStore.getCurrentSlide.quizType) {
    case 'multiple_choice':
      slidesStore.updateCurrentSlideAnswers([
        { id: 1, text: '', isCorrect: true },
        { id: 2, text: '', isCorrect: false },
        { id: 3, text: '', isCorrect: false },
        { id: 4, text: '', isCorrect: false },
      ])
      break
    case 'true_false':
      slidesStore.updateCurrentSlideAnswers([
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
    <div class="flex items-center justify-between mb-2">
      <h3 class="text-lg font-semibold">Answer Setting</h3>
    </div>
    <div class="grid grid-cols-2 gap-4">
      <Choice
        v-for="(item, index) in slidesStore.getCurrentSlideAnswers"
        :key="item.id"
        :model-value="item"
        :index="index"
        @update:model-value="slidesStore.updateCurrentSlideAnswers"
      />
    </div>
  </div>
</template>
