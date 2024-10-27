import type { BaseResponse } from '@/types/api'
import type { IRoom } from '@/types/room'

interface roomInfo {
  quizzfly_id: string
  is_show_question: boolean
  is_auto_play: boolean
  lobby_music: string
}

interface settingRoom {
  is_show_question: boolean
  is_auto_play: boolean
  lobby_music: string
}
export const getDetailRoomApi = async (id: string): Promise<BaseResponse<IRoom>> => {
  return $api(`/rooms/${id}`, {
    method: 'GET',
    query: {
      roomId: id,
    },
  })
}

export const createRoomApi = async (payload: roomInfo): Promise<BaseResponse<IRoom>> => {
  return $api('/rooms', {
    method: 'POST',
    body: payload,
  })
}

export const settingRoomApi = async (
  id: string,
  payload: settingRoom,
): Promise<BaseResponse<IRoom>> => {
  return $api(`/rooms/${id}/settings`, {
    method: 'PUT',
    body: payload,
    query: {
      roomId: id,
    },
  })
}
