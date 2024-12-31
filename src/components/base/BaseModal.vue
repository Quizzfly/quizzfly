<script lang="ts" setup></script>
<template>
  <div
    delay="200"
    class="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-[45]"
  >
    <div
      v-motion-pop-visible
      class="px-5 flex justify-center items-center w-full h-full"
    >
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
