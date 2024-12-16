<script lang="ts" setup>
import Avatar from '@/components/ui/avatar/Avatar.vue'
import { useGroupStore } from '@/stores/group/group'
import FormChat from './FormChat.vue'
import ScrollArea from '@/components/ui/scroll-area/ScrollArea.vue'

const groupStore = useGroupStore()

const detailGroup = computed(() => {
  return groupStore.getGroupInfo
})

const listMessage = [
  {
    name: 'hello',
    avatar: null,
    text: 'Chào mọi nguoi',
    is_you: false,
  },
  {
    name: 'Dung',
    avatar: null,
    text: 'Chào mọi nguoi Chào mọi nguoi Chào mọi nguoi Chào mọi nguoi ',
    is_you: true,
  },
  {
    name: 'Nam',
    avatar: null,
    text: 'Chào mọi nguoi',
    is_you: false,
  },
  {
    name: 'Đông',
    avatar: null,
    text: 'Chào mọi nguoi',
    is_you: false,
  },
  {
    name: 'Dung',
    avatar: null,
    text: 'Chào mọi nguoi',
    is_you: true,
  },
  {
    name: 'hello',
    avatar: null,
    text: 'Chào mọi nguoi Chào mọi nguoi Chào mọi nguoi Chào mọi nguoi Chào mọi nguoi',
    is_you: false,
  },
  {
    name: 'Dung',
    avatar: null,
    text: 'Chào mọi nguoi',
    is_you: true,
  },
  {
    name: 'hello',
    avatar: null,
    text: 'Chào mọi nguoi',
    is_you: false,
  },
]

const isCheckMessage = ref(true)
</script>
<template>
  <div
    class="absolute right-6"
    :class="{ 'bottom-0': !isCheckMessage, 'bottom-28': isCheckMessage }"
  >
    <div
      v-if="isCheckMessage"
      v-motion
      class="cursor-pointer relative"
      :initial="{ opacity: 0, x: 100 }"
      :enter="{ opacity: 1, x: 0, scale: 1 }"
      :delay="100"
      @click="isCheckMessage = false"
    >
      <Avatar class="h-14 w-14 bg-primary">
        <AvatarImage :src="detailGroup.background" />
        <AvatarFallback
          v-if="detailGroup.name"
          class="text-3xl font-semibold text-white"
          >{{ detailGroup.name.charAt(0).toUpperCase() }}</AvatarFallback
        >
      </Avatar>
      <div
        class="absolute w-6 h-6 bg-red-500 flex items-center justify-center -top-1 -right-1 rounded-full"
      >
        <p class="text-xs font-semibold text-white">2</p>
      </div>
    </div>
    <div
      v-else
      v-motion
      :initial="{ opacity: 0, x: 100 }"
      :enter="{ opacity: 1, x: 0, scale: 1 }"
      :delay="100"
      class="w-[400px] h-[450px] rounded-t-2xl bg-white shadow-lg flex flex-col justify-between"
    >
      <div class="flex items-center bg-primary px-4 py-3 justify-between rounded-t-2xl shadow-lg">
        <div class="flex items-center gap-2">
          <Avatar class="h-7 w-7">
            <AvatarImage :src="detailGroup.background" />
            <AvatarFallback v-if="detailGroup.name">{{
              detailGroup.name.charAt(0).toUpperCase()
            }}</AvatarFallback>
          </Avatar>
          <p class="title text-base text-white font-medium">{{ detailGroup.name }}</p>
        </div>
        <div
          class="flex h-6 w-6 cursor-pointer bg-slate-400 rounded-full items-center justify-center"
          @click="isCheckMessage = true"
        >
          <span
            class="i-material-symbols-light-check-indeterminate-small w-8 h-8 text-white"
          ></span>
        </div>
      </div>
      <ScrollArea>
        <div class="w-full flex flex-col gap-3 px-3 overflow-hidden overflow-y-auto py-2">
          <div
            v-for="(item, index) in listMessage"
            :key="index"
            class="flex items-start gap-2"
            :class="{ 'justify-end': item.is_you }"
          >
            <Avatar
              v-if="!item.is_you"
              class="h-8 w-8"
            >
              <AvatarImage :src="item.avatar" />
              <AvatarFallback v-if="item.name">{{
                item.name.charAt(0).toUpperCase()
              }}</AvatarFallback>
            </Avatar>
            <p
              :class="item.is_you ? 'bg-primary' : 'bg-slate-500'"
              class="max-w-[70%] px-3 py-2 rounded-xl text-sm font-normal text-white"
            >
              {{ item.text }}
            </p>
          </div>
        </div>
      </ScrollArea>
      <div class="h-px w-full bg-slate-300"></div>
      <div class="flex-end">
        <FormChat :member="'dd'" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.title {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
</style>
