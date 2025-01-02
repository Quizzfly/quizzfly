<script setup lang="ts">
import { avatars } from '@/utils/avatar'
import type { SocketLeaderboard } from '@/types/socket'
import { Button } from '@/components/ui/button'
import ConfettiExplosion from 'vue-confetti-explosion'
import confetti from 'canvas-confetti'

const props = defineProps<{
  leaderboardData: SocketLeaderboard
  isToHome?: boolean
}>()

// Hàm tạo avatar ngẫu nhiên
function getRandomAvatar(): string {
  // random avatar in avatars array
  return avatars[Math.floor(Math.random() * avatars.length)]
}

// sort leaderboard by rank property
const leaderboardArr = computed(() => {
  if (!props.leaderboardData?.leader_board) return []
  const arr = [...props.leaderboardData.leader_board]
  return arr
    .sort((a, b) => Number(b.total_score) - Number(a.total_score))
    .map((item) => ({
      ...item,
      avatar: getRandomAvatar(),
    }))
})

const isShowConfetti = ref(false)
const firstPlayer = computed(() => leaderboardArr.value[0])
const secondPlayer = computed(() => leaderboardArr.value[1])
const thirdPlayer = computed(() => leaderboardArr.value[2])

const delayTime = computed(() => {
  return {
    first: !secondPlayer.value ? 500 : !thirdPlayer.value ? 2000 : 3500,
    second: !thirdPlayer.value ? 500 : 2000,
    third: 500,
  }
})

onMounted(() => {
  setTimeout(() => {
    isShowConfetti.value = true
    confetti({
      particleCount: 150,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
    })
    confetti({
      particleCount: 150,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
    })
  }, delayTime.value.first + 500)
})
</script>
<template>
  <div
    v-motion
    :initial="{ opacity: 0, y: 20 }"
    :enter="{ opacity: 1, y: 0 }"
    class="px-5 w-full h-full bg-primary flex flex-col justify-center items-center"
    style="
      background-image: url(https://res.cloudinary.com/dtpqh6cau/image/upload/v1731232429/s1zpq8kstwkvsav9ltow.jpg);
    "
  >
    <RouterLink :to="{ name: isToHome ? 'play-lobby' : 'host-live' }">
      <Button
        class="absolute top-4 right-4"
        variant="outline"
        color="white"
        >Home</Button
      >
    </RouterLink>
    <!-- second user -->
    <div class="flex items-stretch transform translate-y-5">
      <div
        v-if="secondPlayer"
        class="flex flex-col items-center justify-end max-w-[100px] overflow-hidden"
      >
        <div class="mb-2 flex flex-col items-center">
          <img
            v-motion
            :initial="{ opacity: 0, scale: 0 }"
            :enter="{ opacity: 1, scale: 1 }"
            :delay="delayTime.second + 500"
            class="w-16"
            :src="secondPlayer.avatar"
            alt=""
          />
          <p
            v-motion
            class="font-bold text-white text-lg mt-5 mb-2"
            :initial="{ opacity: 0, y: 100 }"
            :enter="{ opacity: 1, y: 0 }"
            :delay="delayTime.second + 500 + 200"
          >
            {{ secondPlayer.nick_name }}
          </p>
          <div
            v-motion
            class="bg-[#9087E5] px-5 py-2 rounded-2xl text-white font-semibold"
            :initial="{ opacity: 0, y: 100 }"
            :enter="{ opacity: 1, y: 0 }"
            :delay="delayTime.second + 500 + 200 + 200"
          >
            {{ secondPlayer.total_score }}
          </div>
        </div>
        <img
          v-motion
          class="mb-10 w-[100px]"
          :initial="{ opacity: 0, y: 100 }"
          :enter="{ opacity: 1, y: 0 }"
          :delay="delayTime.second"
          src="@/assets/img/rank-2.png"
          alt=""
        />
      </div>

      <!-- first user -->
      <div
        v-if="firstPlayer"
        class="flex flex-col items-center justify-end max-w-[100px] overflow-hidden"
      >
        <ConfettiExplosion
          v-if="isShowConfetti"
          :duration="5000"
        />
        <div class="mb-2 flex flex-col items-center">
          <img
            v-motion
            :initial="{ opacity: 0, scale: 0 }"
            :enter="{ opacity: 1, scale: 1 }"
            :delay="delayTime.first + 500"
            class="w-16"
            :src="firstPlayer.avatar"
            alt=""
          />
          <p
            v-motion
            :initial="{ opacity: 0, y: 100 }"
            :enter="{ opacity: 1, y: 0 }"
            :delay="delayTime.first + 500 + 200"
            class="font-bold text-white text-lg mt-5 mb-2"
          >
            {{ firstPlayer.nick_name }}
          </p>
          <div
            v-motion
            :initial="{ opacity: 0, y: 100 }"
            :enter="{ opacity: 1, y: 0 }"
            :delay="delayTime.first + 500 + 200 + 200"
            class="bg-[#9087E5] px-5 py-2 rounded-2xl text-white font-semibold"
          >
            {{ firstPlayer.total_score }}
          </div>
        </div>
        <img
          v-motion
          class="w-[100px]"
          :initial="{ opacity: 0, y: 100 }"
          :enter="{ opacity: 1, y: 0 }"
          :delay="delayTime.first"
          src="@/assets/img/rank-1.png"
          alt=""
        />
      </div>

      <!-- third user -->
      <div
        v-if="thirdPlayer"
        class="flex flex-col items-center justify-end max-w-[100px] overflow-hidden"
      >
        <div class="mb-2 flex flex-col items-center">
          <img
            v-motion
            :initial="{ opacity: 0, scale: 0 }"
            :enter="{ opacity: 1, scale: 1 }"
            :delay="delayTime.third + 500"
            class="w-16"
            :src="thirdPlayer.avatar"
            alt=""
          />
          <p
            v-motion
            :initial="{ opacity: 0, y: 100 }"
            :enter="{ opacity: 1, y: 0 }"
            :delay="delayTime.third + 500 + 200"
            class="font-bold text-white text-lg mt-5 mb-2"
          >
            {{ thirdPlayer.nick_name }}
          </p>
          <div
            v-motion
            :initial="{ opacity: 0, y: 100 }"
            :enter="{ opacity: 1, y: 0 }"
            :delay="delayTime.third + 500 + 200 + 200"
            class="bg-[#9087E5] px-5 py-2 rounded-2xl text-white font-semibold"
          >
            {{ thirdPlayer.total_score }}
          </div>
        </div>
        <img
          v-motion
          class="w-[100px]"
          :initial="{ opacity: 0, y: 100 }"
          :enter="{ opacity: 1, y: 0 }"
          :delay="delayTime.third"
          src="@/assets/img/rank-3.png"
          alt=""
        />
      </div>
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
              <span class="font-semibold text-primary"> {{ user.total_score }} </span> point
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
