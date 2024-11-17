import {
  createQuizzflyDraftApi,
  getQuizzflyApi,
  getQuizzflysApi,
  updateQuizzflySettingsApi,
} from '@/services/quizzfly'
import type { IQuizzflyInfo } from '@/types/quizzfly'
import { showToast } from '@/utils/toast'
import { defineStore } from 'pinia'
import router from '@/routers/router'
import { apiError } from '@/utils/exceptionHandler'
import { createQuizApi } from '@/services/quizzes'
import type { IPaging } from '@/types'

export const useQuizzflyStore = defineStore({
  id: 'quizzfly',
  state: () => ({
    quizzflyInfo: {
      title: 'Untitled',
      cover_image: null,
      is_public: false,
      quizzfly_status: 'string',
      id: '',
      theme: '',
      user_id: '',
      created_at: '',
      updated_at: '',
      deleted_at: null,
    } as IQuizzflyInfo,
    isUpdating: false,
    isFetching: false,
    quizzflys: [] as IQuizzflyInfo[],
    quizzflyMeta: null as IPaging | null,
  }),
  actions: {
    setIsUpdating(val: boolean) {
      this.isUpdating = val
    },
    async initQuizzflyDraft() {
      try {
        this.isUpdating = true
        const { data } = await createQuizzflyDraftApi(this.quizzflyInfo)
        this.setQuizzflyInfo(data)
        await createQuizApi(data.id, { quiz_type: 'MULTIPLE_CHOICE' })
        router.push({
          name: 'quizzfly-create',
          params: { quizzflyId: data.id },
          query: { draft: 'true' },
        })
      } catch (error) {
        console.error(error)
        showToast({
          description: apiError(error).message,
          variant: 'destructive',
        })
      }
      this.isUpdating = false
    },
    setQuizzflyInfo(val: IQuizzflyInfo) {
      this.quizzflyInfo = { ...this.quizzflyInfo, ...val }
    },
    async updateQuizzflySettings(id: string, val: Partial<IQuizzflyInfo>) {
      this.isUpdating = true
      try {
        const { data } = await updateQuizzflySettingsApi(id, val)
        this.setQuizzflyInfo({ ...data })
        showToast({
          description: 'Update quizzfly settings successfully',
        })
      } catch (error) {
        console.error(error)
        showToast({
          description: apiError(error).message,
          variant: 'destructive',
        })
      }
      setTimeout(() => {
        this.isUpdating = false
      }, 500)
    },
    async fetchQuizzflys({ page = 1, keyword = '' }: { page?: number; keyword?: string } = {}) {
      try {
        this.isFetching = true
        const { data, meta } = await getQuizzflysApi({ page, keyword })
        this.quizzflys = data
        this.quizzflyMeta = meta as IPaging
      } catch (error) {
        console.error(error)
        showToast({
          description: 'Fetch quizzflys failed',
          variant: 'destructive',
        })
        throw error
      } finally {
        this.isFetching = false
      }
    },
    async getQuizzflyDetail(id: string) {
      try {
        const { data } = await getQuizzflyApi(id)
        this.setQuizzflyInfo(data)
      } catch (error) {
        console.error(error)
        showToast({
          description: 'Fetch quizzfly detail failed',
          variant: 'destructive',
        })
        throw error
      }
    },
  },
  getters: {
    getQuizzflyInfo: (state) => state.quizzflyInfo,
    getIsUpdating: (state) => state.isUpdating,
    getQuizzflys: (state) => state.quizzflys,
    getQuizzflyMeta: (state) => state.quizzflyMeta,
    getIsFetching: (state) => state.isFetching,
  },
})
