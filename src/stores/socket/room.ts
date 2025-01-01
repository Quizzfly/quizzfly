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
import { useRoomStore } from '../room'
import { showToast } from '@/utils/toast'
import { apiError } from '@/utils/exceptionHandler'
import router from '@/routers/router'
import { useAuthStore } from '../auth'
import type {
  IUserReconnect,
  SocketLeaderboard,
  SocketMessage,
  SocketResultAnswer,
  SocketUserAnswerQuestion,
} from '@/types/socket'
import { useLoadingStore } from '../loading'
import { RoomError } from '@/utils/error'

const BASE_URL_SOCKET__ROOM =
  import.meta.env.VITE_BASE_URL_SOCKET_ROOM || 'https://api.quizzfly.site/rooms'

export const useRoomSocketStore = defineStore({
  id: 'socketRoom',
  state: () => ({
    client: null as any,
    connected: false,
    message: {} as SocketMessage,
    resolveCallback: null as any,
  }),
  actions: {
    async setupRoomSocketStore() {
      const roomStore = useRoomStore()
      this.clearSocketStore()

      this.client = io(BASE_URL_SOCKET__ROOM)

      this.client.on('connect', () => {
        console.log('Connected to socket server') // Debug
        this.connected = true
        this.resolveCallback && this.resolveCallback()
      })

      this.client.on('reconnect', () => {
        console.log('Reconnected to socket server') // Debug
        this.connected = true
      })

      this.client.on('disconnect', () => {
        console.log('Disconnected from socket server') // Debug
        this.connected = false
      })

      this.client.on('connect_error', () => {
        console.log('Connection error') // Debug
        this.connected = false
      })

      this.client.on('exception', (newContent: any) => {
        this.message = newContent
        console.log('Received exception:', newContent, router.currentRoute.value) // Debug

        const redirectOnErrorRouterName =
          (router.currentRoute.value.meta.redirectOnErrorRouterName as string) || 'home'

        switch (router.currentRoute.value.name) {
          case 'play-instruction':
            localStorage.removeItem('roomPin')
            break
        }

        const errorsOnRouter = [RoomError.ROOM_NOT_FOUND]

        if (errorsOnRouter.includes(newContent?.errorCode)) {
          router.push({
            name: redirectOnErrorRouterName,
          })
        }
        showToast({
          title: 'Error',
          description: newContent?.message,
          variant: 'destructive',
        })
      })

      this.client.on('roomCreated', (newContent: IRoomSocket) => {
        console.log('Received roomCreated:', newContent) // Debug
        const loadingStore = useLoadingStore()
        loadingStore.setLoading(false)
      })

      this.client.on('roomCanceled', (newContent: IRoomSocket) => {
        console.log('Received roomCanceled:', newContent) // Debug
        localStorage.removeItem('participantID')
        const redirectOnErrorRouterName =
          (router.currentRoute.value.meta.redirectOnErrorRouterName as string) || 'home'
        router.push({
          name: redirectOnErrorRouterName,
        })
        showToast({
          title: 'Room canceled',
          description: 'Room has been canceled by host',
          variant: 'destructive',
        })
      })

      this.client.on('participantJoined', (newContent: IMember) => {
        this.message = {
          event: 'participantJoined',
          data: newContent,
        }
        localStorage.setItem('participantID', newContent.new_participant.id)
        roomStore.setMemberJoins(newContent)
      })

      this.client.on('participantReconnected', (newContent: IUserReconnect) => {
        this.message = {
          event: 'participantReconnected',
          data: newContent,
        }
        console.log('Received participantReconnected:', newContent) // Debug
        roomStore.setMemberJoins({
          new_participant: newContent.participant,
        })
      })

      this.client.on('roomLocked', (newContent: IRoomLocked) => {
        roomStore.setLockedRoom(newContent.locked)
      })

      this.client.on('participantLeft', (newContent: IMember) => {
        const index = roomStore.getListMemberJoins.findIndex(
          (item) => item.new_participant.socket_id === newContent?.participant_left?.socket_id,
        )
        if (index !== -1) {
          roomStore.getListMemberJoins.splice(index, 1)
        }
      })

      this.client.on('kickParticipant', (newContent: IKickPlayer) => {
        const index = roomStore.getListMemberJoins.findIndex(
          (item) => item.new_participant.socket_id === newContent.participant_left.socket_id,
        )
        if (index !== -1) {
          roomStore.getListMemberJoins.splice(index, 1)
        }

        this.message = {
          event: 'kickParticipant',
          data: newContent,
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

      this.client.on('updateLeaderboard', (newContent: SocketLeaderboard) => {
        console.log('Received updateLeaderboard:', newContent) // Debug
        this.message = {
          event: 'updateLeaderboard',
          data: newContent,
        }
      })

      this.client.on('answerQuestion', (newContent: SocketUserAnswerQuestion) => {
        console.log('Received answerQuestion:', newContent) // Debug
        this.message = {
          event: 'answerQuestion',
          data: newContent,
        }
      })

      // event quizFinished
      this.client.on('quizFinished', (newContent: any) => {
        console.log('Received quizFinished:', newContent) // Debug
        this.message = {
          event: 'quizFinished',
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
      this.client.emit('kickParticipant', data)
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
        room_pin: roomStore.getRoomInfo.room_pin,
        quizzfly_id: roomStore.getRoomInfo.quizzfly_id,
        host_id: authStore.getUser?.id || '',
      })
    },
    handleNextQuestion() {
      const roomStore = useRoomStore()
      const authStore = useAuthStore()
      this.client.emit('nextQuestion', {
        room_pin: roomStore.getRoomInfo.room_pin,
        host_id: authStore.getUser?.id,
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
      const authStore = useAuthStore()
      this.client.emit('finishQuestion', {
        room_pin: roomStore.getRoomInfo.room_pin,
        question_id: questionId,
        host_id: authStore.getUser?.id,
      })
    },
    handleAnswerQuestion(data: { answer_id: string; question_id: string }) {
      const roomStore = useRoomStore()
      this.client.emit('answerQuestion', {
        room_pin: roomStore.getRoomInfo.room_pin,
        ...data,
        participant_id: localStorage.getItem('participantID'),
      })
    },
    handleRequestLeaderboard(questionId: string) {
      const roomStore = useRoomStore()
      const authStore = useAuthStore()
      this.client.emit('updateLeaderboard', {
        room_pin: roomStore.getRoomInfo.room_pin,
        question_id: questionId,
        host_id: authStore.getUser?.id,
      })
    },
    handleQuizFinished() {
      const roomStore = useRoomStore()
      const authStore = useAuthStore()
      this.client.emit('finishQuiz', {
        room_pin: roomStore.getRoomInfo.room_pin,
        host_id: authStore.getUser?.id,
      })
    },
  },
  getters: {
    getMessage: (state) => state.message,
  },
})
