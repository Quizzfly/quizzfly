<script setup lang="ts">
import { useQuestionsStore } from '@/stores/quizzfly/question'
import SlideEditor from './slide/SlideEditor.vue'
import SlideSettings from './slide/SlideSettings.vue'
import { slideLayouts, type SlideLayout } from '@/modules/slide/layout'
import { cloneDeep } from 'lodash-es'

const questionStore = useQuestionsStore()
const slideLayout = ref<SlideLayout>()

onBeforeMount(() => {
  slideLayout.value = questionStore.getCurrentQuestion.content
    ? JSON.parse(questionStore.getCurrentQuestion.content)
    : cloneDeep(slideLayouts[0])
})
</script>
<template>
  <div class="max-md:flex-col flex w-full gap-4">
    <div class="flex-auto flex flex-col overflow-hidden">
      <div class="h-full border-2 rounded-xl bg-white border-primary">
        <SlideEditor :layout="slideLayout!" />
      </div>
    </div>

    <!-- settings -->
    <SlideSettings v-model:layout="slideLayout!" />
  </div>
</template>
