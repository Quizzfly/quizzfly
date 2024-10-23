<script setup lang="ts">
import { Button } from '../ui/button'
</script>

<template>
  <div class="absolute top-24 flex flex-col justify-center items-center">
    <div class="flex items-center gap-2">
      <div class="flex gap-1">
        <div class="flex flex-col gap-1 bg-white p-6 rounded">
          <p class="text-base font-medium">
            Join at <span class="text-base font-semibold"> WWW.Quizzfly</span>
          </p>
          <p class="text-base font-medium">
            or with <span class="text-base font-semibold"> Quizzfly app</span>
          </p>
        </div>
        <div class="flex flex-col bg-white px-6 py-3 rounded">
          <p class="text-base font-medium">Game PIN:</p>
          <h1 class="text-6xl font-extrabold">3323232</h1>
        </div>
      </div>
      <div class="bg-white w-28 h-28 rounded p-1">
        <img
          class="w-full h-full object-cover"
          src="@/assets/img/auth-bg.jpg"
          alt=""
        />
      </div>
    </div>

    <div class="w-full text-center my-12">
      <h2 class="text-white font-bold text-3xl">Quizzfly</h2>
    </div>

    <div class="flex gap-2 justify-center items-center w-full text-center">
      <div class="flex items-center justify-center p-2 bg-white rounded cursor-pointer">
        <span class="text-2xl i-solar-lock-keyhole-minimalistic-bold"></span>
        <!-- <span class="text-2xl i-solar-lock-keyhole-minimalistic-unlocked-bold"></span> -->
      </div>
      <Button class="text-xl p-6 font-semibold">Start</Button>
    </div>

    <div class="w-full mt-16">
      <div
        class="mr-auto ml-auto p-2 rounded bg-primary flex gap-1 items-center justify-center w-60"
      >
        <p class="text-xl font-medium text-white">Waiting for player</p>
        <span class="text-white mt-1 i-svg-spinners-3-dots-bounce"></span>
      </div>
    </div>
  </div>
</template>
