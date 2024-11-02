import { defineStore } from 'pinia'
import { io } from 'socket.io-client'
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

      this.client.on('roomMembersJoin', (newContent: any) => {
        console.log('Received roomMembersJoin:', newContent) // Debug
        roomStore.setMemberJoins(newContent)
      })

      this.client.on('roomMembersCount', (newContent: any) => {
        console.log('Received roomMembersCount:', newContent) // Debug
        roomStore.setCountMemberJoin(newContent)
      })

      this.client.on('roomMembersLeave', (newContent: any) => {
        console.log('Received roomMembersLeave:', newContent) // Debug
        const index = roomStore.getListMemberJoins.findIndex(
          (item: any) => item.socketId === newContent.socketId,
        )
        if (index !== -1) {
          roomStore.getListMemberJoins.splice(index, 1)
        }
      })
    },
    handleCreateRoomData(data: any) {
      console.log('Emitting createRoom with data:', data)
      this.client.emit('createRoom', data)
    },
    handleJoinRoomData(data: any) {
      console.log('Emitting joinRoom with data:', data)
      this.client.emit('joinRoom', data)
    },
    handleLeaveRoomData(data: any) {
      this.client.emit('leaveRoom', data)
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
