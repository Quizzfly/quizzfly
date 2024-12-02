<script setup lang="ts">
import { useGroupStore } from '@/stores/group/group'
import { Card } from '@/components/ui/card'
import Chip from '@/components/base/Chip.vue'
import { useConfirmDialog } from '@/stores/modal'

const confirmDialog = useConfirmDialog()
const groupStore = useGroupStore()

const handleDeleteGroup = async (id: string) => {
  const result = await confirmDialog.open({
    title: 'Are you want to delete this group?',
    question: 'All data in your group will be lost',
    warning: true,
  })

  if (result.isConfirmed) {
    groupStore.handleDeleteGroup(id)
  }
}

const groups = computed(() => groupStore.getGroups)
</script>
<template>
  <div class="grid grid-cols-2 max-md:grid-cols-1 gap-5">
    <Card
      v-for="group in groups"
      :key="group.group.id"
    >
      <RouterLink
        :to="{ name: 'group-detail', params: { groupId: group.group.id } }"
        class="p-3 flex gap-4 w-full cursor-pointer"
      >
        <!-- left -->
        <div class="min-w-20">
          <img
            class="w-[80px] h-[80px] object-cover rounded-sm"
            :src="
              group.group.background ||
              'https://images.unsplash.com/photo-1725992340772-47fd8f8df459?q=80&w=2400&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            "
            alt=""
          />
        </div>
        <div class="flex flex-col gap-3 w-full justify-between">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3 w-full">
              <h2 class="title text-base font-medium">{{ group.group.name || 'Untitled' }}</h2>
              <Chip
                :name="group.role"
                color="#df223a"
              />
            </div>
            <div
              class="relative group cursor-pointer w-6 h-6 rounded-lg flex items-center justify-center border"
            >
              <span class="i-solar-menu-dots-bold rotate-90"></span>
              <div
                class="hidden group-hover:block absolute rounded-md cursor-pointer py-1 px-1.5 shadow-md top-6 right-0 bg-white"
                @click.prevent.stop="handleDeleteGroup(group.group.id)"
              >
                <p class="py-1 px-3 text-xs text-red-500 hover:bg-slate-100 rounded-sm">Delete</p>
              </div>
            </div>
          </div>
          <div class="description text-sm text-gray-500 whitespace-normal">
            {{ group.group.description }}
          </div>
        </div>
      </RouterLink>
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

.description {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
