<script setup lang="ts">
import QuizEditor from './quiz/QuizEditor.vue'
import QuizSettings from './quiz/QuizSettings.vue'

const isHightLightMain = ref(false)
</script>
<template>
  <div class="flex w-full gap-4">
    <div class="flex-auto flex flex-col overflow-hidden">
      <div
        class="h-full border-2 rounded-xl bg-white"
        :class="{ 'border-primary': isHightLightMain }"
        @click="isHightLightMain = true"
      >
        <QuizEditor />
      </div>
      <!-- <div class="h-[20%]"></div> -->
    </div>

    <!-- settings -->
    <QuizSettings
      class="border-2"
      :class="{ 'border-primary': !isHightLightMain }"
      @click="isHightLightMain = false"
    />
  </div>
</template>
