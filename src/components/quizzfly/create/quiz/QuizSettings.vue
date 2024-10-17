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

const questionsStore = useQuestionsStore()

const handleChangeQuizType = (quizType: string) => {
  questionsStore.updateCurrentQuestion({ quizType })
  questionsStore.initAnswers(quizType)
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
            :model-value="questionsStore.getCurrentQuestion.quizType"
            @update:model-value="handleChangeQuizType"
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
          <Select>
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
              :class="{ 'border-primary': questionsStore.getCurrentQuestion.image === img }"
              :src="img"
              alt=""
              @click="questionsStore.updateCurrentQuestion({ image: img })"
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
              src="/assets/images/default.webp"
              class="h-full w-10 object-contain"
              alt=""
            />
            <div>
              <p class="text-xs text-gray-500 font-light text-center">Drag and drop or</p>
              <input
                type="file"
                class="hidden"
              />

              <p class="text-xs text-primary text-center cursor-pointer mt-2 hover:underline">
                Click to upload your image
              </p>
            </div>
          </div>
        </div>
      </div>
    </ScrollArea>
  </div>
</template>
