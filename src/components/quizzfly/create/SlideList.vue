<script setup lang="ts">
import draggable from 'vuedraggable'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import type { Slide } from '@/types/slide'

const props = defineProps<{
  slides: Slide[]
}>()

defineEmits<{
  (e: 'addSlide'): void
}>()

const tests = ref<Slide[]>(props.slides)
const currentSlide = defineModel<Slide>({ required: true })

const dragOptions = ref({
  animation: 200,
  group: 'description',
  disabled: false,
  ghostClass: 'ghost',
})

const drag = ref(false)
</script>
<template>
  <div
    class="md:min-w-[200px] w-[200px] min-h-[100px] max-md:w-full flex flex-col gap-4 overflow-hidden"
  >
    <div class="pl-8">
      <Button
        class="w-full rounded-full"
        @click="$emit('addSlide')"
      >
        <span class="i-material-symbols-light-add text-2xl"></span>
        Add quiz
      </Button>
    </div>
    <ScrollArea class="flex flex-col flex-auto overflow-y-auto gap-2 pr-2">
      <draggable
        v-model="tests"
        item-key="id"
        class="flex flex-col gap-2"
        :component-data="{
          tag: 'ul',
          type: 'transition-group',
          name: !drag ? 'flip-list' : null,
        }"
        v-bind="dragOptions"
        @start="drag = true"
        @end="drag = false"
      >
        <template #item="{ element, index }">
          <div class="flex relative items-stretch">
            <div
              class="w-1 h-[40px] rounded-r-xl mt-8"
              :class="{ 'bg-primary ': currentSlide.id === element.id }"
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
              class="w-full h-[100px] border-2 bg-white rounded-xl cursor-pointer relative p-2"
              :class="{
                'border-primary': currentSlide.id === element.id && !drag,
              }"
              @click="currentSlide = element"
            >
              <!-- tag quiz/slide -->
              <div class="text-[10px] font-medium bg-slate-200 absolute px-2 py-[2px] rounded-sm">
                {{ element.type }}
              </div>
            </div>
          </div>
        </template>
      </draggable>
    </ScrollArea>
  </div>
</template>
