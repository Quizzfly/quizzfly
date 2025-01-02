<script setup lang="ts">
import Choice from '@/components/quizzfly/create/answer/Choice.vue'
import type { Answer } from '@/types/question'

defineProps<{
  answers: Answer[]
  editMode?: boolean
  isShowRightAnswer?: boolean
}>()

const emits = defineEmits<{
  (e: 'select', value: string): void
  (e: 'update:modelValue', value: any): void
  (e: 'delete', value: any): void
}>()
</script>
<template>
  <Choice
    v-for="(item, index) in answers"
    :key="item.id"
    v-motion
    :model-value="item"
    :index="index"
    :initial="{ opacity: 0, y: 100 }"
    :enter="{ opacity: 1, y: 0, scale: 1 }"
    :delay="index * 100"
    :edit-mode="editMode"
    :is-true-false="true"
    :is-show-right-answer="isShowRightAnswer"
    @select="emits('select', item.id)"
    @update:model-value="emits('update:modelValue', item)"
    @delete="emits('delete', item)"
  />
</template>
