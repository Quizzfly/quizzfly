<script setup lang="ts">
import { formatCommentDateTime } from '@/utils/time'
import { getReplyCommentPostApi, deleteCommentApi } from '@/services/group'
import { type IComment } from '@/types/group'
import { showToast } from '@/utils/toast'
import { apiError } from '@/utils/exceptionHandler'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import type { IPaging } from '@/types'
import { useSocketStore } from '@/stores/socket'
import { useConfirmDialog } from '@/stores/modal'

const confirmDialog = useConfirmDialog()
const socketStore = useSocketStore()

const getMessage = computed(() => {
  return socketStore.getMessage
})

const props = defineProps<{
  idParent: string
}>()

const listReply = ref<IComment[]>([])
const metaPage = ref<IPaging>()
const isLoading = ref(true)

onBeforeMount(() => {
  getListReply(props.idParent)
})

watch(getMessage, (val: any) => {
  if (val.event === 'commentPost' && val.data.parent_comment_id !== null) {
    listReply.value.unshift(val.data)
  }
})

const getListReply = async (idParent: string, page = 1) => {
  try {
    isLoading.value = true
    const data = await getReplyCommentPostApi(idParent, page)
    listReply.value.push(...data.data)
    metaPage.value = data.meta
  } catch (error) {
    showToast({
      description: apiError(error).message,
      variant: 'destructive',
    })
  }
  isLoading.value = false
}

const handleNextPage = () => {
  if (metaPage.value?.has_next_page) {
    const nextPage = metaPage.value.current_page + 1
    getListReply(props.idParent, nextPage)
  }
}

const handleDeleteComment = async (idComment: string) => {
  try {
    await deleteCommentApi(idComment)
    const index = listReply.value.findIndex((i) => i.id === idComment)
    index > -1 && listReply.value.splice(index, 1)
    showToast({
      description: 'Delete comment success',
      variant: 'default',
    })
  } catch (error) {
    showToast({
      description: apiError(error).message,
      variant: 'destructive',
    })
  }
}

const confirmDeleteComment = async (id: string) => {
  const result = await confirmDialog.open({
    title: 'Are you want to delete this comment?',
    question: 'All data in your comment will be lost',
    warning: true,
  })

  if (result.isConfirmed) {
    handleDeleteComment(id)
  }
}
</script>
<template>
  <div v-if="listReply.length">
    <div
      v-for="el in listReply"
      :key="el.id"
    >
      <div
        v-motion
        class="pl-6 pt-6"
        :initial="{ opacity: 0, y: 100 }"
        :enter="{ opacity: 1, y: 0, scale: 1 }"
        :delay="100"
      >
        <div class="flex items-start gap-1">
          <div class="relative">
            <Avatar>
              <AvatarImage :src="el.member.avatar" />
              <AvatarFallback v-if="el.member.name">{{
                el.member.name.charAt(0).toUpperCase()
              }}</AvatarFallback>
            </Avatar>
            <!-- <div class="absolute left-4 h-full w-px bg-slate-300"></div> -->
          </div>
          <div class="flex flex-col w-full">
            <div class="flex flex-col py-2 px-5 rounded-2xl bg-slate-100 w-full">
              <div class="flex items-center justify-between">
                <div class="flex items-center justify-center gap-2">
                  <p class="text-sm font-semibold">{{ el.member.name }}</p>
                  <p class="text-xs font-normal text-slate-500">
                    {{ formatCommentDateTime(el.created_at) }}
                  </p>
                </div>
                <div class="-mr-3">
                  <Popover>
                    <PopoverTrigger>
                      <span class="i-solar-menu-dots-bold rotate-90 w-3 h-3"></span>
                    </PopoverTrigger>
                    <PopoverContent class="p-0 w-full">
                      <div
                        class="rounded-md cursor-pointer py-1 px-1.5 shadow-md bg-white"
                        @click.prevent.stop="confirmDeleteComment(el.id)"
                      >
                        <p class="py-1 px-3 text-xs text-red-500 hover:bg-slate-100 rounded-sm">
                          Delete
                        </p>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              <span class="text-sm font-normal">{{ el.content }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="metaPage?.has_next_page"
      class="mt-3 ml-14 cursor-pointer flex gap-2 items-center"
    >
      <p
        class="text-xs font-medium text-primary underline"
        @click="handleNextPage"
      >
        See more comments
      </p>
      <span
        v-if="isLoading"
        class="i-svg-spinners-90-ring-with-bg"
      ></span>
    </div>
  </div>
</template>
