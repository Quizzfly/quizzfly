<script lang="ts" setup>
import { useGroupStore } from '@/stores/group'
import Card from '@/components/ui/card/Card.vue'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Button from '@/components/ui/button/Button.vue'
import Activity from '@/components/group/Activity.vue'
import Shared from '@/components/group/Shared.vue'
import Assignments from '@/components/group/Assignments.vue'
import MInviteMember from '@/components/group/modal/MInviteMember.vue'
import { ScrollArea } from '@/components/ui/scroll-area'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

const groupStore = useGroupStore()
const route = useRoute()

const groupId = route.params.groupId as string

const groupInfo = computed(() => {
  return groupStore.getGroupInfo
})

const listMembers = computed(() => {
  return groupStore.getMemberGroup
})

onBeforeMount(() => {
  groupStore.listMemberGroups(groupId)
})

const isShowModal = ref(false)

const closeModal = () => {
  isShowModal.value = false
}

const openModal = () => {
  isShowModal.value = true
}
</script>

<template>
  <div class="p-6 h-screen flex flex-col gap-4">
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/groups"> Groups </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Comunity</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
    <ScrollArea>
      <Card class="flex flex-col gap-12 p-6 h-full overflow-auto">
        <div class="flex items-center justify-between">
          <h3
            v-if="groupInfo.group?.name"
            class="text-base font-semibold"
          >
            {{ groupInfo.group?.name }}
          </h3>

          <h3
            v-else
            class="text-base font-semibold"
          >
            Community
          </h3>
          <div class="flex items-center">
            <div class="flex">
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
                  <AvatarFallback>{{ item.name.charAt(0).toUpperCase() }}</AvatarFallback>
                </Avatar>
              </div>
              <Avatar
                v-if="listMembers.length > 4"
                class="-ml-[20px]"
              >
                <AvatarFallback>+{{ listMembers.length - 4 }}</AvatarFallback>
              </Avatar>
            </div>
            <div
              class="ml-6 cursor-pointer w-8 h-8 rounded-xl flex items-center justify-center border"
            >
              <span class="i-solar-menu-dots-bold rotate-90"></span>
            </div>
          </div>
        </div>
        <div class="w-full relative">
          <Tabs
            default-value="activicy"
            class=""
          >
            <TabsList class="mb-8">
              <TabsTrigger value="activicy"> Activity </TabsTrigger>
              <TabsTrigger value="shared"> Shared </TabsTrigger>
              <TabsTrigger value="assignment"> Assignments </TabsTrigger>
            </TabsList>
            <TabsContent value="activicy"> <Activity /> </TabsContent>
            <TabsContent value="shared"> <Shared /> </TabsContent>
            <TabsContent value="assignment"> <Assignments /> </TabsContent>
          </Tabs>
          <Button
            class="absolute top-0 right-0 h-10 bg-primary flex items-center"
            @click="openModal"
          >
            Invite Member
          </Button>
          <MInviteMember
            v-if="isShowModal"
            @close="closeModal"
          />
        </div>
      </Card>
    </ScrollArea>
  </div>
</template>

<style lang="scss" scoped></style>
