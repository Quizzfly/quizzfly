<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/stores/auth'
import { useQuizzflyStore } from '@/stores/quizzfly/quizzfly'
import { useConfirmDialog } from '@/stores/modal'
import NotificationPopup from '@/components/notification/NotificationPopup.vue'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { getCountUnreadNotificationApi } from '@/services/notification'
import { showToast } from '@/utils/toast'
import { apiError } from '@/utils/exceptionHandler'
import { useNotificationSocketStore } from '@/stores/socket/notification'

const authStore = useAuthStore()
const quizzflyStore = useQuizzflyStore()
const quizzflys = computed(() => quizzflyStore.getQuizzflys)
const confirmDialog = useConfirmDialog()
const countUnreadNotification = ref(0)
const notificationStore = useNotificationSocketStore()

const getMessage = computed(() => {
  return notificationStore.getMessage
})

const handleClickCreateQuiz = async () => {
  await quizzflyStore.initQuizzflyDraft()
}

onBeforeMount(() => {
  quizzflyStore.fetchQuizzflys()
  getCountUnreadNotification()
})

watch(getMessage, (val: any) => {
  if (val.event === 'notification') {
    countUnreadNotification.value++
  }
})

const handleAllNotification = (data: boolean) => {
  if (data) {
    countUnreadNotification.value = 0
  }
}

const handleOpenHostLive = (quizzflyId: string) => {
  window.open(`/room/host-live/${quizzflyId}`, '_blank')
}

const handleOpenCreateWithAI = async () => {
  const { isConfirmed } = await confirmDialog.open({
    title: 'Create with AI✨',
    question: 'Are you sure you want to create with AI?',
  })

  if (isConfirmed) {
    quizzflyStore.initQuizzflyDraft()
  }
}

