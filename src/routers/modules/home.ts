import type { RouteRecordRaw } from 'vue-router'

export const homeRoute: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'dashboard',
    component: () => import('@/pages/index.vue'),
  },
]
