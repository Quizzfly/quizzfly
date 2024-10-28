<script setup lang="ts">
import type { Answer } from '@/types/question'
import { useTextareaAutosize } from '@vueuse/core'
const { textarea, input } = useTextareaAutosize()
import { useDebounceFn } from '@vueuse/core'

const props = defineProps<{
  index: number
  editMode?: boolean
  isTrueFalse?: boolean
  modelValue: Answer
}>()

const emits = defineEmits<{
  (e: 'update:modelValue', value: Answer): void
}>()

const updateAnswer = useDebounceFn((value: Answer) => {
  emits('update:modelValue', value)
}, 500)

const updateAnswerImmediate = (value: Answer) => {
  emits('update:modelValue', value)
}
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

onMounted(() => {
  input.value = props.modelValue.content.trim()
})
</script>
<template>
  <div
    class="flex flex-row-reverse gap-5 relative py-6 min-h-[132px] items-center px-4 rounded-2xl text-white answer-item"
    :style="{ backgroundColor: colorsHex[index].primary }"
  >
    <template v-if="editMode">
      <div
        v-if="modelValue.is_correct"
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
      >
        <span
          class="cursor-pointer i-solar-check-square-bold text-2xl"
          @click="updateAnswerImmediate({ ...modelValue, is_correct: !modelValue.is_correct })"
        ></span>
      </div>
      <div
        v-else
        class="min-w-5 h-5 cursor-pointer border-[1px] border-white rounded-sm text-2xl"
        @click="updateAnswerImmediate({ ...modelValue, is_correct: !modelValue.is_correct })"
      ></div>
    </template>
    <!-- prevent enter not break line -->
    <textarea
      ref="textarea"
      v-model="input"
      :disabled="!editMode || isTrueFalse"
      class="resize-none bg-transparent text-white text-lg w-full border-none outline-none text-input"
      placeholder="Enter your answer..."
      maxlength="80"
      @update:model-value="updateAnswer({ ...modelValue, content: $event })"
      @keydown.enter.prevent
    />
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
