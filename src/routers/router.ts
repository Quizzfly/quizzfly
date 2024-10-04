import { createWebHistory, createRouter, type RouteRecordRaw } from 'vue-router'
import { authRoute, dashboardRoute, profileRoute, quizRoute } from './modules'
import { authGuard } from './auth-guard'
const { progress } = useIndicator()

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    beforeEnter: [authGuard],
    component: () => import('@/pages/index.vue'),
    children: dashboardRoute,
  },
  {
    path: '/auth',
    meta: {
      layout: 'GuestLayout',
      public: true,
    },
    beforeEnter: [authGuard],
    children: authRoute,
  },
  {
    path: '/profiles',
    // beforeEnter: [authGuard],
    children: profileRoute,
  },
  {
    path: '/quiz',
    // beforeEnter: [authGuard],
    meta: {
      layout: 'QuizCreateLayout',
    },
    children: quizRoute,
  },
  {
    path: '/test',
    component: () => import('@/pages/test.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(() => {
  progress.value = 0.3
})

router.afterEach(() => {
  setTimeout(() => {
    progress.value = 1
  }, 100)
})

export default router
