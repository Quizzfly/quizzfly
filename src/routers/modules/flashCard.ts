import type { RouteRecordRaw } from 'vue-router'

export const flashCardRoute: RouteRecordRaw[] = [
  {
    path: '',
    name: 'flash-card',
    component: () => import('@/pages/flash-card/index.vue'),
  },
  {
    path: '/set-card',
    name: 'set-card',
    component: () => import('@/pages/flash-card/card/setCard.vue'),
  },
  {
    path: '/set-folder',
    name: 'set-folder',
    component: () => import('@/pages/flash-card/folder/setFolder.vue'),
  },
]
