<script setup lang="ts">
import type { SlideLayout } from '@/modules/slide/layout'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import ImagePicker from '@/components/base/ImagePicker.vue'
import { useQuestionsStore } from '@/stores/quizzfly/question'

interface CustomComponent {
  [key: string]: Component
}

const component: CustomComponent = {
  input: Input,
  textarea: Textarea,
  image: ImagePicker,
}

const props = defineProps<{
  layout: SlideLayout
}>()

const questionsStore = useQuestionsStore()

const handleUpdateModelValue = () => {
  questionsStore.updateCurrentQuestion('slide', { content: JSON.stringify(props.layout) })
}
</script>
<template>
  <div class="w-full h-full flex flex-col p-5 overflow-hidden">
    <!-- question -->
    <div class="flex items-center gap-5 h-full">
      <template
        v-for="(column, index) in layout.columns"
        :key="index"
      >
        <div class="flex flex-col justify-center gap-4 w-full h-full">
          <template
            v-for="(item, i) in column"
            :key="i"
          >
            <component
              :is="component[item.element]"
              v-bind="item.props"
              v-model="item.value"
              class="bg-white max-h-[60%]"
              @blur="handleUpdateModelValue"
              @updated="handleUpdateModelValue"
            />
          </template>
        </div>
      </template>
    </div>
  </div>
</template>
<style scoped>
.grid-col-custom {
  grid-template-columns: repeat(v-bind('layout.columns.length'), 1fr);
}
</style>
