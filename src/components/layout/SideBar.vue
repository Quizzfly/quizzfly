<script setup lang="ts">
import SidebarMenu from '@/components/layout/sidebar/SidebarMenu.vue'
import { useAuthStore } from '@/stores/auth'
import { useConfirmDialog } from '@/stores/modal'

const authStore = useAuthStore()
const confirmDialog = useConfirmDialog()

const openConfirm = async () => {
  const { isConfirmed } = await confirmDialog.open({
    title: 'Confirm',
    question: 'Do you really want to logout?',
    error: true,
  })

  if (isConfirmed) {
    authStore.logout()
  }
}

const isCollapsed = ref(JSON.parse(localStorage.getItem('isCollapsed') || 'false'))

const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value
  localStorage.setItem('isCollapsed', JSON.stringify(isCollapsed.value))
}
</script>
<template>
  <div
    :class="{
      'w-20 min-w-20': isCollapsed,
      '': !isCollapsed,
    }"
    class="max-md:hidden group overflow-hidden whitespace-nowrap min-w-[250px] w-[250px] relative py-3 flex flex-col border-r p-4 gap-2 transition-all duration-400"
  >
    <div
      :class="{
        'flex-col items-center': isCollapsed,
      }"
      class="flex gap-2 text-lg mt-5"
    >
      <img
        class="w-12 rounded-md"
        src="/assets/images/favicon.jfif"
        alt=""
      />
      <div v-if="!isCollapsed">
        <p>QUIZZFLY</p>
        <p class="text-xs text-gray-500">Make quizzes easy!</p>
      </div>

      <!-- collapse button -->
      <div
        :class="{
          ' ml-auto': !isCollapsed,
          '!flex': isCollapsed,
        }"
        class="hidden group-hover:flex transition-all duration-600 justify-center items-center cursor-pointer bg-white shadow-md w-7 h-7 rounded-full"
        @click="toggleSidebar"
      >
        <span
          v-if="isCollapsed"
          class="i-solar-alt-arrow-right-line-duotone text-xl"
        ></span>
        <span
          v-else
          class="i-solar-alt-arrow-left-line-duotone text-xl"
        ></span>
      </div>
    </div>

    <SidebarMenu :is-collapsed="isCollapsed" />

    <div
      class="mt-auto text-red-600 flex items-center gap-2 cursor-pointer hover:text-[#0061ff] hover:bg-[#eff7ff] py-3 px-2 rounded-xl transition-all duration-200"
      @click="openConfirm"
    >
      <span class="i-solar-logout-2-linear text-xl"></span>
      <p v-if="!isCollapsed">Logout</p>
    </div>
  </div>
</template>
<style>
.router-link-exact-active {
  background-color: #f7f7f7;
  color: #344054;
}
</style>
