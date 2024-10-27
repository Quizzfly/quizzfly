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
  textarea: () => h(Textarea, { class: 'h-24' }),
  image: ImagePicker,
}

const props = defineProps<{
  layout: SlideLayout
}>()

const questionStore = useQuestionsStore()

const handleUpdateModelValue = () => {
  questionStore.updateCurrentQuestion({ content: JSON.stringify(props.layout) })
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
