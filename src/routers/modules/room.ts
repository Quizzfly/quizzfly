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
    path: 'lobby/:quizzflyId',
    name: 'lobby',
    meta: {
      layout: 'RoomLayout',
    },
    component: () => import('@/pages/room/lobby.vue'),
  },
  {
    path: 'play/lobby/:code',
    name: 'play-lobby-code',
    meta: {
      layout: 'GuestLayout',
    },
    component: () => import('@/pages/room/play/lobbyPlay.vue'),
  },
  {
    path: 'play/lobby',
    name: 'play-lobby',
    meta: {
      layout: 'GuestLayout',
    },
    component: () => import('@/pages/room/play/pinCodePlay.vue'),
  },
  {
    path: 'play/instruction',
    name: 'play-instruction',
    meta: {
      layout: 'GuestLayout',
    },
    component: () => import('@/pages/room/play/instructionsPlay.vue'),
  },
  {
    path: 'host-live/:roomId/play',
    name: 'host-live-play',
    meta: {
      layout: 'GuestLayout',
    },
    component: () => import('@/pages/room/hostPlay/showQuizzfly.vue'),
  },
]
