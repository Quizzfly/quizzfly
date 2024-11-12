<script setup lang="ts">
import { useRoomStore } from '@/stores/room'

const roomStore = useRoomStore()
const memberName = computed(() => {
  return roomStore.getMemberName
})
</script>

<template>
  <div class="flex flex-col items-center justify-center">
    <div
      v-motion
      class="w-32 h-32"
      :initial="{ opacity: 0, y: 100 }"
      :enter="{ opacity: 1, y: 0, scale: 1 }"
      :delay="800"
    >
      <img
        class="w-full h-full object-cover rounded-xl"
        src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairDreads01&accessoriesType=Sunglasses&hairColor=Black&facialHairType=BeardMedium&facialHairColor=BrownDark&clotheType=Hoodie&clotheColor=PastelRed&eyeType=Squint&eyebrowType=UpDownNatural&mouthType=Smile&skinColor=Light"
        alt=""
      />
    </div>
    <div
      v-motion
      :initial="{ opacity: 0, x: 100 }"
      :enter="{ opacity: 1, x: 0, scale: 1 }"
      :delay="800"
      class="text-3xl mt-3 mb-6 font-extrabold text-white"
    >
      {{ memberName }}
    </div>
    <h2 class="text-2xl font-bold text-white">You're in! See your nickname on screen</h2>
  </div>
</template>
<style scoped>
.shadow {
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}
</style>
