<script setup lang="ts">
import type { SlideLayout } from '@/modules/slide/layout'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import ImagePicker from '@/components/base/ImagePicker.vue'
import { useQuestionsStore } from '@/stores/quizzfly/question'
import Text from '@/components/base/Text.vue'

interface CustomComponent {
  [key: string]: Component
}

const component = computed<CustomComponent>(() => {
  if (props.isEdit) {
    return {
      input: Input,
      textarea: Textarea,
      image: ImagePicker,
    }
  }

  return {
    input: Text,
    textarea: Text,
    image: ImagePicker,
  }
})

const props = defineProps<{
  layout: SlideLayout
  isEdit?: boolean
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
        <div class="flex flex-col overflow-hidden justify-center gap-4 w-full h-full">
          <template
            v-for="(item, i) in column"
            :key="i"
          >
            <template v-if="item.element !== 'image'">
              <component
                :is="component[item.element]"
                v-bind="item.props"
                v-model="item.value"
                :class="{
                  'font-bold text-2xl px-5 py-2 rounded-md border-b-4 border-gray-200': !isEdit,
                }"
                class="block bg-white max-h-[60%] min-h-[40px] text-black"
                @blur="handleUpdateModelValue"
              />
            </template>

            <template v-else>
              <component
                :is="component[item.element]"
                v-if="isEdit"
                v-bind="item.props"
                v-model="item.value"
                class="w-full h-full"
                @updated="handleUpdateModelValue"
                @deleted="handleUpdateModelValue"
              />
              <div
                v-else
                v-image
                class="flex-[1_1] w-full bg-cover bg-center"
                :style="{ backgroundImage: `url(${item.value})` }"
              ></div>
            </template>
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
