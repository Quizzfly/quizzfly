<script setup lang="ts">
import type { SocketLeaderboard } from '@/types/socket'
import { Button } from '@/components/ui/button'
import { avatars } from '@/utils/avatar'

const props = defineProps<{
  leaderboardData: SocketLeaderboard
}>()

const emits = defineEmits<{
  (e: 'nextQuestion'): void
}>()

function getRandomAvatar(): string {
  // random avatar in avatars array
  return avatars[Math.floor(Math.random() * avatars.length)]
}

// sort leaderboard by rank property
const leaderboardArr = computed(() => {
  const arr = [...props.leaderboardData.leader_board]
  return arr
    .sort((a, b) => Number(b.total_score) - Number(a.total_score))
    .map((item) => ({
      ...item,
      avatar: getRandomAvatar(),
    }))
})
</script>

<template>
  <div
    v-motion
    :initial="{ opacity: 0, y: 20 }"
    :enter="{ opacity: 1, y: 0 }"
    class="fixed top-0 left-0 z-10 py-10 w-screen h-dvh bg-primary gap-20 flex flex-col justify-center items-center"
    style="
      background-image: url(https://res.cloudinary.com/dtpqh6cau/image/upload/v1731232429/s1zpq8kstwkvsav9ltow.jpg);
    "
  >
    <Button
      class="absolute top-4 right-4"
      variant="outline"
      color="white"
      @click="emits('nextQuestion')"
      >Next</Button
    >
    <div class="px-40 rounded-sm flex justify-center items-center h-20 bg-white">
      <p class="text-3xl italic font-bold">Ranking</p>
    </div>

    <div
      class="flex flex-col overflow-y-auto gap-4 w-full max-w-[600px] bg-[#EFEEFC] h-full rounded-[40px] p-5 transform -translate-y-8"
    >
      <div
        v-for="(user, index) in leaderboardArr"
        :key="user.user_id"
        class="w-full h-[92px] bg-white rounded-[20px] flex items-center p-4"
      >
        <p>
          {{ index + 1 }}
        </p>
        <div class="flex items-center ml-5 gap-5">
          <img
            class="w-12 h-12 rounded-full"
            :src="user.avatar"
            alt=""
          />
          <div>
            <p class="font-semibold text-lg">
              {{ user.nick_name }}
            </p>
            <div class="flex gap-1">
              <span class="font-semibold"> {{ user.total_score }} </span> point
            </div>
          </div>
        </div>
        <img
          v-if="index === 0"
          class="w-12 h-12 rounded-full ml-auto"
          src="@/assets/icons/svg/gold.svg"
          alt=""
        />
        <img
          v-else-if="index === 1"
          class="w-12 h-12 rounded-full ml-auto"
          src="@/assets/icons/svg/silver.svg"
          alt=""
        />
        <img
          v-else-if="index === 2"
          class="w-12 h-12 rounded-full ml-auto"
          src="@/assets/icons/svg/bronze.svg"
          alt=""
        />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
