import type { Question } from './question'
import type { IKickPlayer } from './room'

export type SocketEventName =
  | 'nextQuestion'
  | 'quizStarted'
  | 'summaryAnswer'
  | 'resultAnswer'
  | 'updateLeaderboard'
  | 'answerQuestion'
  | 'noMoreQuestions'
  | 'kickPlayer'

export interface SocketUserAnswerQuestion {
  no_player_answered: number
}
export interface SocketLeaderboard {
  room_pin: string
  leader_board: LeaderboardEntry[]
}

interface LeaderboardEntry {
  user_id: string
  socket_id: string
  name: string
  role: string
  score: number
  total_score: string
  rank: number
}

export interface SocketResultAnswer {
  room_pin: string
  score: number
  total_score: number
  correct: boolean
  question_id: string
  correct_answer_id: string
  chosen_answer_id: string
}
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
  data:
    | SocketQuizStarted
    | SocketSummaryAnswer
    | SocketResultAnswer
    | SocketLeaderboard
    | SocketUserAnswerQuestion
    | IKickPlayer
}
