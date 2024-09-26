<script setup lang="ts">
defineProps<{
  currentSlide: Slide
}>()
import type { Slide } from '@/types/slide'
import QuizEditor from './quiz/QuizEditor.vue'
import SlideEditor from './slide/SlideEditor.vue'
import SlideSettings from './slide/SlideSettings.vue'
import QuizSettings from './quiz/QuizSettings.vue'
</script>
<template>
  <div class="flex w-full gap-4">
    <div class="flex-auto flex flex-col overflow-hidden">
      <div class="h-full border-2 rounded-xl bg-white border-primary">
        <QuizEditor v-if="currentSlide.type === 'quiz'" />
        <SlideEditor v-else />
      </div>
      <div class="h-[20%]"></div>
    </div>

    <!-- settings -->
    <QuizSettings v-if="currentSlide.type === 'quiz'" />
    <SlideSettings v-else />
  </div>
</template>
