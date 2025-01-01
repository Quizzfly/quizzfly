<script lang="ts" setup>
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import ScrollArea from '../ui/scroll-area/ScrollArea.vue'
import {
  getListNotificationApi,
  markSpecificNotificationApi,
  markAllNotificationApi,
} from '@/services/notification'
import { useNotificationSocketStore } from '@/stores/socket/notification'
import type { INotification } from '@/types/notification'
import type { IPaging } from '@/types'
import { showToast } from '@/utils/toast'
import { apiError } from '@/utils/exceptionHandler'
import { formatCommentDateTime } from '@/utils/time'
import router from '@/routers/router'

const notificationStore = useNotificationSocketStore()

const emits = defineEmits<{
  (e: 'readAllNotification', value: boolean): void
}>()

const getMessage = computed(() => {
  return notificationStore.getMessage
})

const listNotification = ref<INotification[]>([])
const isLoading = ref(false)
const metaPage = ref<IPaging>()

watch(getMessage, (val: any) => {
  if (val.event === 'notification') {
    listNotification.value.unshift(val.data)
  }
})

const getListNotification = async (page = 1) => {
  try {
    isLoading.value = true
    const data = await getListNotificationApi(page)
    listNotification.value.push(...data.data)
    metaPage.value = data.meta
  } catch (error) {
    showToast({
      description: apiError(error).message,
      variant: 'destructive',
    })
  }
  isLoading.value = false
}

const handleMarkSpecific = async (id: string) => {
  try {
    markSpecificNotificationApi(id)
  } catch (error) {
    showToast({
      description: apiError(error).message,
      variant: 'destructive',
    })
  }
}

const handleDetailNoti = (item: INotification) => {
  if (item.notification_type === 'POST') {
    router.push(`/groups/${item.target_id}/posts/${item.object.id}`)
  }
  if (item.notification_type === 'COMMENT') {
    router.push(`/groups/${item.target_id}/posts/${item.object.post_id}`)
  }

  handleMarkSpecific(item.id)
}

const handleLoadMore = () => {
  if (metaPage.value?.has_next_page) {
    getListNotification(metaPage.value.current_page + 1)
  }
}

const handleMarkAllNotification = async () => {
  try {
    await markAllNotificationApi()
    emits('readAllNotification', true)
    listNotification.value.forEach((item) => {
      if (!item.is_read) {
        item.is_read = true
      }
    })
  } catch (error) {
    showToast({
      description: apiError(error).message,
      variant: 'destructive',
    })
  }
}

onMounted(() => {
  getListNotification()
})
</script>
<template>
  <div class="flex flex-col bg-white w-[400px] shadow-lg rounded-lg">
    <div class="flex p-4 items-center justify-between rounded-t-lg">
      <h3 class="text-base font-medium">Notification</h3>
      <p
        class="cursor-pointer text-sm text-primary"
        @click.stop.prevent="handleMarkAllNotification()"
      >
        Read all
      </p>
    </div>
    <div class="h-0.5 w-full bg-slate-100"></div>
    <ScrollArea>
      <div class="flex flex-col cursor-pointer h-[400px] pr-2">
        <div
          v-for="(item, index) in listNotification"
          :key="index"
          class=""
        >
          <div
            class="flex gap-3 p-4 hover:bg-slate-50"
            @click="handleDetailNoti(item)"
          >
            <Avatar class="border-2">
              <AvatarImage :src="item.agent.avatar" />
              <AvatarFallback>{{ item.agent.name.charAt(0).toUpperCase() }}</AvatarFallback>
            </Avatar>
            <div class="flex flex-col gap-2 w-full relative">
              <div class="flex gap-0 flex-col">
                <div class="flex items-end gap-1">
                  <h3 class="text-base font-semibold">{{ item.agent.name }}</h3>
                  <p
                    v-if="item.notification_type == 'COMMENT'"
                    class="text-sm font-normal text-slate-700"
                  >
                    {{ item.content }}
                  </p>
                </div>
                <p
                  v-if="item.notification_type == 'POST'"
                  class="text-sm font-normal text-slate-700"
                >
                  {{ item.content }}
                </p>
                <p
                  v-else
                  class="text-sm font-normal text-slate-700 description"
                >
                  {{ item.description }}
                </p>
              </div>
              <div class="w-full flex">
                <p class="w-full text-right text-xs font-normal text-slate-500">
                  {{ formatCommentDateTime(item.created_at) }}
                </p>
              </div>
              <div
                v-if="!item.is_read"
                class="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full"
              ></div>
            </div>
          </div>
          <div class="h-px w-full bg-slate-100"></div>
        </div>
        <div
          v-if="isLoading"
          class="flex justify-center items-center my-3"
        >
          <span class="i-svg-spinners-180-ring-with-bg text-primary"></span>
        </div>
      </div>
    </ScrollArea>
    <div class="h-0.5 w-full bg-slate-100"></div>
    <div
      v-if="metaPage?.has_next_page"
      class="flex items-center justify-center my-3 gap-2"
    >
      <p
        class="text-sm text-primary cursor-pointer"
        @click.stop.prevent="handleLoadMore()"
      >
        See more
      </p>
      <span
        v-if="isLoading"
        class="i-svg-spinners-180-ring-with-bg text-primary"
      ></span>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.description {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
