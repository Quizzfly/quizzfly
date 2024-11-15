import { createGroupApi, getGroupsApi } from '@/services/group'
import type { IGroup, IGroupCreate } from '@/types/group'
import { showToast } from '@/utils/toast'
import { defineStore } from 'pinia'
import { apiError } from '@/utils/exceptionHandler'
import type { IPaging } from '@/types'

export const useGroupStore = defineStore({
  id: 'group',
  state: () => ({
    groupInfo: {
      name: '',
      description: '',
      background: '',
    },
    isUpdating: false,
    groups: [] as IGroup[],
    groupMeta: null as IPaging | null,
  }),
  actions: {
    setIsUpdating(val: boolean) {
      this.isUpdating = val
    },
    async initGroup(payload: IGroupCreate) {
      try {
        this.isUpdating = true
        const { data } = await createGroupApi(payload)
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
    setGroupInfo(val: IGroup) {
      this.groupInfo = { ...this.groupInfo, ...val }
    },
    async fetchGroups({ page = 1, keyword = '' }) {
      try {
        const { data, meta } = await getGroupsApi({ page, keyword })
        this.groups = data
        this.groupMeta = meta as IPaging
      } catch (error) {
        console.error(error)
        showToast({
          description: 'Fetch groups failed',
          variant: 'destructive',
        })
        throw error
      }
    },
  },
  getters: {
    getGroupInfo: (state) => state.groupInfo,
    getIsUpdating: (state) => state.isUpdating,
    getGroups: (state) => state.groups,
    getGroupMeta: (state) => state.groupMeta,
  },
})
