/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineStore } from 'pinia'
interface IQuestion {
  title: string
  question: string
  actionConfirm?: any
  actionCancel?: any
  data?: any
  onlyConfirm?: boolean
  success?: boolean
  error?: boolean
}

export const useConfirmDialog = defineStore({
  id: 'modal-confirm',
  state: () => ({
    confirmationResolver: null as any,
    data: null as IQuestion | null,
  }),
  actions: {
    open(data: IQuestion) {
      this.data = data
      return new Promise((resolve) => {
        this.confirmationResolver = {
          resolve,
          data,
        }
      }) as Promise<{ isConfirmed: boolean; data: IQuestion }>
    },
    confirm(value: boolean) {
      this.confirmationResolver.resolve({
        isConfirmed: value,
        data: this.data,
      })
      this.confirmationResolver = null
      this.data = null
    },
  },
  getters: {
    getQuestion: (state) => state.data,
  },
})
