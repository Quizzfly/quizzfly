<script setup lang="ts">
import type { Question, Quiz } from '@/types/question'
import { colorsHex } from '@/utils/theme'

const props = defineProps<{
  currentQuestion: Question
  isSentAnswer: boolean
}>()

const emits = defineEmits<{
  (e: 'select', value: string): void
}>()

const currentQuestionComputed = computed(
  () => (props.currentQuestion as Quiz).answers ?? ['1', '2', '3', '4'],
)

const answerIdSelected = ref('')

const handleSelect = (answerId: string) => {
  answerIdSelected.value = answerId
  emits('select', answerId)
}
</script>
<template>
  <div
    class="grid grid-cols-2 h-full w-full p-4 gap-2"
    :class="{ 'opacity-0': isSentAnswer }"
  >
    <div
      v-for="(item, index) in currentQuestionComputed"
      :key="item.id"
      v-motion
      class="flex flex-col justify-center items-center space-y-6 h-full option rounded-md"
      :initial="{ opacity: 0, y: 100 }"
      :enter="{ opacity: 1, y: 0, scale: 1 }"
      :delay="index * 100"
      :style="{
        backgroundColor: colorsHex[index].primary,
        borderBottom: `5px solid ${colorsHex[index].border}`,
      }"
      @click="handleSelect(item.id)"
    >
      <p class="text-center text-white font-bold text-xl">
        {{ item.content }}
      </p>
    </div>
  </div>
</template>
<style scoped>
.option {
  transition: transform 0.2s;
}
.option:active {
  transform: scale(1.1) !important;
  transition: transform 0.2s;
  z-index: 1;
}
</style>
