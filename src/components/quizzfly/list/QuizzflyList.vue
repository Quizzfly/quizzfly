<script setup lang="ts">
import { useQuizzflyStore } from '@/stores/quizzfly/quizzfly'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useConfirmDialog } from '@/stores/modal'
import Chip from '@/components/base/Chip.vue'

const quizzflyStore = useQuizzflyStore()
const confirmDialog = useConfirmDialog()

const quizzflys = computed(() => quizzflyStore.getQuizzflys)

const handleConfirmDelete = async (quizzflyId: string) => {
  const { isConfirmed } = await confirmDialog.open({
    title: 'Delete Quizzfly',
    question: 'Are you sure you want to delete this quizzfly?',
    warning: true,
  })

  if (isConfirmed) {
    quizzflyStore.deleteQuizzfly(quizzflyId)
  }
}
</script>
<template>
  <div class="grid grid-cols-2 max-md:grid-cols-1 gap-5">
    <Card
      v-for="quizzfly in quizzflys"
      :key="quizzfly.id"
    >
      <div class="p-3 flex gap-2 w-full">
        <!-- left -->
        <div>
          <img
            v-image
            class="w-[80px] h-[80px] object-cover rounded-sm"
            :src="quizzfly.cover_image || ''"
            alt=""
          />
        </div>
        <div class="flex flex-col w-full justify-between">
          <div class="flex items-center justify-between">
            <div class="flex item-center gap-3">
              <h2 class="title text-base font-medium">{{ quizzfly.title || 'Untitled' }}</h2>
              <Chip
                :name="quizzfly.quizzfly_status"
                color="#df223a"
              />
            </div>
            <div class="flex items-center gap-2">
              <span
                class="i-material-symbols-light-delete-outline cursor-pointer text-2xl"
                @click="handleConfirmDelete(quizzfly.id)"
              ></span>
            </div>
          </div>
          <div class="flex items-center justify-between">
            <div class="text-sm text-gray-500">@{{ quizzfly.username }}</div>
            <div class="flex gap-5">
              <RouterLink
                target="_blank"
                :to="{ name: 'host-live', params: { quizzflyId: quizzfly.id } }"
                ><Button class="flex items-center h-6 w-17 text-xs"> Host live</Button>
              </RouterLink>
              <RouterLink
                :to="{ name: 'quizzfly-create', params: { quizzflyId: quizzfly.id } }"
                class="flex items-center cursor-pointer hover:text-[#0061ff] gap-2 hover:underline"
              >
                <span>Edit</span>
                <span class="i-material-symbols-light-arrow-right-alt text-2xl"></span>
              </RouterLink>
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
