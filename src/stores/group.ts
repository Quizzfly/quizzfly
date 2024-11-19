import { createGroupApi, getGroupsApi, getMemberGroupApi } from '@/services/group'
import type { IGroup, IGroupCreate, IMemberGroup } from '@/types/group'
import { showToast } from '@/utils/toast'
import { defineStore } from 'pinia'
import { apiError } from '@/utils/exceptionHandler'
import type { IPaging } from '@/types'

export const useGroupStore = defineStore({
  id: 'group',
  state: () => ({
    groupInfo: {} as IGroup,
    isUpdating: false,
    groups: [] as IGroup[],
    groupMeta: null as IPaging | null,
    listMembers: [] as IMemberGroup[],
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
    async listMemberGroups(idGroup: string) {
      try {
        const { data } = await getMemberGroupApi(idGroup)
        this.setMembersGroup(data)
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
  },
})
