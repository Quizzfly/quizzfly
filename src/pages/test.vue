<script setup lang="ts">
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ref } from 'vue'

// const isPlaying = ref(false)
const audio = ref<HTMLAudioElement | null>(null)

const isChechSelected = ref('')

const toggleAudio = () => {
  console.log('hello check')
  // isPlaying.value = !isPlaying.value
  // if (isPlaying.value) {
  audio.value?.play()
  // } else {
  //   audio.value?.pause()
  // }
}

watch(isChechSelected, (val) => {
  if (val === 'en') {
    toggleAudio()
  }
})
</script>

<template>
  <div class="flex items-center justify-center mt-80">
    {{ isChechSelected }}
    <Select v-model="isChechSelected">
      <SelectTrigger class="w-[200px] h-10">
        <SelectValue
          class="text-base"
          placeholder="Select a language"
        />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Languages</SelectLabel>
          <SelectItem value="en">
            hello
            <audio
              ref="audio"
              hidden
            >
              <source
                src="@/assets/audio/City-shadows.mp3"
                type="audio/mpeg"
              />
            </audio>
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  </div>
</template>
