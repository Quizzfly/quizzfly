<script setup lang="ts">
import QuizEditor from './quiz/QuizEditor.vue'
import QuizSettings from './quiz/QuizSettings.vue'
</script>
<template>
  <div class="flex w-full gap-4">
    <div class="flex-auto flex flex-col overflow-hidden">
      <div class="h-full border-2 rounded-xl bg-white border-primary">
        <QuizEditor />
      </div>
      <div class="h-[20%]"></div>
    </div>

    <!-- settings -->
    <QuizSettings />
  </div>
</template>
