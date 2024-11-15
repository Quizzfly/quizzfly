<script setup lang="ts">
const menus = ref([
  {
    title: 'Groups',
    children: [
      {
        class: 'i-material-symbols-light-groups-2-outline',
        title: 'Owned groups',
        link: '/groups/owned-groups',
      },
      {
        class: 'i-material-symbols-light-person-apron-outline',
        title: 'Joined groups',
        link: '/groups/joined-groups',
      },
    ],
  },
  {
    title: 'Recent groups',
    children: [],
  },
])
</script>
<template>
  <div class="pt-16 w-44 px-3 min-h-screen border-r">
    <template
      v-for="menu in menus"
      :key="menu.title"
    >
      <p class="mt-5 ml-5 text-xs">{{ menu.title }}</p>

      <div class="flex flex-col mt-2">
        <RouterLink
          v-for="sub in menu.children"
          :key="sub.title"
          :to="sub.link"
          class="flex items-center gap-2 mb-[2px] group cursor-pointer hover:text-[#0061ff] hover:bg-[#eff7ff] py-3 px-2 rounded-xl transition-all ease-in-out duration-500"
        >
          <span
            class="text-xl"
            :class="sub.class"
          ></span>
          <span class="font-medium">{{ sub.title }}</span>
        </RouterLink>
      </div>
    </template>
  </div>
</template>
<style scoped>
.router-link-active {
  background-color: #eff7ff;
  color: #0061ff;
}
</style>
