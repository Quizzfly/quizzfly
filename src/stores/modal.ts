/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineStore } from 'pinia'
interface IQuestion {
  title: string
  question: string
  actionConfirm?: any
  actionCancel?: any
  data?: any
  onlyConfirm?: boolean
}

export const useModalConfirm = defineStore({
  id: 'modal-confirm',
  state: () => ({
    isShow: false,
    title: '',
    question: '',
    actionConfirm: null as any,
    actionCancel: null as any,
    data: null as any,
    onlyConfirm: false,
  }),
  actions: {
    setQuestion(data: IQuestion) {
      this.isShow = true
      this.title = data.title
      this.question = data.question
      this.actionConfirm = data.actionConfirm
      this.actionCancel = data.actionCancel
      this.data = data.data
      this.onlyConfirm = data.onlyConfirm ?? false
    },
    clearQuestion() {
      this.isShow = false
      this.title = ''
      this.question = ''
      this.actionCancel = null
      this.actionConfirm = null
      this.data = null
      this.onlyConfirm = false
    },
  },
})
