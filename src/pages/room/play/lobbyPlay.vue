<script setup lang="ts">
import Lobby from '@/components/room/user/Lobby.vue'
import Join from '@/components/room/user/Join.vue'

const isCheckScreen = ref(false)
</script>

<template>
  <div class="relative bg w-full h-full flex flex-col justify-center items-center bg-cover gap-8">
    <div class="text-2xl text-white font-extrabold">Quizzfly</div>
    <Lobby v-if="isCheckScreen"></Lobby>
    <Join v-else></Join>
  </div>
</template>
<style lang="scss" scoped>
.bg {
  background: url('@/assets/img/bg-image-5.jpg');
  background-size: cover;
}
</style>
