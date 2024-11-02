<script setup lang="ts">
import Button from '../ui/button/Button.vue'
import { Progress } from '@/components/ui/progress'
const progress = ref(0)
watchEffect((cleanupFn) => {
  const timer = setTimeout(() => (progress.value = 100), 5000)
  cleanupFn(() => clearTimeout(timer))
})
</script>
<template>
  <div class="relative m-4 top-0 flex flex-col items-center justify-center h-full">
    <div class="absolute top-0">
      <Button
        variant="secondary"
        disabled
        class="font-extrabold text-base"
      >
        QUIZZ
      </Button>
    </div>
    <div class="absolute top-0 right-0">
      <div
        class="font-extrabold text-2xl bg-primary py-3 tracking-widest px-6 text-white rounded-full"
      >
        6 of 14
      </div>
    </div>
    <div class="rounded bg-white p-4 w-full">
      <p class="font-black text-3xl">
        What can happen to an ecosystem if an apex predator, like the White Shark, is removed?
      </p>
    </div>
    <div class="w-full absolute bottom-24">
      <Progress
        v-model="progress"
        class="w-full h-4"
      />
    </div>
  </div>
</template>
