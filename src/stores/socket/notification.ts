import { defineStore } from 'pinia'
import { io } from 'socket.io-client'
import { useAuthStore } from '../auth'
import type { SocketMessage } from '@/types/socket'
import type { INotification } from '@/types/notification'
import { showToast } from '@/utils/toast'

const BASE_URL_SOCKET__NOTIFICATION =
  import.meta.env.VITE_BASE_URL_SOCKET_NOTIFICATION || 'https://api.quizzfly.site/notifications'

export const useNotificationSocketStore = defineStore({
  id: 'socketNotification',
  state: () => ({
    client: null as any,
    connected: false,
    message: {} as SocketMessage,
    resolveCallback: null as any,
  }),
  actions: {
    async setupNotificationSocketStore() {
      this.clearSocketStore()

      this.client = io(BASE_URL_SOCKET__NOTIFICATION, {
        query: { user_id: useAuthStore().getUser?.id },
      })

      this.client.on('connect', () => {
        this.connected = true
        this.resolveCallback && this.resolveCallback()
        console.log('Connected to socket notification server') // Debug
      })

      this.client.on('disconnect', () => {
        console.log('Disconnected from socket server') // Debug
        this.connected = false
      })

      this.client.on('connect_error', () => {
        console.log('Connection error') // Debug
        this.connected = false
      })

      this.client.on('notification', (newContent: INotification) => {
        this.message = {
          event: 'notification',
          data: newContent,
        }
      })

      this.client.on('payment_success', (newContent: INotification) => {
        this.message = {
          event: 'notification',
          data: newContent,
        }
        console.log(this.message)
        showToast({
          title: 'Your payment has been success!',
          description: 'Waiting for redirect to your home',
          variant: 'success',
        })
        setTimeout(() => {
          location.href = '/billing-plan/plans'
        }, 1000)
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
