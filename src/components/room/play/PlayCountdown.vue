<template>
  <div class="count-down w-full h-full flex justify-center items-center">
    <div class="flex items-center justify-center relative text-center w-[250px] h-[250px]">
      <div
        :style="{ transform: `rotate(${rotationAngle}deg)` }"
        class="w-full transition-transform duration-1000 h-full opacity-90 absolute top-0 left-0 bg-[#526529]"
      ></div>
      <h1 class="relative z-20 text font-semibold text-[140px] text-white">{{ countdown }}</h1>
      <span
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white i-svg-spinners-pulse text-[120px]"
      ></span>
    </div>
  </div>
</template>

<script setup lang="ts">
const emits = defineEmits<{
  (e: 'countdownEnd'): void
}>()
const countdown = ref<number>(4)
const rotationAngle = ref<number>(0)

const startCountdown = (): void => {
  const interval = setInterval(() => {
    if (countdown.value > 0) {
      countdown.value -= 1
      rotationAngle.value += 45
    } else {
      emits('countdownEnd')
      clearInterval(interval)
    }
  }, 1000)
}

onMounted(() => {
  startCountdown()
})
</script>

<style scoped></style>
