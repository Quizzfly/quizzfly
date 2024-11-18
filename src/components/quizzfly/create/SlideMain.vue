<script setup lang="ts">
import { useQuestionsStore } from '@/stores/quizzfly/question'
import SlideEditor from './slide/SlideEditor.vue'
import SlideSettings from './slide/SlideSettings.vue'
import { slideLayouts, type SlideLayout } from '@/modules/slide/layout'
import { cloneDeep } from 'lodash-es'

const questionsStore = useQuestionsStore()
const slideLayout = ref<SlideLayout>()

const currentQuestion = computed(() => questionsStore.getCurrentQuestion)

onBeforeMount(() => {
  slideLayout.value = questionsStore.getCurrentQuestion.content
    ? JSON.parse(questionsStore.getCurrentQuestion.content)
    : cloneDeep(slideLayouts[0])
})
</script>
<template>
  <div class="max-md:flex-col flex w-full gap-4">
    <div class="flex-auto flex flex-col overflow-hidden">
      <div
        class="h-full border-2 rounded-xl bg-white border-primary"
        :style="{ backgroundImage: `url(${currentQuestion.background_url})` }"
      >
        <SlideEditor
          v-if="slideLayout"
          :layout="slideLayout"
          :is-edit="true"
        />
      </div>
    </div>

    <!-- settings -->
    <SlideSettings
      v-if="slideLayout"
      v-model:layout="slideLayout"
    />
  </div>
</template>
