<script setup lang="ts">
import SidebarMenu from '@/components/layout/sidebar/SidebarMenu.vue'
import { useAuthStore } from '@/stores/auth'
import { useConfirmDialog } from '@/stores/modal'
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'

const breakpoints = useBreakpoints(breakpointsTailwind)
const lgAndSmaller = breakpoints.smallerOrEqual('lg')
const authStore = useAuthStore()
const confirmDialog = useConfirmDialog()

watch(lgAndSmaller, (value) => {
  if (value) {
    isCollapsed.value = true
  }
})

const openConfirm = async () => {
  const { isConfirmed } = await confirmDialog.open({
    title: 'Confirm',
    question: 'Do you really want to logout?',
    warning: true,
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

const sidebarMode = ref<'dark' | 'light'>('dark')
const handleChangeMode = (mode: 'dark' | 'light') => {
  localStorage.setItem('sidebarMode', mode)
  sidebarMode.value = mode
}

onBeforeMount(() => {
  sidebarMode.value = (localStorage.getItem('sidebarMode') as 'dark' | 'light') || 'dark'
})
</script>
<template>
  <div
    :class="{
      'w-20 min-w-20': isCollapsed,
      'min-w-[280px] w-[280px]': !isCollapsed,
      'light-mode': sidebarMode === 'light',
    }"
    class="max-md:hidden rounded-tr-2xl bg-[#07182d] text-white group overflow-hidden whitespace-nowrap relative py-3 flex flex-col border-r p-4 gap-2 transition-all duration-400"
  >
    <div
      :class="{
        'flex-col items-center !gap-5': isCollapsed,
      }"
      class="flex items-center gap-2 text-lg mt-5"
    >
      <div class="min-w-16 w-16 h-16 object-cover rounded-full p-1 border-2 border-[#E6EBF2]">
        <img
          v-image
          class="w-full h-full object-cover rounded-full"
          :src="authStore.getUser?.user_info.avatar || ''"
          alt=""
        />
      </div>
      <div
        v-if="!isCollapsed"
        class="flex flex-col overflow-hidden"
      >
        <p>
          {{ authStore.getUser?.user_info.name }}
        </p>
        <p class="truncate text-xs text-gray-500">
          {{ authStore.getUser?.email }}
        </p>
      </div>

      <!-- collapse button -->
      <div
        :class="{
          ' ml-auto translate-x-5 rounded-tl-full rounded-bl-full': !isCollapsed,
          '!flex !w-12 !min-w-12 -translate-x-5 rounded-tr-full rounded-br-full': isCollapsed,
        }"
        class="hidden text-white bg-[#44AA5C] group-hover:flex transition-all duration-600 justify-center items-center cursor-pointer shadow-md min-w-9 w-9 h-9"
        @click="toggleSidebar"
      >
        <span
          v-if="isCollapsed"
          class="i-material-symbols-light-arrow-right-alt text-xl"
        ></span>
        <span
          v-else
          class="i-material-symbols-light-arrow-left-alt-rounded text-xl"
        ></span>
      </div>
    </div>

    <SidebarMenu
      :is-collapsed="isCollapsed"
      :sidebar-mode="sidebarMode"
    />

    <div
      :class="{ 'border-slate-600': sidebarMode === 'dark' }"
      class="border mt-auto rounded-full text-xs flex items-center py-1 px-1"
    >
      <div
        :class="{ 'bg-slate-200': sidebarMode === 'light' }"
        class="flex-1 flex items-center gap-2 cursor-pointer py-1 rounded-full justify-center"
        @click="handleChangeMode('light')"
      >
        <span class="i-solar-sun-2-bold"></span>
        Light
      </div>
      <div
        :class="{ 'bg-slate-600': sidebarMode === 'dark' }"
        class="flex-1 cursor-pointer py-1 rounded-full flex items-center gap-2 justify-center"
        @click="handleChangeMode('dark')"
      >
        <span class="i-solar-moon-bold"></span>
        Dark
      </div>
    </div>
    <div
      class="text-red-600 flex items-center gap-2 cursor-pointer hover:text-[#0061ff] hover:bg-[#eff7ff] py-3 px-2 rounded-xl transition-all duration-200"
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

.light-mode {
  background: #fafcff;
  color: #101010;
}
</style>
