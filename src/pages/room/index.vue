<script setup lang="ts">
// onBeforeMount(() => {
//   roomStore.getRoomDetail()
// })
import { useQuizzflyStore } from '@/stores/quizzfly/quizzfly'

const quizzflyStore = useQuizzflyStore()

const route = useRoute()

onBeforeMount(() => {
  quizzflyStore.getQuizzflyDetail(route.params.quizzflyId as string)
})
</script>

<template>
  <RouterView />
</template>
