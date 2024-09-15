<script setup lang="ts">
const menus = ref([
  {
    title: 'PERSONAL',
    children: [
      {
        class: 'i-solar-user-linear group-hover:i-solar-user-bold-duotone',
        title: 'Profiles',
        link: '/dashboard',
      },
      {
        class:
          'i-solar-users-group-rounded-line-duotone group-hover:i-solar-users-group-rounded-bold-duotone',
        title: 'Groups',
        link: '/dashboard',
      },
      {
        class: 'i-solar-bolt-broken group-hover:i-solar-bolt-bold-duotone',
        title: 'Quiz Management',
        link: '/dashboard',
      },
    ],
  },
  {
    title: 'PAYMENTS',
    children: [
      {
        class: 'i-solar-money-bag-broken group-hover:i-solar-money-bag-bold-duotone',
        title: 'Payment history',
        link: '/dashboard',
      },
    ],
  },
])
</script>
<template>
  <div class="mt-5">
    <div
      class="flex items-center gap-2 group cursor-pointer hover:text-[#0061ff] hover:bg-[#eff7ff] py-3 px-2 rounded-xl transition-all duration-200"
    >
      <span class="group-hover:i-solar-graph-bold-duotone i-solar-graph-linear text-xl"></span>
      <span class="font-medium">Dashboard</span>
    </div>

    <template
      v-for="menu in menus"
      :key="menu.title"
    >
      <p class="mt-5 ml-5 text-xs">{{ menu.title }}</p>

      <div class="flex flex-col mt-2">
        <div
          v-for="sub in menu.children"
          :key="sub.title"
          class="flex items-center gap-2 mb-[2px] group cursor-pointer hover:text-[#0061ff] hover:bg-[#eff7ff] py-3 px-2 rounded-xl transition-all ease-in-out duration-500"
        >
          <span
            class="text-xl"
            :class="sub.class"
          ></span>
          <span class="font-medium">{{ sub.title }}</span>
        </div>
      </div>
    </template>
  </div>
</template>
