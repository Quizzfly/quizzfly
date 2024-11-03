<script setup lang="ts">
import ModalStartHostLive from '@/components/room/ModalStartHostLive.vue'
import BarWrapper from '@/components/room/BarWrapper.vue'
import { useQuizzflyStore } from '@/stores/quizzfly/quizzfly'

const quizzflyStore = useQuizzflyStore()

const route = useRoute()

onBeforeMount(() => {
  quizzflyStore.getQuizzflyDetail(route.params.quizzflyId as string)
})
</script>
<template>
  <div
    ref="el"
    class="ralative img-test w-full h-screen p-20 flex flex-col gap-6 overflow-hidden items-center justify-center bg-gray-200 bg-cover transition-all duration-200 ease-in-out"
  >
    <ModalStartHostLive />
    <BarWrapper />
  </div>
</template>
<style scoped lang="scss">
.img-test {
  background: url('@/assets/img/bg-image-1.jpg');
  background-size: cover;
}
</style>
