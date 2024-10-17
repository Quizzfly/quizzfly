<script setup lang="ts">
import { useQuizzflyStore } from '@/stores/quizzfly/quizzfly'
import { Card } from '@/components/ui/card'
import Chip from '@/components/base/Chip.vue'
const quizzflyStore = useQuizzflyStore()

const quizzflys = computed(() => quizzflyStore.getQuizzflys)
</script>
<template>
  <div class="grid grid-cols-[repeat(auto-fill,400px)] max-md:grid-cols-1 gap-5">
    <Card
      v-for="quizzfly in quizzflys"
      :key="quizzfly.id"
    >
      <div class="p-5 flex justify-between">
        <!-- left -->
        <div class="flex gap-5">
          <div>
            <img
              class="w-[60px] h-[60px] object-cover rounded-sm"
              :src="quizzfly.cover_image || '/assets/images/backgrounds/1.webp'"
              alt=""
            />
          </div>
          <!-- information -->
          <div>
            <div class="flex item-center gap-3">
              <h2 class="title text-base font-medium">{{ quizzfly.title || 'Untitled' }}</h2>
              <Chip
                :name="quizzfly.quizzfly_status"
                color="#df223a"
              />
            </div>
            <div class="text-sm text-gray-500">@{{ quizzfly.username }}</div>
          </div>
        </div>
        <!-- right -->
        <div>
          <RouterLink
            :to="{ name: 'quizzfly-create', params: { quizzflyId: quizzfly.id } }"
            class="flex items-center cursor-pointer hover:text-[#0061ff] gap-2 hover:underline"
          >
            <span>Edit</span>
            <span class="i-material-symbols-light-arrow-right-alt text-2xl"></span>
          </RouterLink>
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
