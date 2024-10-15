<script setup lang="ts">
import { Input } from '@/components/ui/input'
import EditableText from '@/components/base/EditableText.vue'
import AnswerSetting from '@/components/quizzfly/create/quiz/AnswerSetting.vue'
import { useQuestionsStore } from '@/stores/quizzfly/question'

const questionsStore = useQuestionsStore()

const handleClickTitle = () => {
  console.log('Do something')
}

const handleUpdateTitle = (value: string | number) => {
  questionsStore.updateCurrentQuestion({ title: String(value) })
}
</script>
<template>
  <div class="w-full h-full flex flex-col gap-10 p-5 overflow-hidden justify-between">
    <!-- question -->
    <div class="">
      <EditableText
        :value="questionsStore.getCurrentQuestion.title"
        :click-callback="handleClickTitle"
      >
        <template #input="{ finishEditing }">
          <Input
            placeholder="Enter your question"
            class="text-2xl font-medium h-12 bg-white"
            :model-value="questionsStore.getCurrentQuestion.title"
            @update:model-value="handleUpdateTitle"
            @blur="finishEditing"
          />
        </template>
        <template #default="{}">
          <p
            class="bg-white py-1 px-2 rounded-lg border-2 border-transparent hover:border-primary text-2xl font-medium"
          >
            {{ questionsStore.getCurrentQuestion.title || 'Enter question' }}
          </p>
        </template>
      </EditableText>
    </div>

    <!-- picture -->
    <div class="flex justify-center flex-auto">
      <div class="w-[50%] h-full bg-slate-100 rounded-lg image-area"></div>
    </div>
    <!-- answer -->
    <AnswerSetting :key="questionsStore.getCurrentQuestion.id" />
  </div>
</template>
<style scoped>
.image-area {
  background-color: rgba(220, 220, 220, 0.743);
}
</style>
