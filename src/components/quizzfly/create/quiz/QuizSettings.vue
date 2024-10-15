<script setup lang="ts">
import { useQuestionsStore } from '@/stores/quizzfly/question'
import { themeImages } from '@/utils/theme'

const questionsStore = useQuestionsStore()
</script>
<template>
  <div class="md:min-w-[340px] w-[340px] bg-white border h-full rounded-xl p-5">
    <div class="flex items-center justify-between">
      <span class="font-medium text-base">Quiz settings</span>
    </div>
    <div class="mt-10">
      <span class="font-medium text-base">Select theme</span>
      <div class="grid grid-cols-2 gap-2 mt-4">
        <img
          v-for="img in themeImages"
          :key="img"
          class="w-full object-cover rounded-md cursor-pointer border"
          :class="{ 'border-primary': questionsStore.getCurrentQuestion.image === img }"
          :src="img"
          alt=""
          @click="questionsStore.updateCurrentQuestion({ image: img })"
        />
      </div>
    </div>
  </div>
</template>
