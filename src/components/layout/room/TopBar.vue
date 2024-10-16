<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { Card } from '@/components/ui/card'
const authStore = useAuthStore()

const getUser = computed(() => authStore.getUser)
</script>
<template>
  <div class="fixed w-full flex justify-between items-center py-2 px-5 h-[60px]">
    <div class="flex items-center gap-5">
      <h3 class="text-2xl font-semibold text-white">QUIZZFLY</h3>
    </div>

    <div class="flex items-center gap-3">
      <div
        class="group relative avatar w-9 h-9 rounded-full border-2 border-slate-400 cursor-pointer"
      >
        <img
          v-if="getUser?.user_info.avatar"
          :src="getUser?.user_info.avatar"
          alt=""
          class="w-9 h-full object-cover rounded-full"
        />
        <img
          v-else
          src="@/assets/img/avatar.jpg"
          alt=""
          class="w-9 h-full object-cover rounded-full"
        />
        <Card
          class="hidden group-hover:flex items-center absolute top-8 right-1 w-32 p-2 rounded bg-white"
        >
          <div
            class="p-2 w-full flex gap-3 items-center rounded cursor-pointer hover:bg-slate-200"
            @click="authStore.logout"
          >
            <span class="i-solar-logout-2-broken"></span>
            <p class="text-sm font-semibold">Sign out</p>
          </div>
        </Card>
      </div>
    </div>
  </div>
</template>
