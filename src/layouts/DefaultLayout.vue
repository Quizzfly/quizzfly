<script setup lang="ts">
import SideBar from '@/components/layout/SideBar.vue'
import TopBar from '@/components/layout/TopBar.vue'
</script>
<template>
  <div class="container-div">
    <TopBar />
    <div class="w-full flex max-md:pt-16">
      <SideBar />
      <div class="flex-1 relative overflow-y-auto bg-gray-bg-100">
        <slot />
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.container-div {
  display: flex;
  height: 100dvh;
  min-height: 100dvh;
  width: 100%;

  .wrapper {
    height: 100%;
    overflow-y: auto;
    width: 100%;
  }
}
</style>
