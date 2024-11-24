import {
  createGroupApi,
  getGroupsApi,
  getMemberGroupApi,
  getGroupDetailApi,
  deleteGroupApi,
} from '@/services/group'
import type { IGroup, IGroupCreate, IMemberGroup, IDetailGroup } from '@/types/group'
import { showToast } from '@/utils/toast'
import { defineStore } from 'pinia'
import { apiError } from '@/utils/exceptionHandler'
import type { IPaging } from '@/types'

export const useGroupStore = defineStore({
  id: 'group',
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
        this.isFetching = true
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
      } finally {
        this.isFetching = false
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
    async getDetailGroup(idGroup: string) {
      try {
        const { data } = await getGroupDetailApi(idGroup)
        this.setGroupInfo(data)
      } catch (error) {
        showToast({
          description: apiError(error).message,
          variant: 'destructive',
        })
      }
    },
    async handleDeleteGroup(idGroup: string) {
      try {
        await deleteGroupApi(idGroup)
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
      console.log(val, 'check val group')
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
