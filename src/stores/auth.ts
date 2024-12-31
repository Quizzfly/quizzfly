import { defineStore } from 'pinia'
import { getInfoApi } from '@/services/user'
import router from '@/routers/router'
import { loginApi, loginGGApi } from '@/services/auth'
import { showToast } from '@/utils/toast'
import { apiError } from '@/utils/exceptionHandler'
import type { IUser } from '@/types/user'
import { getUserPlansApi } from '@/services/pricing'
import type { UserPricing } from '@/types/pricing'
import { isExpiredPlan } from '@/utils/time'

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
    plans: [] as UserPricing[],
  }),
  actions: {
    async fetchUserPlan() {
      try {
        const { data } = await getUserPlansApi()
        this.plans = data
      } catch (error) {
        console.error('Fetch user plan error', error)
      }
    },
    logout() {
      localStorage.removeItem('refresh_token')
      localStorage.removeItem('access_token')
      this.user = null
      this.isLoggedIn = false
      this.token = {
        access: '',
        refresh: '',
      }
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

        const redirectQuery = router.currentRoute.value.query.redirect as string
        const redirect = redirectQuery ? decodeURIComponent(redirectQuery) : ''

        await this.setupAuth()
        if (redirect) {
          router.push(redirect)
        } else {
          location.reload()
        }
      } catch (error) {
        showToast({
          title: 'Login failed',
          description: apiError(error).message,
          variant: 'destructive',
        })
      }
    },
    async loginGG(access_token: string) {
      try {
        const { data } = await loginGGApi(access_token)
        localStorage.setItem('access_token', data.access_token)
        localStorage.setItem('refresh_token', data.refresh_token)

        const redirectQuery = router.currentRoute.value.query.redirect as string
        const redirect = redirectQuery ? decodeURIComponent(redirectQuery) : ''

        await this.setupAuth()
        if (redirect) {
          router.push(redirect)
        } else {
          location.reload()
        }
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
          user && (this.user = user)
          this.isLoggedIn = true
          await this.fetchUserPlan()
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
    getPlans: (state) => state.plans,
    getActivePlans: (state) => {
      const successPlans = state.plans.filter((p) => p.user_plan_status === 'SUCCESS')
      const activePlan = successPlans.filter(
        (plan) => plan.subscription_expired_at && !isExpiredPlan(plan.subscription_expired_at),
      )
      return activePlan
    },
    getHighestPlan: (state) => {
      const successPlans = state.plans.filter((p) => p.user_plan_status === 'SUCCESS')
      const activePlan = successPlans.filter(
        (plan) => plan.subscription_expired_at && !isExpiredPlan(plan.subscription_expired_at),
      )

      if (activePlan.length === 0) {
        return null // Không có plan nào phù hợp
      }

      return activePlan.reduce((highest, current) =>
        current.subscription_plan.price > highest.subscription_plan.price ? current : highest,
      )
    },
  },
})
