import { getDetailRoomApi, createRoomApi, settingRoomApi } from '@/services/room'
import type { IRoom, IMember } from '@/types/room'
import { showToast } from '@/utils/toast'
import { defineStore } from 'pinia'
import { apiError } from '@/utils/exceptionHandler'
import router from '@/routers/router'

export const useRoomStore = defineStore({
  id: 'room',
  state: () => ({
    isLoading: false,
    roomDetail: {} as IRoom,
    memberName: '',
    currentSetting: {
      quizzfly_id: '',
      is_show_question: false,
      is_auto_play: false,
      lobby_music: 'string',
    },
    listMemberJoins: [] as IMember[],
    locked: false,
  }),
  actions: {
    async initRoom(val: any) {
      try {
        this.isLoading = true
        const { data } = await createRoomApi(val)
        this.setDetailRoom(data)
      } catch (error) {
        console.error(error)
        showToast({
          description: apiError(error).message,
          variant: 'destructive',
        })
        router.push({ name: 'host-live' })
      }
    },
    setDetailRoom(val: Partial<IRoom>) {
      Object.assign(this.roomDetail, val)
    },
    setMemberJoins(data: any) {
      this.listMemberJoins.push(data)
    },
    setLockedRoom(val: boolean) {
      this.locked = val
    },
    setMemberName(val: string) {
      this.memberName = val
    },
    async settingRoom(id: string, val: any) {
      this.isLoading = true
      try {
        const { data } = await settingRoomApi(id, val)
        this.setCurrentSetting({ ...data })
        showToast({
          description: 'Update room settings successfully',
        })
      } catch (error) {
        console.error(error)
        showToast({
          description: apiError(error).message,
          variant: 'destructive',
        })
      }
    },
    async getRoomDetail(id: string) {
      try {
        const { data } = await getDetailRoomApi(id)
        this.setDetailRoom(data)
      } catch (error) {
        console.error(error)
        showToast({
          description: 'Fetch room detail failed',
          variant: 'destructive',
        })
        throw error
      }
    },
    setCurrentSetting(data: any) {
      this.currentSetting = data
    },
  },
  getters: {
    getRoomInfo: (state) => state.roomDetail,
    getIsLoading: (state) => state.isLoading,
    getCurrentSetting: (state) => state.currentSetting,
    getListMemberJoins: (state) => state.listMemberJoins,
    getLockedRoom: (state) => state.locked,
    getMemberName: (state) => state.memberName,
  },
})
