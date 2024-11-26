<script setup lang="ts">
import ModalStartHostLive from '@/components/room/ModalStartHostLive.vue'
import Lobby from '@/components/room/lobby.vue'
import BarWrapper from '@/components/room/BarWrapper.vue'

const isModalVisible = ref(true)

const handleStart = () => {
  setTimeout(() => {
    isModalVisible.value = false
  }, 1000)
}
</script>
<template>
  <div
    ref="el"
    class="max-md:p-5 ralative img-test w-full h-screen p-20 flex flex-col gap-6 overflow-hidden items-center justify-center bg-gray-200 bg-cover transition-all duration-200 ease-in-out"
  >
    <ModalStartHostLive
      v-if="isModalVisible"
      @start="handleStart"
    />
    <Lobby v-else />
    <BarWrapper />
  </div>
</template>
<style scoped lang="scss">
.img-test {
  background: url('@/assets/img/bg-image-1.jpg');
  background-size: cover;
}
</style>
