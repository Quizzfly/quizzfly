import type { RouteRecordRaw } from 'vue-router'

export const playRoute: RouteRecordRaw[] = [
  {
    path: ':code',
    name: 'play-lobby-code',
    meta: {
      layout: 'GuestLayout',
    },
    component: () => import('@/pages/room/member-play/lobbyPlay.vue'),
  },
  {
    path: '',
    name: 'play-lobby',
    meta: {
      layout: 'GuestLayout',
    },
    component: () => import('@/pages/room/member-play/pinCodePlay.vue'),
  },
  {
    path: 'instruction',
    name: 'play-instruction',
    meta: {
      layout: 'GuestLayout',
    },
    component: () => import('@/pages/room/member-play/instructionsPlay.vue'),
  },
]
