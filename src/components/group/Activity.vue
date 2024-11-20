<script lang="ts" setup>
import Card from '../ui/card/Card.vue'
import Avatar from '../ui/avatar/Avatar.vue'
import Button from '../ui/button/Button.vue'
import MCreatePost from '@/components/group/modal/MCreatePost.vue'

const isShowModal = ref(false)

const openModal = () => {
  isShowModal.value = true
}

const closeModal = () => {
  isShowModal.value = false
}
</script>

<template>
  <div class="flex flex-col gap-5">
    <Card class="rounded-3xl">
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
    <Card class="rounded-3xl">
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
            <p class="text-x font-normal text-slate-600">Septemper 20/03/2024</p>
            <div class="cursor-pointer w-8 h-8 rounded-xl flex items-center justify-center border">
              <span class="i-solar-menu-dots-bold rotate-90"></span>
            </div>
          </div>
        </div>
        <div class="h-px w-full bg-slate-200"></div>
        <div class="px-6 py-4">
          <div class="flex flex-col gap-2">
            <div class="text-x font-medium">Chào các bạn đã đến với lớp học vinahouse</div>
            <p>
              Note that for strict type safety, it is necessary to use optional chaining or type
              guards when accessing el.value. This is because the initial ref value is null until
              the component is mounted, and it can also be set to null if the referenced element is
              unmounted by v-if.
            </p>
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
    <MCreatePost
      v-if="isShowModal"
      @close="closeModal"
    />
  </div>
</template>

<style scoped lang="scss"></style>
