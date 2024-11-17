<script setup lang="ts">
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

const { textarea, input } = useTextareaAutosize({ input: currentQuestion.value.content.trim() })
const questionContent = ref('')
const dropZoneRef = ref<HTMLDivElement>()

const enterCount = ref(0) // Enter key press count

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
  dataTypes: ['image/jpeg', 'image/png', 'image/gif'],
  multiple: true,
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

// limit enter key press to 10 times
const handleEnterPress = (event: KeyboardEvent) => {
  if (event.key === 'Enter') {
    if (enterCount.value < 3) {
      enterCount.value++
    } else {
      event.preventDefault()
    }
  }
}
</script>

<template>
  <div class="w-full h-full flex flex-col gap-10 p-5 overflow-hidden justify-between">
    <div class="relative">
      <textarea
        ref="textarea"
        v-model="input"
        class="resize-none bg-white rounded-md py-4 px-4 text-center border border-b-4 text-gray-700 font-medium text-2xl w-full shadow-sm outline-none"
        placeholder="Enter your answer..."
        maxlength="120"
        @keydown="handleEnterPress"
        @update:model-value="handleUpdateTitle($event.trim() + ' ')"
      />
      <p
        v-if="input"
        class="text-right"
      >
        {{ 120 - input.length }} characters left
      </p>
    </div>

    <div class="flex justify-center flex-auto">
      <div
        ref="dropZoneRef"
        class="relative w-[50%] h-full flex justify-center items-center bg-slate-100 rounded-lg bg-cover shadow-lg image-area"
        :style="{ backgroundImage: `url(${currentQuestion.files[0]?.url})` }"
      >
        <!-- delete image btn -->
        <div
          v-if="currentQuestion.files[0]?.url"
          class="absolute -top-2 -right-2 cursor-pointer flex justify-center items-center bg-white h-6 w-6 rounded-full shadow-md"
          @click="questionsStore.updateCurrentQuestion('quiz', { background_url: '' })"
        >
          <span class="text-xl i-material-symbols-light-close-rounded"></span>
        </div>

        <div
          class="text-center"
          :class="{ 'hight-light': currentQuestion.background_url }"
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
