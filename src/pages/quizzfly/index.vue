<script setup lang="ts">
import { useRouteQuery } from '@vueuse/router'
import { useDebounceFn } from '@vueuse/core'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import QuizzflyList from '@/components/quizzfly/list/QuizzflyList.vue'
import { useQuizzflyStore } from '@/stores/quizzfly/quizzfly'
import QuizzflyFilter from '@/components/quizzfly/list/QuizzflyFilter.vue'

const quizzflyStore = useQuizzflyStore()

const search = useRouteQuery('k', '')

onBeforeMount(() => {
  quizzflyStore.fetchQuizzflys()
})

const handleClickCreateQuiz = async () => {
  await quizzflyStore.initQuizzflyDraft()
}

const debouncedFn = useDebounceFn((value) => {
  search.value = value
}, 500)
</script>
<template>
  <div class="w-full p-8 flex flex-col gap-6 overflow-hidden h-full">
    <!-- header -->
    <div class="flex justify-between items-center">
      <!-- left -->
      <div class="flex items-center gap-10">
        <h2 class="text-2xl font-semibold whitespace-nowrap">Your quizzfly</h2>
        <div class="relative w-full max-w-sm items-center">
          <Input
            id="search"
            :model-value="search"
            type="text"
            placeholder="Search..."
            class="md:min-w-[300px] pl-10 bg-white"
            @update:model-value="debouncedFn"
          />
          <span class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
            <span class="i-material-symbols-light-search text-2xl"></span>
          </span>
        </div>
      </div>
      <!-- right -->
      <Button @click="handleClickCreateQuiz">
        <span class="i-material-symbols-light-add text-2xl"></span>
        Create Quiz
      </Button>
    </div>

    <div class="flex justify-between">
      <!-- result -->
      <div class="flex gap-2">
        <span class="text-sm text-gray-500">Result for:</span>
        <span class="text-sm font-semibold">{{ search }}</span>
      </div>
      <!-- filter -->
      <QuizzflyFilter />
    </div>
    <div class="flex-auto overflow-y-auto">
      <QuizzflyList />
    </div>
  </div>
</template>
