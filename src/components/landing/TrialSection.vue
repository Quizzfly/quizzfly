<template>
  <section
    class="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-500"
  >
    <div class="mx-auto text-center text-white max-w-4xl">
      <p class="text-4xl md:text-5xl font-bold mb-6">Ready to Transform Learning?</p>
      <p class="text-xl mb-10 opacity-90">
        Join thousands of educators and learners who are already using QuizzFly to create engaging
        quiz experiences.
      </p>
      <div class="sm:flex-row justify-center flex flex-col gap-4">
        <button
          type="submit"
          class="hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 bg-white text-purple-600 px-8 py-4 rounded-xl text-lg font-semibold"
          @click="router.push('/login')"
        >
          Start Free Trial
        </button>
        <button
          type="submit"
          class="border-2 border-white hover:bg-white/10 transition-all duration-300 text-white px-8 py-4 rounded-xl text-lg font-semibold"
        >
          Schedule Demo
        </button>
      </div>
    </div>
  </section>
</template>
<script lang="ts" setup>
const router = useRouter()
</script>
