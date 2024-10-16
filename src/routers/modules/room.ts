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
  //   {
  //     path: 'create/:quizzflyId',
  //     name: 'quizzfly-create',
  //     meta: {
  //       layout: 'QuizCreateLayout',
  //     },
  //     component: () => import('@/pages/quizzfly/create.vue'),
  //   },
]
