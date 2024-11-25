<script setup lang="ts">
import { useQuizzflyStore } from '@/stores/quizzfly/quizzfly'
import { Card } from '@/components/ui/card'
import Avatar from '@/components/ui/avatar/Avatar.vue'
import { type IQuizzflyInfo } from '@/types/quizzfly'

const emits = defineEmits<{
  (e: 'close'): void
}>()

const quizzflyStore = useQuizzflyStore()

const quizzflys = computed(() => quizzflyStore.getQuizzflys)

const handleQuizzflyShared = (data: IQuizzflyInfo) => {
  quizzflyStore.setQuizzflyShared(data)
  emits('close')
}
</script>
<template>
  <div class="max-md:grid-cols-1 gap-3 flex flex-col">
    <Card
      v-for="quizzfly in quizzflys"
      :key="quizzfly.id"
    >
      <div
        class="flex w-full h-98 cursor-pointer"
        @click="handleQuizzflyShared(quizzfly)"
      >
        <!-- left -->
        <div>
          <img
            v-image
            class="w-[148px] h-[98px] object-cover rounded-s-md"
            :src="quizzfly.cover_image || ''"
            alt=""
          />
        </div>
        <div class="flex flex-col w-full justify-between p-3">
          <div class="flex items-center justify-between">
            <div class="flex item-center gap-1">
              <span class="i-material-symbols-light-grid-view-outline-rounded h-6 w-6"></span>
              <h2 class="title text-base font-medium">{{ quizzfly.title || 'Untitled' }}</h2>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <div class="flex gap-1 items-center">
              <Avatar class="h-7 w-7">
                <AvatarImage :src="quizzfly.avatar" />
                <AvatarFallback>{{ quizzfly.username.charAt(0).toUpperCase() }}</AvatarFallback>
              </Avatar>
              <div class="text-sm text-gray-500">@{{ quizzfly.username }}</div>
            </div>
            <div class="flex gap-1 items-center">
              <span class="i-material-symbols-light-person h-5 w-5"></span>
              <p class="text-sm text-gray-500">private</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  </div>
</template>
<style scoped>
.title {
  width: 100px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
</style>
