<script setup lang="ts">
import type { SlideLayout } from '@/modules/slide/layout'

defineProps<{
  layout: SlideLayout
}>()

interface LayoutItemStyle {
  [key: string]: {
    [key: string]: string
  }
}
const data = ref<LayoutItemStyle>({})
</script>
<template>
  <div class="w-full h-full flex flex-col p-5 overflow-hidden">
    <!-- question -->
    <div class="h-full">
      <!-- <EditableText
        :value="title"
        :click-callback="handleFocusInputTitle"
      >
        <template #input="{ finishEditing }">
          <Input
            ref="titleInputRef"
            v-model="title"
            placeholder="Enter your question"
            class="text-2xl font-medium h-12"
            @blur="finishEditing"
          />
        </template>
        <template #default="{}">
          <p
            class="py-1 px-2 rounded-lg border-2 border-transparent hover:border-primary text-2xl font-medium"
          >
            {{ title || 'Enter question' }}
          </p>
        </template>
      </EditableText> -->
      <div class="flex flex-col gap-1 h-full justify-center items-center">
        <template
          v-for="(row, index) in layout.rows"
          :key="index"
        >
          <component
            :is="row.element"
            v-if="row.element !== 'group'"
            v-model="data[row.label]"
            v-bind="row.props"
            class="w-full rounded-sm"
          ></component>

          <!-- render columns -->
          <div
            v-else
            class="flex w-full items-center gap-1 justify-between"
          >
            <template
              v-for="(group, groupIndex) in row.columns"
              :key="groupIndex"
            >
              <!-- render each column -->
              <div class="flex flex-col h-full w-full gap-1 items-center justify-center">
                <template v-if="group.rows">
                  <component
                    :is="groupItem.element"
                    v-for="(groupItem, groupItemIndex) in group.rows"
                    :key="groupItemIndex"
                    v-model="data[groupItem.label]"
                    v-bind="groupItem.props"
                    class="w-full rounded-sm"
                  ></component>
                </template>
                <component
                  :is="group.element"
                  v-else-if="group.elementType"
                  v-model="data[group.label]"
                  v-bind="group.props"
                  class="w-full rounded-sm"
                ></component>
              </div>
            </template>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
