import type { RouteRecordRaw } from 'vue-router'

export const playRoute: RouteRecordRaw[] = [
  {
    path: ':code',
    name: 'play-lobby-code',
    meta: {
      layout: 'GuestLayout',
    },
    component: () => import('@/pages/room/member-play/lobby-play.vue'),
  },
  {
    path: '',
    name: 'play-lobby',
    component: () => import('@/pages/room/member-play/code-play.vue'),
  },
  {
    path: 'instruction',
    name: 'play-instruction',
    meta: {
      redirectOnErrorRouterName: 'play-lobby',
    },
    component: () => import('@/pages/room/member-play/instructions-play.vue'),
  },
]
