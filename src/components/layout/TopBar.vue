<script setup lang="ts">
import Button from 'primevue/button'
</script>
<template>
  <div
    class="fixed top-0 left-0 z-[999] w-full h-[54px] items-center px-7 flex justify-between border-b"
  >
    <div class="navbar__left flex items-center text-xl font-semibold">
      <span class="text-black">Bug</span>
      <span class="inline-block bg-slate-400 py-1 px-2 ml-1 text-slate-400 relative">
        <p class="relative z-20">Tracking</p>
        <span
          class="inline-block absolute top-0 left-0 z-10 w-full h-full bg-slate-200 rounded-md"
        ></span>
      </span>
      <!-- <TopBarMembers /> -->
    </div>
    <div>
      <Button
        class="text-xs"
        size="small"
        @click="authStore.logout"
      >
        <Icon icon="hugeicons:login-03" />
        <p>Logout</p>
      </Button>
    </div>
    <!-- <IconField>
            <InputIcon class="pi pi-search" />
            <InputText
                size="small"
                placeholder="Search"
            />
        </IconField> -->
    <!-- <TopBarUserOption /> -->
  </div>
</template>
<style lang="scss" scoped></style>
