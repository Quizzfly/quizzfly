<script setup lang="ts">
defineProps<{
  index: number
}>()
const answer = defineModel()

const colorsHex = ['#1d69ff', '#ff80b0', '#0fd98d', '#959def', '#0000FF', '#4B0082', '#EE82EE']
</script>
<template>
  <div
    class="py-2 min-h-16 flex items-center px-2 border border-gray-200 rounded-lg text-white"
    :style="{ backgroundColor: colorsHex[index] }"
  >
    {{ answer.text }}
  </div>
</template>
