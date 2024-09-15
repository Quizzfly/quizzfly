<script setup lang="ts">
import SideBar from '@/components/layout/SideBar.vue'
import TopBar from '@/components/layout/TopBar.vue'
</script>
<template>
  <div class="container-div">
    <!-- <TopBar /> -->
    <div class="w-full flex">
      <SideBar />
      <div class="flex-1 relative overflow-y-auto">
        <slot />
      </div>
    </div>
    <!-- <Splitter class="mb-8 w-full border-0 h-full">
            <SplitterPanel
                :size="25"
                class="flex items-center justify-center"
            >
                <SideBar />
            </SplitterPanel>
            <SplitterPanel
                :size="75"
                :min-size="50"
                class="flex items-center justify-center"
            >
                <slot />
            </SplitterPanel>
        </Splitter> -->
    <confirmDialog />
  </div>
</template>
<style lang="scss" scoped>
.container-div {
  display: flex;
  height: 100vh;
  min-height: 100vh;
  width: 100%;

  .wrapper {
    height: 100%;
    overflow-y: auto;
    width: 100%;
  }
}
</style>
