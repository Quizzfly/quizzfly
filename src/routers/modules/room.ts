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
    path: 'host-live/:roomId/play',
    name: 'host-live-play',
    meta: {
      layout: 'GuestLayout',
    },
    component: () => import('@/pages/room/host-play/show-quizzfly.vue'),
  },
]
