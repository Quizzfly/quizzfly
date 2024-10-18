<script setup lang="ts">
import TopBar from '@/components/layout/room/TopBar.vue'
</script>
<template>
  <div class="flex flex-col w-full h-full">
    <TopBar />
    <div class="flex h-full max-md:flex-col-reverse bg-gray-bg overflow-hidden">
      <slot />
    </div>
  </div>
</template>
