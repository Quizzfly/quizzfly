import type { BaseResponse } from '@/types/api'
import type { IRoom, Participant, ReportRoom, RoomQuestion, RoomSummary } from '@/types/room'

interface RoomInfo {
  quizzfly_id: string
  is_show_question: boolean
  is_auto_play: boolean
  lobby_music: string
}

interface SettingRoom {
  is_show_question: boolean
  is_auto_play: boolean
  lobby_music: string
}

interface RangeDate {
  from_date: string
  to_date: string
}
export const getRoomsApi = async (
  page = 1,
  range?: RangeDate,
): Promise<BaseResponse<ReportRoom[]>> => {
  return $api(`/rooms`, {
    method: 'GET',
    query: {
      page,
      from_date: range ? range.from_date : '2015-11-28',
      sort_by: 'created_at',
      to_date: range ? range.to_date : new Date().toISOString().split('T')[0],
    },
  })
}

export const getRoomSummaryApi = async (id: string): Promise<BaseResponse<RoomSummary>> => {
  return $api(`/rooms/${id}/summary`, {
    method: 'GET',
    query: {
      roomId: id,
    },
  })
}

export const getRoomParticipantsApi = async (id: string): Promise<BaseResponse<Participant[]>> => {
  return $api(`/rooms/${id}/participants`, {
    method: 'GET',
    query: {
      roomId: id,
    },
  })
}

export const getRoomQuestionsApi = async (id: string): Promise<BaseResponse<RoomQuestion[]>> => {
  return $api(`/rooms/${id}/questions`, {
    method: 'GET',
    query: {
      roomId: id,
    },
  })
}

export const getDetailRoomApi = async (id: string): Promise<BaseResponse<IRoom>> => {
  return $api(`/rooms/${id}`, {
    method: 'GET',
    query: {
      roomId: id,
    },
  })
}

export const createRoomApi = async (payload: RoomInfo): Promise<BaseResponse<IRoom>> => {
  return $api('/rooms', {
    method: 'POST',
    body: payload,
  })
}

export const settingRoomApi = async (
  id: string,
  payload: SettingRoom,
): Promise<BaseResponse<IRoom>> => {
  return $api(`/rooms/${id}/settings`, {
    method: 'PUT',
    body: payload,
    query: {
      roomId: id,
    },
  })
}
