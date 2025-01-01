<script lang="ts" setup>
import BaseModal from '@/components/base/BaseModal.vue'
import { useGroupStore } from '@/stores/group/group'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import ScrollArea from '@/components/ui/scroll-area/ScrollArea.vue'
import Chip from '@/components/base/Chip.vue'

const emits = defineEmits<{
  (e: 'close'): void
}>()

const groupStore = useGroupStore()

const listMembers = computed(() => {
  return groupStore.getMemberGroup
})
</script>

<template>
  <BaseModal @click="emits('close')">
    <div
      class="bg-white w-[600px] mx-auto rounded-3xl shadow-lg p-12 relative"
      @click.stop
    >
      <div class="text-4xl w-full text-center font-semibold">List Member</div>
      <ScrollArea class="overflow-hidden overflow-y-auto px-3">
        <div class="mt-11 flex flex-col gap-4 max-h-[350px]">
          <div
            v-for="item in listMembers"
            :key="item.id"
            class="flex items-center justify-between"
          >
            <div class="flex items-center gap-3">
              <Avatar class="w-11 h-11 border-2">
                <AvatarImage :src="item?.avatar" />
                <AvatarFallback>
                  {{ item.name.charAt(0).toUpperCase() }}
                </AvatarFallback>
              </Avatar>
              <div class="flex flex-col gap-0">
                <h4 class="text-base font-semibold">{{ item?.name }}</h4>
                <p class="text-sm text-slate-500 font-normal">{{ item.email }}</p>
              </div>
            </div>
            <Chip
              :name="item.role_in_group === 'HOST' ? 'Host' : 'Member'"
              color="#df223a"
              class="min-w-[82px] flex items-center justify-center"
            />
          </div>
        </div>
      </ScrollArea>
    </div>
  </BaseModal>
</template>
