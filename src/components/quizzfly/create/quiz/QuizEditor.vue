<script setup lang="ts">
import { Input } from '@/components/ui/input'
import EditableText from '@/components/base/EditableText.vue'
import AnswerSetting from '@/components/quizzfly/create/quiz/AnswerSetting.vue'
import { useSlidesStore } from '@/stores/quizzfly/quizzflySlide'

const slidesStore = useSlidesStore()

const handleClickTitle = () => {
  console.log('Do something')
}

const handleUpdateTitle = (value: string | number) => {
  slidesStore.updateCurrentSlide({ title: String(value) })
}
</script>
<template>
  <div class="w-full h-full flex flex-col gap-5 p-5 overflow-hidden justify-between">
    <!-- question -->
    <div class="">
      <EditableText
        :value="slidesStore.getCurrentSlide.title"
        :click-callback="handleClickTitle"
      >
        <template #input="{ finishEditing }">
          <Input
            placeholder="Enter your question"
            class="text-2xl font-medium h-12"
            :model-value="slidesStore.getCurrentSlide.title"
            @update:model-value="handleUpdateTitle"
            @blur="finishEditing"
          />
        </template>
        <template #default="{}">
          <p
            class="py-1 px-2 rounded-lg border-2 border-transparent hover:border-primary text-2xl font-medium"
          >
            {{ slidesStore.getCurrentSlide.title || 'Enter question' }}
          </p>
        </template>
      </EditableText>
    </div>

    <!-- picture -->
    <div class="flex justify-center flex-auto">
      <div class="w-[80%] h-full bg-slate-100 rounded-lg"></div>
    </div>
    <!-- answer -->
    <AnswerSetting :key="slidesStore.getCurrentSlide.id" />
  </div>
</template>
