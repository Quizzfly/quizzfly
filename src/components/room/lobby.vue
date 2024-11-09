<script setup lang="ts">
import { Button } from '../ui/button'
import { useRoomStore } from '@/stores/room'
import { useSocketStore } from '@/stores/socket'
import QRCodeVue3 from 'qrcode-vue3'

const roomStore = useRoomStore()
const socketStore = useSocketStore()

const detailRoom = computed(() => {
  return roomStore.getRoomInfo
})

const listMember = computed(() => {
  return roomStore.getListMemberJoins
})

const locked = computed(() => {
  return roomStore.getLockedRoom
})

const hostOrigin = ref('')
onBeforeMount(() => {
  hostOrigin.value = window.location.origin
})

// const handleLocked = () => {
//   socketStore.handleLockRoomData(detailRoom.value.room_pin)
// }
</script>

<template>
  <div class="absolute top-24 flex flex-col justify-center items-center">
    <div class="flex items-center gap-2">
      <div class="flex gap-1">
        <div
          v-motion
          :initial="{ opacity: 0, x: -100 }"
          :enter="{ opacity: 1, x: 0, scale: 1 }"
          :delay="2000"
          class="flex flex-col gap-1 bg-white p-6 rounded"
        >
          <p class="text-base font-medium">
            Join at <span class="text-base font-semibold"> WWW.Quizzfly</span>
          </p>
          <p class="text-base font-medium">
            or with <span class="text-base font-semibold"> Quizzfly app</span>
          </p>
        </div>
        <div
          v-motion
          :initial="{ opacity: 0, y: -100 }"
          :enter="{ opacity: 1, y: 0, scale: 1 }"
          :delay="2200"
          class="flex flex-col bg-white px-6 py-3 rounded"
        >
          <p class="text-base font-medium">Game PIN:</p>
          <h1 class="text-6xl font-extrabold">{{ detailRoom.room_pin }}</h1>
        </div>
      </div>
      <div
        v-motion
        :initial="{ opacity: 0, x: 100 }"
        :enter="{ opacity: 1, x: 0, scale: 1 }"
        :delay="2000"
        class="bg-white w-28 h-28 rounded p-1"
      >
        <QRCodeVue3
          :width="250"
          :height="250"
          :value="`${hostOrigin}/play/${detailRoom.room_pin}`"
          :qr-options="{ typeNumber: 0, mode: 'Byte', errorCorrectionLevel: 'H' }"
          :image-options="{ hideBackgroundDots: true, imageSize: 0.4, margin: 0 }"
          :dots-options="{
            type: 'dots',
            color: '#26249a',
            gradient: {
              type: 'linear',
              rotation: 0,
              colorStops: [
                { offset: 0, color: '#26249a' },
                { offset: 1, color: '#26249a' },
              ],
            },
          }"
          :background-options="{ color: '#ffffff' }"
          :corners-square-options="{ type: 'dot', color: '#000000' }"
          :corners-dot-options="{ type: undefined, color: '#000000' }"
          file-ext="png"
          myclass="my-qur"
          imgclass="img-qr"
        />
      </div>
    </div>

    <div class="w-full text-center my-12">
      <h2 class="text-white font-bold text-3xl">Quizzfly</h2>
    </div>

    <div class="flex gap-2 justify-center items-center w-full text-center">
      <div class="flex items-center justify-center p-2 bg-white rounded cursor-pointer">
        <span
          v-if="locked"
          class="text-2xl i-solar-lock-keyhole-minimalistic-bold"
          @click="socketStore.handleUnlockRoomData(detailRoom.room_pin)"
        ></span>
        <span
          v-else
          class="text-2xl i-solar-lock-keyhole-minimalistic-unlocked-bold"
          @click="socketStore.handleLockRoomData(detailRoom.room_pin)"
        ></span>
      </div>
      <Button class="text-xl p-6 font-semibold">
        <RouterLink :to="{ name: 'host-live-play', params: { roomId: detailRoom?.id } }">
          Start
        </RouterLink>
      </Button>
    </div>

    <div class="w-full mt-16 flex flex-col gap-3">
      <div
        v-if="detailRoom.room_status === 'WAITING'"
        class="mr-auto ml-auto p-2 rounded bg-primary flex gap-1 items-center justify-center w-60"
      >
        <p class="text-xl font-medium text-white">Waiting for player</p>
        <span class="text-white mt-1 i-svg-spinners-3-dots-bounce"></span>
      </div>
      <div
        v-if="listMember.length > 0"
        class="flex flex-wrap gap-3 items-center mt-4"
      >
        <div
          v-for="item in listMember"
          :key="item.newPlayer.userId"
          class="p-3 rounded-full bg-primary cursor-pointer"
        >
          <p class="text-base font-medium">{{ item.newPlayer.name }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
