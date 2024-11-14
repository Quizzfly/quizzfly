import type { RouteRecordRaw } from 'vue-router'

export const groupRoute: RouteRecordRaw[] = [
  {
    path: '',
    name: 'groups',
    component: () => import('@/pages/groups/index.vue'),
  },
  {
    path: 'owned-groups',
    name: 'owned-groups',
    component: () => import('@/pages/groups/owned.vue'),
  },
  {
    path: 'joined-groups',
    name: 'joined-groups',
    component: () => import('@/pages/groups/joined.vue'),
  },
]
