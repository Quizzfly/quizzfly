<script setup lang="ts">
import { useAuthStore } from '@/stores'
import { vOnClickOutside } from '@vueuse/components'
import PopupProfile from '@/components/profile/PopupProfile.vue'

const authStore = useAuthStore()

const isShowMenu = ref(false)

const isShowPopupProfile = ref(false)

const closeMenu = () => {
  isShowMenu.value = false
}

function openProfile() {
  isShowPopupProfile.value = true
  closeMenu()
}

function handleLogout() {
  authStore.logout()
  location.reload()
}
</script>
<template>
  <div>
    <Teleport
      v-if="isShowPopupProfile"
      to="body"
    >
      <PopupProfile @close="isShowPopupProfile = false" />
    </Teleport>
    <div
      class="cursor-pointer"
      @click="isShowMenu = true"
    >
      <img
        v-image:avatar="authStore.getUser?.avatar"
        class="w-8 h-8 rounded-full"
        alt=""
      />
    </div>
    <Teleport
      v-if="isShowMenu"
      to="body"
    >
      <div
        v-on-click-outside="closeMenu"
        class="w-48 z-[999] fixed bottom-12 left-5 bg-white shadow-default rounded-md overflow-hidden"
      >
        <div class="p-2 w-full flex gap-2 overflow-hidden">
          <div class="w-full">
            <p class="text-sm">
              {{ [authStore.getUser?.first_name, authStore.getUser?.last_name].join(' ') }}
            </p>
            <p class="text-xs truncate">
              {{ authStore.getUser?.email }}
            </p>
          </div>
        </div>
        <hr />
        <div
          class="flex items-center p-2 gap-2 px-3 hover:bg-slate-50 cursor-pointer"
          @click="openProfile"
        >
          <span class="i-solar-user-circle-bold text-xl"></span>
          <p>Profile setting</p>
        </div>
        <div
          class="flex items-center p-2 gap-2 px-3 hover:bg-slate-50 cursor-pointer"
          @click="openProfile"
        >
          <span class="i-solar-settings-bold text-xl"></span>
          <p>Account setting</p>
        </div>
        <hr />
        <div
          class="flex items-center p-2 gap-2 px-3 hover:bg-slate-50 cursor-pointer"
          @click="handleLogout"
        >
          <span class="i-solar-logout-2-bold-duotone text-xl"></span>
          <p>Logout</p>
        </div>
      </div>
    </Teleport>
  </div>
</template>
