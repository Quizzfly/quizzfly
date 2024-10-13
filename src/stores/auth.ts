import { defineStore } from 'pinia'
import { getInfoApi } from '@/services/user'
import router from '@/routers/router'
import { loginApi } from '@/services/auth'
import { showToast } from '@/utils/toast'
import { apiError } from '@/utils/exceptionHandler'
import type { IUser } from '@/types/user'

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    // initialize state from local storage to enable user to stay logged in
    user: null as IUser | null,
    returnUrl: '',
    isLoggedIn: false,
    token: {
      access: '',
      refresh: '',
    },
  }),
  actions: {
    logout() {
      localStorage.removeItem('refresh_token')
      localStorage.removeItem('access_token')
      this.user = null
      this.isLoggedIn = false
      this.token = {
        access: '',
        refresh: '',
      }
      // location.reload()
      router.push({ name: 'login' })
    },
    setUser(user: IUser) {
      this.user = user
    },
    async login(email: string, password: string) {
      try {
        const { data } = await loginApi(email, password)
        localStorage.setItem('access_token', data.access_token)
        localStorage.setItem('refresh_token', data.refresh_token)
        location.reload()
      } catch (error) {
        showToast({
          title: 'Login failed',
          description: apiError(error).message,
          variant: 'destructive',
        })
      }
    },
    async setupAuth() {
      try {
        const access_token = localStorage.getItem('access_token') as string

        if (access_token) {
          this.token.access = access_token
          const { data: user } = await getInfoApi()
          console.log('LOG user', user)
          user && (this.user = user)
          this.isLoggedIn = true
        }
      } catch (error) {
        console.error('Setup auth error', error)
      }
    },
    setToken(access: string) {
      if (access) {
        this.token.access = access
        localStorage.setItem('access_token', access)
      }
    },
  },
  getters: {
    getUser: (state) => state.user,
    getIsLoggedIn: (state) => state.isLoggedIn,
  },
})
