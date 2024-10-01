<script setup lang="ts">
import SlideEditor from './slide/SlideEditor.vue'
import SlideSettings from './slide/SlideSettings.vue'
import { slideLayouts, type SlideLayout } from '@/modules/slide/layout'

const slideLayout = ref<SlideLayout>(slideLayouts[0])
</script>
<template>
  <div class="flex w-full gap-4">
    <div class="flex-auto flex flex-col overflow-hidden">
      <div class="h-full border-2 rounded-xl bg-white border-primary">
        <SlideEditor :layout="slideLayout" />
      </div>
      <div class="h-[20%]"></div>
    </div>

    <!-- settings -->
    <SlideSettings v-model:layout="slideLayout" />
  </div>
</template>
