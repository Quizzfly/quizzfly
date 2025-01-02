<script setup lang="ts">
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Card } from '@/components/ui/card'
import { useGroupStore } from '@/stores/group/group'
import { usePostStore } from '@/stores/group/post'
import { useGroupSocketStore } from '@/stores/socket/group'
import { formatDateTime } from '@/utils/time'
import { getPostDetailApi } from '@/services/group'
import { showToast } from '@/utils/toast'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import FormSend from '@/components/group/comment/FormSend.vue'
import ListComment from '@/components/group/comment/ListComment.vue'
import ScrollArea from '@/components/ui/scroll-area/ScrollArea.vue'
import Button from '@/components/ui/button/Button.vue'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
// import ChatBox from '@/components/group/chat/ChatBox.vue'

const groupStore = useGroupStore()
const postStore = usePostStore()
const route = useRoute()
const router = useRouter()
const socketStore = useGroupSocketStore()

const groupId = route.params.groupId as string
const postId = route.params.postId as string

const postInfo = ref()
const commentCount = ref()
const isCheckReact = ref(false)
const reactCount = ref()

const groupInfo = computed(() => {
  return groupStore.getGroupInfo
})

const getMessage = computed(() => {
  return socketStore.getMessage
})

watch(getMessage, (val: any) => {
  if (val.event === 'commentPost' && val.data.parent_comment_id == null) {
    postStore.handleCommentByPostId(val.data)
    commentCount.value += 1
  }
})

const handleReactPost = () => {
  postStore.createReactPost(postId)
  if (isCheckReact.value) {
    isCheckReact.value = false
    reactCount.value -= 1
  } else {
    isCheckReact.value = true
    reactCount.value += 1
  }
}

const getDetailPostByPostId = async (idGroup: string, idPost: string) => {
  try {
    const { data } = await getPostDetailApi(idGroup, idPost)
    postInfo.value = data
    commentCount.value = data.comment_count
    if (data.is_liked) {
      isCheckReact.value = true
    }
    reactCount.value = data.react_count
  } catch (error) {
    showToast({
      description: 'Failed to get post detail',
      variant: 'destructive',
    })
    throw error
  }
}

const handleHtmlLinkClick = (event: MouseEvent) => {
  const target = event.target as HTMLElement

  if (target.tagName === 'A') {
    event.preventDefault()
    const href = (target as HTMLAnchorElement).href
    window.open(href, '_blank')
  }
}

