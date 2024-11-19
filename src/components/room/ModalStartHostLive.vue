<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { useQuizzflyStore } from '@/stores/quizzfly/quizzfly'
import { useRoomStore } from '@/stores/room'

const emits = defineEmits<{
  (e: 'start'): void
}>()
const route = useRoute()

const roomStore = useRoomStore()

const quizzflyStore = useQuizzflyStore()

const currentSetting = computed(() => {
  return roomStore.getCurrentSetting
})

const quizzflyInfo = computed(() => {
  return quizzflyStore.getQuizzflyInfo
})

const quizzflyId = route.params.quizzflyId as string

const onSubmit = () => {
  if (currentSetting.value.quizzfly_id) {
    roomStore.initRoom(currentSetting.value)
    emits('start')
  } else {
    const data = {
      quizzfly_id: quizzflyId,
      is_show_question: false,
      is_auto_play: false,
      lobby_music: 'string',
    }
    roomStore.initRoom(data)
    handleStartClick()
  }
}

const handleStartClick = () => {
  emits('start')
}
</script>

<template>
  <div
    v-motion
    :initial="{ opacity: 0, y: 100 }"
    :enter="{ opacity: 1, y: 0, scale: 1 }"
    :delay="200"
    class="w-full rounded-xl p-20 flex gap-12 justify-between bg-[rgba(5,39,69,0.8)] backdrop-blur-[12px] box-border"
  >
    <div class="w-2/4">
      <img
        v-if="quizzflyInfo.cover_image"
        v-motion
        :src="quizzflyInfo.cover_image"
        class="rounded-xl w-4/5"
        :initial="{ opacity: 0, y: -100 }"
        :enter="{ opacity: 1, y: 0, scale: 1 }"
        :delay="400"
      />
      <img
        v-else
        v-motion
        :initial="{ opacity: 0, y: -100 }"
        :enter="{ opacity: 1, y: 0, scale: 1 }"
        :delay="400"
        src="@/assets/img/bg-image-1.jpg"
        alt=""
        class="rounded-xl w-4/5"
      />
    </div>
    <div class="w-2/4 flex flex-col gap-16">
      <div class="flex flex-col gap-3">
        <div
          v-motion
          :initial="{ opacity: 0, x: -100 }"
          :enter="{ opacity: 1, x: 0, scale: 1 }"
          :delay="400"
          class="bg-[rgba(255,255,255,0.08)] p-2 rounded font-medium text-white w-36 text-base"
        >
          Up to 10 players
        </div>
        <p
          v-motion
          :initial="{ opacity: 0, x: 100 }"
          :enter="{ opacity: 1, x: 0, scale: 1 }"
          :delay="500"
          class="text-white font-medium text-lg"
        >
          Bring friendly competition to this Quizzfly. Players go head-to-head and compete for a top
          spot on the podium. Players who answer the quickest and get the most correct answers will
          have higher scores.
        </p>
      </div>
      <div
        v-motion
        :initial="{ opacity: 0, y: -100 }"
        :enter="{ opacity: 1, y: 0, scale: 1 }"
        :delay="300"
        class="flex gap-2 items-center w-full"
      >
        <div class="flex gap-3 rounded items-center w-full p-2 bg-[rgba(0,0,0,0.24)]">
          <img
            class="w-24 h-18 rounded object-cover"
            src="@/assets/img/bg-image-1.jpg"
            alt=""
          />
          <div class="text-sm font-medium text-white">
            {{ quizzflyInfo?.title }}
          </div>
        </div>
        <div class="rounded h-full p-2 bg-[rgba(0,0,0,0.24)] w-32">
          <Button
            class="h-18 w-full h-full text-lg"
            @click="onSubmit"
          >
            Start
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>
