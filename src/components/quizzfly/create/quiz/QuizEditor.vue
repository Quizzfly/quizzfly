<script setup lang="ts">
import { Input } from '@/components/ui/input'
import EditableText from '@/components/base/EditableText.vue'
import AnswerSetting from '@/components/quizzfly/create/quiz/AnswerSetting.vue'
import { useQuestionsStore } from '@/stores/quizzfly/question'
import type { Quiz } from '@/types/question'
import { showToast } from '@/utils/toast'
import { useTextareaAutosize } from '@vueuse/core'
const { textarea, input } = useTextareaAutosize()
import { Button } from '@/components/ui/button'
import { createAnswerApi } from '@/services/quizzes'

const questionsStore = useQuestionsStore()
const currentQuestion = computed(() => questionsStore.getCurrentQuestion as Quiz)

const questionContent = ref('')

onBeforeMount(() => {
  questionContent.value = currentQuestion.value.content
})

const handleClickTitle = () => {
  console.log('Do something')
}

const handleUpdateTitle = (value: string | number) => {
  questionsStore.updateCurrentQuestion('quiz', { content: String(value) })
}

const handleBlur = (finishEditingCallback: () => void) => {
  finishEditingCallback()
  handleUpdateTitle(questionContent.value)
}

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
    <div class="">
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
    </div>

    <textarea
      ref="textarea"
      v-model="input"
      class="resize-none bg-transparent text-white text-lg w-full border-none outline-none text-input"
      placeholder="Enter your answer..."
      maxlength="80"
      @keydown.enter.prevent
    />

    <!-- picture -->
    <div class="flex justify-center flex-auto">
      <div
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
            @change="questionsStore.updateQuestionFile('quiz', $event)"
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
        currentQuestion.answers.length < 4 &&
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
