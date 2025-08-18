import { createCardApi, getCardsApi, getCardDetailApi, deleteCardApi } from '@/services/flashCard'
import type { IGroup, IGroupCreate, IMemberGroup, IDetailGroup } from '@/types/group'
import { showToast } from '@/utils/toast'
import { defineStore } from 'pinia'
import { apiError } from '@/utils/exceptionHandler'
import type { IPaging } from '@/types'

export const useCardStore = defineStore({
  id: 'card',
  state: () => ({
    groupInfo: {} as IDetailGroup,
    isUpdating: false,
    groups: [] as IGroup[],
    groupMeta: null as IPaging | null,
    listMembers: [] as IMemberGroup[],
    isFetching: false,
  }),
  actions: {
    setIsUpdating(val: boolean) {
      this.isUpdating = val
    },
    async initCard(payload: IGroupCreate) {
      try {
        this.isUpdating = true
        const { data } = await createCardApi(payload)
        this.setGroupInfo(data)
      } catch (error) {
        console.error(error)
        showToast({
          description: apiError(error).message,
          variant: 'destructive',
        })
      }
      this.isUpdating = false
    },
    async fetchCards({ page = 1, keyword = '' }) {
      try {
        this.isFetching = true
        const { data, meta } = await getCardsApi({ page, keyword })
        this.groups = data
        this.groupMeta = meta as IPaging
      } catch (error) {
        console.error(error)
        showToast({
          description: 'Fetch groups failed',
          variant: 'destructive',
        })
        throw error
      } finally {
        this.isFetching = false
      }
    },
    async getDetailCard(idGroup: string) {
      try {
        await getCardDetailApi(idGroup)
        // this.setGroupInfo(data)
      } catch (error) {
        showToast({
          description: apiError(error).message,
          variant: 'destructive',
        })
      }
    },
    async handleDeleteCard(idGroup: string) {
      try {
        await deleteCardApi(idGroup)
        const index = this.groups.findIndex((i) => i.group.id === idGroup)
        index > -1 && this.groups.splice(index, 1)
        showToast({
          description: 'Delete group success',
          variant: 'default',
        })
      } catch (error) {
        showToast({
          description: apiError(error).message,
          variant: 'destructive',
        })
      }
    },
    setGroupInfo(val: IGroup) {
      this.groupInfo = { ...this.groupInfo, ...val }
    },
    setMembersGroup(val: any) {
      this.listMembers = val
    },
  },
  getters: {
    getGroupInfo: (state) => state.groupInfo,
    getIsUpdating: (state) => state.isUpdating,
    getGroups: (state) => state.groups,
    getGroupMeta: (state) => state.groupMeta,
    getMemberGroup: (state) => state.listMembers,
    getIsFetching: (state) => state.isFetching,
  },
})
