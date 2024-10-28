<script setup lang="ts">
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useQuestionsStore } from '@/stores/quizzfly/question'
import { themeImages } from '@/utils/theme'
import { quizOptions } from '@/utils/quiz'
import type { Quiz, QuizType } from '@/types/question'

const questionsStore = useQuestionsStore()
const currentQuestion = computed(() => questionsStore.getCurrentQuestion as Quiz)

const handleChangeQuizType = async (quizType: QuizType) => {
  await questionsStore.updateQuestionSettings({ quiz_type: quizType })
  if (quizType === 'TRUE_FALSE') {
    try {
      await questionsStore.clearAllAnswers()
      questionsStore.initAnswers(quizType)
    } catch (error) {
      console.error(error)
    }
  }
}
</script>
<template>
  <div
    class="md:min-w-[340px] w-[340px] bg-white border h-full rounded-xl p-8 flex flex-col overflow-hidden"
  >
    <div class="flex items-center justify-between">
      <span class="text-base">Quiz settings</span>
    </div>

    <ScrollArea class="flex flex-col flex-auto gap-2">
      <div class="px-1">
        <!-- quiz type -->
        <div class="mt-8">
          <span class="font-medium text-sm">Quiz type</span>
          <Select
            :model-value="currentQuestion.quiz_type"
            @update:model-value="handleChangeQuizType($event as QuizType)"
          >
            <SelectTrigger class="mt-3">
              <SelectValue placeholder="Question type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem
                  v-for="option in quizOptions"
                  :key="option.type"
                  :value="option.type"
                >
                  <div class="flex items-center gap-2 cursor-pointer">
                    <img
                      :src="option.icon"
                      :alt="option.name"
                    />
                    {{ option.name }}
                  </div>
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <!-- time limit -->
        <div class="mt-8">
          <span class="font-medium text-sm">Time limit</span>
          <Select
            :model-value="String(currentQuestion.time_limit)"
            @update:model-value="
              questionsStore.updateQuestionSettings({ time_limit: Number($event) })
            "
          >
            <SelectTrigger class="mt-3">
              <SelectValue placeholder="Time limit" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem
                  v-for="n in 10"
                  :key="n"
                  :value="String(n * 5)"
                >
                  {{ n * 5 }} seconds
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <!-- points -->
        <div class="mt-8">
          <span class="font-medium text-sm">Points</span>
          <Select>
            <SelectTrigger class="mt-3">
              <SelectValue placeholder="Points" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="standard"> Standard </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div class="border-t-[1.2px] my-8 w-full"></div>
        <!-- theme -->
        <div>
          <span class="font-medium text-sm">Select theme</span>
          <div class="grid grid-cols-2 gap-2 mt-4">
            <img
              v-for="img in themeImages"
              :key="img"
              class="w-full object-cover rounded-md cursor-pointer border-2"
              :class="{ 'border-primary': currentQuestion.theme === img }"
              :src="img"
              alt=""
              @click="questionsStore.updateCurrentQuestion('quiz', { theme: img })"
            />
          </div>
        </div>

        <div class="border-t-[1.2px] my-8 w-full"></div>

        <!-- image -->
        <div class="mt-10">
          <span class="font-medium text-sm">Upload image</span>
          <p class="text-xs text-gray-500 font-light">We support png, gif, jpg and svg</p>
          <div
            class="flex items-center px-5 gap-5 w-full h-[100px] border-2 border-dashed rounded-md mt-5 overflow-hidden bg-cover bg-center"
          >
            <img
              :src="currentQuestion.files[0]?.url || '/assets/images/default.webp'"
              class="h-12 w-12 rounded-sm object-cover"
              alt=""
            />
            <div>
              <p class="text-xs text-gray-500 font-light text-center">Drag and drop or</p>
              <input
                ref="file"
                type="file"
                class="hidden"
                @change="questionsStore.updateQuestionFile('quiz', $event)"
              />

              <p
                class="text-xs text-primary text-center cursor-pointer mt-2 hover:underline"
                @click="$refs.file.click()"
              >
                Click to upload your image
              </p>
            </div>
          </div>
        </div>
      </div>
    </ScrollArea>
  </div>
</template>
