import { defineStore } from 'pinia'
import type { IUser } from '@/types'
import { getInfoApi } from '@/services/user'

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    user: null as IUser | null,
    token: {
      access: '',
    },
    returnUrl: '',
  }),
  actions: {
    setUser(user: IUser) {
      this.user = user
    },
    getInfo() {
      return getInfoApi()
    },
  },
})
