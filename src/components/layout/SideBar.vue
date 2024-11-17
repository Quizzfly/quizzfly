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
</script>
<template>
  <div class="max-md:hidden w-18 py-3 flex flex-col w-[250px] min-w-[250px] border-r p-4 gap-2">
    <div class="flex gap-2 text-lg mt-5">
      <img
        class="w-12 rounded-md"
        src="/assets/images/favicon.jfif"
        alt=""
      />
      <div>
        <p>QUIZZFLY</p>
        <p class="text-xs text-gray-500">Make quizzes easy!</p>
      </div>
    </div>
    <SidebarMenu />
    <div
      class="mt-auto text-red-600 flex items-center gap-2 cursor-pointer hover:text-[#0061ff] hover:bg-[#eff7ff] py-3 px-2 rounded-xl transition-all duration-200"
      @click="openConfirm"
    >
      <span class="i-solar-logout-2-linear text-xl"></span>
      <p>Logout</p>
    </div>
  </div>
</template>
<style>
.router-link-exact-active {
  background-color: #f7f7f7;
  color: #344054;
}
</style>
