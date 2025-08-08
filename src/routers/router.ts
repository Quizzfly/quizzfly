import { createWebHistory, createRouter, type RouteRecordRaw } from 'vue-router'
import {
  authRoute,
  dashboardRoute,
  profileRoute,
  quizzflyRoute,
  roomRoute,
  playRoute,
  groupRoute,
  reportRoute,
  planRoute,
} from './modules'
import { authGuard } from './auth-guard'
const { progress } = useIndicator()

const routes: RouteRecordRaw[] = [
  {
    path: '/dashboard',
    beforeEnter: [authGuard],
    component: () => import('@/pages/index.vue'),
    children: dashboardRoute,
  },
  {
    path: '/',
    component: () => import('@/pages/landing/index.vue'),
    meta: {
      layout: 'GuestLayout',
      unAuth: true,
    },
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
    beforeEnter: [authGuard],
    children: profileRoute,
  },
  {
    path: '/quizzfly',
    beforeEnter: [authGuard],
    children: quizzflyRoute,
  },
  {
    path: '/room',
    beforeEnter: [authGuard],
    component: () => import('@/pages/room/index.vue'),
    children: roomRoute,
  },
  {
    path: '/groups',
    beforeEnter: [authGuard],
    component: () => import('@/pages/groups/detail/index.vue'),
    children: groupRoute,
  },
  {
    path: '/play',
    meta: {
      layout: 'GuestLayout',
      unAuth: true,
    },
    beforeEnter: [authGuard],
    children: playRoute,
  },
  {
    path: '/reports',
    beforeEnter: [authGuard],
    children: reportRoute,
  },
  {
    path: '/billing-plan',
    beforeEnter: [authGuard],
    children: planRoute,
  },
  {
    path: '/test',
    component: () => import('@/pages/test.vue'),
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    meta: {
      layout: 'GuestLayout',
    },
    redirect: '/404',
    children: [],
  },
  {
    path: '/404',
    name: '404',
    meta: {
      layout: 'GuestLayout',
    },
    component: () => import('@/pages/NotFound.vue'),
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
