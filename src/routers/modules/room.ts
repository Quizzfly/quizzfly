import type { RouteRecordRaw } from 'vue-router'

export const roomRoute: RouteRecordRaw[] = [
  {
    path: 'host-live/:quizzflyId',
    name: 'host-live',
    meta: {
      layout: 'RoomLayout',
    },
    component: () => import('@/pages/room/hostLive.vue'),
  },
  {
    path: 'play/lobby/:code',
    name: 'play-lobby',
    meta: {
      layout: 'GuestLayout',
    },
    component: () => import('@/pages/room/play/lobbyPlay.vue'),
  },
  {
    path: 'play/instruction',
    name: 'play-instruction',
    meta: {
      layout: 'GuestLayout',
    },
    component: () => import('@/pages/room/play/instructionsPlay.vue'),
  },
]
