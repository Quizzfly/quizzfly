<script setup lang="ts">
import draggable from 'vuedraggable'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import type { Question } from '@/types/question'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { quizOptions } from '@/utils/quiz'
import { useQuestionsStore } from '@/stores/quizzfly/question'

const currentQuestion = defineModel<Question>({ required: true })
const questionsStore = useQuestionsStore()

defineProps<{
  slides: Question[]
}>()

const emits = defineEmits<{
  (e: 'addSlide', type: 'quiz' | 'slide', quizType: string): void
}>()

const dragOptions = ref({
  animation: 200,
  group: 'description',
  disabled: false,
  ghostClass: 'ghost',
})

const drag = ref(false)
const isShow = ref(false)

const handleAddSlide = (type: string, quizType: string) => {
  emits('addSlide', type as 'quiz' | 'slide', quizType)
  isShow.value = false
}
</script>
<template>
  <div
    class="md:min-w-[200px] w-[200px] min-h-[100px] max-md:w-full flex flex-col gap-4 overflow-hidden"
  >
    <div class="pl-8">
      <Popover
        :open="isShow"
        @update:open="isShow = $event"
      >
        <PopoverTrigger>
          <Button class="rounded-full w-[150px]">
            <span class="i-material-symbols-light-add text-2xl"></span>
            Add quiz
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <div class="w-[400px] py-6 px-4">
            <div class="flex items-center justify-between px-4">
              <span class="text-sm">Quiz type</span>
              <span
                class="i-material-symbols-light-close text-xl cursor-pointer"
                @click="isShow = false"
              ></span>
            </div>

            <!-- quiz options -->
            <div class="grid grid-cols-2 gap-1 mt-5">
              <div
                v-for="item in quizOptions"
                :key="item.type"
                class="flex items-center cursor-pointer hover:bg-slate-100 h-12 px-3 rounded-xl"
                @click="handleAddSlide('quiz', item.type)"
              >
                <img
                  :src="item.icon"
                  :alt="item.name"
                />
                <span class="text-sm font-medium">{{ item.name }}</span>
              </div>
            </div>
            <p class="text-sm mt-4 px-4">Impressed slide</p>
            <div class="px-3">
              <Button
                variant="secondary"
                class="w-full mt-5"
                @click="handleAddSlide('slide', 'impressed')"
              >
                Add slide
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
    <!-- slides list -->
    <ScrollArea class="flex flex-col flex-auto overflow-y-auto gap-2 pr-2">
      <draggable
        :model-value="slides"
        item-key="id"
        class="flex flex-col gap-2 pr-2"
        :component-data="{
          tag: 'ul',
          type: 'transition-group',
          name: !drag ? 'flip-list' : null,
        }"
        v-bind="dragOptions"
        @update:model-value="questionsStore.updateQuestions"
        @start="drag = true"
        @end="drag = false"
      >
        <template #item="{ element, index }">
          <div
            :id="`question-${element.id}`"
            v-motion
            :initial="{ opacity: 0, y: 100 }"
            :enter="{ opacity: 1, y: 0, scale: 1 }"
            class="flex relative items-stretch"
          >
            <div
              class="w-1 h-[40px] rounded-r-xl mt-8"
              :class="{ 'bg-primary ': currentQuestion.id === element.id }"
            ></div>

            <div class="flex flex-col justify-around px-1 items-center">
              <div class="text-xs font-medium">{{ index + 1 }}</div>
              <div
                class="text-xs rounded-sm text-gray-500 h-4 w-4 hover:bg-slate-200 cursor-pointer flex items-center justify-center"
              >
                <span class="i-material-symbols-light-more-horiz text-xl"></span>
              </div>
            </div>

            <div
              class="w-full h-[100px] border-2 bg-white bg-cover bg-center rounded-xl cursor-pointer relative p-2 flex justify-center items-center overflow-hidden"
              :style="{ backgroundImage: `url(${element.theme})` }"
              :class="{
                'border-primary': currentQuestion.id === element.id && !drag,
              }"
              @click="currentQuestion = element"
            >
              <div
                class="text-[10px] font-medium bg-slate-200 absolute top-2 left-2 px-2 py-[2px] rounded-sm"
              >
                {{ element.type }}
              </div>
              <p class="truncate text-ellipsis bg-white rounded-sm px-2">{{ element.title }}</p>
            </div>
          </div>
        </template>
      </draggable>
    </ScrollArea>
  </div>
</template>
