import { useAuthStore } from '@/stores/auth'
import type { NavigationGuardWithThis } from 'vue-router'

export const authGuard: NavigationGuardWithThis<any> = async (to, from, next) => {
  document.title = (to.meta?.title as string) || 'Home'
  const authStore = useAuthStore()

  const isLoggedIn = authStore.getIsLoggedIn
  const isPublicRoute = to.meta?.public

  if (isLoggedIn) {
    isPublicRoute ? next('/') : next()
  } else {
    // localStorage.setItem('redirect', to.fullPath)
    // isPublicRoute ? next() : next({ name: 'login' })
    if (isPublicRoute) {
      next()
    } else {
      localStorage.setItem('redirect', to.fullPath)
      next({ name: 'login' })
    }
  }
}

export const workspaceGuard: NavigationGuardWithThis<any> = async (to, from, next) => {
  next('/')
}
