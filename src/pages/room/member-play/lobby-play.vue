<script setup lang="ts">
import Join from '@/components/room/play/Join.vue'

onBeforeMount(() => {
  console.log('mounted')
})
</script>

<template>
  <div
    class="relative layout-full bg w-full h-full flex flex-col justify-center items-center bg-cover gap-8"
  >
    <div class="text-2xl text-white font-extrabold">Quizzfly</div>
    <Join />
  </div>
</template>
<style lang="scss" scoped>
.bg {
  background: url('@/assets/img/bg-image-5.jpg');
  background-size: cover;
}

.layout-full {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  max-height: -webkit-fill-available;
  overflow: hidden;
}
</style>
