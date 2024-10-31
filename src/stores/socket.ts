import { defineStore } from 'pinia'
import { io } from 'socket.io-client'

const BASE_URL_SOCKET = import.meta.env.VITE_BASE_URL_SOCKET

export const useSocketStore = defineStore({
  id: 'socket',
  state: () => ({
    client: null as any,
    connected: false,
    messages: {} as any,
    information: {} as any,
  }),
  actions: {
    setupSocketStore() {
      this.clearSocketStore()

      this.client = io(BASE_URL_SOCKET)

      this.client.on('connect', () => {
        this.connected = true
        console.log('Connected to WebSocket server')
      })

      this.client.on('message', (newContent: any) => {
        this.messages = JSON.parse(newContent) as any
      })

      this.client.on('connect_error', (error: any) => {
        console.error('Connection error:', error)
      })

      this.client.emit('information', () => {
        console.log('Information sent')
      })
    },
    setInformation(data: any) {
      this.information = data
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
