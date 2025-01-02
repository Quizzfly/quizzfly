import type { Question } from './question'

export interface IRoom {
  id?: string
  created_at: string
  started_at: string
  ended_at: string
  room_pin: string
  room_status: string
  is_show_question: boolean
  is_auto_play: boolean
  lobby_music: string
  quizzfly_id: string
}

export interface IRoomSocket {
  room_pin: string
  room_id?: string
  user_id?: string
  nick_name: string
}

export interface IMember {
  new_participant: {
    id: string
    socket_id: string
    user_id: string
    nick_name: string
    role: string
  }
  participant_left?: {
    socket_id: string
    user_id: string
    name: string
    role: string
  }
  total_participant: number
  avatar: string
}

export interface IRoomLocked {
  locked: boolean
}

export interface ILocked {
  room_pin: string
  host_id: string
}

export interface IKickMem {
  room_pin: string
  participant_id: string
  host_id: string
}

export interface IKickPlayer {
  participant_left: {
    id: string
    socket_id: string
    user_id: string
    name: string
    role: string
    room_pin: string
    total_core: number
  }
  total_player: number
}

export interface RoomSummary {
  id: string
  created_at: string
  updated_at: string
  deleted_at: null
  start_time: string
  end_time: string
  room_pin: string
  room_status: string
  is_show_question: boolean
  is_auto_play: boolean
  lobby_music: string
  participant_count: number
  question_count: number
  quizzfly: Quizzfly
  host: Host
}

interface Host {
  id: string
  email: string
  username: string
  name: string
  avatar: string
}

export interface Participant {
  id: string
  created_at: string
  updated_at: string
  deleted_at: null
  socket_id: string
  nick_name: string
  room_id: string
  room_pin: string
  total_score: number
  rank: null
  time_join: string
  time_left: null
  time_kicked: null
  correct_count: number
  incorrect_count: number
  unanswered_count: number
}

export interface RoomQuestion {
  id: string
  created_at: string
  updated_at: string
  deleted_at: null
  type: string
  quiz_type: string
  start_time: string
  end_time: string
  done: boolean
  correct_answer_id: null
  content: null
  time_limit: null
  point_multiplier: null
  files: File[]
  background_url: null
  question_index: number
  answers: Answer[]
  participant_answered_count: null
  correct_count: number
  incorrect_count: number
}

interface Answer {
  id: string
  created_at: string
  updated_at: string
  deleted_at: null
  content: string
  is_correct: boolean
  files: File[]
  index: number
  quiz_id: string
  answer_count: number
}

interface File {
  public_id: string
  original_filename: string
  format: string
  resource_type: string
  url: string
  bytes: number
}

export interface ReportRoom {
  id: string
  created_at: string
  updated_at: string
  deleted_at: null
  start_time: string
  end_time: null
  room_pin: string
  room_status: string
  is_show_question: boolean
  is_auto_play: boolean
  lobby_music: string
  participant_count: number
  question_count: number
  quizzfly: Quizzfly
}

interface Quizzfly {
  id: string
  title: null
}

export interface ParticipantReconnectedSuccess {
  participant: Participant
  room_pin: string
  state: number
  question: Question
}
