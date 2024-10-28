<script setup lang="ts">
import BarWrapper from '@/components/room/BarWrapper.vue'
import Lobby from '@/components/room/lobby.vue'
import { useRoomStore } from '@/stores/room'
import { useLoadingStore } from '@/stores/loading'

const loadingStore = useLoadingStore()

const roomStore = useRoomStore()

const route = useRoute()
onMounted(() => {
  roomStore.getRoomDetail(route.params.roomId as string)
  loadingStore.setLoading(true, false)
  setTimeout(() => {
    loadingStore.setLoading(false)
  }, 2000)
})
</script>
<template>
  <div
    class="ralative img-test w-full h-screen p-20 flex flex-col gap-6 overflow-hidden items-center justify-center bg-gray-200 bg-cover transition-all duration-200 ease-in-out"
  >
    <Lobby />
    <BarWrapper></BarWrapper>
  </div>
</template>
<style scoped lang="scss">
.img-test {
  background: url('@/assets/img/bg-image-1.jpg');
  background-size: cover;
}
</style>
