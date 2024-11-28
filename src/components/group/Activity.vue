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
import FormSend from './comment/FormSend.vue'

const confirmDialog = useConfirmDialog()
const authStore = useAuthStore()
const postStore = usePostStore()
const router = useRouter()
const route = useRoute()

const getUser = computed(() => {
  return authStore.getUser
})

const listPosts = computed(() => {
  return postStore.getPosts
})

const groupId = route.params.groupId as string

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

const handPosted = () => {
  postStore.fetchPosts(1, groupId)
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
                <AvatarImage :src="item.member.avatar" />
                <AvatarFallback>{{ item.member.name.charAt(0).toUpperCase() }}</AvatarFallback>
              </Avatar>
              <div class="flex flex-col gap-0">
                <div class="flex items-center gap-2">
                  <h4 class="text-base font-semibold">{{ item.member.name }}</h4>
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
            <div class="flex flex-col gap-4">
              <p v-html="$sanitize(item?.content)"></p>

              <div
                v-if="item.files.length"
                class="flex h-[328px] overflow-hidden w-full gap-1"
              >
                <div class="overflow-hidden flex-1 h-full">
                  <img
                    :src="item.files[0].url"
                    class="w-full h-full object-cover cursor-pointer rounded-lg"
                    alt="image Item"
                  />
                </div>
                <div
                  class="overflow-hidden flex-1 grid gap-1"
                  :class="`grid__${item.files.length > 5 ? 4 : item.files.length - 1}`"
                >
                  <div
                    v-for="(image, index) in item.files.slice(1, 5)"
                    :key="index"
                    class="image w-full h-full object-cover cursor-pointer rounded-lg relative"
                  >
                    <img
                      :src="image.url"
                      class="w-full h-full object-cover cursor-pointer rounded-lg"
                      alt="Service"
                    />
                    <div
                      v-if="index == 3 && item.files.length > 5"
                      class="bg-black bg-opacity-30 rounded-lg absolute w-full h-full top-0 left-0 right-0 bottom-0 flex items-center justify-center text-base font-bold text-white"
                    >
                      + {{ item.files.length - 5 }}
                    </div>
                  </div>
                </div>
              </div>

              <Card v-if="item.quizzfly?.id">
                <div class="flex w-full h-28">
                  <div>
                    <img
                      v-image
                      class="w-[188px] h-28 object-cover rounded-s-md"
                      :src="item.quizzfly.cover_image || ''"
                      alt=""
                    />
                  </div>
                  <div class="flex justify-between items-center w-full">
                    <div class="flex flex-col w-full justify-between p-3 h-full">
                      <div class="flex items-center justify-between">
                        <div class="flex item-center gap-1">
                          <span
                            class="i-material-symbols-light-grid-view-outline-rounded h-6 w-6"
                          ></span>
                          <h2 class="title text-base font-medium">
                            {{ item.quizzfly.title || 'Untitled' }}
                          </h2>
                        </div>
                      </div>
                      <div class="flex items-center gap-2">
                        <div class="flex gap-1 items-center">
                          <Avatar class="h-6 w-6">
                            <AvatarImage :src="item.member?.avatar" />
                            <AvatarFallback>{{
                              item.member.name.charAt(0).toUpperCase()
                            }}</AvatarFallback>
                          </Avatar>
                          <p class="text-sm text-gray-500">{{ item.member.name }}</p>
                        </div>
                      </div>
                    </div>
                    <div class="mr-3 flex items-center gap-2">
                      <Button
                        class="h-8 w-20"
                        @click.prevent.stop="
                          router.push({
                            name: 'host-live',
                            params: { quizzflyId: item.quizzfly.id },
                          })
                        "
                      >
                        Play
                      </Button>
                      <Button
                        variant="secondary"
                        class="h-8 w-20"
                        @click.prevent.stop="
                          router.push({
                            name: 'quizzfly-create',
                            params: { quizzflyId: item.quizzfly.id },
                          })
                        "
                      >
                        Edit
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
            <div class="flex items-center gap-6 mt-6">
              <div class="flex items-center gap-1 cursor-pointer">
                <span class="text-slate-500 i-solar-like-broken h-5 w-5"></span>
                <p class="font-x text-slate-600">{{ item.react_count }} Likes</p>
              </div>
              <div class="flex items-center gap-1 cursor-pointer">
                <span
                  class="i-material-symbols-light-add-comment-outline h-5 w-5 text-slate-500"
                ></span>
                <p class="font-x text-slate-600">{{ item.comment_count }} Comments</p>
              </div>
            </div>
          </div>
          <div class="h-px w-full bg-slate-300"></div>
          <FormSend :member="item.member" />
        </div>
      </Card>
    </div>

    <MCreatePost
      v-if="isShowModal"
      @open-quizzflys="openQuizzflysModal"
      @close="closeModal"
      @create="handPosted"
    />
    <MListQuizzfly
      v-if="isShowQuizzlfyModal"
      @close="closeQuizzflysModal"
    />
  </div>
</template>

<style scoped lang="scss">
.grid__0 {
  display: none;
}
.grid__1 {
  grid-template-columns: repeat(1, 1fr);
  grid-template-rows: repeat(1, 1fr);
}
.grid__2 {
  grid-template-columns: auto;
  grid-template-rows: 162px 162px;

  & > img {
    width: 100%;
  }
}
.grid__3 {
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 162px);

  & > .image:nth-child(3) {
    grid-column: 1 / span 2;
  }
}
.grid__4 {
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 162px);
}
</style>
