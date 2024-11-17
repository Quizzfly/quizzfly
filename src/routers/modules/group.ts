import type { RouteRecordRaw } from 'vue-router'

export const groupRoute: RouteRecordRaw[] = [
  {
    path: '',
    name: 'groups',
    component: () => import('@/pages/groups/index.vue'),
  },
  {
    path: 'detail/:groupId',
    name: 'group-detail',
    component: () => import('@/pages/groups/detail.vue'),
  },
]
