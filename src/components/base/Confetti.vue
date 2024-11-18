<script setup lang="ts">
import confetti from 'canvas-confetti'
const confettiElement = ref<HTMLElement | null>(null)

onMounted(() => {
  // get position of the element x,y
  const rect = confettiElement.value?.getBoundingClientRect()
  const x = rect?.left || 0
  const y = rect?.top || 0
  confetti({
    particleCount: 150,
    spread: 100,
    origin: { x: x / 100, y: y / 100 },
  })
})
</script>
<template>
  <div ref="confettiElement"></div>
</template>
