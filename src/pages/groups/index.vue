<script lang="ts" setup>
import SidebarGroup from '@/components/layout/sidebar/SidebarGroup.vue'
</script>

<template>
  <div class="h-full flex">
    <SidebarGroup />
    <div class="flex-1 relative overflow-y-auto bg-gray-bg-100">
      <RouterView></RouterView>
    </div>
  </div>
</template>
