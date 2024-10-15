<script setup lang="ts">
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import QuizzflyList from '@/components/quizzfly/list/QuizzflyList.vue'
import { useQuizzflyStore } from '@/stores/quizzfly/quizzfly'
import QuizzflyFilter from '@/components/quizzfly/list/QuizzflyFilter.vue'
const quizzflyStore = useQuizzflyStore()

onBeforeMount(() => {
  quizzflyStore.fetchQuizzflys()
})
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
            type="text"
            placeholder="Search..."
            class="pl-10 bg-white"
          />
          <span class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
            <span class="i-material-symbols-light-search text-2xl"></span>
          </span>
        </div>
      </div>
      <!-- right -->
      <RouterLink to="/quizzfly/create">
        <Button>
          <span class="i-material-symbols-light-add text-2xl"></span>
          Create Quiz
        </Button>
      </RouterLink>
    </div>
    <!-- filter -->
    <QuizzflyFilter />
    <div class="flex-auto overflow-y-auto">
      <QuizzflyList />
    </div>
  </div>
</template>
