import { defineStore } from 'pinia'
import { io } from 'socket.io-client'
import type { IRoomSocket, IMember, ILocked, IRoomLocked } from '@/types/room'
import { useRoomStore } from './room'
import { showToast } from '@/utils/toast'
import { apiError } from '@/utils/exceptionHandler'

const router = useRouter()

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
        console.log('Connected to WebSocket server')
      })

      this.client.on('playerJoined', (newContent: IMember) => {
        router.push({
          name: 'play-instruction',
        })
        console.log('Received roomMembersJoin:', newContent) // Debug
        roomStore.setMemberJoins(newContent)
      })

      this.client.on('roomLocked', (newContent: IRoomLocked) => {
        this.message = newContent
        console.log('Received response locked:', newContent) // Debug
        roomStore.setLockedRoom(newContent.locked)
      })

      this.client.on('exception', (newContent: any) => {
        console.log('Received response locked:', newContent) // Debug
        this.message = newContent
      })

      this.client.on('playerLeft', (newContent: IMember) => {
        console.log('Received roomMembersLeave:', newContent) // Debug
        const index = roomStore.getListMemberJoins.findIndex(
          (item: any) => item.socketId === newContent.new_player.socket_id,
        )
        if (index !== -1) {
          roomStore.getListMemberJoins.splice(index, 1)
        }
      })
    },
    handleCreateRoomData(data: IRoomSocket) {
      console.log('Emitting createRoom with data:', data)
      this.client.emit('createRoom', data)
    },
    handleJoinRoomData(data: IRoomSocket) {
      console.log('Emitting joinRoom with data:', data)
      try {
        this.client.emit('joinRoom', data)
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
    handleLockRoomData(data: ILocked) {
      console.log('Emitting joinRoom with data:', data)
      this.client.emit('lockRoom', data)
    },
    handleUnlockRoomData(data: ILocked) {
      console.log('Emitting joinRoom with data:', data)
      this.client.emit('unlockRoom', data)
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
