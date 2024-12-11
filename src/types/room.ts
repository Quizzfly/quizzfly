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
