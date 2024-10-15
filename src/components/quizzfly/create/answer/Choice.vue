<script setup lang="ts">
import EditableText from '@/components/base/EditableText.vue'
import { Input } from '@/components/ui/input'
defineProps<{
  index: number
}>()
const answer = defineModel<any>()

const colorsHex = [
  {
    primary: '#3879ff',
    border: '#3459cf',
  },
  {
    primary: '#f65655',
    border: '#e72261',
  },
  {
    primary: '#fe9820',
    border: '#f58400',
  },
  {
    primary: '#0fd18d',
    border: '#00b775',
  },
]
</script>
<template>
  <div
    class="relative py-10 min-h-[132px] flex items-center px-4 rounded-2xl text-white answer-item"
    :style="{ backgroundColor: colorsHex[index].primary }"
  >
    <div
      v-if="answer.isCorrect"
      v-motion
      :initial="{
        scale: 1.5,
      }"
      :enter="{
        scale: 1,
      }"
      :tapped="{
        scale: 0.8,
      }"
      class="absolute top-4 right-4"
    >
      <span
        class="cursor-pointer i-solar-check-square-bold text-2xl"
        @click="answer.isCorrect = !answer.isCorrect"
      ></span>
    </div>
    <div
      v-else
      class="absolute top-[17px] right-[17px] w-5 h-5 cursor-pointer border-[1px] border-white rounded-sm text-2xl"
      @click="answer.isCorrect = !answer.isCorrect"
    ></div>

    <EditableText
      :value="answer.text"
      class="break-word w-full"
    >
      <template #input="{ finishEditing }">
        <Input
          ref="titleInputRef"
          v-model="answer.text"
          placeholder="Enter your answer..."
          class="text-xl font-medium h-12 w-full text-input"
          @blur="finishEditing"
        />
      </template>
      <template #default="{}">
        <span class="rounded-lg text-xl font-medium">
          {{ answer?.text || 'Enter answer...' }}
        </span>
      </template>
    </EditableText>
  </div>
</template>
<style scoped>
.answer-item {
  border-bottom: 4px solid v-bind('colorsHex[index].border');
}

:deep(.text-input) {
  border: none;
  outline: none;
}

/* set color for placeholder */
:deep(.text-input::placeholder) {
  color: rgb(235, 235, 235);
}
</style>
