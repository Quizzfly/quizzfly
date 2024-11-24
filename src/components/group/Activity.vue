<script lang="ts" setup>
import Card from '../ui/card/Card.vue'
import Avatar from '../ui/avatar/Avatar.vue'
import Button from '../ui/button/Button.vue'
import MCreatePost from '@/components/group/modal/MCreatePost.vue'
import MListQuizzfly from './modal/MListQuizzfly.vue'
import { useAuthStore } from '@/stores/auth'
import { usePostStore } from '@/stores/group/post'
import { formatDateTime } from '@/utils/time'
import { useConfirmDialog } from '@/stores/modal'

const confirmDialog = useConfirmDialog()
const authStore = useAuthStore()
const postStore = usePostStore()

const getUser = computed(() => {
  return authStore.getUser
})

const listPosts = computed(() => {
  return postStore.getPosts
})

const isShowModal = ref(false)
const isShowQuizzlfyModal = ref(false)

const openModal = () => {
  isShowModal.value = true
}

const closeModal = () => {
  isShowModal.value = false
}

const openQuizzflysModal = () => {
  isShowQuizzlfyModal.value = true
  isShowModal.value = false
}

const closeQuizzflysModal = () => {
  isShowQuizzlfyModal.value = false
  isShowModal.value = true
}

const handleDeletePost = async (id: string) => {
  const result = await confirmDialog.open({
    title: 'Are you want to delete this group?',
    question: 'All data in your group will be lost',
  })

  if (result.isConfirmed) {
    postStore.handleDeleteGroup(id)
  }
}
</script>

<template>
  <div class="flex flex-col gap-5">
    <Card class="rounded-3xl">
      <div class="flex items-center justify-between p-6 gap-12 w-full">
        <div class="flex items-center gap-2 w-full">
          <Avatar>
            <AvatarImage
              v-if="getUser?.user_info.avatar"
              :src="getUser?.user_info.avatar"
            />
            <AvatarFallback>{{ getUser?.user_info.name.charAt(0).toUpperCase() }}</AvatarFallback>
          </Avatar>
          <div
            class="w-full hover:bg-slate-100 flex items-center cursor-pointer h-11 border rounded-full px-6 py-3 text-sm font-normal text-gray-600"
            @click="openModal"
          >
            Post something...
          </div>
        </div>
        <Button
          class="h-10 bg-primary flex items-center"
          @click="openModal"
        >
          Add new post
          <span class="i-material-symbols-light-add-rounded w-8 h-8 text-white ml-2"></span>
        </Button>
      </div>
    </Card>
    <div class="flex flex-col gap-8">
      <Card
        v-for="item in listPosts"
        :key="item.id"
        class="rounded-3xl"
      >
        <div class="flex flex-col w-full">
          <div class="p-6 flex items-center gap-2 w-full justify-between">
            <div class="flex items-center gap-2">
              <Avatar class="w-10 h-10">
                <AvatarImage src="" />
                <AvatarFallback>M</AvatarFallback>
              </Avatar>
              <div class="flex flex-col gap-0">
                <div class="flex items-center gap-2">
                  <h4 class="text-base font-semibold">Trung dong</h4>
                  <p class="text-x font-normal text-slate-600">posted a message</p>
                </div>
                <p class="text-x text-slate-600">Host</p>
              </div>
            </div>
            <div class="flex gap-2 items-center">
              <p class="text-x font-normal text-slate-600">{{ formatDateTime(item.created_at) }}</p>
              <div
                class="relative group cursor-pointer w-6 h-6 rounded-lg flex items-center justify-center border"
              >
                <span class="i-solar-menu-dots-bold rotate-90"></span>
                <div
                  class="hidden group-hover:block absolute rounded-md cursor-pointer py-1 px-1.5 shadow-md top-6 right-0 bg-white"
                  @click.prevent.stop="handleDeletePost(item?.id)"
                >
                  <p class="py-1 px-3 text-xs text-red-500 hover:bg-slate-100 rounded-sm">Delete</p>
                </div>
              </div>
            </div>
          </div>
          <div class="h-px w-full bg-slate-200"></div>
          <div class="px-6 py-4">
            <div class="flex flex-col gap-2">
              <!-- <div class="text-x font-medium">Chào các bạn đã đến với lớp học vinahouse</div> -->
              <p v-html="item?.content"></p>
              <img
                class="h-64 w-full rounded-xl object-cover"
                src="@/assets/img/bg-image-1.jpg"
                alt=""
              />
            </div>
            <div class="flex items-center gap-6 mt-6">
              <div class="flex items-center gap-1 cursor-pointer">
                <span class="text-slate-500 i-solar-like-broken h-5 w-5"></span>
                <p class="font-x text-slate-600">12 Likes</p>
              </div>
              <div class="flex items-center gap-1 cursor-pointer">
                <span
                  class="i-material-symbols-light-add-comment-outline h-5 w-5 text-slate-500"
                ></span>
                <p class="font-x text-slate-600">25 Comments</p>
              </div>
            </div>
          </div>
          <div class="h-px w-full bg-slate-300"></div>
          <div class="flex items-center justify-between p-6 gap-12 w-full">
            <div class="flex items-center gap-2 w-full">
              <Avatar>
                <AvatarImage src="" />
                <AvatarFallback>M</AvatarFallback>
              </Avatar>
              <div
                class="w-full flex items-center cursor-pointer h-11 border rounded-full px-6 py-3 text-sm font-normal text-gray-600"
                @click="openModal"
              >
                Write your comment...
              </div>
            </div>
            <div class="flex items-center gap-2">
              <div
                class="flex items-center justify-center rounded-full w-10 h-10 border cursor-pointer"
              >
                <span class="i-material-symbols-light-attach-file w-6 h-6"></span>
              </div>
              <div
                class="flex items-center justify-center border-primary rounded-full w-10 h-10 border cursor-pointer"
              >
                <span class="i-material-symbols-light-send-rounded w-7 h-7 text-primary"></span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>

    <MCreatePost
      v-if="isShowModal"
      @open-quizzflys="openQuizzflysModal"
      @close="closeModal"
    />
    <MListQuizzfly
      v-if="isShowQuizzlfyModal"
      @close="closeQuizzflysModal"
    />
  </div>
</template>

<style scoped lang="scss"></style>
