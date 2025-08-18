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
import { useLoadingStore } from '@/stores/loading'
import { useDropZone } from '@vueuse/core'

const loadingStore = useLoadingStore()
const questionsStore = useQuestionsStore()
const currentQuestion = computed(() => questionsStore.getCurrentQuestion as Quiz)

const dropZoneRef = ref<HTMLDivElement>()

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

const handleChangeQuizType = async (quizType: QuizType) => {
  loadingStore.setLoading(true)
  await questionsStore.updateQuestionSettings({ quiz_type: quizType })
  if (quizType === 'TRUE_FALSE') {
    try {
      await questionsStore.clearAllAnswers()
      questionsStore.initAnswers(quizType)
    } catch (error) {
      console.error(error)
    }
  }
  setTimeout(() => {
    loadingStore.setLoading(false)
  }, 500)
}
</script>
<template>
  <div
    id="tour-item"
    data-tour="6"
    class="md:min-w-[340px] w-[340px] bg-white border h-full rounded-xl p-8 flex flex-col overflow-hidden"
  >
    <div class="flex items-center justify-between">
      <span class="text-base">{{ $t('quizzfly.create.quiz_settings') }}</span>
    </div>

    <ScrollArea class="flex flex-col flex-auto gap-2">
      <div class="px-1">
        <!-- quiz type -->
        <div class="mt-8">
          <span class="font-medium text-sm">{{ $t('quizzfly.create.quiz_type') }}</span>
          <Select
            :model-value="currentQuestion.quiz_type"
            @update:model-value="handleChangeQuizType($event as QuizType)"
          >
            <SelectTrigger class="mt-3">
              <SelectValue :placeholder="$t('quizzfly.create.question_type')" />
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
          <span class="font-medium text-sm">{{ $t('quizzfly.create.time_limit') }}</span>
          <Select
            :model-value="String(currentQuestion.time_limit)"
            @update:model-value="
              questionsStore.updateQuestionSettings({ time_limit: Number($event) })
            "
          >
            <SelectTrigger class="mt-3">
              <SelectValue :placeholder="$t('quizzfly.create.time_limit')" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem
                  v-for="n in 10"
                  :key="n"
                  :value="String(n * 5)"
                >
                  {{ n * 5 }} {{ $t('quizzfly.create.seconds') }}
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <!-- points -->
        <div class="mt-8">
          <span class="font-medium text-sm">{{ $t('quizzfly.create.points') }}</span>
          <Select
            :model-value="String(currentQuestion.point_multiplier)"
            @update:model-value="
              questionsStore.updateQuestionSettings({ point_multiplier: Number($event) })
            "
          >
            <SelectTrigger class="mt-3">
              <SelectValue :placeholder="$t('quizzfly.create.points')" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="1">{{ $t('quizzfly.create.normal') }}</SelectItem>
                <SelectItem value="2">{{ $t('quizzfly.create.duplicate') }}</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div class="border-t-[1.2px] my-8 w-full"></div>
        <!-- theme -->
        <div>
          <span class="font-medium text-sm">{{ $t('quizzfly.create.select_theme') }}</span>
          <div class="grid grid-cols-2 gap-2 mt-4">
            <img
              v-for="img in themeImages"
              :key="img"
              class="w-full h-[74px] object-cover rounded-md cursor-pointer border-2"
              :class="{ 'border-primary': currentQuestion.background_url === img }"
              :src="img"
              alt=""
              @click="questionsStore.updateCurrentQuestion('quiz', { background_url: img })"
            />
          </div>
        </div>

        <div class="border-t-[1.2px] my-8 w-full"></div>

        <!-- image -->
        <div class="mt-10">
          <span class="font-medium text-sm">{{ $t('quizzfly.create.upload_image') }}</span>
          <p class="text-xs text-gray-500 font-light">
            {{ $t('quizzfly.create.upload_image_support') }}
          </p>
          <div
            ref="dropZoneRef"
            class="flex items-center px-5 gap-5 w-full h-[100px] border-2 border-dashed rounded-md mt-5 overflow-hidden bg-cover bg-center"
          >
            <img
              :src="currentQuestion.files[0]?.url || '/assets/images/default.webp'"
              class="h-12 w-12 rounded-sm object-cover"
              alt=""
            />
            <div>
              <p class="text-xs text-gray-500 font-light text-center">
                {{ $t('quizzfly.create.drag_and_drop') }}
              </p>
              <input
                ref="file"
                type="file"
                class="hidden"
                @change="handleInputFileChange"
              />

              <p
                class="text-xs text-primary text-center cursor-pointer mt-2 hover:underline"
                @click="($refs.file as HTMLInputElement).click()"
              >
                {{ $t('quizzfly.create.click_to_upload') }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </ScrollArea>
  </div>
</template>
