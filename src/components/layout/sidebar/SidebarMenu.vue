<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { useI18n } from 'vue-i18n'

defineProps<{
  isCollapsed: boolean
  sidebarMode: 'dark' | 'light'
}>()

const { t } = useI18n()
const authStore = useAuthStore()
interface Menu {
  title: string
  children: {
    class: string
    title: string
    link: string
    item_right?: string
  }[]
}

const menus = ref<Menu[]>([
  {
    title: t('sidebar.dashboard_menu'),
    children: [
      {
        class: 'i-solar-graph-bold',
        title: t('sidebar.dashboard'),
        link: '/dashboard',
      },
    ],
  },
  {
    title: t('sidebar.personal_menu'),
    children: [
      {
        class: 'i-solar-user-bold-duotone',
        title: t('sidebar.profiles'),
        link: '/profiles',
      },
      {
        class: 'i-solar-users-group-rounded-bold-duotone',
        title: t('sidebar.groups'),
        link: '/groups',
      },
      {
        class: 'i-solar-bolt-bold-duotone',
        title: t('sidebar.quiz_management'),
        link: '/quizzfly',
      },
      {
        class: 'i-solar-document-add-bold',
        title: t('sidebar.report'),
        link: '/reports',
      },
      {
        class: 'i-solar-document-add-bold',
        title: 'FlashCard',
        link: '/flash-card',
      },
    ],
  },
  {
    title: t('sidebar.plan_menu'),
    children: [
      {
        class: 'i-solar-money-bag-bold-duotone',
        title: t('sidebar.billing_plan'),
        link: '/billing-plan/plans',
        item_right: authStore.getHighestPlan ? authStore.getHighestPlan.subscription_plan.name : '',
      },
      {
        class: 'i-solar-alarm-bold',
        title: t('sidebar.payment_history'),
        link: '/billing-plan/history',
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
          :class="{ 'justify-center !px-0': isCollapsed, 'light-mode': sidebarMode === 'light' }"
          class="relative flex border-4 h-[50px] px-5 pr-2 border-transparent group/item1 items-center gap-4 mb-[2px] group cursor-pointer hover:bg-slate-800 rounded-full transition-all ease-in-out duration-500"
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

          <span
            v-if="sub.item_right"
            class="chip ml-auto text-[10px] border border-[#F47432] text-[#F47432] px-2 py-1 rounded-full"
          >
            {{ sub.item_right }}
          </span>
        </RouterLink>
      </div>
    </template>
  </div>
</template>
<style scoped>
.light-mode:hover {
  background-color: #e6e6e6;
}

.router-link-active {
  background-color: #0077fd !important;
  color: #fff;
  font-weight: 500;
  border: 3px solid #3984e0;
  /* box-shadow: 0px 8px 20px 1px #3d8ced9c; */
  box-shadow: 0px 8px 20px 1px #3d8ced70;
  z-index: 10;
}

.router-link-active .chip {
  background-color: #f47432;
  color: #fff;
}
</style>
