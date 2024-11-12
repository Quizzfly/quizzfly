import type { Question } from './question'

export type SocketEventName = 'nextQuestion' | 'quizStarted' | 'summaryAnswer'

export interface SocketSummaryAnswer {
  room_pin: string
  question_id: string
  correct_answer_id: string
  answers_count: { [key: string]: number }
}
export interface SocketQuizStarted {
  room_pin: string
  start_time: number
  question: Question
  questions: Question[]
}

export interface SocketMessage {
  event: SocketEventName
  data: SocketQuizStarted | SocketSummaryAnswer
}
