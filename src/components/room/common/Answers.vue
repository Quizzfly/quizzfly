<script lang="ts" setup>
const isCheckType = ref(false)
</script>

<template>
  <div class="m-8">
    <div
      v-if="isCheckType"
      class="w-full grid grid-rows-2 grid-flow-col gap-4"
    >
      <div class="rounded p-4 bg-primary flex items-center gap-3 min-h-20">
        <span class="i-material-symbols-light-circle w-4 h-4 bg-white"></span>
        <p class="text-xl font-semibold text-white">Tôi tên là Đông</p>
      </div>
      <div class="rounded p-4 bg-primary flex items-center gap-3 min-h-20">
        <span class="i-material-symbols-light-rectangle-rounded w-4 h-4 bg-white"></span>
        <p class="text-xl font-semibold text-white">Tôi tên là Đông</p>
      </div>
      <div class="rounded p-4 bg-primary flex items-center gap-3 min-h-20">
        <span class="i-material-symbols-light-crop-square w-4 h-4 bg-white"></span>
        <p class="text-xl font-semibold text-white">Tôi tên là Đông</p>
      </div>
      <div class="rounded p-4 bg-primary flex items-center gap-3 min-h-20">
        <span class="i-material-symbols-light-add-triangle-rounded w-4 h-4 bg-white"></span>
        <p class="text-xl font-semibold text-white">Tôi tên là Đông</p>
      </div>
    </div>
    <div
      v-else
      class="w-full grid grid-rows grid-flow-col gap-4 mt-12"
    >
      <div class="rounded p-4 bg-primary flex items-center gap-3 min-h-32">
        <span class="i-material-symbols-light-check-rounded w-16 h-16 bg-white"></span>
        <p class="text-2xl font-extrabold text-white">True</p>
      </div>
      <div class="rounded p-4 bg-primary flex items-center gap-3 min-h-32">
        <span
          class="i-material-symbols-light-close-small-outline-rounded w-16 h-16 bg-white"
        ></span>
        <p class="text-2xl font-extrabold text-white">False</p>
      </div>
    </div>
  </div>
</template>
