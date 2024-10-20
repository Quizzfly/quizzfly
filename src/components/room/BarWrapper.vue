<script setup lang="ts">
import Setting from '@/components/room/Setting.vue'
import { useFullscreen } from '@vueuse/core'
import { Slider } from '../ui/slider'

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'

const { isFullscreen, exit, toggle } = useFullscreen()

const isShowSetting = ref(false)
const isShowVolume = ref(false)
const closeModal = () => {
  isShowSetting.value = false
}

const songSelected = ref()
const volume = ref([30])
const audio = ref<HTMLAudioElement | null>(null)

// onMounted(() => {
//   startAudio()
// })

watch(songSelected, () => {
  stopAudio()
  startAudio()
})

const handleVolume = () => {
  isShowVolume.value = !isShowVolume.value
}

const stopAudio = () => {
  if (audio.value) {
    audio.value.pause()
    audio.value.currentTime = 0
  }
}

const startAudio = () => {
  if (audio.value) {
    audio.value.src = `/assets/audio/${songSelected.value}.mp3`
    audio.value.volume = volume.value[0] / 100
    audio.value.play()
  }
}

watch(volume, (val) => {
  if (audio.value) {
    audio.value.volume = val[0] / 100
  }
})
</script>

<template>
  <div class="absolute right-6 bottom-6 flex gap-3 rounded bg-[rgba(0,0,0,0.24)] p-3">
    <div class="flex items-center gap-2">
      <div
        class="flex gap-2"
        @click="handleVolume()"
      >
        <span
          v-if="volume[0] === 0"
          class="i-solar-volume-bold text-white w-8 h-6 cursor-pointer"
        ></span>
        <span
          v-else-if="volume[0] <= 50 && volume[0] >= 1"
          class="i-solar-volume-small-bold text-white w-8 h-6 cursor-pointer"
        ></span>
        <span
          v-else
          class="i-solar-volume-loud-bold text-white w-8 h-6 cursor-pointer"
        ></span>
      </div>
      <Slider
        v-if="isShowVolume"
        v-model="volume"
        class="w-24"
        :max="100"
        :min="0"
        :step="2"
      />
    </div>
    <Sheet>
      <SheetTrigger>
        <span
          class="i-solar-settings-linear text-white w-8 h-6 cursor-pointer"
          @click="isShowSetting = true"
        ></span>
      </SheetTrigger>
      <SheetContent class="w-[450px]">
        <SheetHeader>
          <SheetTitle>
            <div class="flex items-center justify-between mb-4 p-2">
              <h2 class="text-3xl font-bold">Setting</h2>
            </div>
          </SheetTitle>
        </SheetHeader>
        <Setting
          v-if="isShowSetting"
          v-model:music="songSelected"
          @close="closeModal"
        ></Setting>
      </SheetContent>
    </Sheet>
    <audio
      ref="audio"
      hidden
    />
    <span
      v-if="!isFullscreen"
      class="i-solar-full-screen-bold text-white w-8 h-6 cursor-pointer"
      @click="toggle"
    ></span>
    <span
      v-else
      class="i-solar-quit-full-screen-square-outline text-white w-8 h-6 cursor-pointer"
      @click="exit"
    ></span>
  </div>
</template>
