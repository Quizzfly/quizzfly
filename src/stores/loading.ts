// refactor user store
import { defineStore } from 'pinia'

export const useLoadingStore = defineStore({
  id: 'loading',
  state: () => ({
    isLoading: false as boolean,
    opacity: false as boolean,
  }),
  actions: {
    setLoading(val: boolean, opacity = true) {
      this.isLoading = val
      this.opacity = opacity
    },
  },
  getters: {
    getIsLoading: (state) => state.isLoading,
    getOpacity: (state) => state.opacity,
  },
})
