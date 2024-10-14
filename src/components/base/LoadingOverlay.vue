<script setup lang="ts">
import { useLoadingStore } from '@/stores/loading'

const loadingStore = useLoadingStore()
</script>
<template>
  <Teleport to="body">
    <div
      v-if="loadingStore.getIsLoading"
      class="fixed inset-0 bg-[#ecebee] flex justify-center items-center z-[999999]"
      :class="{ 'bg-opacity-50 ': loadingStore.getOpacity }"
    >
      <div class="flex flex-col items-center gap-5">
        <span class="i-svg-spinners-12-dots-scale-rotate text-3xl"></span>
        <span class="">Quizzfly...</span>
      </div>
    </div>
  </Teleport>
</template>
