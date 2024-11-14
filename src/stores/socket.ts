import { defineStore } from 'pinia'
import { io } from 'socket.io-client'
import type {
  IRoomSocket,
  IMember,
  ILocked,
  IRoomLocked,
  IKickMem,
  IKickPlayer,
} from '@/types/room'
import { useRoomStore } from './room'
import { showToast } from '@/utils/toast'
import { apiError } from '@/utils/exceptionHandler'
import router from '@/routers/router'
import { useAuthStore } from './auth'
import type { SocketLeaderboard, SocketMessage, SocketResultAnswer } from '@/types/socket'

const BASE_URL_SOCKET = import.meta.env.VITE_BASE_URL_SOCKET || 'https://api.quizzfly.site/rooms'

export const useSocketStore = defineStore({
  id: 'socket',
  state: () => ({
    client: null as any,
    connected: false,
    message: {} as SocketMessage,
    resolveCallback: null as any,
  }),
  actions: {
    async setupSocketStore() {
      const roomStore = useRoomStore()
      this.clearSocketStore()

      this.client = io(BASE_URL_SOCKET)

      this.client.on('connect', () => {
        console.log('Connected to socket server') // Debug
        this.connected = true
        this.resolveCallback && this.resolveCallback()
      })

      this.client.on('exception', (newContent: any) => {
        console.log('Received exception:', newContent) // Debug
        showToast({
          title: 'Error',
          description: newContent?.message,
          variant: 'destructive',
        })
      })

      this.client.on('playerJoined', (newContent: IMember) => {
        roomStore.setMemberJoins(newContent)
      })

      this.client.on('roomLocked', (newContent: IRoomLocked) => {
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

      this.client.on('kickPlayer', (newContent: IKickPlayer) => {
        const index = roomStore.getListMemberJoins.findIndex(
          (item: any) => item.new_player.socket_id === newContent.player_left.socket_id,
        )
        if (index !== -1) {
          roomStore.getListMemberJoins.splice(index, 1)
        }
      })

      this.client.on('nextQuestion', (newContent: any) => {
        console.log('Received nextQuestion:', newContent) // Debug
        this.message = {
          event: 'nextQuestion',
          data: newContent,
        }
      })

      this.client.on('quizStarted', (newContent: any) => {
        console.log('Received quizStarted:', newContent) // Debug
        this.message = {
          event: 'quizStarted',
          data: newContent,
        }
      })

      this.client.on('summaryAnswer', (newContent: any) => {
        console.log('Received summaryAnswer:', newContent) // Debug
        this.message = {
          event: 'summaryAnswer',
          data: newContent,
        }
      })

      this.client.on('resultAnswer', (newContent: SocketResultAnswer) => {
        console.log('Received resultAnswer:', newContent) // Debug
        this.message = {
          event: 'resultAnswer',
          data: newContent,
        }
      })

      this.client.on('updateLeaderBoard', (newContent: SocketLeaderboard) => {
        console.log('Received updateLeaderBoard:', newContent) // Debug
        this.message = {
          event: 'updateLeaderBoard',
          data: newContent,
        }
      })

      await new Promise((resolve) => {
        this.resolveCallback = resolve
      })
    },
    handleCreateRoomData(data: IRoomSocket) {
      this.client.emit('createRoom', data)
    },
    handleJoinRoomData(data: IRoomSocket) {
      try {
        console.log('Join room data:', data) // Debug
        this.client.emit('joinRoom', data)
      } catch (error) {
        router.push({
          name: 'play-lobby',
        })
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
    handleStartQuestion() {
      const roomStore = useRoomStore()
      const authStore = useAuthStore()
      this.client.emit('startQuiz', {
        roomPin: roomStore.getRoomInfo.room_pin,
        quizzflyId: roomStore.getRoomInfo.quizzfly_id,
        hostId: authStore.getUser?.id || '',
      })
    },
    handleNextQuestion() {
      const roomStore = useRoomStore()
      this.client.emit('nextQuestion', {
        roomPin: roomStore.getRoomInfo.room_pin,
      })
    },
    clearSocketStore() {
      if (this.client) {
        this.client.disconnect()
        this.client = null
        this.connected = false
      }
    },
    handleFinishQuestion(questionId: string) {
      const roomStore = useRoomStore()
      this.client.emit('finishQuestion', {
        roomPin: roomStore.getRoomInfo.room_pin,
        questionId,
      })
    },
    handleAnswerQuestion(data: { answerId: string; questionId: string }) {
      const roomStore = useRoomStore()
      this.client.emit('answerQuestion', {
        roomPin: roomStore.getRoomInfo.room_pin,
        ...data,
      })
    },
    handleRequestLeaderboard(questionId: string) {
      const roomStore = useRoomStore()
      this.client.emit('updateLeaderboard', {
        roomPin: roomStore.getRoomInfo.room_pin,
        questionId,
      })
    },
  },
  getters: {
    getMessage: (state) => state.message,
  },
})
