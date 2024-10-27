<script setup lang="ts">
import { Input } from '@/components/ui/input'
import EditableText from '@/components/base/EditableText.vue'
import AnswerSetting from '@/components/quizzfly/create/quiz/AnswerSetting.vue'
import { useQuestionsStore } from '@/stores/quizzfly/question'
import type { Quiz } from '@/types/question'

const questionsStore = useQuestionsStore()
const currentQuestion = computed(() => questionsStore.getCurrentQuestion as Quiz)

const handleClickTitle = () => {
  console.log('Do something')
}

const handleUpdateTitle = (value: string | number) => {
  questionsStore.updateCurrentQuestion({ content: String(value) })
}

const imgRaw = ref<File>()

async function handleFileChange(event: Event) {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]

  if (file) {
    imgRaw.value = file
    // await questionsStore.setCurrentQuestionImage(file)
  }
}
</script>
<template>
  <div class="w-full h-full flex flex-col gap-10 p-5 overflow-hidden justify-between">
    <!-- question -->
    <div class="">
      <EditableText
        :value="currentQuestion.content"
        :click-callback="handleClickTitle"
      >
        <template #input="{ finishEditing }">
          <Input
            placeholder="Enter your question"
            class="text-2xl font-medium h-12 bg-white"
            :model-value="currentQuestion.content"
            @update:model-value="handleUpdateTitle"
            @blur="finishEditing"
          />
        </template>
        <template #default="{}">
          <p
            class="bg-white py-1 px-2 rounded-lg border-2 border-transparent hover:border-primary text-2xl font-medium"
          >
            {{ currentQuestion.content || 'Enter question' }}
          </p>
        </template>
      </EditableText>
    </div>

    <!-- picture -->
    <div class="flex justify-center flex-auto">
      <div
        class="w-[50%] h-full flex justify-center items-center bg-slate-100 rounded-lg bg-cover shadow-lg image-area"
        :style="{ backgroundImage: `url(${currentQuestion.theme})` }"
      >
        <div
          class="text-center"
          :class="{ 'hight-light': currentQuestion.theme }"
        >
          <span class="i-solar-gallery-add-outline text-3xl text-gray-500"></span>
          <p class="text-xs text-gray-500 font-light text-center">Drag and drop or</p>
          <input
            ref="inputRef"
            type="file"
            class="hidden"
            @change="handleFileChange"
          />

          <p
            class="text-xs text-primary text-center cursor-pointer mt-2 hover:underline"
            @click="$refs.inputRef.click()"
          >
            Click to upload your image
          </p>
        </div>
      </div>
    </div>
    <!-- answer -->
    <AnswerSetting :key="currentQuestion.id" />
  </div>
</template>
<style scoped>
.image-area {
  background-color: rgba(220, 220, 220, 0.743);
}

.hight-light span,
.hight-light p {
  color: #fff !important;
}
</style>
