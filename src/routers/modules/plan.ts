import type { RouteRecordRaw } from 'vue-router'

export const planRoute: RouteRecordRaw[] = [
  {
    path: 'plans',
    name: 'billing-plan',
    component: () => import('@/pages/billing-plan/index.vue'),
  },
  {
    path: 'pay',
    name: 'billing-plan-pay',
    meta: {
      layout: 'GuestLayout',
    },
    component: () => import('@/pages/billing-plan/pay.vue'),
  },
  {
    path: 'history',
    name: 'billing-plan-history',
    component: () => import('@/pages/billing-plan/history.vue'),
  },
]
