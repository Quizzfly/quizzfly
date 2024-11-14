<script setup lang="ts">
import { useRouteQuery } from '@vueuse/router'
import { useDebounceFn } from '@vueuse/core'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import QuizzflyList from '@/components/quizzfly/list/QuizzflyList.vue'
import { useQuizzflyStore } from '@/stores/quizzfly/quizzfly'
import QuizzflyFilter from '@/components/quizzfly/list/QuizzflyFilter.vue'

import {
  Pagination,
  PaginationEllipsis,
  PaginationList,
  PaginationListItem,
  PaginationNext,
  PaginationPrev,
} from '@/components/ui/pagination'
const quizzflyStore = useQuizzflyStore()

const search = useRouteQuery('k', '')
const pageQuery = useRouteQuery<number>('page', 1)

const pageQueryComputed = computed({
  get: () => Number(pageQuery.value),
  set: (value) => {
    pageQuery.value = value
    fetchQuizzflys()
  },
})

const fetchQuizzflys = () => {
  quizzflyStore.fetchQuizzflys({
    page: pageQueryComputed.value,
    keyword: search.value,
  })
}

onBeforeMount(() => {
  fetchQuizzflys()
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
        <h2 class="text-2xl font-semibold whitespace-nowrap">Your groups</h2>
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
        Create Group
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
    <div
      v-if="quizzflyStore.getQuizzflyMeta"
      class="flex justify-center"
    >
      <Pagination
        v-slot="{ page }"
        v-model:page="pageQueryComputed"
        :total="quizzflyStore.getQuizzflyMeta.total_records"
        :items-per-page="quizzflyStore.getQuizzflyMeta.limit"
        :sibling-count="1"
        show-edges
      >
        <PaginationList
          v-slot="{ items }"
          class="flex items-center gap-1"
        >
          <PaginationPrev />

          <template v-for="(item, index) in items">
            <PaginationListItem
              v-if="item.type === 'page'"
              :key="index"
              :value="item.value"
              as-child
            >
              <Button
                class="w-9 h-9 p-0 rounded-md"
                :variant="item.value === page ? 'default' : 'outline'"
                @click="pageQuery = Number(item.value)"
              >
                {{ item.value }}
              </Button>
            </PaginationListItem>
            <PaginationEllipsis
              v-else
              :key="item.type"
              :index="index"
            />
          </template>

          <PaginationNext />
        </PaginationList>
      </Pagination>
    </div>
  </div>
</template>
