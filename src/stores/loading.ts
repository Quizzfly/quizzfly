// refactor user store
import { defineStore } from 'pinia'

export const useLoadingStore = defineStore({
  id: 'loading',
  state: () => ({
    isLoading: false as boolean,
  }),
  actions: {
    setLoading(val: boolean) {
      this.isLoading = val
    },
  },
  getters: {
    getLoading: (state) => state.isLoading,
  },
})
