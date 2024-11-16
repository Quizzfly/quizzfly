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
  roomPin: string
  userId?: string
  name: string
}

export interface IMember {
  new_player: {
    socket_id: string
    user_id: string
    name: string
    role: string
  }
  player_left?: {
    socket_id: string
    user_id: string
    name: string
    role: string
  }
  total_player: number
}

export interface IRoomLocked {
  locked: boolean
}

export interface ILocked {
  roomPin: string
}

export interface IKickMem {
  roomPin: string
  socketId: string
}

export interface IKickPlayer {
  player_left: {
    socket_id: string
    user_id: string
    name: string
    role: string
    room_pin: string
    total_core: number
  }
  total_player: number
}