const getCountUnreadNotification = async () => {
  try {
    const data = await getCountUnreadNotificationApi()
    countUnreadNotification.value = data.data
  } catch (error) {
    showToast({
      description: apiError(error).message,
      variant: 'destructive',
    })
  }
}
</script>
<template>
  <div class="p-8">
    <!-- header -->
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-2xl font-medium text-black">
          Hello, <span class="text-black/90">{{ authStore.getUser?.user_info.name }} 👋</span>
        </h1>
        <p class="mt-2 text-base text-gradient">How were you today?</p>
      </div>
      <div class="flex items-center gap-5">
        <div
          class="max-md:hidden w-10 h-10 hover:bg-slate-200 flex justify-center items-center rounded-full cursor-pointer"
        >
          <span class="i-solar-magnifer-linear text-lg"></span>
        </div>
        <Popover>
          <PopoverTrigger>
            <div
              class="max-md:hidden w-10 h-10 hover:bg-slate-200 flex justify-center items-center rounded-full cursor-pointer relative"
            >
              <span class="i-solar-bell-line-duotone text-lg"></span>
              <div
                v-if="countUnreadNotification > 0"
                class="flex rounded-full items-center justify-center absolute top-1 right-1 bg-red-600 text-white w-4 h-4 text-xs font-medium"
              >
                {{ countUnreadNotification }}
              </div>
            </div>
          </PopoverTrigger>
          <PopoverContent class="mr-4">
            <NotificationPopup @read-all-notification="handleAllNotification" />
          </PopoverContent>
        </Popover>
      </div>
    </div>

    <!-- Buttons -->
    <div class="flex gap-4 mt-4">
      <!-- Ask AI button with gradient border -->
      <button
        class="px-4 h-9 gradient-from-primary text-white font-medium rounded-full shadow-lg hover:bg-indigo-300 transition"
        @click="handleOpenCreateWithAI"
      >
        ✨ Create with AI
      </button>

      <RouterLink
        :to="{ name: 'groups', query: { create: 'true' } }"
        class="h-9 btn-gradient"
      >
        <div class="flex items-center h-full w-full bg-white text-black rounded-full px-3 py-[6px]">
          Create your group
        </div>
      </RouterLink>
    </div>
    <!-- body -->
    <div class="flex max-md:flex-col mt-10 gap-5">
      <div class="flex-[2] p-6 border bg-white rounded-xl shadow-sm">
        <p>Projects</p>

        <!-- grid 4 item -->
        <div class="grid grid-cols-2 gap-6 mt-5">
          <div
            class="max-md:flex-col max-md:items-center hover:bg-slate-50 cursor-pointer p-3 rounded-2xl flex items-center gap-4"
            @click="handleClickCreateQuiz"
          >
            <div
              class="min-w-10 w-10 h-10 rounded-lg border-2 flex justify-center items-center border-dashed border-primary"
            >
              <span class="text-primary text-xl i-material-symbols-light-add-2-rounded"></span>
            </div>
            <p>Create new quizzfly</p>
          </div>

          <div
            class="max-md:flex-col max-md:items-center hover:bg-slate-50 cursor-pointer p-3 rounded-2xl flex items-center gap-4"
          >
            <div
              class="bg-[#f7e4ff] min-w-10 w-10 h-10 rounded-lg flex justify-center items-center"
            >
              <span class="text-[#9521c8] text-xl i-material-symbols-light-groups-2"></span>
            </div>
            <div>
              <p>Your groups</p>
              <p class="text-xs text-gray-500">Create a new group</p>
            </div>
          </div>

          <div
            class="max-md:flex-col max-md:items-center hover:bg-slate-50 cursor-pointer p-3 rounded-2xl flex items-center gap-4"
          >
            <div
              class="bg-[#ebe6fd] min-w-10 w-10 h-10 rounded-lg flex justify-center items-center"
            >
              <span class="text-[#232ac9] text-xl i-material-symbols-light-payments-sharp"></span>
            </div>
            <div>
              <p>Upgrade plans</p>
              <p class="text-xs text-gray-500">Upgrade plan for more features</p>
            </div>
          </div>

          <div
            class="max-md:flex-col max-md:items-center hover:bg-slate-50 cursor-pointer p-3 rounded-2xl flex items-center gap-4"
          >
            <div
              class="bg-[#e5effb] min-w-10 w-10 h-10 rounded-lg flex justify-center items-center"
            >
              <span class="text-[#00b9c4] text-xl i-material-symbols-light-attach-money"> </span>
            </div>
            <div>
              <p>Payment history</p>
              <p class="text-xs text-gray-500">View your payment history</p>
            </div>
          </div>
        </div>
      </div>

      <!-- quizzfly -->
      <div class="flex-1 p-6 border bg-white rounded-xl shadow-sm"></div>
    </div>

    <!-- recent -->
    <div class="mt-10">
      <p class="text-lg font-medium mb-4">Recent activities</p>
      <div
        v-if="!quizzflyStore.getIsFetching && quizzflyStore.getQuizzflys.length === 0"
        class="h-full w-full flex flex-col justify-center items-center"
      >
        <img
          class="w-[200px]"
          src="@/assets/icons/empty.png"
          alt=""
        />
        <p>No quizzfly. Create one now!</p>

        <div class="flex items-center gap-3 mt-5">
          <Button
            class="text-xs w-full"
            @click="handleClickCreateQuiz"
          >
            Create new quizzfly
          </Button>
        </div>
      </div>
      <div class="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-2 gap-5">
        <div
          v-for="quizzfly in quizzflys"
          :key="quizzfly.id"
          class="block"
        >
          <div
            class="border rounded-3xl overflow-hidden shadow-sm bg-white cursor-pointer hover:shadow-lg transition-all duration-500"
          >
            <img
              v-image
              class="w-full h-[100px] object-cover rounded-t-lg"
              :src="quizzfly.cover_image || ''"
              alt=""
            />
            <div class="p-5">
              <p class="font-medium">{{ quizzfly.title || 'Untitled' }}</p>
              <p class="text-xs mt-1 text-gray-600">
                {{ new Date(quizzfly.created_at).toLocaleString() }}
              </p>
              <div
                class="flex items-center mt-4 gap-3"
                @click.stop
              >
                <RouterLink
                  :to="{ name: 'quizzfly-create', params: { quizzflyId: quizzfly.id } }"
                  class="flex items-center gap-1 flex-1"
                >
                  <span class="i-material-symbols-light-edit"></span>
                  <p>Edit</p>
                </RouterLink>
                <div
                  class="flex items-center gap-1 flex-1"
                  @click="handleOpenHostLive(quizzfly.id)"
                >
                  <Button class="flex-1 text-xs bg-black">Start</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
