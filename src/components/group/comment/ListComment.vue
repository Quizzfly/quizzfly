<script lang="ts" setup>
import { usePostStore } from '@/stores/group/post'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { vIntersectionObserver } from '@vueuse/components'
import type { IComment } from '@/types/group'

const postStore = usePostStore()

const props = defineProps<{
  idPost: string
}>()

const listComment = ref<IComment[]>([])

const isLoading = ref(false)
const isFetched = ref(false)

async function onIntersectionObserver([entry]: IntersectionObserverEntry[]) {
  console.log(entry.target.id)
  if (entry.isIntersecting) {
    if (isFetched.value) return
    isLoading.value = true
    listComment.value = await postStore.getCommentByPostId(props.idPost)
    isFetched.value = true
    setTimeout(() => {
      isLoading.value = false
    }, 500)
  }
}
</script>

<template>
  <div
    v-intersection-observer="onIntersectionObserver"
    class=""
  >
    <!-- loading -->

    <div
      v-if="isLoading"
      class="flex justify-center h-5"
    >
      <span class="i-svg-spinners-90-ring-with-bg text-2xl"></span>
    </div>

    <div class="flex items-center justify-between gap-12 w-full">
      <div class="flex flex-col gap-2 w-full">
        <div
          v-for="(item, index) in listComment"
          :key="index"
          class="w-full"
        >
          <div class="h-px w-full bg-slate-300"></div>
          <div class="p-6">
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
                <div class="flex items-center gap-2 -ml-2">
                  <div
                    class="hover:bg-gray-100 px-2 py-1 rounded-full flex items-center gap-1 cursor-pointer"
                  >
                    <!-- <span
                      v-if="post.is_liked"
                      class="text-slate-500 i-solar-like-bold text-lg bg-primary"
                    ></span> -->
                    <span class="text-slate-500 i-solar-like-broken text-lg"></span>
                    <!-- <p class="text-slate-600">{{ post.react_count }}</p> -->
                  </div>

                  <div
                    class="hover:bg-gray-100 px-2 py-1 rounded-full flex items-center gap-1 cursor-pointer"
                  >
                    <span class="i-solar-chat-round-line-duotone text-lg text-slate-500"></span>
                    <!-- <p class="text-slate-600">{{ post.comment_count }}</p> -->
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
