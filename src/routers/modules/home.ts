import type { RouteRecordRaw } from 'vue-router'

export const dashboardRoute: RouteRecordRaw[] = [
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/pages/index.vue'),
  },
]
