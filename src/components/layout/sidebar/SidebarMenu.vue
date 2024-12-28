<script setup lang="ts">
defineProps<{
  isCollapsed: boolean
}>()
const menus = ref([
  {
    title: 'DASHBOARD',
    children: [
      {
        class: 'i-solar-graph-bold',
        title: 'Dashboard',
        link: '/',
      },
    ],
  },
  {
    title: 'PERSONAL',
    children: [
      {
        class: 'i-solar-user-bold-duotone',
        title: 'Profiles',
        link: '/profiles',
      },
      {
        class: 'i-solar-users-group-rounded-bold-duotone',
        title: 'Groups',
        link: '/groups',
      },
      {
        class: 'i-solar-bolt-bold-duotone',
        title: 'Quiz Management',
        link: '/quizzfly',
      },
      {
        class: 'i-solar-document-add-bold',
        title: 'Report',
        link: '/reports',
      },
    ],
  },
  {
    title: 'PAYMENTS',
    children: [
      {
        class: 'i-solar-money-bag-bold-duotone',
        title: 'Payment history',
        link: '/dashboard',
      },
    ],
  },
])
</script>
<template>
  <div class="mt-5">
    <!-- <RouterLink
      v-tippy="{ content: isCollapsed ? 'Dashboard' : '', placement: 'right' }"
      to="/"
      :class="{ 'justify-center': isCollapsed }"
      class="flex items-center gap-2 group/item cursor-pointer hover:text-[#0061ff] hover:bg-[#eff7ff] py-3 px-2 rounded-xl transition-all duration-200"
    >
      <span class="group-hover/item:i-solar-graph-bold-duotone i-solar-graph-linear text-xl"></span>
      <span
        v-if="!isCollapsed"
        class="font-base"
        >Dashboard</span
      >
    </RouterLink> -->

    <template
      v-for="menu in menus"
      :key="menu.title"
    >
      <p
        v-if="!isCollapsed"
        class="mt-5 ml-5 text-xs"
      >
        {{ menu.title }}
      </p>

      <div class="flex flex-col mt-2">
        <RouterLink
          v-for="sub in menu.children"
          :key="sub.title"
          v-tippy="{ content: isCollapsed ? sub.title : '', placement: 'right' }"
          :to="sub.link"
          :class="{ 'justify-center !px-0': isCollapsed }"
          class="flex border-4 h-[50px] px-5 border-transparent group/item1 items-center gap-4 mb-[2px] group cursor-pointer hover:bg-slate-800 rounded-full transition-all ease-in-out duration-500"
        >
          <span
            class="text-xl"
            :class="sub.class"
          ></span>
          <span
            v-if="!isCollapsed"
            class="font-base"
            >{{ sub.title }}</span
          >
        </RouterLink>
      </div>
    </template>
  </div>
</template>
<style scoped>
.router-link-active {
  background-color: #0077fd;
  color: #fff;
  font-weight: 500;
  border: 3px solid #3984e0;
  box-shadow: 0px 8px 20px 1px #3d8ced9c;
}
</style>
