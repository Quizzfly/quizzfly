<script setup lang="ts">
import { ref } from 'vue'

interface UserRanking {
  id: string
  name: string
  score: number
  imageUrl: string
  stars: number
}

// Hàm tạo avatar ngẫu nhiên
function getRandomAvatar(): string {
  const randomSeed = Math.random().toString(36).substring(2, 15)
  return `https://avatars.dicebear.com/api/avataaars/${randomSeed}.svg`
}

// Dữ liệu người dùng
const users = ref<UserRanking[]>([
  { id: '1', name: 'Evelyn Fisher', score: 22541, imageUrl: getRandomAvatar(), stars: 128 },
  { id: '3', name: 'Shirley Daniels', score: 12256, imageUrl: getRandomAvatar(), stars: 88 },
  { id: '4', name: 'Eugene Stephens', score: 9863, imageUrl: getRandomAvatar(), stars: 52 },
  { id: '5', name: 'Madison Williams', score: 6777, imageUrl: getRandomAvatar(), stars: 28 },
])
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
          <p class="font-semibold">{{ users[0].name }}</p>
        </div>
        <div class="text-yellow-400 text-3xl">🏆</div>
        <p class="text-3xl font-bold">{{ users[0].score }}</p>
      </div>

      <!-- Các hạng còn lại -->
      <div
        v-for="(user, index) in users.slice(1)"
        :key="user.id"
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
