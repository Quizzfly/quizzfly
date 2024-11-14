<script setup lang="ts">
import { Button } from '../ui/button'
import { useRoomStore } from '@/stores/room'
import { useSocketStore } from '@/stores/socket'
import type { ILocked, IMember, IKickMem } from '@/types'
import QRCodeVue3 from 'qrcode-vue3'
import { avatars } from '@/utils/avatar'
import { showToast } from '@/utils/toast'

import { useLoadingStore } from '@/stores/loading'
import { useAuthStore } from '@/stores/auth'
import type { IRoomSocket } from '@/types'

const router = useRouter()

const loadingStore = useLoadingStore()
const authStore = useAuthStore()
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

const roomPin = ref('')
const hostOrigin = ref('')
const membersWithAvatars = ref<IMember[]>([])

onBeforeMount(() => {
  hostOrigin.value = window.location.origin
})

onMounted(() => {
  if (!detailRoom.value.id) {
    router.push({ name: 'host-live' })
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
      name: 'name',
    }

    socketStore.handleCreateRoomData(data)
  }
})

watch(listMember.value, (val) => {
  if (val) {
    addAvatarOnList(val)
  }
})

const handleLocked = () => {
  const data: ILocked = {
    roomPin: detailRoom.value.room_pin,
  }
  socketStore.handleLockRoomData(data)
}

const handleUnlocked = () => {
  const data: ILocked = {
    roomPin: detailRoom.value.room_pin,
  }
  socketStore.handleUnlockRoomData(data)
}

const addAvatarOnList = (data: IMember[]) => {
  membersWithAvatars.value = data.map((member, index) => ({
    ...member,
    avatar: avatars[index % avatars.length],
  }))
}

const removeMember = (item: IMember) => {
  const data: IKickMem = {
    roomPin: detailRoom.value.room_pin,
    socketId: item.new_player.socket_id,
  }

  socketStore.handleKickMember(data)
}

const copyCode = async () => {
  try {
    await navigator.clipboard.writeText(detailRoom.value.room_pin)
    showToast({
      title: 'success',
      description: 'Copy PIN code success',
      variant: 'default',
    })
  } catch (err) {
    showToast({
      title: 'Error',
      description: 'Failed to copy pin code',
      variant: 'destructive',
    })
  }
}
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
          <h1
            class="text-6xl font-extrabold py-3 px-4 rounded cursor-pointer hover:bg-slate-300"
            @click="copyCode()"
          >
            {{ detailRoom.room_pin }}
          </h1>
        </div>
      </div>
      <div
        v-motion
        :initial="{ opacity: 0, x: 100 }"
        :enter="{ opacity: 1, x: 0, scale: 1 }"
        :delay="2000"
        class="bg-white w-32 h-32 rounded p-1"
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
      <div
        v-if="locked"
        class="flex items-center justify-center p-2 bg-white rounded cursor-pointer"
        @click="handleUnlocked()"
      >
        <span class="text-2xl i-solar-lock-keyhole-minimalistic-bold"></span>
      </div>
      <div
        v-else
        class="flex items-center justify-center p-2 bg-white rounded cursor-pointer"
        @click="handleLocked()"
      >
        <span class="text-2xl i-solar-lock-keyhole-minimalistic-unlocked-bold"></span>
      </div>

      <RouterLink :to="{ name: 'host-live-play', params: { roomId: detailRoom?.id } }">
        <Button class="text-xl p-6 font-semibold"> Start </Button>
      </RouterLink>
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
        class="flex flex-wrap gap-3 items-center mt-8 justify-center"
      >
        <div
          v-for="item in membersWithAvatars"
          :key="item.new_player.user_id"
          v-motion
          :initial="{ opacity: 0, x: 100 }"
          :enter="{ opacity: 1, x: 0, scale: 1 }"
          :delay="800"
          class="relative group py-2 px-4 rounded-full bg-primary cursor-pointer flex items-center justify-center gap-2"
        >
          <img
            class="w-8 h-8"
            :src="item.avatar"
          />
          <p class="text-base font-bold text-white">{{ item.new_player.name }}</p>
          <div
            class="hidden group-hover:flex absolute bg-white -top-2 w-[18px] h-[18px] rounded-full text-[26px] font-semibold cursor-pointer items-center right-1"
            @click="removeMember(item)"
          >
            <span class="i-material-symbols-light-close-small-outline"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
