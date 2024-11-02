<script setup lang="ts">
import { Switch } from '../ui/switch'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { useRoomStore } from '@/stores/room'
import { musics } from '@/utils/roomSettings'
const route = useRoute()
const roomStore = useRoomStore()

const isCheckShowQA = ref(false)
const isCheckAutoPlay = ref(false)

const detailRoom = computed(() => {
  return roomStore.getRoomInfo
})

const quizzflyId = route.params.quizzflyId as string

onBeforeMount(() => {
  if (detailRoom.value.id) {
    isCheckAutoPlay.value = detailRoom.value?.is_auto_play
    isCheckShowQA.value = detailRoom.value?.is_show_question
  } else {
    const data = {
      quizzfly_id: quizzflyId,
      is_show_question: isCheckShowQA.value,
      is_auto_play: isCheckAutoPlay.value,
      lobby_music: 'string',
    }
    roomStore.setCurrentSetting(data)
  }
})

const settingsMusic = defineModel<string>('music', { required: true, default: '' })

const resetData = () => {
  isCheckAutoPlay.value = false
  isCheckShowQA.value = false
}

watch([isCheckAutoPlay, isCheckShowQA], ([val1, val2]) => {
  if (val1 || val2) {
    const data = {
      quizzfly_id: quizzflyId,
      is_show_question: val2,
      is_auto_play: val1,
      lobby_music: 'string',
    }
    roomStore.setCurrentSetting(data)
  }
})
</script>

<template>
  <div class="bg-white h-full position right-0">
    <div
      class="flex items-center gap-4 py-4 px-2 hover:bg-slate-100 cursor-pointer rounded border-y"
    >
      <div class="w-24">
        <img
          src="@/assets/img/bg-image-1.jpg"
          alt=""
          class="rounded"
        />
      </div>
      <div class="flex items-center justify-between gap-2">
        <div class="flex flex-col gap-1">
          <h3 class="text-base font-semibold">Show questions and answer</h3>
          <p class="text-sm text-slate-400 font-medium">
            Questions and answer show on players devices.
          </p>
        </div>
        <Switch
          id="shareKahoot"
          v-model:checked="isCheckShowQA"
        />
      </div>
    </div>
    <div class="flex flex-col gap-3 py-4 rounded border-b">
      <h3 class="font-lg text-slate-500 font-medium">General</h3>
      <div class="flex gap-2 items-center justify-between">
        <div class="flex items-center gap-1">
          <span class="w-8 h-6 i-material-symbols-light-language"></span>
          <p class="text-lg font-semibold">Language</p>
        </div>
        <Select>
          <SelectTrigger class="w-[200px] h-10">
            <SelectValue
              class="text-base"
              placeholder="Select a language"
            />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Languages</SelectLabel>
              <SelectItem value="en"> English </SelectItem>
              <SelectItem value="vi"> Tiếng việt </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div class="flex items-center gap-2 justify-between">
        <div class="flex items-center gap-1">
          <span class="w-8 h-6 i-material-symbols-light-library-music"></span>
          <p class="text-lg font-semibold">Music</p>
        </div>
        <Select v-model="settingsMusic">
          <SelectTrigger class="w-[200px] h-10">
            <SelectValue
              class="text-base"
              placeholder="Select a song"
            />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>List Songs</SelectLabel>
              <SelectItem
                v-for="(song, index) in musics"
                :key="index"
                :value="song.value"
              >
                {{ song.label }}
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
    <div
      class="flex items-center gap-4 py-4 px-2 hover:bg-slate-100 cursor-pointer rounded border-y"
    >
      <div class="flex items-center justify-between w-full">
        <div class="flex gap-2">
          <span class="w-8 h-6 i-solar-chat-round-video-broken"></span>
          <h3 class="text-base font-semibold">Auto play</h3>
        </div>
        <Switch
          id="shareKahoot"
          v-model:checked="isCheckAutoPlay"
        />
      </div>
    </div>
    <div
      class="absolute bottom-0 pr-10 py-8 flex flex-col gap-4 justify-center items-center w-full"
    >
      <p class="text-base font-medium text-slate-700">Your setting will be saved for next time.</p>
      <p
        class="text-sm cursor-pointer text-primary font-medium underline"
        @click="resetData"
      >
        Reset to default
      </p>
    </div>
  </div>
</template>
