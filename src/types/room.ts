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
  newPlayer: {
    socketId: string
    userId: string
    name: string
    role: string
  }
  totalPlayer: number
}
