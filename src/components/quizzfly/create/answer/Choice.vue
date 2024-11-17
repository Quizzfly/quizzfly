<script setup lang="ts">
import type { Answer } from '@/types/question'
import { useTextareaAutosize } from '@vueuse/core'
const { textarea, input } = useTextareaAutosize()
import { useDebounceFn } from '@vueuse/core'
import ConfettiExplosion from 'vue-confetti-explosion'
import { colorsHex } from '@/utils/theme'

const props = defineProps<{
  index: number
  editMode?: boolean
  isTrueFalse?: boolean
  modelValue: Answer
  isShowRightAnswer?: boolean
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

onMounted(() => {
  input.value = props.modelValue.content.trim()
})
</script>
<template>
  <div
    class="relative flex flex-row-reverse gap-5 py-6 min-h-[120px] items-center px-4 rounded-2xl text-white answer-item"
    :style="{ backgroundColor: colorsHex[index].primary }"
  >
    <ConfettiExplosion
      v-if="isShowRightAnswer && modelValue.is_correct"
      :duration="5000"
    />
    <div
      v-if="isShowRightAnswer && !modelValue.is_correct"
      class="overlay-wrong absolute top-0 left-0 z-10 w-full h-[calc(100%+4px)] bg-gray-900 bg-opacity-60 rounded-2xl"
    ></div>

    <img
      v-if="isShowRightAnswer && modelValue.is_correct"
      v-motion
      :initial="{ opacity: 0, x: -100 }"
      :enter="{ opacity: 1, x: 0 }"
      class="absolute top-0 right-10 w-[60px]"
      src="@/assets/icons/check.png"
      alt=""
    />

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
          class="cursor-pointer i-solar-check-circle-bold text-2xl"
          @click="updateAnswerImmediate({ ...modelValue, is_correct: !modelValue.is_correct })"
        ></span>
      </div>
      <div
        v-else
        class="min-w-5 h-5 cursor-pointer border-[1px] border-white rounded-full text-2xl"
        @click="updateAnswerImmediate({ ...modelValue, is_correct: !modelValue.is_correct })"
      ></div>
    </template>
    <!-- prevent enter not break line -->
    <textarea
      ref="textarea"
      v-model="input"
      :disabled="!editMode || isTrueFalse"
      class="resize-none bg-transparent text-white text-2xl font-semibold w-full border-none outline-none text-input"
      placeholder="Enter your answer..."
      maxlength="80"
      @update:model-value="updateAnswer({ ...modelValue, content: $event.trim() + ' ' })"
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
