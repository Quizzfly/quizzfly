<script lang="ts" setup>
import Card from '../ui/card/Card.vue'
import { getQuizzflySharedApi } from '@/services/group'
import type { IQuizzflyShared } from '@/types/quizzfly'
import { showToast } from '@/utils/toast'
import { apiError } from '@/utils/exceptionHandler'
import Button from '../ui/button/Button.vue'
import ScrollArea from '../ui/scroll-area/ScrollArea.vue'
import { AvatarFallback, Avatar, AvatarImage } from '../ui/avatar'
import { Skeleton } from '@/components/ui/skeleton'

const route = useRoute()
const router = useRouter()

const groupId = route.params.groupId as string

const quizzflyShared = ref<IQuizzflyShared[]>([])
const isLoading = ref(false)

onBeforeMount(() => {
  if (groupId) {
    listQuizzflyShared()
  }
})

const listQuizzflyShared = async () => {
  try {
    isLoading.value = true
    const data = await getQuizzflySharedApi(groupId)
    quizzflyShared.value = data.data
  } catch (error) {
    showToast({
      description: apiError(error).message,
      variant: 'destructive',
    })
  }
  isLoading.value = false
}
</script>

<template>
  <div class="flex flex-col gap-5">
    <Card class="mx-6 rounded-3xl">
      <ScrollArea style="height: calc(100vh - 320px); width: 100%">
        <div v-if="quizzflyShared.length === 0 && isLoading">
          <div class="flex p-4 gap-3">
            <Skeleton class="w-10 h-10 rounded-full" />
            <Skeleton class="w-full h-20 rounded-md" />
          </div>
          <div class="flex p-4 gap-3">
            <Skeleton class="w-10 h-10 rounded-full" />
            <Skeleton class="w-full h-20 rounded-md" />
          </div>
          <div class="flex p-4 gap-3">
            <Skeleton class="w-10 h-10 rounded-full" />
            <Skeleton class="w-full h-20 rounded-md" />
          </div>
        </div>
        <div
          class="flex items-center justify-between p-8 gap-12 w-full overflow-y-auto overflow-hidden"
        >
          <Card
            v-for="quizzfly in quizzflyShared"
            :key="quizzfly.id"
            class="w-full"
          >
            <div class="flex w-full h-32">
              <div>
                <img
                  v-image
                  class="w-[188px] h-32 object-cover rounded-s-md"
                  :src="quizzfly.cover_image || ''"
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
                        {{ quizzfly.title || 'Untitled' }}
                      </h2>
                    </div>
                  </div>
                  <div class="flex items-center gap-2">
                    <div class="flex gap-1 items-center">
                      <Avatar class="h-6 w-6">
                        <AvatarImage :src="quizzfly?.avatar" />
                        <AvatarFallback v-if="quizzfly.username">{{
                          quizzfly?.username.charAt(0).toUpperCase()
                        }}</AvatarFallback>
                      </Avatar>
                      <p class="text-sm text-gray-500">{{ quizzfly.username }}</p>
                    </div>
                  </div>
                </div>
                <div class="mr-7 flex items-center gap-2">
                  <Button
                    class="h-8 w-20"
                    @click.prevent.stop="
                      router.push({
                        name: 'host-live',
                        params: { quizzflyId: quizzfly.id },
                      })
                    "
                  >
                    Play
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </ScrollArea>
    </Card>
  </div>
</template>

<style scoped lang="scss"></style>
