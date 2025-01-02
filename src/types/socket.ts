import type { Question } from './question'
import type { IKickPlayer, IMember, ParticipantReconnectedSuccess } from './room'
import type { IComment, IPost } from './group'
import type { INotification } from './notification'

export type SocketEventName =
  | 'nextQuestion'
  | 'quizStarted'
  | 'summaryAnswer'
  | 'resultAnswer'
  | 'updateLeaderboard'
  | 'answerQuestion'
  | 'noMoreQuestions'
  | 'createPost'
  | 'commentPost'
  | 'reactPost'
  | 'kickParticipant'
  | 'participantJoined'
  | 'quizFinished'
  | 'notification'
  | 'participantReconnected'
  | 'participantReconnectedSuccess'

export interface SocketUserAnswerQuestion {
  no_participant_answered: number
}
export interface SocketLeaderboard {
  room_pin: string
  leader_board: LeaderboardEntry[]
}

interface LeaderboardEntry {
  id: string
  user_id: string
  socket_id: string
  nick_name: string
  role: string
  score: number
  total_score: string
  rank: number
}

export interface SocketResultAnswer {
  room_pin: string
  score: number
  total_score: number
  is_correct: boolean
  question_id: string
  correct_answer_id: string
  chosen_answer_id: string
}
export interface SocketSummaryAnswer {
  room_pin: string
  question_id: string
  correct_answer_id: string
  choices: { [key: string]: number }
}
export interface SocketQuizStarted {
  room_pin: string
  start_time: number
  question: Question
  questions: Question[]
}

export interface IUserReconnect {
  participant: IMember
  total_participant: number
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
    | IMember
    | IPost
    | IComment
    | INotification
    | IUserReconnect
    | ParticipantReconnectedSuccess
}
