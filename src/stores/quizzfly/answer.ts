import type { Answer } from '@/types/question'

export const useAnswerStore = defineStore({
  id: 'answer',
  state: () => ({
    currentAnswer: {} as Answer,
    answers: [] as Answer[],
  }),
  actions: {},
  getters: {},
})
