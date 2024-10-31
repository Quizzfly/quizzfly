<script setup lang="ts">
import { useLoadingStore } from '@/stores/loading'
const loadingStore = useLoadingStore()
</script>
<template>
  <Teleport to="body">
    <div
      v-if="loadingStore.getIsLoading"
      class="fixed inset-0 bg-[#ecebee] flex justify-center items-center z-[999999]"
      :class="{ 'bg-opacity-90 ': loadingStore.getOpacity }"
    >
      <div class="flex items-center gap-5">
        <!-- <span class="i-svg-spinners-12-dots-scale-rotate text-3xl text-[#f65655]"></span> -->
        <!-- <img class="w-[400px]" src="/assets/icons/loading-v2.gif" alt=""> -->
        <!-- <span class="font-medium text-lg">PROCESSING</span> -->
        <div class="container relative">
          <div class="loader">
            <div class="loader--dot"></div>
            <div class="loader--dot"></div>
            <div class="loader--dot"></div>
            <div class="loader--dot"></div>
            <div class="loader--dot"></div>
            <div class="loader--dot"></div>
            <div class="loader--text">LOADING...</div>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>
<style scoped>
.container {
  height: 100vh;
  width: 100vw;
  font-family: Helvetica;
}

.loader {
  height: var(--loader-dot-size);
  width: var(--loader-width);
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
}

.loader--dot {
  animation: loader 3s ease-in-out infinite;
  height: var(--loader-dot-size);
  width: var(--loader-dot-size);
  border-radius: 100%;
  background-color: black;
  position: absolute;
  /* border: 2px solid white; */
}

.loader--dot:first-child {
  background-color: #8cc759;
  animation-delay: 0.5s;
}

.loader--dot:nth-child(2) {
  background-color: #8c6daf;
  animation-delay: 0.4s;
}

.loader--dot:nth-child(3) {
  background-color: #ef5d74;
  animation-delay: 0.3s;
}

.loader--dot:nth-child(4) {
  background-color: #f9a74b;
  animation-delay: 0.2s;
}

.loader--dot:nth-child(5) {
  background-color: #60beeb;
  animation-delay: 0.1s;
}

.loader--dot:nth-child(6) {
  background-color: #fbef5a;
  animation-delay: 0s;
}

.loader--text {
  position: absolute;
  top: 200%;
  left: 0;
  right: 0;
  width: 4rem;
  margin: auto;
  font-weight: bold;
  animation: loading-text 3s infinite;
}

@keyframes loader {
  15% {
    transform: translateX(0);
  }
  45% {
    transform: translateX(calc(var(--loader-width) - var(--loader-dot-size)));
  }
  65% {
    transform: translateX(calc(var(--loader-width) - var(--loader-dot-size)));
  }
  95% {
    transform: translateX(0);
  }
}

@keyframes loading-text {
  0% {
    content: 'Loading';
  }
  25% {
    content: 'Loading.';
  }
  50% {
    content: 'Loading..';
  }
  75% {
    content: 'Loading...';
  }
}
</style>
