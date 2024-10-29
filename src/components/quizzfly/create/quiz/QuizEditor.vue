<script setup lang="ts">
// import { Input } from '@/components/ui/input'
// import EditableText from '@/components/base/EditableText.vue'
import { useDropZone } from '@vueuse/core'

import AnswerSetting from '@/components/quizzfly/create/quiz/AnswerSetting.vue'
import { useQuestionsStore } from '@/stores/quizzfly/question'
import type { Quiz } from '@/types/question'
import { showToast } from '@/utils/toast'
import { useDebounceFn, useTextareaAutosize } from '@vueuse/core'
import { Button } from '@/components/ui/button'
import { createAnswerApi } from '@/services/quizzes'

const questionsStore = useQuestionsStore()
const currentQuestion = computed(() => questionsStore.getCurrentQuestion as Quiz)

const { textarea, input } = useTextareaAutosize({ input: currentQuestion.value.content })

const questionContent = ref('')
const dropZoneRef = ref<HTMLDivElement>()

onBeforeMount(() => {
  questionContent.value = currentQuestion.value.content
})

function onDrop(files: File[] | null) {
  if (files) {
    questionsStore.updateQuestionFile('quiz', files[0])
  }
}

useDropZone(dropZoneRef, {
  onDrop,
  // specify the types of data to be received.
  dataTypes: ['image/jpeg', 'image/png', 'image/gif'],
  // control multi-file drop
  multiple: true,
  // whether to prevent default behavior for unhandled events
  preventDefaultForUnhandled: false,
})

const handleInputFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  const files = target.files
  if (files) {
    questionsStore.updateQuestionFile('quiz', files[0])
  }
}

const handleUpdateTitle = useDebounceFn((value) => {
  questionsStore.updateCurrentQuestion('quiz', { content: String(value) })
}, 500)

const handleCreateAnswer = async () => {
  try {
    const { data } = await createAnswerApi(questionsStore.getCurrentQuestion.id, {
      content: ' ',
    })
    questionsStore.updateCurrentQuestion('quiz', {
      answers: [...currentQuestion.value.answers, data],
    })
  } catch (error) {
    showToast({
      title: 'Error',
      description: 'Error creating answer',
      variant: 'destructive',
    })
  }
}
</script>
<template>
  <div class="w-full h-full flex flex-col gap-10 p-5 overflow-hidden justify-between">
    <!-- question -->
    <!-- <div class="">
      <EditableText
        :value="questionContent"
        :click-callback="handleClickTitle"
      >
        <template #input="{ finishEditing }">
          <Input
            v-model="questionContent"
            placeholder="Enter your question"
            class="text-2xl font-medium h-12 bg-white"
            @blur="handleBlur(finishEditing)"
          />
        </template>
        <template #default="{}">
          <p
            class="bg-white py-1 px-2 rounded-lg border-2 border-transparent hover:border-primary text-2xl font-medium"
          >
            {{ questionContent || 'Enter question' }}
          </p>
        </template>
      </EditableText>
    </div> -->

    <div class="relative">
      <textarea
        ref="textarea"
        v-model="input"
        class="resize-none bg-white rounded-md py-4 px-4 text-center border border-b-4 text-gray-700 font-medium text-2xl w-full shadow-sm outline-none"
        placeholder="Enter your answer..."
        maxlength="120"
        @keydown.enter.prevent
        @update:model-value="handleUpdateTitle($event)"
      />
      <p
        v-if="input"
        class="text-right"
      >
        {{ 120 - input.length }} characters left
      </p>
    </div>

    <!-- picture -->
    <div class="flex justify-center flex-auto">
      <div
        ref="dropZoneRef"
        class="w-[50%] h-full flex justify-center items-center bg-slate-100 rounded-lg bg-cover shadow-lg image-area"
        :style="{ backgroundImage: `url(${currentQuestion.files[0]?.url})` }"
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
            @change="handleInputFileChange"
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
    <Button
      v-if="
        currentQuestion &&
        currentQuestion.answers?.length < 4 &&
        currentQuestion.type === 'QUIZ' &&
        currentQuestion.quiz_type !== 'TRUE_FALSE'
      "
      class="w-fit"
      color="primary"
      @click="handleCreateAnswer"
      >Add Answer</Button
    >
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
