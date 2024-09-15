<script setup lang="ts">
import TopBar from '@/components/layout/quiz/TopBar.vue'
import SideBar from '@/components/layout/quiz/SideBar.vue'
</script>
<template>
  <div class="flex flex-col w-full h-full">
    <TopBar />
    <div class="flex h-full max-md:flex-col-reverse">
      <SideBar />
      <slot />
    </div>
  </div>
</template>
