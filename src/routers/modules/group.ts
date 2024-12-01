import type { RouteRecordRaw } from 'vue-router'

export const groupRoute: RouteRecordRaw[] = [
  {
    path: '',
    name: 'groups',
    component: () => import('@/pages/groups/index.vue'),
  },
  {
    path: ':groupId',
    name: 'group-detail',
    component: () => import('@/pages/groups/detail/group-detail.vue'),
  },
  {
    path: ':groupId/posts/:postId',
    name: 'group-post-detail',
    component: () => import('@/pages/groups/detail/post-detail.vue'),
  },
  {
    path: 'joined',
    name: 'group-join',
    component: () => import('@/pages/groups/joinGroup.vue'),
  },
]
