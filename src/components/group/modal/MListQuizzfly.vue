<script lang="ts" setup>
import BaseModal from '@/components/base/BaseModal.vue'
import { Button } from '@/components/ui/button'
import Input from '@/components/ui/input/Input.vue'
import ScrollArea from '@/components/ui/scroll-area/ScrollArea.vue'
import QuizzflyGroupList from '../list/QuizzflyGroupList.vue'
import { useRouteQuery } from '@vueuse/router'
import { useDebounceFn } from '@vueuse/core'
import { useQuizzflyStore } from '@/stores/quizzfly/quizzfly'

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

const debouncedFn = useDebounceFn((value) => {
  search.value = value
}, 500)

const emits = defineEmits<{
  (e: 'close'): void
}>()
</script>

<template>
  <BaseModal @click="emits('close')">
    <div
      class="bg-white w-[650px] mx-auto rounded-3xl shadow-lg p-12 relative"
      @click.stop
    >
      <div class="text-4xl w-full text-center font-semibold">Select Quizzfly</div>
      <form class="mt-10 flex flex-col gap-10">
        <div class="flex flex-col gap-6 w-full">
          <div class="relative max-w-full items-center">
            <Input
              id="search"
              :model-value="search"
              type="text"
              placeholder="Search..."
              class="md:min-w-[300px] pl-10 bg-white h-10"
              @update:model-value="debouncedFn"
            />
            <span class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
              <span class="w-5 h-5 i-material-symbols-light-search-rounded"></span>
            </span>
          </div>
          <ScrollArea class="rounded-xl border p-4 gap-3 bg-slate-100 h-72">
            <QuizzflyGroupList @close="emits('close')" />
          </ScrollArea>
        </div>
        <div class="flex items-center justify-center gap-2">
          <Button
            variant="secondary"
            class="h-11 flex gap-2 items-center px-11"
            @click="emits('close')"
          >
            Close
          </Button>
        </div>
      </form>
    </div>
  </BaseModal>
</template>
