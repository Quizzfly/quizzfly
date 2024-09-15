import type { RouteRecordRaw } from 'vue-router'

export const quizRoute: RouteRecordRaw[] = [
  {
    path: '',
    name: 'quiz',
    component: () => import('@/pages/quiz/create.vue'),
  },
  {
    path: 'create',
    name: 'quiz-create',
    component: () => import('@/pages/quiz/create.vue'),
  },
]
