<script setup lang="ts">
import Instructions from '@/components/room/user/Instructions.vue'
// const isCheckScreen = ref(false)
</script>

<template>
  <div class="relative bg w-full h-full flex flex-col justify-center items-center bg-cover gap-8">
    <Instructions></Instructions>
  </div>
</template>
<style lang="scss" scoped>
.bg {
  background: url('@/assets/img/bg-image-5.jpg');
  background-size: cover;
}
</style>
