<script lang="ts" setup></script>
<template>
  <div
    v-motion-pop-visibled
    delay="200"
    class="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50"
  >
    <slot />
  </div>
</template>

<style lang="scss" scoped></style>
