<script setup lang="ts">
import PreviewLayout from '@/components/quizzfly/layout/PreviewLayout.vue'
import { slideLayouts, type SlideLayout } from '@/modules/slide/layout'
import { useQuestionsStore } from '@/stores/quizzfly/question'

const questionStore = useQuestionsStore()
const currentLayout = defineModel<SlideLayout>('layout', {
  required: true,
})

const handleChangedLayout = async (layout: SlideLayout) => {
  await questionStore.updateCurrentQuestion('slide', { content: JSON.stringify(layout) })
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
      <p class="font-medium text-lg">Question settings</p>
      <div class="mt-10">
        <p class="font-medium">Layout</p>
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
    </div>
  </div>
</template>
