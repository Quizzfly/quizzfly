<script setup lang="ts">
import Button from '../ui/button/Button.vue'
import Answers from './common/Answers.vue'
</script>
<template>
  <div class="relative top-0 flex flex-col h-full w-full">
    <div class="flex items-center justify-center gap-8 mr-32 w-auto">
      <div class="rounded bg-white p-4">
        <p class="font-black text-2xl text-center">
          What can happen to an ecosystem if an apex predator, like the White Shark, is removed?
        </p>
      </div>
    </div>
    <div class="absolute top-0 right-0">
      <Button
        variant="secondary"
        class="font-extrabold text-xl px-8 py-7"
      >
        Next
      </Button>
    </div>

    <div class="flex items-center justify-between w-full">
      <div class="p-4 rounded-full bg-primary w-[68px] h-[68px]">
        <p class="font-black text-white text-3xl tracking-wider">57</p>
      </div>
      <div class="flex items-center mt-12 justify-center rounded-sm">
        <img
          src="@/assets/img/bg-image-1.jpg"
          class="w-[500px] object-cover rounded-sm"
          alt=""
        />
      </div>
      <div class="flex flex-col gap-3 justify-center items-center">
        <div class="p-4 rounded-full bg-primary w-[68px] h-[68px] text-center">
          <p class="font-black text-white text-3xl tracking-wider">1</p>
        </div>
        <div class="px-4 py-2 bg-primary rounded-full">
          <p class="flex items-center justify-center text-white font-semibold text-base">Answers</p>
        </div>
      </div>
    </div>

    <div class="">
      <Answers />
    </div>
  </div>
</template>
