<script setup lang="ts">
import type { SocketLeaderboard } from '@/types/socket'

const props = defineProps<{
  leaderboardData: SocketLeaderboard
}>()

// Hàm tạo avatar ngẫu nhiên
function getRandomAvatar(): string {
  const randomSeed = Math.random().toString(36).substring(2, 15)
  return `https://avatars.dicebear.com/api/avataaars/${randomSeed}.svg`
}

// sort leaderboard by rank property
const leaderboardArr = computed(() => {
  const arr = [...props.leaderboardData.leader_board]
  return arr
    .sort((a, b) => b.rank - a.rank)
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
    class="fixed top-0 left-0 z-10 w-screen h-screen bg-primary gap-20 flex flex-col justify-center items-center"
    style="
      background-image: url(https://res.cloudinary.com/dtpqh6cau/image/upload/v1731232429/s1zpq8kstwkvsav9ltow.jpg);
    "
  >
    <div class="px-40 rounded-sm flex justify-center items-center h-20 bg-white">
      <p class="text-3xl italic font-bold">Ranking</p>
    </div>
    <div class="w-[80%] max-w-[700px] bg-blue-500 rounded-lg shadow-lg overflow-hidden">
      <!-- Hạng nhất -->
      <div class="flex items-center gap-4 p-4 bg-blue-700 text-white">
        <div class="text-2xl font-bold">1</div>
        <img
          src="https://avataaars.io/?avatarStyle=Circle&topType=Turban&accessoriesType=Kurt&hatColor=Gray01&facialHairType=BeardMajestic&facialHairColor=BrownDark&clotheType=ShirtScoopNeck&clotheColor=Pink&eyeType=Side&eyebrowType=AngryNatural&mouthType=Twinkle&skinColor=Tanned"
          alt="avatar"
          class="w-12 h-12 rounded-full"
        />
        <div class="flex-1">
          <p class="font-semibold">{{ leaderboardArr[0].name }}</p>
        </div>
        <div class="text-yellow-400 text-3xl">🏆</div>
        <p class="text-3xl font-bold">{{ leaderboardArr[0].score }}</p>
      </div>

      <!-- Các hạng còn lại -->
      <div
        v-for="(user, index) in leaderboardArr.slice(1)"
        :key="user.user_id"
        v-motion
        :initial="{
          opacity: 0,
          y: 20,
        }"
        :enter="{
          opacity: 1,
          y: 0,
        }"
        :delay="(index + 1) * 100"
        class="flex items-center gap-4 p-4 bg-white border-b border-gray-200"
      >
        <div class="text-xl font-bold">{{ index + 2 }}</div>
        <img
          src="https://avataaars.io/?avatarStyle=Circle&topType=Turban&accessoriesType=Kurt&hatColor=Gray01&facialHairType=BeardMajestic&facialHairColor=BrownDark&clotheType=ShirtScoopNeck&clotheColor=Pink&eyeType=Side&eyebrowType=AngryNatural&mouthType=Twinkle&skinColor=Tanned"
          alt="avatar"
          class="w-10 h-10 rounded-full"
        />
        <div class="flex-1">
          <p class="font-semibold">{{ user.name }}</p>
        </div>
        <div class="text-gray-700 font-bold text-xl flex items-center gap-1">
          <span class="text-blue-600">⭐</span>
          <span>{{ user.score }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
