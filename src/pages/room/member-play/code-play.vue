<script setup lang="ts">
import Lobby from '@/components/room/play/Lobby.vue'
</script>

<template>
  <div class="relative bg w-full h-full flex flex-col justify-center items-center bg-cover gap-8">
    <div class="text-2xl text-white font-extrabold">Quizzfly</div>
    <Lobby />
  </div>
</template>
<style lang="scss" scoped>
.bg {
  background: url('@/assets/img/bg-image-5.jpg');
  background-size: cover;
}
</style>
