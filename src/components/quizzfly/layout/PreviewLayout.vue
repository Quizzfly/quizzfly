<script setup lang="ts">
import type { SlideLayout } from '@/modules/slide/layout'

const current = defineModel<SlideLayout>({ required: true })

defineProps<{
  layout: SlideLayout
}>()

interface LayoutItemStyle {
  [key: string]: {
    [key: string]: string
  }
}

const layoutItemStyle: LayoutItemStyle = {
  input: {
    height: '10px',
  },
  image: {
    height: '100%',
    width: '100%',
  },
  textarea: {
    height: '20px',
  },
}
</script>
<template>
  <div
    class="border-2 rounded-lg w-full flex flex-col h-[80px] cursor-pointer p-2 overflow-hidden"
    :class="current.type === layout.type ? 'border-primary' : 'border-gray-200'"
    @click="current = layout"
  >
    <div class="flex items-center gap-5 h-full">
      <template
        v-for="(column, index) in layout.columns"
        :key="index"
      >
        <div class="flex flex-col justify-center gap-1 w-full h-full">
          <template
            v-for="(item, i) in column"
            :key="i"
          >
            <!-- <component
              :is="component[item.element]"
              v-bind="item.props"
              v-model="item.value"
            /> -->
            <div
              :style="layoutItemStyle[item.element]"
              class="bg-gray-200"
            ></div>

          </template>
        </div>
      </template>
    </div>
  </div>
</template>
