import { defineStore } from 'pinia'
import { io } from 'socket.io-client'
import type { IRoomSocket, IMember, ILocked, IRoomLocked, IKickMem } from '@/types/room'
import { useRoomStore } from './room'
import { showToast } from '@/utils/toast'
import { apiError } from '@/utils/exceptionHandler'
import router from '@/routers/router'

const BASE_URL_SOCKET = import.meta.env.VITE_BASE_URL_SOCKET

export const useSocketStore = defineStore({
  id: 'socket',
  state: () => ({
    client: null as any,
    connected: false,
    message: {} as any,
  }),
  actions: {
    setupSocketStore() {
      const roomStore = useRoomStore()
      this.clearSocketStore()

      this.client = io(BASE_URL_SOCKET)

      this.client.on('connect', () => {
        this.connected = true
      })

      this.client.on('playerJoined', (newContent: IMember) => {
        roomStore.setMemberJoins(newContent)
      })

      this.client.on('roomLocked', (newContent: IRoomLocked) => {
        this.message = newContent
        roomStore.setLockedRoom(newContent.locked)
      })

      this.client.on('exception', (newContent: any) => {
        this.message = newContent
      })

      this.client.on('playerLeft', (newContent: IMember) => {
        const index = roomStore.getListMemberJoins.findIndex(
          (item: any) => item.socketId === newContent.new_player.socket_id,
        )
        if (index !== -1) {
          roomStore.getListMemberJoins.splice(index, 1)
        }
      })

      this.client.on('kickPlayer', (newContent: IMember) => {
        const index = roomStore.getListMemberJoins.findIndex(
          (item: any) => item.socketId === newContent.new_player.socket_id,
        )
        if (index !== -1) {
          roomStore.getListMemberJoins.splice(index, 1)
        }
      })
    },
    handleCreateRoomData(data: IRoomSocket) {
      this.client.emit('createRoom', data)
    },
    handleJoinRoomData(data: IRoomSocket) {
      try {
        this.client.emit('joinRoom', data)
        router.push({
          name: 'play-instruction',
        })
      } catch (error) {
        showToast({
          title: 'Join failed',
          description: apiError(error).message,
          variant: 'destructive',
        })
      }
    },
    handleLeaveRoomData(data: ILocked) {
      this.client.emit('leaveRoom', data)
    },
    handleKickMember(data: IKickMem) {
      this.client.emit('kickPlayer', data)
    },
    handleLockRoomData(data: ILocked) {
      this.client.emit('lockRoom', data)
      showToast({
        title: 'Success',
        description: 'Lock room success',
        variant: 'default',
      })
    },
    handleUnlockRoomData(data: ILocked) {
      this.client.emit('unlockRoom', data)
      showToast({
        title: 'Success',
        description: 'Unlock room success',
        variant: 'default',
      })
    },
    clearSocketStore() {
      if (this.client) {
        this.client.disconnect()
        this.client = null
        this.connected = false
      }
    },
  },
  getters: {
    getMessage: (state) => state.message,
  },
})
