<template>
  <div class="flex justify-between items-center border-b py-3 px-5">
    <div class="flex items-center gap-2">
      <span class="i-solar-quiz-bold-duotone text-xl"></span>
      <RouterLink
        to="/"
        class="font-medium text-lg"
      >
        <img
          src="/assets/images/logo.png"
          class="w-32"
          alt=""
        />
      </RouterLink>
    </div>

    <div class="flex items-center gap-2">
      <button class="flex items-center gap-2 bg-[#0061ff] text-white py-2 px-4 rounded-lg">
        <span class="i-solar-plus-bold-duotone"></span>
        <span>Create Quiz</span>
      </button>
    </div>
  </div>
</template>
