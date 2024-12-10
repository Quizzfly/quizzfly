<script setup lang="ts">
defineProps<{
  isCollapsed: boolean
}>()
const menus = ref([
  {
    title: 'PERSONAL',
    children: [
      {
        class: 'i-solar-user-linear group-hover/item1:i-solar-user-bold-duotone',
        title: 'Profiles',
        link: '/profiles',
      },
      {
        class:
          'i-solar-users-group-rounded-line-duotone group-hover/item1:i-solar-users-group-rounded-bold-duotone',
        title: 'Groups',
        link: '/groups',
      },
      {
        class: 'i-solar-bolt-broken group-hover/item1:i-solar-bolt-bold-duotone',
        title: 'Quiz Management',
        link: '/quizzfly',
      },
    ],
  },
  {
    title: 'PAYMENTS',
    children: [
      {
        class: 'i-solar-money-bag-broken group-hover/item1:i-solar-money-bag-bold-duotone',
        title: 'Payment history',
        link: '/dashboard',
      },
    ],
  },
])
</script>
<template>
  <div class="mt-5">
    <RouterLink
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
    </RouterLink>

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
          :class="{ 'justify-center': isCollapsed }"
          class="flex group/item1 items-center gap-2 mb-[2px] group cursor-pointer hover:text-[#0061ff] hover:bg-[#eff7ff] py-3 px-2 rounded-xl transition-all ease-in-out duration-500"
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
  background-color: #eff7ff;
  color: #0061ff;
  font-weight: 500;
}
</style>
