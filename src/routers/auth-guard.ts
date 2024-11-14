import { useAuthStore } from '@/stores/auth'
import type { NavigationGuardWithThis } from 'vue-router'

export const authGuard: NavigationGuardWithThis<any> = async (to, from, next) => {
  document.title = (to.meta?.title as string) || 'Quizzfly - Create, Share, Play Quizzes'
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
      // localStorage.setItem('redirect', to.fullPath)
      const encodedUrl = encodeURIComponent(to.fullPath)
      console.log('encodedUrl', to.fullPath, encodedUrl, decodeURIComponent(encodedUrl))
      next({ name: 'login', query: { redirect: encodedUrl } })
    }
  }
}

export const workspaceGuard: NavigationGuardWithThis<any> = async (to, from, next) => {
  next('/')
}
