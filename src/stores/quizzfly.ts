import {
  createQuizzflyDraftApi,
  getQuizzflysApi,
  updateQuizzflySettingsApi,
} from '@/services/quizzfly'
import type { IQuizzflyInfo } from '@/types/quizzfly'
import { showToast } from '@/utils/toast'
import { defineStore } from 'pinia'
import router from '@/routers/router'

export const useQuizzflyStore = defineStore({
  id: 'quizzfly',
  state: () => ({
    quizzflyInfo: {
      title: 'Untitled',
      cover_image: null,
      is_public: false,
      quizzfly_status: 'string',
      id: '',
      theme: null,
      user_id: '',
      created_at: '',
      updated_at: '',
      deleted_at: null,
    } as IQuizzflyInfo,
    isUpdating: false,
    quizzflys: [] as IQuizzflyInfo[],
  }),
  actions: {
    async initQuizzflyDraft() {
      try {
        this.isUpdating = true
        const { data } = await createQuizzflyDraftApi(this.quizzflyInfo)
        this.setQuizzflyInfo(data)
        router.push({
          name: 'quizzfly-create',
          params: { quizzflyId: data.id },
          query: { draft: 'true' },
        })
      } catch (error) {
        console.error(error)
        showToast({
          description: 'Create quizzfly draft failed',
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
      } catch (error) {
        console.error(error)
        showToast({
          description: 'Update quizzfly draft failed',
          variant: 'destructive',
        })
      }
      setTimeout(() => {
        this.isUpdating = false
      }, 500)
    },
    async fetchQuizzflys() {
      try {
        const { data } = await getQuizzflysApi()
        this.quizzflys = data
      } catch (error) {
        console.error(error)
        showToast({
          description: 'Fetch quizzflys failed',
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
  },
})
