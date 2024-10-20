<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { useQuizzflyStore } from '@/stores/quizzfly/quizzfly'

const quizzflyStore = useQuizzflyStore()

const quizzflyInfo = computed(() => {
  return quizzflyStore.getQuizzflyInfo
})

onMounted(() => {
  console.log(quizzflyInfo.value, 'check quizzlfy')
})
</script>

<template>
  <div
    class="w-full rounded-xl p-20 flex gap-12 justify-between bg-[rgba(5,39,69,0.8)] backdrop-blur-[12px] box-border"
  >
    <div class="w-2/4">
      <img
        v-if="quizzflyInfo.cover_image"
        :src="quizzflyInfo.cover_image"
        alt=""
        class="rounded-xl w-4/5"
      />
      <img
        v-else
        src="@/assets/img/bg-image-1.jpg"
        alt=""
        class="rounded-xl w-4/5"
      />
    </div>
    <div class="w-2/4 flex flex-col gap-16">
      <div class="flex flex-col gap-3">
        <div class="bg-[rgba(255,255,255,0.08)] p-2 rounded font-medium text-white w-36 text-base">
          Up to 10 players
        </div>
        <p class="text-white font-medium text-lg">
          Bring friendly competition to this Quizzfly. Players go head-to-head and compete for a top
          spot on the podium. Players who answer the quickest and get the most correct answers will
          have higher scores.
        </p>
      </div>
      <div class="flex gap-2 items-center w-full">
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
          <Button class="h-18 w-full h-full text-lg"> Start </Button>
        </div>
      </div>
    </div>
  </div>
</template>
