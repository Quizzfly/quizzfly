<script setup lang="ts">
defineProps<{
  modelValue: string
}>()
</script>
<template>
  <span style="white-space: pre-line">{{ modelValue }}</span>
</template>
