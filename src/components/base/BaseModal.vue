<script lang="ts" setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
})
</script>
<template>
  <div class="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
    <div class="bg-white w-[600px] mx-auto rounded-3xl shadow-lg p-12 relative">
      <div class="text-4xl w-full text-center font-semibold">{{ props.title }}</div>
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
