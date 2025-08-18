<script setup lang="ts">
import { useRouteQuery } from '@vueuse/router'
import { useDebounceFn } from '@vueuse/core'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import GroupList from '@/components/group/list/GroupList.vue'
import { useGroupStore } from '@/stores/group/group'
import QuizzflyFilter from '@/components/quizzfly/list/QuizzflyFilter.vue'
import ModelCreateGroup from '@/components/group/modal/MCreateGroup.vue'

import {
  Pagination,
  PaginationEllipsis,
  PaginationList,
  PaginationListItem,
  PaginationNext,
  PaginationPrev,
} from '@/components/ui/pagination'
import { usePostStore } from '@/stores/group/post'
const groupStore = useGroupStore()
const postStore = usePostStore()
const search = useRouteQuery('k', '')
const pageQuery = useRouteQuery<number>('page', 1)
const isShowModal = ref(false)

const closeModal = () => {
  isShowModal.value = false
}

const openModal = () => {
  isShowModal.value = true
}

const pageQueryComputed = computed({
  get: () => Number(pageQuery.value),
  set: (value) => {
    pageQuery.value = value
    fetchGroups()
  },
})

watch(
  () => search.value,
  () => {
    fetchGroups()
  },
)

const fetchGroups = () => {
  groupStore.fetchGroups({
    page: pageQueryComputed.value,
    keyword: search.value,
  })
}

onBeforeMount(() => {
  postStore.$reset()
  fetchGroups()
})

const debouncedFn = useDebounceFn((value) => {
  search.value = value
}, 500)

const handleCreated = () => {
  fetchGroups()
}
</script>
<template>
  <div class="w-full p-8 flex flex-col gap-6 overflow-hidden h-full">
    <!-- header -->
    <div class="flex justify-between items-center">
      <!-- left -->
      <div class="flex items-center gap-10">
        <h2 class="text-2xl font-semibold whitespace-nowrap">{{ $t('groups.your_groups') }}</h2>
        <div class="relative w-full max-w-sm items-center">
          <Input
            id="search"
            :model-value="search"
            type="text"
            :placeholder="$t('groups.search_placeholder')"
            class="md:min-w-[300px] pl-10 bg-white"
            @update:model-value="debouncedFn"
          />
          <span class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
            <span class="i-material-symbols-light-search text-2xl"></span>
          </span>
        </div>
      </div>
      <!-- right -->
      <Button @click="openModal">
        <span class="i-material-symbols-light-add text-2xl"></span>
        {{ $t('groups.create_group') }}
      </Button>
    </div>

    <div class="flex justify-between">
      <!-- result -->
      <div
        v-if="search"
        class="flex gap-2"
      >
        <span class="text-sm text-gray-500">{{ $t('groups.result_for') }}</span>
        <span class="text-sm font-semibold">{{ search }}</span>
      </div>
      <!-- filter -->
      <QuizzflyFilter />
    </div>
    <div class="flex-auto overflow-y-auto">
      <div
        v-if="!groupStore.getIsFetching && groupStore.getGroups.length === 0"
        class="h-full w-full flex flex-col justify-center items-center"
      >
        <img
          class="w-[200px]"
          src="@/assets/icons/empty.png"
          alt=""
        />
        <p>{{ $t('groups.no_group_found') }}</p>
      </div>
      <GroupList v-else />
    </div>
    <!-- <div class="flex-auto overflow-y-auto">
        <GroupList />
      </div> -->
    <div
      v-if="groupStore.getGroupMeta"
      class="flex justify-center"
    >
      <Pagination
        v-slot="{ page }"
        v-model:page="pageQueryComputed"
        :total="groupStore.getGroupMeta.total_records"
        :items-per-page="groupStore.getGroupMeta.limit"
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
    <ModelCreateGroup
      v-if="isShowModal"
      @close="closeModal"
      @created="handleCreated"
    />
  </div>
</template>
