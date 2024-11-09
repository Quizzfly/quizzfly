import { defineStore } from 'pinia'
import { io } from 'socket.io-client'
import type { IRoomSocket, IMember } from '@/types/room'
import { useRoomStore } from './room'

const BASE_URL_SOCKET = import.meta.env.VITE_BASE_URL_SOCKET

export const useSocketStore = defineStore({
  id: 'socket',
  state: () => ({
    client: null as any,
    connected: false,
    messages: {} as any,
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
        console.log('Received roomMembersJoin:', newContent) // Debug
        roomStore.setMemberJoins(newContent)
      })

      this.client.on('roomLocked', (newContent: boolean) => {
        console.log('Received response locked:', newContent) // Debug
        roomStore.setLockedRoom(newContent)
      })

      this.client.on('playerLeft', (newContent: IMember) => {
        console.log('Received roomMembersLeave:', newContent) // Debug
        const index = roomStore.getListMemberJoins.findIndex(
          (item: any) => item.socketId === newContent.newPlayer.socketId,
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
      this.client.emit('joinRoom', data)
    },
    handleLeaveRoomData(roomPin: string) {
      this.client.emit('leaveRoom', roomPin)
    },
    handleLockRoomData(roomPin: string) {
      console.log('Emitting joinRoom with data:', roomPin)
      this.client.emit('lockRoom', roomPin)
    },
    handleUnlockRoomData(roomPin: string) {
      console.log('Emitting joinRoom with data:', roomPin)
      this.client.emit('unlockRoom', {
        roomPin: roomPin,
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
    getMessages: (state) => state.messages,
  },
})
