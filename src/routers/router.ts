import { createWebHistory, createRouter, type RouteRecordRaw } from 'vue-router'
import { authRoute, homeRoute } from './modules'
import { authGuard } from './auth-guard'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    beforeEnter: [authGuard],
    component: () => import('@/pages/index.vue'),
    children: homeRoute,
  },
  {
    path: '/auth',
    name: 'auth',
    meta: {
      layout: 'GuestLayout',
      public: true,
    },
    beforeEnter: [authGuard],
    children: authRoute,
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

export default router
