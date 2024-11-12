<script setup lang="ts">
import BarWrapper from '@/components/room/BarWrapper.vue'
import Lobby from '@/components/room/lobby.vue'
import { useRoomStore } from '@/stores/room'
import { useLoadingStore } from '@/stores/loading'
import { useSocketStore } from '@/stores/socket'
import { useAuthStore } from '@/stores/auth'
import type { IRoomSocket } from '@/types'

const router = useRouter()

const loadingStore = useLoadingStore()
const socketStore = useSocketStore()
const authStore = useAuthStore()

const roomStore = useRoomStore()

const detailRoom = computed(() => {
  return roomStore.getRoomInfo
})

const roomPin = ref('')

onMounted(() => {
  const isReload = sessionStorage.getItem('isReloaded')

  if (isReload) {
    router.push({ name: 'host-live' })
  } else {
    sessionStorage.setItem('isReloaded', 'true')
  }

  roomPin.value = detailRoom.value.room_pin

  loadingStore.setLoading(true, false)
  setTimeout(() => {
    loadingStore.setLoading(false)
  }, 2000)

  if (detailRoom.value.id) {
    const data: IRoomSocket = {
      roomPin: detailRoom.value.room_pin,
      userId: authStore.getUser?.id,
      name: 'room',
    }

    socketStore.handleCreateRoomData(data)
  }
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
