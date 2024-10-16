<script setup lang="ts">
import ModalStartHostLive from '@/components/room/ModalStartHostLive.vue'
import Setting from '@/components/room/Setting.vue'
import { useFullscreen } from '@vueuse/core'

const el = ref<HTMLElement | null>(null)
const { isFullscreen, exit, toggle } = useFullscreen(el)

const isShowSetting = ref(false)
const closeModal = () => {
  isShowSetting.value = false
}
</script>
<template>
  <div
    ref="el"
    class="ralative img-test w-full h-screen p-20 flex flex-col gap-6 overflow-hidden items-center justify-center bg-gray-200 bg-cover transition-all duration-200 ease-in-out"
  >
    <ModalStartHostLive />

    <div class="absolute right-6 bottom-6 flex gap-3 rounded bg-[rgba(0,0,0,0.24)] p-3">
      <span
        class="i-solar-settings-linear text-white w-8 h-6 cursor-pointer"
        @click="isShowSetting = true"
      ></span>
      <span
        v-if="!isFullscreen"
        class="i-solar-full-screen-bold text-white w-8 h-6 cursor-pointer"
        @click="toggle"
      ></span>
      <span
        v-else
        class="i-solar-quit-full-screen-square-outline text-white w-8 h-6 cursor-pointer"
        @click="exit"
      ></span>
    </div>
  </div>
  <Setting
    v-if="isShowSetting"
    @close="closeModal"
  ></Setting>
</template>
<style scoped lang="scss">
.img-test {
  background: url('@/assets/img/bg-image-1.jpg');
  background-size: cover;
}
</style>
