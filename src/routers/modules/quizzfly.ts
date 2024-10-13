import type { RouteRecordRaw } from 'vue-router'

export const quizzflyRoute: RouteRecordRaw[] = [
  {
    path: '',
    name: 'quizzfly',
    component: () => import('@/pages/quizzfly/index.vue'),
  },
  {
    path: 'create/:quizzflyId',
    name: 'quizzfly-create',
    meta: {
      layout: 'QuizCreateLayout',
    },
    component: () => import('@/pages/quizzfly/create.vue'),
  },
]
