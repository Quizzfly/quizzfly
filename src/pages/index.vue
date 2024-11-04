<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/stores/auth'
import { useQuizzflyStore } from '@/stores/quizzfly/quizzfly'

const authStore = useAuthStore()
const quizzflyStore = useQuizzflyStore()

const handleClickCreateQuiz = async () => {
  await quizzflyStore.initQuizzflyDraft()
}
</script>
<template>
  <div class="p-8">
    <div class="flex justify-between items-center">
      <div>
        <div class="text-2xl font-medium">Hello, {{ authStore.getUser?.user_info.name }} 👋</div>
        <div>Here's what's going on today.</div>
      </div>
      <div class="flex items-center gap-5">
        <Button @click="handleClickCreateQuiz">
          <span class="i-material-symbols-light-add text-2xl"></span>
          Create Quiz
        </Button>
        <div
          class="w-10 h-10 hover:bg-slate-200 flex justify-center items-center rounded-full cursor-pointer"
        >
          <span class="i-solar-magnifer-linear text-lg"></span>
        </div>
        <div
          class="w-10 h-10 hover:bg-slate-200 flex justify-center items-center rounded-full cursor-pointer"
        >
          <span class="i-solar-bell-line-duotone text-lg"></span>
        </div>
      </div>
    </div>
  </div>
</template>
