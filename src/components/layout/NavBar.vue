<template>
  <nav
    class="bg-white/80 dark:bg-gray-900/80 relative z-50 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-700/50"
  >
    <div class="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
      <div class="justify-between items-center h-16 flex">
        <div class="items-center flex space-x-3">
          <div
            class="w-10 h-10 bg-gradient-to-r rounded-xl items-center justify-center from-purple-500 to-pink-500 flex cursor-pointer"
            @click="router.push('/')"
          >
            <span class="text-white font-bold text-lg">Q!</span>
          </div>
          <div>
            <p
              class="text-xl font-bold bg-gradient-to-r text-transparent from-purple-600 to-pink-600 bg-clip-text"
            >
              QUIZZFLY
            </p>
            <p class="text-xs text-gray-500 dark:text-gray-400">Make quizzes easy!</p>
          </div>
        </div>
        <div class="md:flex items-center hidden space-x-8">
          <a
            href="#features"
            class="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
            >Features</a
          >
          <a
            href="#how-it-works"
            class="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
            >How it works</a
          >
          <a
            href="#pricing"
            class="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
            >Pricing</a
          >
          <button
            type="submit"
            class="from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 bg-gradient-to-r text-white px-6 py-2 rounded-lg cursor-pointer"
            @click="router.push('/login')"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>
<script setup lang="ts">
const router = useRouter()
</script>
