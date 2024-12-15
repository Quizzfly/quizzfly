import { defineStore } from 'pinia'
import { io } from 'socket.io-client'
import { useAuthStore } from '../auth'
import type { SocketMessage } from '@/types/socket'
import type { IComment, IPost } from '@/types/group'

const BASE_URL_SOCKET__GROUP =
  import.meta.env.VITE_BASE_URL_SOCKET_GROUP || 'https://api.quizzfly.site/groups'

export const useGroupSocketStore = defineStore({
  id: 'socketGroup',
  state: () => ({
    client: null as any,
    connected: false,
    message: {} as SocketMessage,
    resolveCallback: null as any,
  }),
  actions: {
    async setupGroupSocketStore() {
      this.clearSocketStore()

      this.client = io(BASE_URL_SOCKET__GROUP, {
        query: { user_id: useAuthStore().getUser?.id },
      })

      this.client.on('connect', () => {
        this.connected = true
        this.resolveCallback && this.resolveCallback()
        console.log('Connected to socket group server') // Debug
      })

      this.client.on('disconnect', () => {
        console.log('Disconnected from socket server') // Debug
        this.connected = false
      })

      this.client.on('connect_error', () => {
        console.log('Connection error') // Debug
        this.connected = false
      })

      await new Promise((resolve) => {
        this.resolveCallback = resolve
      })

      this.client.on('createPost', (newContent: IPost) => {
        this.message = {
          event: 'createPost',
          data: newContent,
        }
      })
      this.client.on('commentPost', (newContent: any) => {
        this.message = {
          event: 'commentPost',
          data: newContent,
        }
      })
      this.client.on('reactPost', (newContent: IComment) => {
        this.message = {
          event: 'reactPost',
          data: newContent,
        }
      })
      await new Promise((resolve) => {
        this.resolveCallback = resolve
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
