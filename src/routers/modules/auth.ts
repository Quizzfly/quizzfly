import type { RouteRecordRaw } from 'vue-router'

export const authRoute: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/auth/login.vue'),
  },
  {
    path: '/register',
    children: [
      {
        path: '',
        name: 'register',
        component: () => import('@/pages/auth/register/register.vue'),
      },
      {
        path: 'confirm',
        name: 'register-confirm',
        component: () => import('@/pages/auth/register/confirm.vue'),
      },
    ],
  },
  {
    path: '/password',
    name: 'password',
    children: [
      {
        path: 'forgot',
        name: 'password-forgot',
        component: () => import('@/pages/auth/password/forgot.vue'),
      },
    ],
  },
]
