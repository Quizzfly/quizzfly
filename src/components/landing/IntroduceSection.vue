<template>
  <section class="items-center justify-center px-4 sm:px-6 lg:px-8 relative min-h-screen flex">
    <div class="mx-auto text-center max-w-7xl">
      <div class="mb-8">
        <span
          class="items-center px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r text-purple-800 inline-flex from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 dark:text-purple-200 border border-purple-200 dark:border-purple-700"
          >✨ Create AI-Powered Quizzes</span
        >
      </div>
      <p class="text-5xl md:text-7xl font-bold mb-6 leading-tight">
        <span
          class="bg-gradient-to-r text-transparent mb-2 h-[80px] block from-purple-600 via-pink-600 to-cyan-500 bg-clip-text animate-gradient bg-300%"
          >Interactive Learning</span
        >
        <span class="text-gray-900 block dark:text-white">Made Simple</span>
      </p>
      <p
        class="text-xl md:text-2xl text-gray-600 mb-12 mx-auto leading-relaxed dark:text-gray-300 max-w-4xl"
      >
        Create engaging quizzes with multiple choice, true/false questions and more. Play in
        real-time with friends or study with smart flashcards - all powered by AI.
      </p>
      <div class="sm:flex-row justify-center mb-16 flex flex-col gap-4">
        <button
          type="submit"
          class="group from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl bg-gradient-to-r text-white px-8 py-4 rounded-xl text-lg font-semibold cursor-pointer"
          @click="router.push('/login')"
        >
          <span class="items-center justify-center flex">
            ✨ Create with AI
            <svg
              id="Windframe_W12Ho0YJF"
              class="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              ></path>
            </svg>
          </span>
        </button>
        <button
          type="submit"
          class="backdrop-blur-sm dark:text-white border border-gray-200 dark:border-gray-700 hover:bg-white/20 dark:hover:bg-gray-700/50 transition-all duration-300 bg-white/10 dark:bg-gray-800/50 text-gray-900 px-8 py-4 rounded-xl text-lg font-semibold"
          @click="router.push('/login')"
        >
          Create your group
        </button>
      </div>
      <div class="mx-auto mb-20 relative max-w-6xl">
        <div
          class="bg-gradient-to-br rounded-3xl shadow-2xl from-indigo-500 via-purple-600 to-pink-500 p-1"
        >
          <div class="bg-white/10 dark:bg-gray-900/10 rounded-3xl h-full backdrop-blur-xl p-8">
            <div class="lg:grid-cols-3 items-center grid grid-cols-1 gap-8">
              <div class="text-center group">
                <div
                  class="w-24 h-24 bg-gradient-to-br rounded-2xl mx-auto mb-6 items-center justify-center shadow-lg from-blue-400 to-cyan-400 flex group-hover:scale-110 transition-all duration-300"
                >
                  <svg
                    id="Windframe_MImcqD3VX"
                    class="w-12 h-12 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a1 1 0 01-1-1V9a1 1 0 011-1h1a2 2 0 100-4H4a1 1 0 01-1-1V4a1 1 0 011-1h3a1 1 0 001-1v-1a2 2 0 114 0z"
                    ></path>
                  </svg>
                </div>
                <p class="text-2xl font-bold text-white mb-3">Smart Quiz Creation</p>
                <p class="text-blue-100 text-sm leading-relaxed">
                  AI-powered quiz generation with multiple question types and instant feedback
                </p>
              </div>
              <div class="text-center group">
                <div
                  class="w-24 h-24 bg-gradient-to-br rounded-2xl mx-auto mb-6 items-center justify-center shadow-lg from-emerald-400 to-teal-400 flex group-hover:scale-110 transition-all duration-300"
                >
                  <svg
                    id="Windframe_bgxirUvNt"
                    class="w-12 h-12 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    ></path>
                  </svg>
                </div>
                <p class="text-2xl font-bold text-white mb-3">Real-time Gaming</p>
                <p class="text-blue-100 text-sm leading-relaxed">
                  Live multiplayer quizzes with instant scoring and competitive leaderboards
                </p>
              </div>
              <div class="text-center group">
                <div
                  class="w-24 h-24 bg-gradient-to-br rounded-2xl mx-auto mb-6 items-center justify-center shadow-lg from-orange-400 to-red-400 flex group-hover:scale-110 transition-all duration-300"
                >
                  <svg
                    id="Windframe_oA2KrXos2"
                    class="w-12 h-12 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    ></path>
                  </svg>
                </div>
                <p class="text-2xl font-bold text-white mb-3">Advanced Analytics</p>
                <p class="text-blue-100 text-sm leading-relaxed">
                  Detailed performance insights and progress tracking for improved learning
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script lang="ts" setup>
const router = useRouter()
</script>
