<script setup lang="ts">
import PreviewLayout from '@/components/quizzfly/layout/PreviewLayout.vue'
import { slideLayouts, type SlideLayout } from '@/modules/slide/layout'
import { useQuestionsStore } from '@/stores/quizzfly/question'
import type { Quiz } from '@/types/question'
import { themeImages } from '@/utils/theme'

const questionsStore = useQuestionsStore()
const currentQuestion = computed(() => questionsStore.getCurrentQuestion as Quiz)

const currentLayout = defineModel<SlideLayout>('layout', {
  required: true,
})

const handleChangedLayout = async (layout: SlideLayout) => {
  await questionsStore.updateCurrentQuestion('slide', { content: JSON.stringify(layout) })
  currentLayout.value = layout
  // to tracking currentLayout using nextTick
  // nextTick(() => {
  //   console.log('currentLayout', currentLayout.value)
  // })
}
</script>
<template>
  <div class="md:min-w-[340px] w-[340px]">
    <div class="w-full bg-white border h-full rounded-xl p-5">
      <p class="font-medium text-lg">{{ $t('quizzfly.create.slide.question_settings') }}</p>
      <div class="mt-10">
        <p class="font-medium">{{ $t('quizzfly.create.slide.layout') }}</p>
        <div class="grid grid-cols-2 gap-2 mt-5">
          <PreviewLayout
            v-for="layout in slideLayouts"
            :key="layout.type"
            :current="currentLayout"
            :layout="layout"
            @select-layout="handleChangedLayout"
          />
        </div>
      </div>

      <div class="border-t-[1.2px] my-8 w-full"></div>
      <!-- theme -->
      <div>
        <span class="font-medium text-sm">{{ $t('quizzfly.create.slide.select_theme') }}</span>
        <div class="grid grid-cols-2 gap-2 mt-4">
          <img
            v-for="img in themeImages"
            :key="img"
            class="w-full h-[74px] object-cover rounded-md cursor-pointer border-2"
            :class="{ 'border-primary': currentQuestion.background_url === img }"
            :src="img"
            alt=""
            @click="questionsStore.updateCurrentQuestion('slide', { background_url: img })"
          />
        </div>
      </div>
    </div>
  </div>
</template>
