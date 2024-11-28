<script lang="ts" setup>
import { usePostStore } from '@/stores/group/post'
import Avatar from '@/components/ui/avatar/Avatar.vue'
import { computedAsync } from '@vueuse/core'

const postStore = usePostStore()

const props = defineProps<{
  idPost: string
}>()

const listComment = computedAsync(async () => {
  return await postStore.getCommentByPostId(props.idPost)
}, [])
</script>

<template>
  <div class="">
    <div class="h-px w-full bg-slate-300"></div>
    <div class="flex items-center justify-between p-6 gap-12 w-full">
      <div class="flex flex-col gap-2">
        <div
          v-for="(item, index) in listComment"
          :key="index"
          class=""
        >
          <div class="flex items-start gap-1">
            <Avatar>
              <AvatarImage :src="item.member.avatar" />
              <AvatarFallback v-if="item.member.name">{{
                item.member.name.charAt(0).toUpperCase()
              }}</AvatarFallback>
            </Avatar>
            <div class="flex flex-col py-2 px-5 rounded-2xl bg-slate-50 min-w-72">
              <p class="text-sm font-semibold">{{ item.member.name }}</p>
              <span class="text-sm font-normal">{{ item.content }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
