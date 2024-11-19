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
  {
    path: 'joined',
    name: 'group-join',
    component: () => import('@/pages/groups/joinGroup.vue'),
  },
]
