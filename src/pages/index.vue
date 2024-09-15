<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue'
</script>
<template>
  <div class="p-8">
    <!-- header -->
    <div class="flex justify-between items-center">
      <div>
        <div class="text-2xl font-medium">Hello, Trinh Huy Nam 👋</div>
        <div>Here's what's going on today.</div>
      </div>
      <div class="flex">
        <RouterLink to="/quiz/create">
          <Button>
            <span class="i-material-symbols-light-add text-2xl"></span>
            Create Quiz
          </Button>
        </RouterLink>
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
