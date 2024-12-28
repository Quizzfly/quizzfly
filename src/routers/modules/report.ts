import type { RouteRecordRaw } from 'vue-router'

export const reportRoute: RouteRecordRaw[] = [
  {
    path: '',
    name: 'reports',
    component: () => import('@/pages/reports/index.vue'),
  },
  {
    path: ':id',
    name: 'reports-detail',
    component: () => import('@/pages/reports/[id].vue'),
  },
]
