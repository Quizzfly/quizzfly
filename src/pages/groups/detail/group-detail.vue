<script lang="ts" setup>
import { useGroupStore } from '@/stores/group/group'
import Card from '@/components/ui/card/Card.vue'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Button from '@/components/ui/button/Button.vue'
import Activity from '@/components/group/Activity.vue'
import Shared from '@/components/group/Shared.vue'
import MInviteMember from '@/components/group/modal/MInviteMember.vue'
import { ScrollArea } from '@/components/ui/scroll-area'
// import ChatBox from '@/components/group/chat/ChatBox.vue'
import { useGroupSocketStore } from '@/stores/socket/group'
import MListMember from '@/components/group/modal/MListMember.vue'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { usePostStore } from '@/stores/group/post'

const groupStore = useGroupStore()
const postStore = usePostStore()
const route = useRoute()
const groupSocketStore = useGroupSocketStore()

const getMessage = computed(() => {
  return groupSocketStore.getMessage
})

const groupInfo = computed(() => {
  return groupStore.getGroupInfo
})

const listMembers = computed(() => {
  return groupStore.getMemberGroup
})

const isShowModal = ref(false)
const isShowListMember = ref(false)

const closeModal = () => {
  isShowModal.value = false
  isShowListMember.value = false
}

const openModal = () => {
  isShowModal.value = true
}

onBeforeMount(() => {
  if (route.params.groupId && typeof route.params.groupId === 'string') {
    postStore.fetchPosts(1, route.params.groupId)
  }
})

watch(getMessage, (val: any) => {
  if (val.event === 'createPost') {
    postStore.handlePostsRealtime(val.data)
  }
})
</script>

<template>
  <div class="p-6 flex h-full flex-col gap-4 relative overflow-hidden">
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbPage>
            <RouterLink to="/groups">{{ $t('groups.groups') }}</RouterLink>
          </BreadcrumbPage>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>{{ groupInfo.name }}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
    <div class="flex h-full justify-center">
      <Card class="w-full flex border-b-0 rounded-b-none flex-col gap-12 h-full overflow-auto">
        <ScrollArea>
          <div class="px-6 pt-10 flex items-center justify-between">
            <h3
              v-if="groupInfo.name"
              class="text-base font-semibold"
            >
              {{ groupInfo.name }}
            </h3>

            <h3
              v-else
              class="text-base font-semibold"
            >
              {{ $t('groups.title') }}
            </h3>
            <div class="flex items-center">
              <div
                class="flex cursor-pointer"
                @click.stop="isShowListMember = true"
              >
                <div
                  v-for="(item, index) in listMembers"
                  :key="index"
                >
                  <Avatar
                    v-if="index < 4"
                    :class="{ '-ml-[20px]': index > 0 }"
                    class="border-2"
                  >
                    <AvatarImage
                      v-if="item?.avatar"
                      :src="item?.avatar"
                    />
                    <AvatarFallback v-if="item.name">{{
                      item.name.charAt(0).toUpperCase()
                    }}</AvatarFallback>
                  </Avatar>
                </div>
                <Avatar
                  v-if="listMembers.length > 4"
                  class="-ml-[20px]"
                >
                  <AvatarFallback>+{{ listMembers.length - 4 }}</AvatarFallback>
                </Avatar>
              </div>
              <!-- <div
                class="ml-6 cursor-pointer w-8 h-8 rounded-xl flex items-center justify-center border"
              >
                <span class="i-solar-menu-dots-bold rotate-90"></span>
              </div> -->
            </div>
          </div>
          <div class="w-full relative">
            <Tabs default-value="activity">
              <TabsList class="mb-8 ml-6 mt-6">
                <TabsTrigger value="activity"> {{ $t('groups.activity') }} </TabsTrigger>
                <TabsTrigger value="shared"> {{ $t('groups.shared') }} </TabsTrigger>
              </TabsList>
              <TabsContent value="activity">
                <Activity />
              </TabsContent>
              <TabsContent value="shared"> <Shared /> </TabsContent>
            </Tabs>
            <Button
              class="absolute top-6 right-6 h-10 bg-primary flex items-center"
              @click="openModal"
            >
              {{ $t('groups.invite_member') }}
            </Button>
            <MInviteMember
              v-if="isShowModal"
              @close="closeModal"
            />
          </div>
        </ScrollArea>
      </Card>

      <!-- <div class="">
        <ChatBox />
      </div> -->
    </div>
    <div class="">
      <ChatThumnail />
    </div>
    <MListMember
      v-if="isShowListMember"
      @close="closeModal"
    />
  </div>
</template>

<style lang="scss" scoped></style>
