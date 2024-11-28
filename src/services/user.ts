import type { BaseResponse } from '@/types/api'
import type { IUser } from '@/types/user'

interface UserProfile {
  first_name: string
  last_name: string
}
export const getInfoApi = async (): Promise<BaseResponse<IUser>> => {
  return $api('/users/me', {
    method: 'GET',
  })
}

export const getUserApi = async (id: string): Promise<BaseResponse<IUser>> => {
  return $api(`/users`, {
    method: 'GET',
    query: {
      userId: id,
    },
  })
}

export const createProfileApi = async (payload: UserProfile): Promise<BaseResponse<IUser>> => {
  return $api('/users/info', {
    method: 'POST',
    body: payload,
  })
}

export const UpdateInfoApi = async (data: any): Promise<BaseResponse<IUser>> => {
  return $api(`/users/profile/me`, {
    method: 'PATCH',
    body: data,
  })
}

export const requestDeleteApi = async (): Promise<BaseResponse<IUser>> => {
  return $api('/users/request-delete', {
    method: 'POST',
  })
}

export const verifyDeleteApi = async (code: any): Promise<BaseResponse<IUser>> => {
  return $api('/users/verify-delete', {
    method: 'DELETE',
    query: {
      code: code,
    },
  })
}
