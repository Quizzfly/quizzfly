<script setup lang="ts">
import BarWrapper from '@/components/room/BarWrapper.vue'
import Lobby from '@/components/room/lobby.vue'
import { useRoomStore } from '@/stores/room'
import { useLoadingStore } from '@/stores/loading'
import { useSocketStore } from '@/stores/socket'
import { useAuthStore } from '@/stores/auth'

// const router = useRouter()

const loadingStore = useLoadingStore()
const socketStore = useSocketStore()
const authStore = useAuthStore()

const roomStore = useRoomStore()

const getMessage = computed(() => {
  return socketStore.getMessages
})

const detailRoom = computed(() => {
  return roomStore.getRoomInfo
})

const roomPin = ref('')

onMounted(() => {
  console.log(detailRoom.value, 'check detail')
  roomPin.value = detailRoom.value.room_pin
  // roomStore.getRoomDetail(route.params.roomId as string)X
  loadingStore.setLoading(true, false)
  setTimeout(() => {
    loadingStore.setLoading(false)
  }, 2000)

  if (detailRoom.value.id) {
    const data = {
      roomPin: detailRoom.value.room_pin,
      userId: authStore.getUser?.id,
      name: null,
    }

    socketStore.handleCreateRoomData(data)
  }
})

watch(getMessage, (val: any) => {
  console.log(val, 'check message')
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
