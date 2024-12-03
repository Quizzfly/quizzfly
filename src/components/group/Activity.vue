<script lang="ts" setup>
import Card from '../ui/card/Card.vue'
import Button from '../ui/button/Button.vue'
import MCreatePost from '@/components/group/modal/MCreatePost.vue'
import MListQuizzfly from './modal/MListQuizzfly.vue'
import { useAuthStore } from '@/stores/auth'
import { usePostStore } from '@/stores/group/post'
import { formatDateTime } from '@/utils/time'
import { useConfirmDialog } from '@/stores/modal'
import { AvatarFallback, Avatar, AvatarImage } from '../ui/avatar'

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
    warning: true,
  })

  if (result.isConfirmed) {
    postStore.handleDeleteGroup(id)
  }
}

const handPosted = () => {
  postStore.fetchPosts(1, groupId)
}

const handleReactPost = (postId: string) => {
  postStore.createReactPost(postId)
}

const handleHtmlLinkClick = (event: MouseEvent) => {
  const target = event.target as HTMLElement

  if (target.tagName === 'A') {
    event.preventDefault()
    const href = (target as HTMLAnchorElement).href
    window.open(href, '_blank')
  }
}
</script>

<template>
  <div class="flex flex-col gap-6">
    <Card class="mx-6 rounded-3xl">
      <div class="flex items-center justify-between p-6 gap-12 w-full">
        <div class="flex items-center gap-2 w-full">
          <Avatar>
            <AvatarImage
              v-if="getUser?.user_info.avatar"
              :src="getUser?.user_info.avatar"
            />
            <AvatarFallback v-if="getUser?.user_info.name">{{
              getUser?.user_info.name.charAt(0).toUpperCase()
            }}</AvatarFallback>
          </Avatar>
          <div
            class="w-full hover:bg-slate-100 flex items-center cursor-pointer h-11 border rounded-full px-6 py-3 text-sm font-normal text-gray-600"
            @click="openModal"
          >
            Post something...
          </div>
        </div>
        <Button
          class="max-md:hidden h-10 bg-primary flex items-center"
          @click="openModal"
        >
          Add new post
          <span class="i-material-symbols-light-add-rounded w-8 h-8 text-white ml-2"></span>
        </Button>
      </div>
    </Card>
    <div class="flex flex-col">
      <RouterLink
        v-for="post in listPosts"
        :key="post.id"
        :to="{ name: 'group-post-detail', params: { postId: post.id } }"
        class="rounded-3xl cursor-pointer"
      >
        <div class="border-t flex flex-col w-full">
          <div class="p-6 pb-3 flex items-start gap-2 w-full">
            <Avatar class="w-9 h-9">
              <AvatarImage :src="post.member.avatar" />
              <AvatarFallback v-if="post.member.name">
                {{ post?.member?.name.charAt(0).toUpperCase() }}
              </AvatarFallback>
            </Avatar>
            <div class="flex-auto">
              <div class="flex flex-auto justify-between">
                <!-- name -->
                <div class="flex items-center gap-2">
                  <div class="flex flex-col gap-0">
                    <div class="flex items-center gap-2">
                      <h4 class="text-sm font-medium">{{ post.member.name }}</h4>
                      <p class="text-xs font-light text-slate-600">
                        {{ formatDateTime(post.created_at) }}
                      </p>
                    </div>
                    <!-- <p class="text-x text-slate-600">Host</p> -->
                  </div>
                </div>
                <!-- menu options -->
                <div class="flex gap-2 items-center">
                  <p class="text-xs font-light text-slate-600">
                    <!-- {{ formatDateTime(post.created_at) }} -->
                  </p>
                  <div
                    class="relative group cursor-pointer w-6 h-6 rounded-lg flex items-center justify-center border"
                  >
                    <span class="i-solar-menu-dots-bold rotate-90"></span>
                    <div
                      class="hidden group-hover:block absolute rounded-md cursor-pointer py-1 px-1.5 shadow-md top-6 right-0 bg-white"
                      @click.prevent.stop="handleDeletePost(post?.id)"
                    >
                      <p class="py-1 px-3 text-xs text-red-500 hover:bg-slate-100 rounded-sm">
                        Delete
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- content -->
              <div class="">
                <div class="flex flex-col gap-4">
                  <div
                    class="text-gray-900 font-normal mt-2 content-format"
                    @click="handleHtmlLinkClick"
                    v-html="$sanitize(post?.content)"
                  ></div>

                  <!-- list images -->
                  <div
                    v-if="post.files.length"
                    v-viewer:gallery
                    class="flex h-[328px] overflow-hidden w-full gap-1"
                    @click.stop.prevent
                  >
                    <div class="overflow-hidden flex-1 h-full">
                      <img
                        v-image
                        :src="post.files[0].url"
                        class="border w-full h-full object-cover cursor-pointer rounded-lg"
                        alt="image post"
                      />
                    </div>
                    <div
                      class="overflow-hidden flex-1 grid gap-1"
                      :class="`grid__${post.files.length > 5 ? 4 : post.files.length - 1}`"
                    >
                      <div
                        v-for="(image, index) in post.files"
                        :key="index"
                        class="image w-full h-full object-cover cursor-pointer rounded-lg relative"
                      >
                        <img
                          v-image
                          :src="image.url"
                          class="border w-full h-full object-cover cursor-pointer rounded-lg"
                          :class="{ hidden: index > 4 }"
                          alt="Service"
                        />
                        <div
                          v-if="index == 3 && post.files.length > 5"
                          class="bg-black bg-opacity-30 rounded-lg absolute w-full h-full top-0 left-0 right-0 bottom-0 flex items-center justify-center text-base font-bold text-white"
                        >
                          + {{ post.files.length - 5 }}
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- end list images -->

                  <Card v-if="post.quizzfly?.id">
                    <div class="flex w-full h-28">
                      <div>
                        <img
                          v-image
                          class="w-[188px] h-28 object-cover rounded-s-md"
                          :src="post.quizzfly.cover_image || ''"
                          alt=""
                        />
                      </div>
                      <div class="flex justify-between items-center w-full">
                        <div class="flex flex-col w-full justify-between p-3 h-full">
                          <div class="flex items-center justify-between">
                            <div class="flex post-center gap-1">
                              <span
                                class="i-material-symbols-light-grid-view-outline-rounded h-6 w-6"
                              ></span>
                              <h2 class="title text-base font-medium">
                                {{ post.quizzfly.title || 'Untitled' }}
                              </h2>
                            </div>
                          </div>
                          <div class="flex items-center gap-2">
                            <div class="flex gap-1 items-center">
                              <Avatar class="h-6 w-6">
                                <AvatarImage :src="post.member?.avatar" />
                                <AvatarFallback v-if="post.member.name">{{
                                  post?.member?.name.charAt(0).toUpperCase()
                                }}</AvatarFallback>
                              </Avatar>
                              <p class="text-sm text-gray-500">{{ post.member.name }}</p>
                            </div>
                          </div>
                        </div>
                        <div class="mr-3 flex items-center gap-2">
                          <Button
                            class="h-8 w-20"
                            @click.prevent.stop="
                              router.push({
                                name: 'host-live',
                                params: { quizzflyId: post.quizzfly.id },
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
                                params: { quizzflyId: post.quizzfly.id },
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
                <div class="flex items-center gap-6 mt-2 -ml-2">
                  <div
                    class="hover:bg-gray-100 px-2 py-1 rounded-full flex items-center gap-1 cursor-pointer"
                    @click.prevent="handleReactPost(post.id)"
                  >
                    <span
                      v-if="post.is_liked"
                      v-motion
                      :initial="{
                        scale: 1.5,
                      }"
                      :enter="{
                        scale: 1,
                      }"
                      :tapped="{
                        scale: 0.8,
                      }"
                      class="text-slate-500 i-solar-like-bold text-lg bg-primary"
                    ></span>
                    <span
                      v-else
                      v-motion
                      :initial="{
                        scale: 1,
                      }"
                      :enter="{
                        scale: 1,
                      }"
                      class="text-slate-500 i-solar-like-broken text-lg"
                    ></span>
                    <p class="text-slate-600">{{ post.react_count }}</p>
                  </div>

                  <div
                    class="hover:bg-gray-100 px-2 py-1 rounded-full flex items-center gap-1 cursor-pointer"
                  >
                    <span class="i-solar-chat-round-line-duotone text-lg text-slate-500"></span>
                    <p class="text-slate-600">{{ post.comment_count }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </RouterLink>
    </div>

    <MCreatePost
      v-show="isShowModal"
      @open-quizzflys="openQuizzflysModal"
      @close="closeModal"
      @create="handPosted"
    />
    <MListQuizzfly
      v-show="isShowQuizzlfyModal"
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

:deep(.content-format) {
  a {
    color: #1a73e8;
  }
}
</style>
