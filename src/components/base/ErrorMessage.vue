<script setup lang="ts">
defineProps<{
  error?: string
}>()
</script>
<template>
  <div class="flex items-center gap-1 h-5 text-[#f04444]">
    <span
      v-if="error"
      class="i-solar-danger-circle-bold-duotone text-lg"
    ></span
    >{{ error }}
  </div>
</template>
