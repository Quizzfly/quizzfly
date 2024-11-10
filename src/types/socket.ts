import type { Question } from './question'

export type SocketEventName = 'nextQuestion' | 'quizStarted'

export interface SocketData {
  room_pin: string
  start_time: number
  question: Question
  questions: Question[]
}

export interface SocketMessage {
  event: SocketEventName
  data: SocketData
}
