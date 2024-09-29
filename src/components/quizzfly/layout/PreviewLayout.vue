<script setup lang="ts">
import type { SlideLayout } from '@/modules/slide/layout'
// import type { SlideLayoutType } from '@/modules/slide/layout'

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
    width: '60px',
  },
  textarea: {
    height: '20px',
  },
}
</script>
<template>
  <div
    class="w-full h-[80px] rounded-lg p-1 border-2 cursor-pointer"
    :class="current.type === layout.type ? 'border-primary' : 'border-gray-200'"
    @click="current = layout"
  >
    <div
      v-if="layout.rows"
      class="flex flex-col gap-1 h-full justify-center items-center"
    >
      <template
        v-for="(row, index) in layout.rows"
        :key="index"
      >
        <div
          v-if="!row.columns && row.elementType"
          class="w-full bg-gray-200 rounded-sm"
          :style="layoutItemStyle[row.elementType]"
        ></div>

        <!-- render columns -->
        <div
          v-else
          class="flex w-full items-center h-full gap-1"
        >
          <template
            v-for="(group, groupIndex) in row.columns"
            :key="groupIndex"
          >
            <!-- render each column -->
            <div class="flex flex-col h-full w-full gap-1 items-center justify-center">
              <template v-if="group.rows">
                <div
                  v-for="(groupItem, groupItemIndex) in group.rows"
                  :key="groupItemIndex"
                  class="w-full bg-gray-200 rounded-sm"
                  :style="layoutItemStyle[groupItem.elementType || 'input']"
                ></div>
              </template>
              <div
                v-else-if="group.elementType"
                class="w-full bg-gray-200 rounded-sm"
                :style="layoutItemStyle[group.elementType]"
              ></div>
            </div>
          </template>
        </div>
      </template>
    </div>
  </div>
</template>
