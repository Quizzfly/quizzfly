<script setup lang="ts">
import SlideList from '@/components/quizzfly/create/SlideList.vue'
import SlideMain from '@/components/quizzfly/create/SlideMain.vue'
import QuizMain from '@/components/quizzfly/create/QuizMain.vue'
import type { Slide } from '@/types/slide'

const slides = ref<Partial<Slide>[]>([
  { id: 1, title: 'Slide 1', type: 'quiz' },
  { id: 2, title: 'Slide 2', type: 'slide' },
  { id: 3, title: 'Slide 3', type: 'slide' },
  { id: 4, title: 'Slide 4', type: 'quiz' },
  { id: 5, title: 'Slide 5', type: 'quiz' },
  { id: 6, title: 'Slide 5', type: 'quiz' },
])

const currentSlide = ref<Partial<Slide>>(slides.value[0])

const handleAddSlide = () => {
  slides.value.push({
    id: slides.value.length + 1,
    title: `Slide ${slides.value.length + 1}`,
    type: 'slide',
  })
}

const handleAddQuiz = (type: string) => {
  slides.value.push({
    id: slides.value.length + 1,
    title: `Slide ${slides.value.length + 1}`,
    type: 'quiz',
  })
}
</script>
<template>
  <div class="flex w-full items-stretch p-5 pl-0 gap-4">
    <SlideList
      v-model="currentSlide"
      :slides="slides"
      @add-slide="handleAddSlide"
      @add-quiz="handleAddQuiz"
    />
    <QuizMain v-if="currentSlide.type === 'quiz'" />
    <SlideMain v-else />
  </div>
</template>