onBeforeMount(() => {
  if (postId && groupId) {
    getDetailPostByPostId(groupId, postId)
  }
})
</script>
<template>
  <div class="p-6 flex flex-col h-full overflow-hidden">
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/groups"> Groups </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>
            <RouterLink :to="{ name: 'group-detail' }">
              {{ groupInfo.name }}
            </RouterLink>
          </BreadcrumbPage>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Detail</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
    <Card
      v-if="postInfo?.id"
      class="mt-6 flex flex-col h-full overflow-auto"
    >
      <ScrollArea>
        <div class="flex flex-col w-fulf">
          <div class="p-6 pb-3 flex flex-col items-start gap-2 w-full">
            <div class="flex-auto w-full">
              <div class="flex flex-auto justify-between">
                <!-- name -->
                <div class="flex items-center gap-2">
                  <Avatar class="w-9 h-9">
                    <AvatarImage :src="postInfo?.member.avatar" />
                    <AvatarFallback>
                      {{ postInfo?.member?.name.charAt(0).toUpperCase() }}
                    </AvatarFallback>
                  </Avatar>
                  <div class="flex flex-col gap-0">
                    <div class="flex items-center gap-2">
                      <h4 class="text-sm font-medium">{{ postInfo?.member.name }}</h4>
                      <p class="text-xs font-light text-slate-600">
                        {{ formatDateTime(postInfo?.created_at) }}
                      </p>
                    </div>
                  </div>
                </div>
                <!-- menu options -->
                <Popover>
                  <PopoverTrigger>
                    <div
                      class="cursor-pointer w-6 h-6 rounded-lg flex items-center justify-center border"
                    >
                      <span class="i-solar-menu-dots-bold rotate-90"></span>
                    </div>
                  </PopoverTrigger>
                  <PopoverContent class="p-0 w-full">
                    <div class="rounded-md cursor-pointer py-1 px-1.5 shadow-md bg-white">
                      <p class="py-1 px-3 text-xs text-red-500 hover:bg-slate-100 rounded-sm">
                        Delete
                      </p>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>

              <!-- content -->
              <div class="">
                <div class="flex flex-col gap-4">
                  <div
                    class="text-gray-900 font-normal mt-2 content-format"
                    @click="handleHtmlLinkClick"
                    v-html="$sanitize(postInfo?.content)"
                  ></div>

                  <div
                    v-if="postInfo?.files.length"
                    v-viewer:gallery
                    class="flex h-[328px] overflow-hidden w-full gap-1"
                    @click.stop.prevent
                  >
                    <div class="overflow-hidden flex-1 h-full">
                      <img
                        v-image
                        :src="postInfo?.files[0].url"
                        class="w-full h-full object-cover cursor-pointer rounded-lg"
                        alt="image post"
                      />
                    </div>
                    <div
                      class="overflow-hidden flex-1 grid gap-1"
                      :class="`grid__${postInfo?.files.length > 5 ? 4 : postInfo?.files.length - 1}`"
                    >
                      <div
                        v-for="(image, index) in postInfo?.files.slice(1, 5)"
                        :key="index"
                        class="image w-full h-full object-cover cursor-pointer rounded-lg relative"
                      >
                        <img
                          v-image
                          :src="image.url"
                          class="w-full h-full object-cover cursor-pointer rounded-lg"
                          alt="Service"
                        />
                        <div
                          v-if="index == 3 && postInfo?.files.length > 5"
                          class="bg-black bg-opacity-30 rounded-lg absolute w-full h-full top-0 left-0 right-0 bottom-0 flex items-center justify-center text-base font-bold text-white"
                        >
                          + {{ postInfo?.files.length - 5 }}
                        </div>
                      </div>
                    </div>
                  </div>

                  <Card v-if="postInfo?.quizzfly?.id">
                    <div class="flex w-full h-28">
                      <div>
                        <img
                          v-image
                          class="w-[188px] h-28 object-cover rounded-s-md"
                          :src="postInfo?.quizzfly.cover_image || ''"
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
                                {{ postInfo?.quizzfly.title || 'Untitled' }}
                              </h2>
                            </div>
                          </div>
                          <div class="flex items-center gap-2">
                            <div class="flex gap-1 items-center">
                              <Avatar class="h-6 w-6">
                                <AvatarImage :src="postInfo?.member?.avatar" />
                                <AvatarFallback v-if="postInfo?.member.name">{{
                                  postInfo?.member?.name.charAt(0).toUpperCase()
                                }}</AvatarFallback>
                              </Avatar>
                              <p class="text-sm text-gray-500">{{ postInfo?.member.name }}</p>
                            </div>
                          </div>
                        </div>
                        <div class="mr-3 flex items-center gap-2">
                          <Button
                            class="h-8 w-20"
                            @click.prevent.stop="
                              router.push({
                                name: 'host-live',
                                params: { quizzflyId: postInfo?.quizzfly.id },
                                query: { group_id: groupId },
                              })
                            "
                          >
                            Play
                          </Button>
                          <!-- <Button
                            variant="secondary"
                            class="h-8 w-20"
                            @click.prevent.stop="
                              router.push({
                                name: 'quizzfly-create',
                                params: { quizzflyId: postInfo?.quizzfly.id },
                              })
                            "
                          >
                            Edit
                          </Button> -->
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
                <div class="flex items-center gap-6 mt-2 -ml-2">
                  <div
                    class="hover:bg-gray-100 px-2 py-1 rounded-full flex items-center gap-1 cursor-pointer"
                    @click.prevent="handleReactPost()"
                  >
                    <span
                      v-if="isCheckReact"
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
                    <p class="text-slate-600">{{ reactCount }}</p>
                  </div>

                  <div
                    class="hover:bg-gray-100 px-2 py-1 rounded-full flex items-center gap-1 cursor-pointer"
                  >
                    <span class="i-solar-chat-round-line-duotone text-lg text-slate-500"></span>
                    <p class="text-slate-600">{{ commentCount }}</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="h-px w-full bg-slate-300"></div>
          </div>
          <!-- <div class="h-px w-full bg-slate-200"></div> -->
          <FormSend
            :member="postInfo?.member"
            :post-id="postInfo?.id"
          />
          <ListComment :id-post="postId" />
        </div>
      </ScrollArea>
    </Card>
    <!-- <ChatBox /> -->
  </div>
</template>
<style lang="scss" scoped>
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
