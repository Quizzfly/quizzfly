import { getDetailRoomApi, createRoomApi, settingRoomApi } from '@/services/room'
import type { IRoom } from '@/types/room'
import { showToast } from '@/utils/toast'
import { defineStore } from 'pinia'
import router from '@/routers/router'
import { apiError } from '@/utils/exceptionHandler'

export const useRoomStore = defineStore({
  id: 'room',
  state: () => ({
    isLoading: false,
    roomDetail: {} as IRoom,
    currentSetting: {
      quizzfly_id: '',
      is_show_question: false,
      is_auto_play: false,
      lobby_music: 'string',
    },
    countMemberJoins: 0 as number,
    listMemberJoins: [] as any,
  }),
  actions: {
    async initRoom(val: any) {
      try {
        this.isLoading = true
        const { data } = await createRoomApi(val)
        this.setDetailRoom(data)
        router.push({
          name: 'lobby',
          params: { roomId: data.id },
        })
      } catch (error) {
        console.error(error)
        showToast({
          description: apiError(error).message,
          variant: 'destructive',
        })
      }
    },
    setDetailRoom(val: IRoom) {
      this.roomDetail = val
    },
    setCountMemberJoin(data: number) {
      this.countMemberJoins = data
    },
    setMemberJoins(data: any) {
      this.listMemberJoins.push(data)
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
    getCountMemberJoins: (state) => state.countMemberJoins,
    getListMemberJoins: (state) => state.listMemberJoins,
  },
})
